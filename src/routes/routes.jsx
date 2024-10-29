import App from "../App.jsx";
import ErrorPage from "../components/ErrorPage.jsx";
import DataDisplay from "../utils/DataDisplay.jsx";
import SearchResults from "../utils/SearchResults.jsx";
import GenrePage from "../utils/GenrePage";
import ActorsPage from "../components/ActorsPage.jsx";

const routes = [
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
];

export default routes;