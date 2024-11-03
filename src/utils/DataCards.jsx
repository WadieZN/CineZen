import React from "react";
import { useNavigate } from "react-router-dom";
import useData from "../hooks/useFetch";
import CardGrid from './../utils/CardGrid';

function DataCards({ title, endpoint, favorites, watchLater, toggleFavorite, toggleWatchLater }) {
  const { data, isPending, error } = useData(endpoint);
  const navigate = useNavigate();

  function handleCardClick(item) {
    navigate(`/${endpoint.includes("tv") ? "tv" : "movie"}/${item.id}`);
  }

  return (
    <div>
      <h2 className="title">{title}</h2>
      <CardGrid
        data={data}
        isPending={isPending}
        error={error}
        onCardClick={handleCardClick}
        toggleFavorite={toggleFavorite}
        toggleWatchLater={toggleWatchLater}
        favorites={favorites}
        watchLater={watchLater}
      />
    </div>
  );
}

export default DataCards;
