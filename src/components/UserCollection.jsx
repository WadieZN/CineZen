import { useState } from "react";
import arrow from "./../assets/img/arrow.svg";

function UserCollection({ favorites, watchLater, toggleFavorite, toggleWatchLater }) {
  const [activeList, setActiveList] = useState("favorites");
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen((prevState) => !prevState);
  };

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
                >
                  <img
                    src={`https://image.tmdb.org/t/p/w200${item.poster_path}`}
                    alt={item.title || item.name}
                    className="collection-item-img"
                  />
                  <span className="collection-item-title">
                    {item.title || item.name}
                  </span>
                  <button onClick={() => toggleFavorite(item)}>
                    Remove
                  </button>
                </li>
              ))
            ) : (
              <p>No favorites added yet.</p>
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
                >
                  <img
                    src={`https://image.tmdb.org/t/p/w200${item.poster_path}`}
                    alt={item.title || item.name}
                    className="collection-item-img"
                  />
                  <span className="collection-item-title">
                    {item.title || item.name}
                  </span>
                  <button onClick={() => toggleWatchLater(item)}>
                    Remove
                  </button>
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
