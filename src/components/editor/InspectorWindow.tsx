import { useState } from 'react';
import { useEditorContext } from '../../hooks/useEditorContext';
import useEntityManager from '../../hooks/useEntityManager';
import GenericInspector from './inspectors/GenericInspector';
import AddIcon from '@mui/icons-material/Add';
import { Button, IconButton, Menu, MenuItem } from '@mui/material';
import { ECS } from '../../engine/ECS';
import DeleteIcon from '@mui/icons-material/Delete';
import GeometryInspector from './inspectors/GeometryInspector';
import Geometry from '../../engine/components/Geometry';
import TransformInspector from './inspectors/TransformInspector';
import Transform from '../../engine/components/Transform';
import MaterialInspector from './inspectors/MaterialInspector';
import Material from '../../engine/components/Material';
import Light from '../../engine/components/Light';
import LightInspector from './inspectors/LightInspector';

function InspectorWindow() {
  const [anchorEl, setAnchorEl] = useState<{
    mouseX: number;
    mouseY: number;
  } | null>(null);
  const open = Boolean(anchorEl);
  const { focused } = useEditorContext();
  const em = useEntityManager();
  const snap = em.getComponents(focused);
  const nameMap = em.mapNameToClass;

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
      case 'Transform':
        return (
          <TransformInspector
            entity={focused}
            component={snap[key] as Transform}
          />
        );
      case 'Material':
        return (
          <MaterialInspector
            entity={focused}
            data={(snap[key] as Material).data}
          />
        );
      case 'Light':
        return (
          <LightInspector entity={focused} data={(snap[key] as Light).data} />
        );
      default:
        return <GenericInspector entity={focused} component={snap[key]} />;
    }
  };

  return (
    <div className="inspector-window">
      <h3>Inspector</h3>
      {focused && (
        <>
          {Object.keys(snap).map((key) => {
            return (
              <div key={key}>
                <div className="component-header">
                  <b>{key}</b>
                  <IconButton
                    size="small"
                    className="component-header-close-btn"
                    onClick={() => handleDelete(key)}
                  >
                    <DeleteIcon></DeleteIcon>
                  </IconButton>
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
        </>
      )}
    </div>
  );
}

export default InspectorWindow;
