import { ChangeEvent, useState } from "react";
import { useEditorContext } from "../../../hooks/useEditorContext";
import { Collapse } from "@mui/material";

type Property = "position" | "rotation" | "scale";
type Axis = "x" | "y" | "z";

function MeshInspector() {
  const [collapse, setCollapse] = useState(true);
  const { focused, sceneObjects, updateFocusedObject } = useEditorContext();
  const focusedObject = sceneObjects[focused!].ref!;

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>, property: Property, axis: Axis) => {
    focusedObject[property][axis] = +event.target.value;
    updateFocusedObject(focusedObject);
  }

  return (
    <>
      <p onClick={() => setCollapse(!collapse)}>Translation</p>
      <Collapse in={collapse} unmountOnExit>
        <div className="mesh-inspector__input">
          x: <input
               type="number"
               value={focusedObject.position.x}
               onChange={(e) => handleOnChange(e, "position", "x")}
          />
          y: <input
               type="number"
               value={focusedObject.position.y}
               onChange={(e) => handleOnChange(e, "position", "y")}
          />
          z: <input
               type="number"
               value={focusedObject.position.z}
               onChange={(e) => handleOnChange(e, "position", "z")}
          />
        </div>
      </Collapse>
    </>
  )
}

export default MeshInspector;
