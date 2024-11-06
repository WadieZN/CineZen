import { useState } from "react";
import arrow from "./../assets/img/arrow.svg";
import trashCan from "./../assets/img/trash.svg";
import noImg from "./../assets/img/no-img.jpg";
import { useNavigate } from "react-router-dom";

function UserCollection({
  favorites,
  watchLater,
  toggleFavorite,
  toggleWatchLater,
}) {
  const [activeList, setActiveList] = useState("favorites");
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    setOpen((prevState) => !prevState);
  };

  function handleCardClick(item) {
    if (item && item.media_type && item.id) {
      navigate(`/${item.media_type === "tv" ? "tv" : "movie"}/${item.id}`);
    } else {
      console.warn("Invalid item data:", item);
    }
  }

  return (
    <div className={`user-collection ${open ? "open" : ""}`}>
      <button
        className={`toggle-collection ${open ? "open" : ""}`}
        onClick={handleClick}
      >
        <img src={arrow} alt="Expand collection" />
      </button>
      <div className={`user-collection-nav ${open ? "open" : ""}`}>
        <button
          className={activeList === "favorites" ? "active" : ""}
          onClick={() => setActiveList("favorites")}
        >
          Favorites
        </button>
        <button
          className={activeList === "watchLater" ? "active" : ""}
          onClick={() => setActiveList("watchLater")}
        >
          Watch Later
        </button>
      </div>

      <div className="collection-list">
        {activeList === "favorites" && (
          <ul className="collection-grid">
            {favorites.length > 0 ? (
              favorites.map((item, index) => (
                <li
                  key={item.id || `${item.title}-${index}`}
                  className="collection-item"
                  onClick={handleCardClick}
                >
                  <img
                    src={
                      item.poster_path
                        ? `https://image.tmdb.org/t/p/w300${item.poster_path}`
                        : noImg
                    }
                    alt={item.title || item.name}
                    className="collection-item-img"
                  />
                  <div className="collection-item-info">
                    <span className="collection-item-title">
                      {item.title || item.name}
                    </span>
                    <button className="remove-data" onClick={() => toggleFavorite(item)}>
                      <img src={trashCan} alt="Remove from Favorites" />
                      </button>
                  </div>
                </li>
              ))
            ) : (
              <p>No items in favorites yet.</p>
            )}
          </ul>
        )}

        {activeList === "watchLater" && (
          <ul className="collection-grid">
            {watchLater.length > 0 ? (
              watchLater.map((item, index) => (
                <li
                  key={item.id || `${item.title}-${index}`}
                  className="collection-item"
                  onClick={handleCardClick}
                >
                  <img
                    src={`https://image.tmdb.org/t/p/w200${item.poster_path}`}
                    alt={item.title || item.name}
                    className="collection-item-img"
                  />
                  <div className="collection-item-info">
                    <span className="collection-item-title">
                      {item.title || item.name}
                    </span>
                    <button className="remove-data" onClick={() => toggleWatchLater(item)}>
                    <img src={trashCan} alt="Remove from Watch Later" />
                    </button>
                  </div>
                </li>
              ))
            ) : (
              <p>No items in watch later list yet.</p>
            )}
          </ul>
        )}
      </div>
    </div>
  );
}

export default UserCollection;
