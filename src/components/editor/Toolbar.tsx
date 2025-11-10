import { useEditorContext } from '../../hooks/useEditorContext';

function Toolbar() {
  const { editingMode, selectMode } = useEditorContext();

  return (
    <div className="toolbar">
      <button
        className={`toolbar-item ${editingMode === 'translate' ? 'active' : ''}`}
        onClick={() => selectMode('translate')}
      >
        T
      </button>
      <button
        className={`toolbar-item ${editingMode === 'rotate' ? 'active' : ''}`}
        onClick={() => selectMode('rotate')}
      >
        R
      </button>
      <button
        className={`toolbar-item ${editingMode === 'scale' ? 'active' : ''}`}
        onClick={() => selectMode('scale')}
      >
        S
      </button>
    </div>
  );
}

export default Toolbar;
