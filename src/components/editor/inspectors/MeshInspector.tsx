import { ChangeEvent } from "react";
import { useEditorContext } from "../../../hooks/useEditorContext";
import InspectorCard from "../../InspectorCard";

type Property = "position" | "rotation" | "scale";
type Axis = "x" | "y" | "z";

function MeshInspector() {
  const { focused, sceneObjects, updateFocusedObject } = useEditorContext();
  const focusedObject = sceneObjects[focused!].ref!;

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>, property: Property, axis: Axis) => {
    focusedObject[property][axis] = +event.target.value;
    updateFocusedObject(focusedObject);
  }

  return (
    <InspectorCard title="Mesh properties">
      Translation
      <div className="mesh-inspector__input">
        x: <input
             type="number"
             value={focusedObject.position.x || ''}
             onChange={(e) => handleOnChange(e, "position", "x")}
            />
        y: <input
             type="number"
             value={focusedObject.position.y || ''}
             onChange={(e) => handleOnChange(e, "position", "y")}
            />
        z: <input
             type="number"
             value={focusedObject.position.z || ''}
             onChange={(e) => handleOnChange(e, "position", "z")}
            />
      </div>
          
      Rotation
      <div className="mesh-inspector__input">
        x: <input
             type="number"
             value={focusedObject.rotation.x || ''}
             onChange={(e) => handleOnChange(e, "rotation", "x")}
            />
        y: <input
             type="number"
             value={focusedObject.rotation.y || ''}
             onChange={(e) => handleOnChange(e, "rotation", "y")}
            />
        z: <input
             type="number"
             value={focusedObject.rotation.z || ''}
             onChange={(e) => handleOnChange(e, "rotation", "z")}
            />
      </div>
          
          Scale
      <div className="mesh-inspector__input">
        x: <input
             type="number"
             value={focusedObject.scale.x || ''}
             onChange={(e) => handleOnChange(e, "scale", "x")}
            />
        y: <input
             type="number"
             value={focusedObject.scale.y || ''}
             onChange={(e) => handleOnChange(e, "scale", "y")}
            />
        z: <input
             type="number"
             value={focusedObject.scale.z || ''}
             onChange={(e) => handleOnChange(e, "scale", "z")}
            />
      </div>
    </InspectorCard>
  )
}

export default MeshInspector;
