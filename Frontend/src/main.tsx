import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import LoginPg from './routes/LoginPg.tsx'
import SignUp from './routes/SignUp.tsx'
import EmailPg from './routes/EmailPg.tsx'
import Home from './routes/Home.tsx'
import ResetPass from './routes/ResetPass.tsx'

import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import PathProvider from './utils/PathProvider.tsx'
import AuthProvider  from './utils/AuthProvider.tsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/signup",
    element: <SignUp />
  },
  {
  
    path: "email",
    element: <EmailPg/>
  },
  {
    path: "login",
    element: <LoginPg/>
  },
  {
    path: "reset",
    element: <ResetPass/>
  }
  
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <PathProvider>
        <RouterProvider router={router} />
      </PathProvider>
    </AuthProvider>
  </StrictMode>
)
