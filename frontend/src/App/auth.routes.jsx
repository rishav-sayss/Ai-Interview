import { createBrowserRouter } from "react-router-dom";
import Register from "../feature/auth/pages/Register";
import Login from "../feature/auth/pages/Login";
import Home from "../feature/auth/pages/Home";

export const routes = createBrowserRouter([
  {
    path: "/register",
    element: <Register/>,
  },
  {
    path: "/login",
    element: <Login/>,
  },
   {
    path: "/",
    element: <Home/>
  }
]);