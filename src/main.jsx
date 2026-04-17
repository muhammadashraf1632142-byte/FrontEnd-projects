import { createRoot } from "react-dom/client";
import "./index.css";
import { HeroUIProvider } from "@heroui/react";
import { RouterProvider } from "react-router-dom";
import { AppRouting } from "./routing/AppRouting";
import { Toaster } from "react-hot-toast";
import AuthContextProvider from "./context/AuthContextProvider/AuthContextProvider";
createRoot(document.getElementById("root")).render(
  <>
  <AuthContextProvider>
    <Toaster />
    <HeroUIProvider>
      <RouterProvider router={AppRouting} />
    </HeroUIProvider>
  </AuthContextProvider>
    ,
  </>,
);
