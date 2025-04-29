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
        className="toolbar-item"
        style={{ background: editingMode === 'translate' ? 'black' : 'gray' }}
        onClick={() => selectMode('translate')}
      >
        T
      </button>
      <button
        className="toolbar-item"
        style={{ background: editingMode === 'rotate' ? 'black' : 'gray' }}
        onClick={() => selectMode('rotate')}
      >
        R
      </button>
      <button
        className="toolbar-item"
        style={{ background: editingMode === 'scale' ? 'black' : 'gray' }}
        onClick={() => selectMode('scale')}
      >
        S
      </button>
    </div>
  );
}

export default Toolbar;
