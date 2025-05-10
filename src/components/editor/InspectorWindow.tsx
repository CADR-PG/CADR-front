import { useEditorContext } from "../../hooks/useEditorContext";
import MaterialInspector from "./inspectors/MaterialInspector";
import MeshInspector from "./inspectors/MeshInspector";

function InspectorWindow() {
  const { focused } = useEditorContext();

  return (
    <div className="inspector-window">
      <h3>Inspector</h3>
      {focused && <MeshInspector /> }
      {focused && <MaterialInspector />}
    </div>
  );
}

export default InspectorWindow;
