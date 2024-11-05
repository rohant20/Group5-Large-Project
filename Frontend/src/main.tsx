import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import LoginPg from './routes/LoginPg.tsx'
import SignUp from './routes/SignUp.tsx'
import EmailPg from './routes/EmailPg.tsx'

import { RouterProvider, createBrowserRouter } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPg />
  },
  {
    path: "signup",
    element: <SignUp />
  },
  {
  
    path: "email",
    element: <EmailPg/>
  },
  {
    path: "login",
    element: <LoginPg/>
  }
  
]);


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
