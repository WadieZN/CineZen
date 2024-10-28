import React from "react";
import { useNavigate } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import noImg from "./../assets/img/no-img.jpg";

function SearchCards({ results, isPending, error }) {
  const navigate = useNavigate();

  function handleClick(item) {
    const endpointType = item.media_type === "tv" ? "tv" : "movie";
    navigate(`/${endpointType}/${item.id}`);
  }

  return (
    <div className="dataDisplay">
      <div className="data-container">
        {isPending &&
          Array(12)
            .fill(0)
            .map((_, index) => (
              <div key={index} className="skeleton-wrapper">
                <Skeleton
                  height={300}
                  width={200}
                  baseColor="#222"
                  highlightColor="#555"
                />
                <Skeleton
                  height={20}
                  width={200}
                  baseColor="#222"
                  highlightColor="#555"
                  style={{ marginTop: "10px" }}
                />
              </div>
            ))}

        {error && <h2>Error: {error}</h2>}

        {results &&
          results.slice(0, 12).map((item) => (
            <div
              className="data-wrapper"
              key={item.id}
              onClick={() => handleClick(item)}
            >
              <div className="data">
                <img
                  src={
                    item.poster_path
                      ? `https://image.tmdb.org/t/p/w220_and_h330_face${item.poster_path}`
                      : noImg
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

export default SearchCards;
