import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Aside from "./components/Aside";
import Hero from "./components/Hero";
import DataCards from "./utils/DataCards";
import NavBar from "./components/NavBar";
import UserCollection from "./components/UserCollection";
import { UserCollectionContext } from "./utils/UserCollectionContext";

function App() {
  document.title = "CineZen | Home";

  const { favorites, watchLater, toggleFavorite, toggleWatchLater } = useContext(UserCollectionContext);
  const navigate = useNavigate();

  const handleSearch = (searchTerm) => {
    if (searchTerm.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchTerm)}`);
    }
  };

  const cleanList = (list) => Object.values(list).filter((item) => item);

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
