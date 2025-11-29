import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useFetchUser from './useFetchUser';

export default function useRedirectIfAuthenticated(redirectTo = '/') {
  const { data: userResponse, isLoading: meLoading } = useFetchUser();

  const user = userResponse?.data;
  const navigate = useNavigate();

  useEffect(() => {
    if (!meLoading && user) navigate(redirectTo);
  }, [meLoading, user, navigate, redirectTo]);
}
