import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Aside from "../components/Aside";
import Skeleton from "react-loading-skeleton";
import noImg from "../assets/img/no-img.jpg";
import NavBar from "../components/NavBar";

function DataDisplay() {
  const { id, endpoint } = useParams();
  const [data, setData] = useState(null);
  const [cast, setCast] = useState([]);
  const [directors, setDirectors] = useState([]);
  const [trailer, setTrailer] = useState(null);
  const [loadingData, setLoadingData] = useState(true);
  const [loadingCast, setLoadingCast] = useState(true);
  const [loadingTrailer, setLoadingTrailer] = useState(true);
  const [showData, setShowData] = useState(false);
  const apiKey = "9243098c7038ad501a3bbff3589770d7";

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoadingData(true);
    setLoadingCast(true);
    setLoadingTrailer(true);

    const timer = setTimeout(() => {
      setShowData(true);
    }, 1200);

    fetch(`https://api.themoviedb.org/3/${endpoint}/${id}?api_key=${apiKey}`)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setLoadingData(false);
        document.title = `CineZen | ${data.title || data.name}`;
      });

    fetch(
      `https://api.themoviedb.org/3/${endpoint}/${id}/credits?api_key=${apiKey}`
    )
      .then((response) => response.json())
      .then((creditsData) => {
        const directors = creditsData.crew.filter(
          (member) => member.job === "Director"
        );

        setDirectors(directors);
        setCast(creditsData.cast.slice(0, 8));
        setLoadingCast(false);
      });

    fetch(
      `https://api.themoviedb.org/3/${endpoint}/${id}/videos?api_key=${apiKey}`
    )
      .then((response) => response.json())
      .then((videoData) => {
        const trailer = videoData.results.find(
          (video) => video.type === "Trailer" && video.site === "YouTube"
        );
        if (trailer) setTrailer(trailer.key);
        setLoadingTrailer(false);
      });

    return () => clearTimeout(timer);
  }, [id, endpoint]);

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
        <div className="data-page">
          <div
            className="data-background"
            style={{
              backgroundImage:
                data && data.backdrop_path
                  ? `url(https://image.tmdb.org/t/p/original${data.backdrop_path})`
                  : "none",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>

          <div className="show-title">
            <h1>
              {loadingData || !showData ? (
                <Skeleton width={300} baseColor="#222" highlightColor="#333" />
              ) : (
                data.title || data.name
              )}
            </h1>
            <h4>
              {loadingData || !showData ? (
                <Skeleton width={150} baseColor="#222" highlightColor="#333" />
              ) : (
                <>
                  {data.release_date || data.first_air_date
                    ? (data.release_date || data.first_air_date).slice(0, 4)
                    : "N/A"}
                  {endpoint.includes("movie") && data.runtime && (
                    <>
                      {" - "}
                      {`${Math.floor(data.runtime / 60)}h ${
                        data.runtime % 60
                      }m`}
                    </>
                  )}
                </>
              )}
            </h4>
          </div>

          <div className="data-info">
            <div className="data-img">
              {loadingData || !showData ? (
                <Skeleton
                  width={400}
                  height={600}
                  baseColor="#222"
                  highlightColor="#333"
                />
              ) : (
                <div className="data-img-wrapper">
                  <img
                    src={
                      data.poster_path
                        ? `https://image.tmdb.org/t/p/w400${data.poster_path}`
                        : noImg
                    }
                    alt={`${data.title || data.name} poster`}
                  />
                </div>
              )}
            </div>

            <div className="data-overview">
              <h2 className="subtitle">Overview</h2>
                {loadingData || !showData ? (
                  <div>
                    <Skeleton
                      height={20}
                      width={700}
                      baseColor="#222"
                      highlightColor="#555"
                    />
                    <Skeleton
                      height={20}
                      width={450}
                      baseColor="#222"
                      highlightColor="#555"
                      style={{ marginTop: "10px" }}
                    />
                  </div>
                ) : (
                  <p>{data.overview}</p>
                )}

              <h2 className="subtitle">Release Date</h2>
              <p>
                {loadingData || !showData ? (
                  <Skeleton
                    width={150}
                    baseColor="#222"
                    highlightColor="#333"
                  />
                ) : (
                  data.release_date || data.first_air_date
                )}
              </p>

              <h2 className="subtitle">Genres</h2>
              <p className="genres">
                {loadingData || !showData ? (
                  <Skeleton
                    width={300}
                    height={40}
                    borderRadius={50}
                    baseColor="#222"
                    highlightColor="#333"
                  />
                ) : (
                  data.genres.map((genre) => (
                    <span key={genre.id} className="genre-tag">
                      {genre.name}
                    </span>
                  ))
                )}
              </p>

              {directors.length > 0 && (
                <>
                  <h2 className="subtitle">Directors</h2>
                  <p>
                    {loadingData || !showData ? (
                      <Skeleton
                        width={200}
                        baseColor="#222"
                        highlightColor="#333"
                      />
                    ) : (
                      directors.map((director) => (
                        <span key={director.id} className="director">
                          {director.name}
                        </span>
                      ))
                    )}
                  </p>
                </>
              )}

              <h2 className="subtitle">Rating</h2>
              {loadingData || !showData ? (
                <Skeleton
                  width={170}
                  height={60}
                  borderRadius={50}
                  baseColor="#222"
                  highlightColor="#333"
                />
              ) : (
                <div className="rating">
                  <p>
                    {data.vote_average.toFixed(1)}
                    <span>out of 10</span>
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="cast-list">
            {loadingCast || !showData
              ? Array(6)
                  .fill()
                  .map((_, i) => (
                    <div key={i} className="actor">
                      <Skeleton
                        height={225}
                        width={150}
                        baseColor="#222"
                        highlightColor="#333"
                      />
                      <Skeleton
                        width={100}
                        baseColor="#222"
                        highlightColor="#333"
                      />
                      <Skeleton
                        width={120}
                        baseColor="#222"
                        highlightColor="#333"
                      />
                    </div>
                  ))
              : cast.length > 0 && (
                  <div className="cast-container">
                    <h2 className="subtitle">Top Cast</h2>
                    <div className="cast-list">
                      {cast.map((actor) => (
                        <div key={actor.id} className="actor-wrapper">
                          <div className="actor">
                            <img
                              src={
                                actor.profile_path
                                  ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                                  : noImg
                              }
                              alt={actor.name}
                            />
                            <h3>{actor.name || "Unknown"}</h3>
                            <h4 className="character-name">
                              {actor.character || "Unknown"}
                            </h4>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
          </div>

          <h2 className="subtitle">Trailer</h2>

          <div className="trailer">
            {loadingTrailer || !showData ? (
              <Skeleton
                width="100%"
                height={800}
                baseColor="#222"
                highlightColor="#555"
              />
            ) : trailer ? (
              <div className="trailer-wrapper">
                <iframe
                  src={`https://www.youtube.com/embed/${trailer}?enablejsapi=1`}
                  title="YouTube video player"
                  allowFullScreen
                ></iframe>
              </div>
            ) : (
              <p>No trailer available for this show.</p>
            )}
          </div>
        </div>
        <footer>
          <p>Developed by WadyZen &copy; {new Date().getFullYear()}</p>
        </footer>
      </main>
    </>
  );
}

export default DataDisplay;
