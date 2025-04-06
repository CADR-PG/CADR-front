import { JSX } from 'react';
import { MenuItem } from '@mui/material';
import Objects from './Data/ObjectNames';
import ToolBarItem from './ToolBarItem';

interface ToolbarProps {
  addMesh: (mesh: JSX.Element) => void;
}

function Toolbar({ addMesh }: ToolbarProps) {
  const handleAdd = (
    _: React.MouseEvent<HTMLElement>,
    Component: React.ComponentType<{ position: [number, number, number] }>
  ) => {
    addMesh(<Component position={[0, 0, 0]} />);
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
