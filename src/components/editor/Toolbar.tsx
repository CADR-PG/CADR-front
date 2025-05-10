import { Dispatch } from 'react';
import EditingMode from '../../types/EditingMode';

interface ToolbarProps {
  editingMode: EditingMode;
  selectMode: Dispatch<EditingMode>;
}

function Toolbar({ editingMode, selectMode }: ToolbarProps) {
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
