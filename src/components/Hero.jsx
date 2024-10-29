import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

function Hero() {
  return (
    <div className="hero" aria-hidden>
      <h1>
        Explore <span>All</span> the Best Shows <span>in One</span> Spot!
      </h1>
      <Carousel
        showThumbs={false}
        autoPlay={true}
        infiniteLoop={true}
        interval={7000}
        transitionTime={500}
        stopOnHover={false}
        showStatus={false}
      >
        <div className="slide s-1">
          <p>
            Explore amazing worlds in movies, anime and shows, all in one place
          </p>
        </div>
        <div className="slide s-2">
          <p>
            Learn about the lives and stories of your favorite actors and
            creators
          </p>
        </div>
        <div className="slide s-3">
          <p>Find your next favorite movie or show to watch non-stop</p>
        </div>
      </Carousel>
    </div>
  );
}

export default Hero;
