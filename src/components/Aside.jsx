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
      <nav>
        <div className="dropdown">
          <button className="dropbtn">Movies</button>
          <div className="dropdown-content">
            <Link to="/genre/Action">Action</Link>
            <Link to="/genre/Comedy">Comedy</Link>
            <Link to="/genre/Drama">Drama</Link>
            <Link to="/genre/Horror">Horror</Link>
            <Link to="/genre/Science Fiction">Sci-Fi</Link>
          </div>
        </div>
        <div className="dropdown">
          <button className="dropbtn">TV Series</button>
          <div className="dropdown-content">
            <Link to="/genre/Action">Action</Link>
            <Link to="/genre/Comedy">Comedy</Link>
            <Link to="/genre/Drama">Drama</Link>
            <Link to="/genre/Horror">Horror</Link>
            <Link to="/genre/Science Fiction">Sci-Fi</Link>
          </div>
        </div>
        <div className="dropdown">
          <button className="dropbtn">People</button>
          <div className="dropdown-content">
            <Link to="/genre/Popular Actors">Popular Actors</Link>
          </div>
        </div>
      </nav>
    </aside>
  );
}

export default Aside;
