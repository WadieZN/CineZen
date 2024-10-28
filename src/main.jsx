import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import ErrorPage from "./components/ErrorPage.jsx";
import DataDisplay from "./utils/DataDisplay.jsx";
import SearchResults from "./utils/SearchResults.jsx";
import "./assets/styles/style.scss";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/:endpoint/:id",
    element: <DataDisplay />,
  },
  {
    path: "/search",
    element: <SearchResults />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
