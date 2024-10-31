import React from "react";
import { useNavigate } from "react-router-dom";
import DataCards from "./../utils/DataCards";
import Aside from "./Aside";
import NavBar from "./NavBar";

function ActorsPage() {
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
        <DataCards title="Popular Actors" endpoint="person/popular" />
      </main>
    </>
  );
}

export default ActorsPage;
