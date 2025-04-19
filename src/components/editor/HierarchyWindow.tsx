import { useEditorContext } from '../../hooks/useEditorContext';
import SceneObject from '../../types/SceneObject';

function HierarchyWindow() {
  const { sceneObjects, focused } = useEditorContext();

  const handleOnClick = (object: SceneObject) => {
    console.log(focused);
    console.log(object.component);
  }

  return (
    <div className="hierarchy-window">
      <h3>Hierarchy</h3>
      {sceneObjects.map((object) => (
        <div
          className="hierarchy-window__item"
          onClick={() => handleOnClick(object)}
        >
          {object.geometryType}
        </div>
      ))}
    </div>
  );
}

export default HierarchyWindow;
