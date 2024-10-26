import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Aside from "../components/Aside";

function DataDisplay() {
  const { id, endpoint } = useParams();
  const [data, setData] = useState(null);
  const [cast, setCast] = useState([]); // State for cast data
  const apiKey = '9243098c7038ad501a3bbff3589770d7';

  useEffect(() => {
    // Fetch main data
    fetch(`https://api.themoviedb.org/3/${endpoint}/${id}?api_key=${apiKey}`)
      .then((response) => response.json())
      .then((data) => setData(data));

    // Fetch cast data
    fetch(`https://api.themoviedb.org/3/${endpoint}/${id}/credits?api_key=${apiKey}`)
      .then((response) => response.json())
      .then((creditsData) => setCast(creditsData.cast.slice(0, 10))); // Get top 10 cast members
  }, [id, endpoint]);

  if (!data) return <p>Loading...</p>;

  return (
    <>
      <Aside />
      <main>
        <div className="data-page">
            <div className="data-background" style={{
            backgroundImage: data.backdrop_path
              ? `url(https://image.tmdb.org/t/p/original${data.backdrop_path})`
              : "none",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}></div>
          <h1>{data.title || data.name}</h1>
            <div className="data-info">
                <div className="data-img">
                    <img
                        src={
                        data.poster_path
                          ? `https://image.tmdb.org/t/p/w500${data.poster_path}`
                          : "fallback-image-url.jpg"
                      }
                        alt={`${data.title || data.name} poster`}
                    />
                </div>
                <div className="data-overview">
                    <h2 className="subtitle">Overview</h2>
                    <p>{data.overview}</p>
                    <h2 className="subtitle">Release date</h2>
                    <p>{data.release_date}</p>
                    <h2 className="subtitle">Rating</h2>
                    <p>{data.vote_average} / 10</p>
                </div>
            </div>
            <h2 className="subtitle">Cast</h2>
            <div className="cast-list">
                  {cast.map((actor) => (
                    <div key={actor.id} className="actor">
                      <img
                        src={
                          actor.profile_path
                            ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                            : "fallback-image-url.jpg"
                        }
                        alt={actor.name}
                      />
                      <h3>{actor.name}</h3>
                      <h4 className="character-name">{actor.character}</h4>
                    </div>
                  ))}
                </div>
        </div>
      </main>
    </>
  );
}

export default DataDisplay;
