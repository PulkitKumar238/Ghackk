const animeData = [
  {
    title: "Soul Cartel",
    description: "A thrilling journey through the afterlife.",
    image: "images/char1.png",
  },
  {
    title: "The Gamer",
    description: "Life becomes a game with extraordinary abilities.",
    image: "https://via.placeholder.com/300x400.png?text=The+Gamer",
  },
  {
    title: "Tower of God",
    description: "Climb the mysterious tower to find your destiny.",
    image: "https://via.placeholder.com/300x400.png?text=Tower+of+God",
  },
  {
    title: "Noblesse",
    description: "An ancient vampire awakens in modern Korea.",
    image: "https://via.placeholder.com/300x400.png?text=Noblesse",
  },
  {
    title: "The God of High School",
    description: "Martial arts and godly powers collide.",
    image:
      "https://via.placeholder.com/300x400.png?text=The+God+of+High+School",
  },
];

const characterData = [
  {
    name: "Bam",
    series: "Tower of God",
    image: "images/img1.webp",
  },
  {
    name: "Han Jee-Han",
    series: "The Gamer",
    image: "images/char1.png",
  },
  {
    name: "Cadis Etrama Di Raizel",
    series: "Noblesse",
    image: "images/img2.webp",
  },
  {
    name: "Jin Mori",
    series: "The God of High School",
    image: "images/img4.webp",
  },
];

const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const characterGrid = document.querySelector(".character-grid");

searchButton.addEventListener("click", performSearch);
searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    performSearch();
  }
});

function performSearch() {
  const searchTerm = searchInput.value.toLowerCase();
  const filteredAnime = animeData.filter(
    (anime) =>
      anime.title.toLowerCase().includes(searchTerm) ||
      anime.description.toLowerCase().includes(searchTerm)
  );

  displaySearchResults(filteredAnime);
}

function displaySearchResults(results) {
  const featuredSection = document.querySelector(".featured");
  featuredSection.innerHTML = "<h2>Search Results</h2>";

  if (results.length === 0) {
    featuredSection.innerHTML += "<p>No results found.</p>";
    return;
  }

  const resultGrid = document.createElement("div");
  resultGrid.classList.add("anime-grid");

  results.forEach((anime) => {
    const animeCard = createAnimeCard(anime);
    resultGrid.appendChild(animeCard);
  });

  featuredSection.appendChild(resultGrid);
  lazyLoadImages();
}

function createAnimeCard(anime) {
  const card = document.createElement("div");
  card.classList.add("anime-card");
  card.innerHTML = `
    <img data-src="${anime.image}" alt="${anime.title}" class="anime-image">
    <div class="anime-info">
      <h3 class="anime-title">${anime.title}</h3>
      <p class="anime-description">${anime.description}</p>
    </div>
  `;
  return card;
}
function populateCharacters() {
  characterData.forEach((character) => {
    const card = createCharacterCard(character);
    characterGrid.appendChild(card);
  });
  lazyLoadImages();
}

function createCharacterCard(character) {
  const card = document.createElement("div");
  card.classList.add("character-card");
  card.innerHTML = `
    <img data-src="${character.image}" alt="${character.name}" class="character-image">
    <div class="character-info">
      <h3 class="character-name">${character.name}</h3>
      <p class="character-series">${character.series}</p>
    </div>
  `;
  return card;
}
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});
const lazyLoadImages = () => {
  const images = document.querySelectorAll("img[data-src]");

  if ("IntersectionObserver" in window) {
    const imageObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.onload = () => {
              img.removeAttribute("data-src");
              img.classList.add("loaded");
            };
            imageObserver.unobserve(img);
          }
        });
      },
      {
        rootMargin: "50px 0px",
        threshold: 0.01,
      }
    );

    images.forEach((img) => imageObserver.observe(img));
  } else {
    images.forEach((img) => {
      img.src = img.dataset.src;
      img.onload = () => {
        img.removeAttribute("data-src");
        img.classList.add("loaded");
      };
    });
  }
};
populateCharacters();
lazyLoadImages();

document.addEventListener("keydown", (e) => {
  if (e.key === "Tab") {
    document.body.classList.add("user-is-tabbing");
  }
});

document.addEventListener("mousedown", () => {
  document.body.classList.remove("user-is-tabbing");
});
