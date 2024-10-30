import React, { useState } from "react";
import { Link } from "react-router-dom";

function Aside({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm); 
  };

  return (
    <aside>
      <div className="aside-top">
        <Link to="/" className="logo">
          Cine<span>Zen</span>
        </Link>
        <form onSubmit={handleSearchSubmit}>
          <input
            type="search"
            name="search"
            id="search"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </form>
      </div>
      <nav>
        <div className="dropdown">
          <button className="dropbtn">Movies</button>
          <div className="dropdown-content">
            <Link to="/movie/genre/Action">Action</Link>
            <Link to="/movie/genre/Adventure">Adventure</Link>
            <Link to="/movie/genre/Animation">Animation</Link>
            <Link to="/movie/genre/Comedy">Comedy</Link>
            <Link to="/movie/genre/Drama">Drama</Link>
            <Link to="/movie/genre/Horror">Horror</Link>
            <Link to="/movie/genre/Science Fiction">Sci-Fi</Link>
            <Link to="/movie/genre/Crime">Crime</Link>
        </div>
        </div>
        <div className="dropdown">
          <button className="dropbtn">TV Series</button>
          <div className="dropdown-content">
            <Link to="/tv/genre/Action & Adventure">Action & Adventure</Link>
            <Link to="/tv/genre/Animation">Animation</Link>
            <Link to="/tv/genre/Mystery">Mystery</Link>
            <Link to="/tv/genre/Comedy">Comedy</Link>
            <Link to="/tv/genre/Drama">Drama</Link>
            <Link to="/tv/genre/Kids">Kids</Link>
            <Link to="/tv/genre/Family">Family</Link>
            <Link to="/tv/genre/Sci-Fi & Fantasy">Sci-Fi & Fantasy</Link>
          </div>
        </div>
        <div className="dropdown">
          <button className="dropbtn">People</button>
          <div className="dropdown-content">
            <Link to="/ErrorPage">Popular Actors</Link>
          </div>
        </div>
      </nav>
    </aside>
  );
}

export default Aside;
