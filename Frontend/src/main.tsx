import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import LoginPg from './routes/LoginPg.tsx'
import SignUp from './routes/SignUp.tsx'
import EmailPg from './routes/EmailPg.tsx'
import Home from './routes/Home.tsx'
import ResetPass from './routes/ResetPass.tsx'
import ListingApp from './routes/ListingApp.tsx'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import PathProvider from './utils/PathProvider.tsx'
import AuthProvider from './utils/AuthProvider.tsx'
import PrivateRoutes from './utils/PrivateRoutesProvider.tsx'

const router = createBrowserRouter([
  {
    element: <PrivateRoutes />,
    errorElement: <h1>Not Found MF 404</h1>,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/inventory",
        element: <ListingApp />
      }
    ]
  },
  {
    path: "/signup",
    element: <SignUp />
  },
  {

    path: "/email",
    element: <EmailPg />
  },
  {
    path: "/login",
    element: <LoginPg />
  },
  {
    path: "/reset",
    element: <ResetPass />
  },


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
