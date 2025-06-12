import { JSX } from 'react';
import { Navigate } from 'react-router-dom';

interface Props {
  children: JSX.Element;
}

export function GuestRoute({ children }: Props) {
  const cookies = document.cookie.split(';').map((cookie) => cookie.trim());
  const tokenExists = cookies.some((cookie) =>
    cookie.startsWith('token=cadr_access_token'),
  );

  if (tokenExists) {
    return <Navigate to="/" replace />;
  }

  return children;
}
