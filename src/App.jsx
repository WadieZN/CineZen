import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Aside from "./components/Aside";
import Hero from "./components/Hero";
import DataCards from "./utils/DataCards";
import NavBar from "./components/NavBar";
import UserCollection from "./components/UserCollection";

function App() {
  const [favorites, setFavorites] = useState({});
  const [watchLater, setWatchLater] = useState({});
  const navigate = useNavigate();

  const handleSearch = (searchTerm) => {
    if (searchTerm.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchTerm)}`);
    }
  };

  const toggleFavorite = (item) => {
    setFavorites((prev) => {
      const updated = { ...prev };
      if (updated[item.id]) {
        delete updated[item.id];
      } else {
        updated[item.id] = item; 
      }
      return updated;
    });
  };

  const toggleWatchLater = (item) => {
    setWatchLater((prev) => {
      const updated = { ...prev };
      if (updated[item.id]) {
        delete updated[item.id];
      } else {
        updated[item.id] = item; 
      }
      return updated;
    });
  };

  const cleanList = (list) => Object.values(list).filter((item) => item);

  document.title = "CineZen | Home";

  return (
    <>
      <NavBar />
      <Aside onSearch={handleSearch} />
      <main>
        <Hero />
        <DataCards
          title="Upcoming"
          endpoint="movie/upcoming"
          favorites={favorites}
          watchLater={watchLater}
          toggleFavorite={toggleFavorite}
          toggleWatchLater={toggleWatchLater}
        />
        <DataCards
          title="Popular Movies"
          endpoint="movie/popular"
          favorites={favorites}
          watchLater={watchLater}
          toggleFavorite={toggleFavorite}
          toggleWatchLater={toggleWatchLater}
        />
        <DataCards
          title="Popular TV Shows"
          endpoint="tv/popular"
          favorites={favorites}
          watchLater={watchLater}
          toggleFavorite={toggleFavorite}
          toggleWatchLater={toggleWatchLater}
        />
        <DataCards
          title="Top Rated Movies"
          endpoint="movie/top_rated"
          favorites={favorites}
          watchLater={watchLater}
          toggleFavorite={toggleFavorite}
          toggleWatchLater={toggleWatchLater}
        />
        <DataCards
          title="Top Rated Shows"
          endpoint="tv/top_rated"
          favorites={favorites}
          watchLater={watchLater}
          toggleFavorite={toggleFavorite}
          toggleWatchLater={toggleWatchLater}
        />

        <UserCollection
          favorites={cleanList(favorites)}
          watchLater={cleanList(watchLater)}
        />

        <footer>
          <p>Developed by WadyZen &copy; {new Date().getFullYear()}</p>
        </footer>
      </main>
    </>
  );
}

export default App;
