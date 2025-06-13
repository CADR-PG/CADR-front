import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './css/main.scss';
import App from './App.tsx';
import Home from './pages/Home.tsx';
import Register from './pages/Register.tsx';
import Login from './pages/Login.tsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import EmailConfirmation from './pages/EmailConfirmation.tsx';
import RegistrationSuccessful from './pages/RegistrationSuccessful.tsx';
import Logout from './pages/Logout.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/editor',
    element: <App />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/email-confirmation',
    element: <EmailConfirmation />,
  },
  {
    path: '/registration-successful',
    element: <RegistrationSuccessful />,
  },
  {
    path: '/logout',
    element: <Logout />,
  },
]);

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>,
);
