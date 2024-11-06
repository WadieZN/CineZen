import React from "react";
import { useNavigate } from "react-router-dom";
import CardGrid from "./../utils/CardGrid";

function SearchCards({ 
  results = [], 
  isPending, 
  error, 
  favorites, 
  watchLater, 
  toggleFavorite, 
  toggleWatchLater 
}) {
  const navigate = useNavigate();

  function handleCardClick(item) {
    if (item && item.media_type && item.id) {
      navigate(`/${item.media_type === "tv" ? "tv" : "movie"}/${item.id}`);
    } else {
      console.warn("Invalid item data:", item);
    }
  }
  

  return (
    <CardGrid
      data={results}
      isPending={isPending}
      error={error}
      onCardClick={handleCardClick}
      toggleFavorite={toggleFavorite}
      toggleWatchLater={toggleWatchLater}
      favorites={favorites}
      watchLater={watchLater}
      count={20}
    />
  );
}


export default SearchCards;
