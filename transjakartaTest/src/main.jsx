// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider, } from "react-router-dom";
import HomePages from './pages/HomePages';
import UserLayouts from './layouts/UserLayouts';
import VehiclePages from './pages/VehiclePages';

const router = createBrowserRouter([
  {
    element: <UserLayouts />,
    children: [
      {
        path: "/",
        element: <HomePages />,
      },
      {
        path: "/vehicle/:id",
        element: <VehiclePages />,
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  // <StrictMode>
  <RouterProvider router={router} />
  // </StrictMode>,
)
