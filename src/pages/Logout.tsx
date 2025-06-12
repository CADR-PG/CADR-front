import { useNavigate } from 'react-router-dom';
import useLogout from '../hooks/useLogout';
import { useEffect } from 'react';

function Logout() {
  const { mutate } = useLogout();
  const navigate = useNavigate();

  useEffect(() => {
    mutate();
    navigate('/');
  }, []);

  return null;
}

export default Logout;
