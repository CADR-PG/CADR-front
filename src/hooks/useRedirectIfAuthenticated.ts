import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchUser } from '../api/client';
import { useNavigate } from 'react-router-dom';

export default function useRedirectIfAuthenticated(redirectTo = '/') {
  const { data: userResponse, isLoading: meLoading } = useQuery({
    queryKey: ['me'],
    queryFn: fetchUser,
    retry: false,
  });

  const user = userResponse?.data;
  const navigate = useNavigate();

  useEffect(() => {
    if (!meLoading && user) navigate(redirectTo);
  }, [meLoading, user, navigate, redirectTo]);

  return { user, meLoading };
}
