import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import ErrorPage from "./components/ErrorPage.jsx";
import DataDisplay from "./utils/DataDisplay.jsx";
import SearchResults from "./utils/SearchResults.jsx";
import GenrePage from "./utils/GenrePage";
import "./assets/styles/style.scss";
import "react-loading-skeleton/dist/skeleton.css";
import ActorsPage from "./components/ActorsPage.jsx";

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
  {
    path: "/movie/genre/:genre",
    element: <GenrePage />,
  },
  {
    path: "/tv/genre/:genre",
    element: <GenrePage />,
  },
  {
    path: "/actors",
    element: <ActorsPage />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
