import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import Aside from "../components/Aside";

function GenrePage() {
  const { genre } = useParams();
  const [content, setContent] = useState([]);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const [showData, setShowData] = useState(false);

  useEffect(() => {
    const isMovieGenre = window.location.pathname.includes("/movie");
    fetchGenreContent(genre, isMovieGenre);
  }, [genre]);

  const fetchGenreContent = async (genreName, isMovieGenre) => {
    setIsPending(true);
    setError(null);
    setShowData(false);
    try {
      const apiKey = "9243098c7038ad501a3bbff3589770d7";
      const genreType = isMovieGenre ? "movie" : "tv";

      const genreResponse = await fetch(
        `https://api.themoviedb.org/3/genre/${genreType}/list?api_key=${apiKey}&language=en-US`
      );
      const { genres } = await genreResponse.json();

      const genreId = genres.find(
        (g) => g.name.toLowerCase() === genreName.toLowerCase()
      )?.id;

      if (!genreId) {
        throw new Error("Genre not found");
      }

      // Fetch content based on genre ID
      const response = await fetch(
        `https://api.themoviedb.org/3/discover/${genreType}?api_key=${apiKey}&with_genres=${genreId}`
      );
      const data = await response.json();
      setContent(data.results || []);

      setTimeout(() => {
        setShowData(true);
      }, 1200);
    } catch (error) {
      setError("Failed to fetch content for this genre.");
    } finally {
      setIsPending(false);
    }
  };

  const navigate = useNavigate();

  function handleClick(item) {
    const endpointType = window.location.pathname.includes("/tv") ? "tv" : "movie";
    navigate(`/${endpointType}/${item.id}`);
  }

  const handleSearch = (searchTerm) => {
    if (searchTerm.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <>
      <Aside onSearch={handleSearch} />
      <main>
        <h2 className="title">{genre} {window.location.pathname.includes("/tv") ? "TV Series" : "Movies"}</h2>
        <div className="data-container">
          {isPending || !showData ? (
            Array(12)
              .fill(0)
              .map((_, index) => (
                <div key={index} className="skeleton-wrapper">
                  <Skeleton
                    height={300}
                    width={200}
                    baseColor="#222"
                    highlightColor="#555"
                  />
                  <Skeleton
                    height={20}
                    width={200}
                    baseColor="#222"
                    highlightColor="#555"
                    style={{ marginTop: "10px" }}
                  />
                </div>
              ))
          ) : error ? (
            <p>{error}</p>
          ) : (
            <div className="data-container">
              {content.map((item) => (
                <div
                  className="data-wrapper"
                  key={item.id}
                  onClick={() => handleClick(item)}
                >
                  <div className="data">
                    <img
                      src={`https://image.tmdb.org/t/p/w200${item.poster_path}`}
                      alt={item.title || item.name}  
                    />
                    <h3>{item.title || item.name}</h3>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
}

export default GenrePage;
