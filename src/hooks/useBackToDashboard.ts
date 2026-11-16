import { useNavigate } from 'react-router-dom';
import { ECS } from '@/engine/ECS';

export default function useBackToDashboard() {
  const navigate = useNavigate();

  return () => {
    const hasUnsaved = ECS.instance.entityManager.scenes.some((s) => s.dirty);
    if (
      hasUnsaved &&
      !window.confirm(
        'You have unsaved changes. Are you sure you want to leave the editor?',
      )
    ) {
      return;
    }
    navigate('/dashboard');
  };
}
