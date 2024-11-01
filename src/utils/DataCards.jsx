import { useNavigate } from "react-router-dom";
import useData from "../hooks/useFetch";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function DataCards({ title, endpoint }) {
  const { data, isPending, error } = useData(endpoint);
  const navigate = useNavigate();

  function handleClick(item, endpointType) {
    navigate(`/${endpointType}/${item.id}`);
  }

  return (
    <div className="dataDisplay">
      <h2 className="title">{title}</h2>
      {isPending && (
        <div className="skeleton-container">
          {Array(12)
            .fill(0)
            .map((_, index) => (
              <div key={index} className="skeleton-wrapper">
                <Skeleton
                  height={300}
                  width="100%"
                  baseColor="#222"
                  highlightColor="#555"
                />
                <Skeleton
                  height={20}
                  width="100%"
                  baseColor="#222"
                  highlightColor="#555"
                  style={{ marginTop: "10px" }}
                />
              </div>
            ))}
        </div>
      )}

      {error && <h2>Error: {error}</h2>}

      <div className="data-container">
        {data &&
          data.slice(0, 12).map((item) => (
            <div
              className="data-wrapper"
              key={item.id}
              onClick={() =>
                handleClick(item, endpoint.includes("tv") ? "tv" : "movie")
              }
            >
              <div className="data">
                <img
                  src={
                    item.poster_path
                      ? `https://image.tmdb.org/t/p/w400${item.poster_path}`
                      : "fallback-image-url.jpg"
                  }
                  alt={`${item.title || item.name} poster`}
                />
                <h3>{item.title || item.name}</h3>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default DataCards;
