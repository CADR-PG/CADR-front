import useLogout from '../hooks/useLogout';
import { useEffect } from 'react';

function Logout() {
  const { mutate } = useLogout();

  useEffect(() => {
    mutate();
  }, [mutate]);

  return null;
}

export default Logout;
