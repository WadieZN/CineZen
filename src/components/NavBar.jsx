import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Aside from "./Aside";

function NavBar() {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen((prevState) => !prevState);
  };

  const navigate = useNavigate();

  const handleSearch = (searchTerm) => {
    if (searchTerm.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <>
      <nav>
        <div
          onClick={handleClick}
          className={`hamburger ${open ? "open" : ""}`}
        >
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <Link to="/" className="logo">
          Cine<span>Zen</span>
        </Link>
      </nav>
      <Aside onSearch={handleSearch} className={open ? "aside-open" : ""} />
    </>
  );
}

export default NavBar;
