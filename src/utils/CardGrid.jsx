import React, { useState, useEffect, useRef } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import moreDots from "../assets/img/more.svg";
import heartAdd from "../assets/img/heart-add.svg";
import heartAdded from "../assets/img/heart-added.svg";
import bookmarkAdd from "../assets/img/bookmark-add.svg";
import bookmarkAdded from "../assets/img/bookmark-added.svg";
import noImg from "../assets/img/no-img.jpg";
import checkMark from "./../assets/img/check.svg";

function CardGrid({
  data,
  isPending,
  error,
  onCardClick,
  toggleFavorite,
  toggleWatchLater,
  favorites,
  watchLater,
  count,
}) {
  const [showMore, setShowMore] = useState({});
  const [message, setMessage] = useState(null);
  const optionsRef = useRef(null); 

  function handleShowMore(e, itemId) {
    e.stopPropagation();
    setShowMore((prevShowMore) => ({
      ...prevShowMore,
      [itemId]: prevShowMore[itemId] ? null : itemId,
    }));
  }
  
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        optionsRef.current &&
        !optionsRef.current.contains(event.target) &&
        !event.target.classList.contains("show-more-btn")
      ) {
        setShowMore({});
      }
    }
  
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  
  function showTemporaryMessage(msg) {
    const toast = document.createElement("div");
    toast.classList.add("message-toast");
  
    const img = document.createElement("img");
    img.src = checkMark;
    img.alt = "";
    toast.appendChild(img);
  
    const messageText = document.createTextNode(msg);
    toast.appendChild(messageText);
  
    document.body.appendChild(toast);
  
    setTimeout(() => {
      toast.classList.add("show");
    }, 0);
  
    setTimeout(() => {
      toast.classList.remove("show");
  
      setTimeout(() => {
        toast.remove();
      }, 500); 
    }, 3500);
  }
  
  
  return (
    <div className="dataDisplay">
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
          data.slice(0, count).map((item) => (
            <div
              className="data-wrapper"
              key={item.id}
              onClick={() => onCardClick(item)}
            >
              <div className="data">
                <img
                  src={
                    item.poster_path
                      ? `https://image.tmdb.org/t/p/w400${item.poster_path}`
                      : noImg
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
                <div
                  ref={optionsRef}
                  className={`more-options ${showMore[item.id] ? "show" : ""}`}
                >
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(item);
                      showTemporaryMessage(
                        favorites[item.id]
                          ? "Removed from favorites"
                          : "Added to favorites"
                      );
                    }}
                  >
                    <img
                      src={favorites[item.id] ? heartAdded : heartAdd}
                      alt="Favorite"
                    />
                    Favorite
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWatchLater(item);
                      showTemporaryMessage(
                        watchLater[item.id]
                          ? "Removed from watch later"
                          : "Added to watch later"
                      );
                    }}
                  >
                    <img
                      src={watchLater[item.id] ? bookmarkAdded : bookmarkAdd}
                      alt="Watch later"
                    />
                    Watch Later
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default CardGrid;
