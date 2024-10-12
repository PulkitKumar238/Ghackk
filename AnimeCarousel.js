const ManhwaCarousel = () => {
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [isPlaying, setIsPlaying] = React.useState(true);

  const manhwaData = [
    {
      title: "Soul Cartel",
      description: "A thrilling journey through the afterlife.",
      image: "images/c3.jpeg",
    },
    {
      title: "The Gamer",
      description: "Life becomes a game with extraordinary abilities.",
      image: "images/c1.jpeg",
    },
    {
      title: "Tower of God",
      description: "Climb the mysterious tower to find your destiny.",
      image: "images/c2.jpeg",
    },
    {
      title: "Noblesse",
      description: "An ancient vampire awakens in modern Korea.",
      image: "images/c4.jpeg",
    },
   
  ];

  React.useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % manhwaData.length);
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const handlePrev = () => {
    setCurrentSlide(
      (prevSlide) => (prevSlide - 1 + manhwaData.length) % manhwaData.length
    );
  };

  const handleNext = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % manhwaData.length);
  };

  const handlePlayPause = () => {
    setIsPlaying((prevState) => !prevState);
  };

  return (
    <div className="anime-carousel">
      <div
        className="carousel-container"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {manhwaData.map((slide, index) => (
          <div key={index} className="carousel-slide">
            <img
              src={slide.image}
              alt={slide.title}
              className="carousel-image"
            />
            <div className="carousel-content">
              <h3>{slide.title}</h3>
              <p>{slide.description}</p>
            </div>
          </div>
        ))}
      </div>
      <button
        className="carousel-control prev"
        onClick={handlePrev}
        aria-label="Previous slide"
      >
        &#10094;
      </button>
      <button
        className="carousel-control next"
        onClick={handleNext}
        aria-label="Next slide"
      >
        &#10095;
      </button>
     
      <div className="carousel-indicators">
        {manhwaData.map((_, index) => (
          <button
            key={index}
            className={`indicator ${index === currentSlide ? "active" : ""}`}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          ></button>
        ))}
      </div>
    </div>
  );
};

ReactDOM.render(
  <ManhwaCarousel />,
  document.getElementById("featured-carousel")
);
