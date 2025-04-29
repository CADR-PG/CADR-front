import { useEditorContext } from "../../hooks/useEditorContext";
import MeshInspector from "./inspectors/MeshInspector";

function InspectorWindow() {
  const { focused } = useEditorContext();

  return (
    <div className="inspector-window">
      <h3>Inspector</h3>
      {focused && <MeshInspector /> }
    </div>
  );
}

export default InspectorWindow;
