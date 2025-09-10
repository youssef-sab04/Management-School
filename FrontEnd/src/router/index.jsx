import { createBrowserRouter } from "react-router-dom";
import Home from "../page/Home.jsx";
import Login from "../page/Login.jsx";
import Register from "../page/Register.jsx";
import Users from "../page/Users.jsx";
import NotFound from "../page/NotFound.jsx";
import Layout from "../Layouts/Layout.jsx";



export const router = createBrowserRouter([
{
  path: '/',
  element: <Layout />,
  children: [
    {
      path: '/',
      element: <Home />
    },
    {
      path: '/login',
      element: <Login />
    },
    {
      path: '/register',
      element: <Register />
    },
    {
      path: '/users',
      element: <Users />
    },
    {
      path: '*',
      element: <NotFound />
    }
  ]
}
]);