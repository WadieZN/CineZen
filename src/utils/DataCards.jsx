import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useData from "../hooks/useFetch";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import moreDots from "../assets/img/more.svg";
import heartAdd from "../assets/img/heart-add.svg";
import heartAdded from "../assets/img/heart-added.svg";
import bookmarkAdd from "../assets/img/bookmark-add.svg";
import bookmarkAdded from "../assets/img/bookmark-added.svg";

function DataCards({
  title,
  endpoint,
  favorites,
  watchLater,
  toggleFavorite,
  toggleWatchLater,
}) {
  const { data, isPending, error } = useData(endpoint);
  const navigate = useNavigate();
  const [showMore, setShowMore] = useState(null);

  function handleClick(item, endpointType) {
    navigate(`/${endpointType}/${item.id}`);
  }

  function handleShowMore(e, itemId) {
    e.stopPropagation();
    if (showMore === itemId) {
      setShowMore(null);
    } else {
      setShowMore(itemId);
    }
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
            <div className="data-wrapper" key={item.id}>
              <div
                className="data"
                onClick={() =>
                  handleClick(item, endpoint.includes("tv") ? "tv" : "movie")
                }
              >
                <img
                  src={
                    item.poster_path
                      ? `https://image.tmdb.org/t/p/w400${item.poster_path}`
                      : "fallback-image-url.jpg"
                  }
                  alt={`${item.title || item.name} poster`}
                />
                <h3>{item.title || item.name}</h3>
                <button
                  className="show-more-btn"
                  onClick={(e) => handleShowMore(e, item.id)}
                >
                  <img src={moreDots} alt="Show more" />
                </button>
                {showMore === item.id && (
                  <div className={`more-options show`}>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(item);
                      }}
                    >
                      <img
                        src={favorites[item.id] ? heartAdded : heartAdd}
                        alt="Favorite"
                      />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleWatchLater(item);
                      }}
                    >
                      <img
                        src={watchLater[item.id] ? bookmarkAdded : bookmarkAdd}
                        alt="Watch later"
                      />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default DataCards;
