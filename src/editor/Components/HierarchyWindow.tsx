import { RefObject } from 'react';
import * as THREE from 'three';

interface HierarchyWindowProps {
  objects: { id: string; name: string; ref: RefObject<THREE.Mesh> | null }[];
  onSelect?: (ref: RefObject<THREE.Mesh> | null) => void;
}

function HierarchyWindow({ objects, onSelect }: HierarchyWindowProps) {
  return (
    <div className="hierarchy-window">
      <h3>Hierarchy</h3>
      <div>
        {objects.map((object) => (
          <div key={object.id}>
            <button onClick={() => onSelect?.(object.ref)}>
              {object.ref && object.ref.current && object.ref.current.name
                ? object.ref.current.name
                : object.name}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HierarchyWindow;
