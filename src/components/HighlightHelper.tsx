import { Helper } from '@react-three/drei';
import { BoxHelper } from 'three';

interface HighlightHelperProps {
  entity: string;
  focused: string | null;
}

function HighlightHelper({ entity, focused }: HighlightHelperProps) {
  return (
    <>
      {entity == focused ? <Helper type={BoxHelper} args={['yellow']} /> : null}
    </>
  );
}

export default HighlightHelper;
