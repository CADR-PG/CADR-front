import { useEffect, useState } from 'react';
import { useEditorContext } from '../../hooks/useEditorContext';
import useEntityManager from '../../hooks/useEntityManager';
import AddIcon from '@mui/icons-material/Add';
import { Button, IconButton, Menu, MenuItem } from '@mui/material';
import { ECS } from '../../engine/ECS';
import DeleteIcon from '@mui/icons-material/Delete';
import GeometryInspector from './inspectors/GeometryInspector';
import Geometry from '../../engine/components/Geometry';
import MaterialInspector from './inspectors/MaterialInspector';
import LightInspector from './inspectors/LightInspector';
import ColliderDataInspector from './inspectors/ColliderDataInspector';
import ColliderInspector from './inspectors/ColliderInspector';
import RigidBodyInspector from './inspectors/RigidBodyInspector';
import AudioInspector from './inspectors/AudioInspector';
import cAudio from '../../engine/components/Audio';
import { cPositionalAudio } from '../../engine/components/PositionalAudio';
import InspectorTemplate from './inspectors/InspectorTemplate';
import GLTFInspector from './inspectors/GLTFInspector';
import { useDrop } from 'react-dnd';
import { DndTypes } from '@/types/DndTypes';
import { AssetsFile } from '@/types/Assets';
import useDownloadFile from '@/hooks/useDownloadFile';
import { normalizeUrl } from '@/engine/components/helpers/material';
import { sdk } from '@/data/Sdk';

function InspectorWindow() {
  const [anchorEl, setAnchorEl] = useState<{
    mouseX: number;
    mouseY: number;
  } | null>(null);
  const open = Boolean(anchorEl);
  const { focused, dragged } = useEditorContext();
  const em = useEntityManager();
  const snap = em.getComponents(focused);
  const nameMap = em.mapNameToClass;
  const [file, setFile] = useState('');
  const [{ canDrop }, drop] = useDrop(() => ({
    accept: DndTypes.FILE,
    drop: (item: AssetsFile, _monitor) => {
      setFile(item.id);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  }));
  const { data } = useDownloadFile(file);

  useEffect(() => {
    async function load() {
      if (!data) return;

      console.log(data);
      try {
        const { default: init } = await import(
          /* @vite-ignore */ normalizeUrl(data)
        );
        const constructor = init(sdk);
        const instance = new constructor();
        instance.fileId = file;
        ECS.instance.entityManager.addComponent(instance, focused!);
        setFile('');
      } catch (e) {
        console.error(e);
      }
    }
    load();
  }, [data, file]);

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(
      anchorEl === null
        ? {
            mouseX: event.clientX + 2,
            mouseY: event.clientY - 6,
          }
        : null,
    );
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleAdd = (name: string) => {
    if (focused) {
      ECS.instance.entityManager.addComponent(
        new ECS.instance.entityManager.mapNameToClass[name](),
        focused,
      );
    }
    setAnchorEl(null);
  };

  const handleDelete = (component: string) => {
    if (focused) {
      ECS.instance.entityManager.removeComponent(
        ECS.instance.entityManager.mapNameToClass[component],
        focused,
      );
    }
  };

  const renderSwitch = (key: string) => {
    if (!focused) return;

    switch (snap[key].name) {
      case 'Geometry':
        return (
          <GeometryInspector
            entity={focused}
            data={(snap[key] as Geometry).data}
          />
        );
      case 'Material':
        return <MaterialInspector entity={focused} />;
      case 'Light':
        return <LightInspector entity={focused} />;
      case 'Collider':
        return (
          <>
            <ColliderInspector entity={focused} />
            <ColliderDataInspector entity={focused} />
          </>
        );
      case 'RigidBody':
        return <RigidBodyInspector entity={focused} />;
      case 'Audio':
        return <AudioInspector entity={focused} componentType={cAudio} />;
      case 'PositionalAudio':
        return (
          <AudioInspector entity={focused} componentType={cPositionalAudio} />
        );
      case 'GLTF':
        return <GLTFInspector entity={focused} />;
      default:
        return (
          <InspectorTemplate
            entity={focused}
            componentType={
              ECS.instance.entityManager.mapNameToClass[snap[key].name]
            }
          />
        );
    }
  };

  return (
    <div className="inspector-window">
      <h3>Inspector</h3>
      {focused && !dragged && (
        <>
          {Object.keys(snap).map((key) => {
            return (
              <div key={key}>
                <div
                  className="component-header"
                  style={
                    key === 'Transform' ? { paddingBottom: '18px' } : undefined
                  }
                >
                  <b>{key}</b>
                  {key !== 'Transform' && (
                    <IconButton
                      size="small"
                      className="component-header-close-btn"
                      onClick={() => handleDelete(key)}
                    >
                      <DeleteIcon></DeleteIcon>
                    </IconButton>
                  )}
                </div>
                <div className="inspector-panel">{renderSwitch(key)}</div>
                <hr />
              </div>
            );
          })}
          <div className="add-component">
            <Button onClick={handleOpen} fullWidth variant="contained">
              <AddIcon />
            </Button>
          </div>
          <Menu
            anchorReference="anchorPosition"
            anchorPosition={
              anchorEl !== null
                ? { top: anchorEl?.mouseY, left: anchorEl?.mouseX }
                : undefined
            }
            open={open}
            onClose={handleClose}
          >
            {Object.keys(nameMap).map((name) => {
              return (
                <MenuItem onClick={() => handleAdd(name)} key={name}>
                  {name}
                </MenuItem>
              );
            })}
          </Menu>

          <div
            ref={(node) => {
              drop(node);
            }}
            className={`drop-area ${canDrop ? 'drop-area--drag' : ''}`}
          >
            Drop your script here
          </div>
        </>
      )}
    </div>
  );
}

export default InspectorWindow;
