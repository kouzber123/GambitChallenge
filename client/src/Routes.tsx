import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Aboutpage from "./features/AboutPage";
import Login from "./features/account/Login";
import Register from "./features/account/Register";
import NotFoundPage from "./features/notfound/NotFoundPage";
import RequireAuth from "./features/RequireAuth";
import LandingPage from "./features/LandingPage";
import DataPage from "./features/DataPage";
/**
 * app with children required auth and othher components
 */
export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        element: <RequireAuth />,
        children: [
          {
            path: "/data",
            element: <DataPage />,
          },
          {
            path: "about",
            element: <Aboutpage />,
          },
        ],
      },
      { path: "/", element: <LandingPage /> },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);
