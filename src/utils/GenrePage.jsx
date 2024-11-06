import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Aside from "../components/Aside";
import NavBar from "../components/NavBar";
import CardGrid from "../utils/CardGrid";
import UserCollection from "../components/UserCollection";
import { UserCollectionContext } from "./UserCollectionContext";

function GenrePage() {
  const { genre } = useParams();
  const [content, setContent] = useState([]);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const [showData, setShowData] = useState(false);
  const { favorites, watchLater, toggleFavorite, toggleWatchLater } =
    useContext(UserCollectionContext);

  const isMovieGenre = window.location.pathname.includes("/movie");
  const contentType = isMovieGenre ? "Movies" : "TV Series";
  const navigate = useNavigate();

  useEffect(() => {
    fetchGenreContent(genre, isMovieGenre);
    document.title = `CineZen | ${genre} ${contentType}`;
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

  function handleClick(item) {
    const endpointType = window.location.pathname.includes("/tv")
      ? "tv"
      : "movie";
    navigate(`/${endpointType}/${item.id}`);
  }

  function handleSearch(searchTerm) {
    if (searchTerm.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchTerm)}`);
    }
  }

  return (
    <>
      <NavBar />
      <Aside onSearch={handleSearch} />
      <UserCollection
        favorites={Object.values(favorites)}
        watchLater={Object.values(watchLater)}
        toggleFavorite={toggleFavorite}
        toggleWatchLater={toggleWatchLater}
      />
      <main>
        <h2 className="title">
          {genre} {contentType}
        </h2>
        <CardGrid
          data={content}
          isPending={isPending}
          error={error}
          onCardClick={handleClick}
          toggleFavorite={toggleFavorite}
          toggleWatchLater={toggleWatchLater}
          favorites={favorites}
          watchLater={watchLater}
        />
      </main>
    </>
  );
}

export default GenrePage;
