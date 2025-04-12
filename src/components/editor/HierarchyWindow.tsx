import { JSX } from 'react';
interface HierarchyWindowProps {
  objects: JSX.Element[];
}

function HierarchyWindow({ objects }: HierarchyWindowProps) {
  return (
    <div className="hierarchy-window">
      <h3>Hierarchy</h3>
      <div>
        {objects.map(() => (
          <div>text</div>
        ))}
      </div>
    </div>
  );
}

export default HierarchyWindow;
