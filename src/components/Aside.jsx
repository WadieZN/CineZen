import React, { useState } from "react";
import { Link } from "react-router-dom";

function Aside({ className, onSearch, setOpen }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
    setOpen(false);
  };

  const handleLinkClick = () => {
    setOpen(false);
  };

  return (
    <aside className={className}>
      <div className="aside-top">
        <Link to="/" className="logo" onClick={handleLinkClick}>
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
      <div className="links">
        <div className="dropdown">
          <button className="dropbtn">Movies</button>
          <div className="dropdown-content">
            <Link to="/movie/genre/Action" onClick={handleLinkClick}>
              Action
            </Link>
            <Link to="/movie/genre/Adventure" onClick={handleLinkClick}>
              Adventure
            </Link>
            <Link to="/movie/genre/Animation" onClick={handleLinkClick}>
              Animation
            </Link>
            <Link to="/movie/genre/Comedy" onClick={handleLinkClick}>
              Comedy
            </Link>
            <Link to="/movie/genre/Drama" onClick={handleLinkClick}>
              Drama
            </Link>
            <Link to="/movie/genre/Horror" onClick={handleLinkClick}>
              Horror
            </Link>
            <Link to="/movie/genre/Science Fiction" onClick={handleLinkClick}>
              Sci-Fi
            </Link>
            <Link to="/movie/genre/Crime" onClick={handleLinkClick}>
              Crime
            </Link>
          </div>
        </div>
        <div className="dropdown">
          <button className="dropbtn">TV Series</button>
          <div className="dropdown-content">
            <Link to="/tv/genre/Action & Adventure" onClick={handleLinkClick}>
              Action & Adventure
            </Link>
            <Link to="/tv/genre/Animation" onClick={handleLinkClick}>
              Animation
            </Link>
            <Link to="/tv/genre/Mystery" onClick={handleLinkClick}>
              Mystery
            </Link>
            <Link to="/tv/genre/Comedy" onClick={handleLinkClick}>
              Comedy
            </Link>
            <Link to="/tv/genre/Drama" onClick={handleLinkClick}>
              Drama
            </Link>
            <Link to="/tv/genre/Kids" onClick={handleLinkClick}>
              Kids
            </Link>
            <Link to="/tv/genre/Family" onClick={handleLinkClick}>
              Family
            </Link>
            <Link to="/tv/genre/Sci-Fi & Fantasy" onClick={handleLinkClick}>
              Sci-Fi & Fantasy
            </Link>
          </div>
        </div>
        <div className="dropdown">
          <button className="dropbtn">People</button>
          <div className="dropdown-content">
            <Link to="/ErrorPage" onClick={handleLinkClick}>
              Popular Actors
            </Link>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default Aside;
