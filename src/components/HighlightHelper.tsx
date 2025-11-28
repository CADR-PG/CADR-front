import { Helper, Outlines } from '@react-three/drei';
import { BoxHelper } from 'three';

interface HighlightHelperProps {
  entity: string;
  focused: string | null;
  hovered: boolean;
}

function HighlightHelper({ entity, focused, hovered }: HighlightHelperProps) {
  return (
    <>
      {hovered ? <Outlines thickness={2} color="yellow" /> : null}
      {entity == focused ? <Helper type={BoxHelper} args={['yellow']} /> : null}
    </>
  );
}

export default HighlightHelper;
