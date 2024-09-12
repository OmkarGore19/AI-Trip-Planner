import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Header from "./components/custom/Header.jsx";
import CreateTrip from "./create-trip/index";
import { Toaster } from "@/components/ui/sonner";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/create-trip",
    element: <CreateTrip />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GoogleOAuthProvider clientId="<import.meta.env.VITE_GOOGLE_CLOUD_CLIENT_ID>">
      <Header />
      <Toaster />
      <RouterProvider router={router}></RouterProvider>
    </GoogleOAuthProvider>
  </StrictMode>
);
