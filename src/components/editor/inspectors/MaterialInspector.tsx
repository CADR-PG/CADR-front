import { useState } from "react";
import { useEditorContext } from "../../../hooks/useEditorContext";
import InspectorCard from "../../InspectorCard";
import { SketchPicker } from 'react-color';
import * as THREE from 'three'

function MaterialInspector() {
  const { focused, sceneObjects, updateFocusedObject } = useEditorContext();
  const [color, setColor] = useState("");
  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  const focusedObject = sceneObjects[focused!].ref!;

  const handleChange = (color: string) => {
    console.log(focusedObject?.material);

    const newColor = new THREE.Color(color);
    focusedObject.material.color = newColor;

    setColor(color);
    updateFocusedObject(focusedObject);
  }

  return (
    <InspectorCard title="Material properties">
      <div className="color-section">
        Color:
        <div className="color-section__color-border">
          <div
            onClick={() => setDisplayColorPicker(!displayColorPicker)}
            className="color-section__color-placeholder"
            style={{ background: color }}>
          </div>
        </div>
      </div>
      {displayColorPicker ?
        <div className="popover">
          <div className="cover" onClick={() => setDisplayColorPicker(false)}/>
          <SketchPicker
            color={color}
            onChange={(color) => handleChange(color.hex)}
          />
        </div> : null}
    </InspectorCard>
  );
}

export default MaterialInspector;
