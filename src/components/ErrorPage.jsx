import { Link, useNavigate } from "react-router-dom";
import Aside from "./Aside";
import NavBar from "./NavBar";

function ErrorPage() {
  document.title = "CineZen | Error 404";

  const navigate = useNavigate();

  const handleSearch = (searchTerm) => {
    if (searchTerm.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <>
      <NavBar />
      <Aside onSearch={handleSearch} />
      <main>
        <div className="error-page">
          <h2>Error 404</h2>
          <p>
            Looks like this page doesn't exist.{" "}
            <Link className="link" to={"/"}>
              Return to home page.
            </Link>
          </p>
        </div>
      </main>
    </>
  );
}

export default ErrorPage;
