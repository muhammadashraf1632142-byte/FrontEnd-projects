import { createRoot } from "react-dom/client";
import "./index.css";
import { HeroUIProvider } from "@heroui/react";
import { RouterProvider } from "react-router-dom";
import { AppRouting } from "./routing/AppRouting";
import { Toaster } from "react-hot-toast";
import AuthContextProvider from "./context/AuthContextProvider/AuthContextProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <>
  <AuthContextProvider>
    <Toaster />
    <QueryClientProvider client={queryClient}>
      <HeroUIProvider>
        <RouterProvider router={AppRouting} />
      </HeroUIProvider>
    </QueryClientProvider>
  </AuthContextProvider>
    ,
  </>,
);
