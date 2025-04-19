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
        style={{ background: editingMode === 'translate' ? 'black' : 'white' }}
        onClick={() => selectMode('translate')}
      >
        T
      </button>
      <button
        className="toolbar-item"
        style={{ background: editingMode === 'rotate' ? 'black' : 'white' }}
        onClick={() => selectMode('rotate')}
      >
        R
      </button>
      <button
        className="toolbar-item"
        style={{ background: editingMode === 'scale' ? 'black' : 'white' }}
        onClick={() => selectMode('scale')}
      >
        S
      </button>
    </div>
  );
}

export default Toolbar;
