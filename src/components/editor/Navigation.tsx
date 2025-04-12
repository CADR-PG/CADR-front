import { JSX, RefObject } from 'react';
import { MenuItem } from '@mui/material';
import Objects from '../../data/ObjectNames';
import NavigationItem from './NavigationItem';
import ControllerProps from '../../types/ControllerProps';
import * as THREE from 'three';

interface NavigationProps {
  addMesh: (mesh: JSX.Element) => void;
  setRef: (ref: RefObject<THREE.Mesh>) => void;
}

function Navigation({ addMesh, setRef }: NavigationProps) {
  const handleAdd = (
    _: React.MouseEvent<HTMLElement>,
    Component: React.ComponentType<ControllerProps>,
  ) => {
    addMesh(<Component position={[0, 0, 0]} parentCallback={setRef} />);
  };

  return (
    <div className="tool-bar">
      <NavigationItem label="Shapes">
        {Objects.map((object) => (
          <MenuItem
            key={object.id}
            onClick={(e) => handleAdd(e, object.component)}
          >
            {object.name}
          </MenuItem>
        ))}
      </NavigationItem>
    </div>
  );
}

export default Navigation;
