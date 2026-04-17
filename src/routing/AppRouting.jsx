import { createBrowserRouter } from "react-router-dom";
import Posts from "./../Posts/Posts";
import Login from "./../pages/Login/Login";
import Register from "./../pages/Register/Register";
import LayOut from "./../components/Layout/LayOut";
import NotFound from "../pages/NotFound/NotFound";
import Home from "../components/Home/Home";
import ProtectedRouting from "./ProtectedRouting";
import ProtectedAuth from "./ProtectedAuth";
import ChangePfp from "../pages/ChangPfp/ChangePfp";
import ChangePassword from "../pages/ChangePassword/ChangePassword";
export const AppRouting = createBrowserRouter(

  [
    {
      path: "/",
      element: <LayOut />,
      children: [
        { index: true, path: "", element: <Home /> },
        { path: "posts", element:<ProtectedRouting> <Posts /> </ProtectedRouting> },
        { path: "login", element:<ProtectedAuth> <Login /> </ProtectedAuth> },
        { path: "register", element:<ProtectedAuth> <Register /> </ProtectedAuth> },
          { path: "ChangePfp", element:<ProtectedRouting> <ChangePfp /></ProtectedRouting>  },
          { path: "ChangePassword", element:<ProtectedRouting> <ChangePassword /></ProtectedRouting>  },
        { path: "*", element: <NotFound /> },
      ],
    },
  ],
  {},
);
