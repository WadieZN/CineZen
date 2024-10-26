import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Aside from "../components/Aside";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function DataDisplay() {
  const { id, endpoint } = useParams();
  const [data, setData] = useState(null);
  const [cast, setCast] = useState([]);
  const [trailer, setTrailer] = useState(null);
  const [loadingData, setLoadingData] = useState(true);
  const [loadingCast, setLoadingCast] = useState(true);
  const apiKey = "9243098c7038ad501a3bbff3589770d7";

  useEffect(() => {
    setLoadingData(true);
    setLoadingCast(true);

    fetch(`https://api.themoviedb.org/3/${endpoint}/${id}?api_key=${apiKey}`)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setLoadingData(false);
      });

    fetch(`https://api.themoviedb.org/3/${endpoint}/${id}/credits?api_key=${apiKey}`)
      .then((response) => response.json())
      .then((creditsData) => {
        setCast(creditsData.cast.slice(0, 8));
        setLoadingCast(false);
      });

    fetch(`https://api.themoviedb.org/3/${endpoint}/${id}/videos?api_key=${apiKey}`)
      .then((response) => response.json())
      .then((videoData) => {
        const trailer = videoData.results.find((video) => video.type === "Trailer" && video.site === "YouTube");
        if (trailer) setTrailer(trailer.key);
      });
  }, [id, endpoint]);

  return (
    <>
      <Aside />
      <main>
        <div className="data-page">
          <div
            className="data-background"
            style={{
              backgroundImage: data && data.backdrop_path
                ? `url(https://image.tmdb.org/t/p/original${data.backdrop_path})`
                : "none",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
          <h1>{loadingData ? <Skeleton width={300} /> : data.title || data.name}</h1>
          <div className="data-info">
            <div className="data-img">
              {loadingData ? (
                <Skeleton height={600} width={400} baseColor="#222" highlightColor="#555" />
              ) : (
                <img
                  src={
                    data.poster_path
                      ? `https://image.tmdb.org/t/p/w400${data.poster_path}`
                      : "fallback-image-url.jpg"
                  }
                  alt={`${data.title || data.name} poster`}
                />
              )}
            </div>
            <div className="data-overview">
              <h2 className="subtitle">Overview</h2>
              <p>{loadingData ? <Skeleton count={3} /> : data.overview}</p>
              <h2 className="subtitle">Release Date</h2>
              <p>{loadingData ? <Skeleton width={150} baseColor="#222" highlightColor="#555" /> 
                  : data.release_date || data.first_air_date}</p>
              <h2 className="subtitle">Rating</h2>
              <p className="rating">{loadingData ? <Skeleton width={100} baseColor="#222" highlightColor="#555" /> 
                  : `${data.vote_average.toFixed(1)}`} <span style={{fontSize: ".8rem", paddingLeft: "4px"}}> /10</span></p>
            </div>
          </div>
          <h2 className="subtitle">Cast</h2>
          <div className="cast-list">
            {loadingCast
              ? Array(8)
                  .fill()
                  .map((_, i) => (
                    <div key={i} className="actor">
                      <Skeleton height={225} width={150} baseColor="#222" highlightColor="#555" />
                      <Skeleton width={100} baseColor="#222" highlightColor="#555" />
                      <Skeleton width={120} baseColor="#222" highlightColor="#555" />
                    </div>
                  ))
              : cast.map((actor) => (
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
          <h2 className="subtitle">Trailer</h2>
          {trailer ? 
                <div className="trailer">
                  <iframe
                    src={`https://www.youtube.com/embed/${trailer}`}
                    title="YouTube video player"
                    allow="clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div> : <p>No trailer available for this show.</p>
              }
        </div>
        <footer>
          <p>Developed by WadyZen &copy; {new Date().getFullYear()}</p>
        </footer>
      </main>
    </>
  );
}

export default DataDisplay;
