import { JSX, RefObject, useState } from 'react';
import CanvasController from '../editor/CanvasController';
import Toolbar from '../editor/ToolBar';
import * as THREE from 'three';

function Editor() {
  const [objects, setObjects] = useState<JSX.Element[]>([]);
  const [ref, setRef] = useState<RefObject<THREE.Mesh> | null>();

  const pushMesh = (mesh: JSX.Element) => {
    setObjects((prev) => [...prev, mesh]);
  };

  return (
    <>
      <Toolbar addMesh={pushMesh} setRef={setRef} />
      <CanvasController objects={objects} currentRef={ref} setRef={setRef} />
    </>
  );
}

export default Editor;
