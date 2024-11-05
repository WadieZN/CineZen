import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import routes from "./routes/routes";
import "./assets/styles/style.scss";
import "react-loading-skeleton/dist/skeleton.css";
import { UserCollectionProvider } from "./utils/UserCollectionContext"; 

const router = createBrowserRouter(routes);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserCollectionProvider>
      <RouterProvider router={router} />
    </UserCollectionProvider>
  </StrictMode>
);
