import React from 'react'
import ReactDOM from 'react-dom/client'
import Home from './Home'
import App from './App'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import APOD from './APOD';
import APODAny from './APODAny';
import NIVL from './NIVL';
import PBR from './PBR';
import MarsWeather from './MarsWeather';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/apod",
        element: <APOD />,
      },
      {
        path: "/apodany",
        element: <APODAny />,
      },
      {
        path: "/nivl",
        element: <NIVL />,
      },
      {
        path: "/pbr",
        element: <PBR />,
      },
      {
        path: "/weather",
        element: <MarsWeather />,
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
