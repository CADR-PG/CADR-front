import { Helper, Outlines } from '@react-three/drei';
import { BoxHelper } from 'three';

interface HighlightHelperProps {
  objectUuid: string;
  focused: string | boolean | null;
  hovered: boolean;
}

function HighlightHelper({
  objectUuid,
  focused,
  hovered,
}: HighlightHelperProps) {
  return (
    <>
      {hovered ? <Outlines thickness={2} color="yellow" /> : null}
      {objectUuid == focused ? (
        <Helper type={BoxHelper} args={['yellow']} />
      ) : null}
    </>
  );
}

export default HighlightHelper;
