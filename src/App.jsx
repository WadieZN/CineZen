import React from "react";
import Aside from "./components/Aside";
import Hero from "./components/Hero";
import DataCards from "./utils/DataCards";
import { useNavigate } from "react-router-dom";
import NavBar from "./components/NavBar";

function App() {
  const navigate = useNavigate();

  const handleSearch = (searchTerm) => {
    if (searchTerm.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchTerm)}`);
    }
  };

  document.title = "CineZen | Home";

  return (
    <>
      <NavBar />
      <Aside onSearch={handleSearch} />
      <main>
        <Hero />
        <DataCards title="Upcoming" endpoint="movie/upcoming" />
        <DataCards title="Popular Movies" endpoint="movie/popular" />
        <DataCards title="Popular TV Shows" endpoint="tv/popular" />
        <DataCards title="Top Rated Movies" endpoint="movie/top_rated" />
        <DataCards title="Top Rated Shows" endpoint="tv/top_rated" />
        <footer>
          <p>Developed by WadyZen &copy; {new Date().getFullYear()}</p>
        </footer>
      </main>
    </>
  );
}

export default App;
