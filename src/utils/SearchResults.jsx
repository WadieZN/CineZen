import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SearchCards from "./SearchCards";
import Aside from "../components/Aside";
import Skeleton from "react-loading-skeleton";
import NavBar from "../components/NavBar";
import UserCollection from "../components/UserCollection";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function SearchResults() {
  const query = useQuery().get("query");
  const navigate = useNavigate();
  const [results, setResults] = useState([]);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const [showData, setShowData] = useState(false);

  const [favorites, setFavorites] = useState(() => {
    return JSON.parse(localStorage.getItem("favorites")) || {};
  });
  const [watchLater, setWatchLater] = useState(() => {
    return JSON.parse(localStorage.getItem("watchLater")) || {};
  });

  useEffect(() => {
    if (query) {
      document.title = `CineZen | "${query}" results`;
      fetchSearchResults(query);
    }
  }, [query]);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem("watchLater", JSON.stringify(watchLater));
  }, [watchLater]);

  const fetchSearchResults = async (searchTerm) => {
    setIsPending(true);
    setError(null);
    setShowData(false);
    try {
      const apiKey = "9243098c7038ad501a3bbff3589770d7";
      const response = await fetch(
        `https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&query=${searchTerm}`
      );
      const data = await response.json();
      setResults(data.results || []);

      setTimeout(() => {
        setShowData(true);
      }, 1200);
    } catch (error) {
      setError("Failed to fetch search results.");
    } finally {
      setIsPending(false);
    }
  };

  const handleSearch = (searchTerm) => {
    if (searchTerm.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchTerm)}`);
    }
  };

  const toggleFavorite = (item) => {
    setFavorites((prev) => {
      const updated = { ...prev };
      if (updated[item.id]) {
        delete updated[item.id];
      } else {
        updated[item.id] = item; 
      }
      return updated;
    });
  };

  const toggleWatchLater = (item) => {
    setWatchLater((prev) => {
      const updated = { ...prev };
      if (updated[item.id]) {
        delete updated[item.id];
      } else {
        updated[item.id] = item; 
      }
      return updated;
    });
  };

  const cleanList = (list) => Object.values(list).filter((item) => item);

  return (
    <>
      <NavBar />
      <Aside onSearch={handleSearch} />
      <UserCollection
        favorites={cleanList(favorites)}
        watchLater={cleanList(watchLater)}
      />
      <main>
        <h2 className="title">Search Results</h2>
        <div>
          {isPending || !showData ? (
            <div className="skeleton-container">
              {Array(12)
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
                ))}
            </div>
          ) : results.length === 0 || error ? (
            <p className="error-text">No results found.</p>
          ) : (
            <SearchCards
              title="Current Search Results"
              results={results}
              isPending={isPending}
              error={error}
              favorites={favorites}
              watchLater={watchLater}
              toggleFavorite={toggleFavorite}
              toggleWatchLater={toggleWatchLater}
            />
          )}
        </div>
      </main>
    </>
  );
}

export default SearchResults;
