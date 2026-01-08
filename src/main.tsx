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
import Dashboard from './pages/Dashboard.tsx';
import ChangeData from './pages/Profile.tsx';
import NotFound from './pages/404.tsx';
import OAuthTest from './pages/OAuthTest.tsx';
import { GoogleOAuthProvider } from '@react-oauth/google';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/editor/:uuid',
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
  {
    path: '/change-data',
    element: <ChangeData />,
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
  {
    path: '/oauth-test',
    element: (
      <GoogleOAuthProvider clientId="515786075614-c5iosdb5efelk7rfpm4o2btpradfusem.apps.googleusercontent.com">
        <OAuthTest />{' '}
      </GoogleOAuthProvider>
    ),
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
