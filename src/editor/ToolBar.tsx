import { JSX, RefObject } from 'react';
import { MenuItem } from '@mui/material';
import Objects from './Data/ObjectNames';
import ToolBarItem from './ToolBarItem';
import ControllerProps from '../types/ControllerProps';
import * as THREE from 'three';

interface ToolbarProps {
  addMesh: (mesh: JSX.Element) => void;
  setRef: (ref: RefObject<THREE.Mesh>) => void;
}

function Toolbar({ addMesh, setRef }: ToolbarProps) {
  const handleAdd = (
    _: React.MouseEvent<HTMLElement>,
    Component: React.ComponentType<ControllerProps>,
  ) => {
    addMesh(<Component position={[0, 0, 0]} parentCallback={setRef} />);
  };

  return (
    <div className="tool-bar">
      <ToolBarItem label="Shapes">
        {Objects.map((object) => (
          <MenuItem
            key={object.id}
            onClick={(e) => handleAdd(e, object.component)}
          >
            {object.name}
          </MenuItem>
        ))}
      </ToolBarItem>
    </div>
  );
}

export default Toolbar;
