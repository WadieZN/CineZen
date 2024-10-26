import { Link } from "react-router-dom";

function Aside() {

    return (
        <aside>
            <Link to="/" className="logo">Movies<span>World</span></Link>
            <input type="search" name="search" id="search" placeholder="Search..." />
            <nav>
                <div className="dropdown">
                    <button className="dropbtn">Movies</button>
                    <div className="dropdown-content">
                        <a href="#">Action</a>
                        <a href="#">Comedy</a>
                        <a href="#">Drama</a>
                        <a href="#">Horror</a>
                        <a href="#">Sci-Fi</a>
                    </div>
                </div>
                <div className="dropdown">
                    <button className="dropbtn">TV Series</button>
                    <div className="dropdown-content">
                        <a href="#">Action</a>
                        <a href="#">Comedy</a>
                        <a href="#">Drama</a>
                        <a href="#">Horror</a>
                        <a href="#">Sci-Fi</a>
                    </div>
                </div>
                <div className="dropdown">
                    <button className="dropbtn">People</button>
                    <div className="dropdown-content">
                        <a href="#">Popular Actors</a>
                    </div>
                </div>
            </nav>
        </aside>
    );
}

export default Aside
