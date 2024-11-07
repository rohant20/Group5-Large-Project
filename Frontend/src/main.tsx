import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

import Home from './routes/Home.tsx';
import LoginPg from './routes/LoginPg.tsx';
import SignUp from './routes/SignUp.tsx';

import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import PathProvider from './utils/PathProvider.tsx';
import AuthProvider from './utils/AuthProvider.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/login",
    element: <LoginPg />
  },
  {
    path: "/signup",
    element: <SignUp />
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <PathProvider>
        <RouterProvider router={router} />
      </PathProvider>
    </AuthProvider>
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
      integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN"
      crossOrigin="anonymous"
    />
  </StrictMode>
)
