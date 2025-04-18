const charactersWrapper = document.getElementById("characters-wrapper");
const mostEpisodesWrapper = document.getElementById("most-episodes-wrapper");

const fetchCharacter = async () => {
  const response = await fetch("https://rickandmortyapi.com/api/character");
  const data = await response.json();
  return data;
};

const buildCharacter = (char) => {
  char.results
    .sort((a, b) => {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    })
    .slice(0, 10)
    .forEach((element) => {
      const card = document.createElement("div");
      card.classList.add("card");

      const title = document.createElement("h2");
      title.textContent = element.name;

      const specie = document.createElement("h3");
      specie.textContent = `specie: ${element.species}`;

      const origin = document.createElement("h3");
      origin.textContent = `origin: ${element.origin.name}`;

      const img = document.createElement("img");
      img.src = element.image;

      if (element.origin.name === "unknown") {
        origin.textContent = "origin: -";
      }

      card.addEventListener("click", async () => {
        console.log(element.name);

        localStorage.setItem("character data", JSON.stringify(element));

        const res = await fetch(
          `https://rickandmortyapi.com/api/character/${element.id}`
        );
        const characterData = await res.json();

        console.log("Fetched by ID:", characterData);

        localStorage.setItem(
          "character data by ID",
          JSON.stringify(characterData)
        );
      });

      card.append(title, img, specie, origin);

      charactersWrapper.append(card);
    });

  const findMostEpisodes = (characters) => {
    return characters.reduce((max, current) => {
      return current.episode.length > max.episode.length ? current : max;
    });
  };

  const characterWithMostEpisodes = findMostEpisodes(char.results);
  console.log("Character with most episodes:", characterWithMostEpisodes);

  const mostEpisodesCard = document.createElement("div");
  mostEpisodesCard.classList.add("card");
  mostEpisodesCard.classList.add("gold");

  const best = document.createElement("h1");
  best.textContent = "Character with most episodes";

  const title = document.createElement("h2");
  title.textContent = characterWithMostEpisodes.name;

  const specie = document.createElement("h3");
  specie.textContent = `specie: ${characterWithMostEpisodes.species}`;

  const origin = document.createElement("h3");
  origin.textContent = `origin: ${characterWithMostEpisodes.origin.name}`;

  if (characterWithMostEpisodes.origin.name === "unknown") {
    origin.textContent = "origin: -";
  }

  const img = document.createElement("img");
  img.src = characterWithMostEpisodes.image;

  const episodesIn = document.createElement("h2");
  episodesIn.textContent = `Featured in ${characterWithMostEpisodes.episode.length} episodes`;

  mostEpisodesCard.append(best, title, episodesIn, img, specie, origin);
  mostEpisodesWrapper.append(mostEpisodesCard);
};

const characterDisplay = async () => {
  const char = await fetchCharacter();
  console.log(char);
  buildCharacter(char);
};
characterDisplay();

const fetchAllLocations = async () => {
  const location = await fetch("https://rickandmortyapi.com/api/location");
  const locationData = await location.json();

  const allLocations = locationData.results;

  console.log("Lokacijos:", locationData.results);
  localStorage.setItem("all locations", JSON.stringify(locationData.results));

  const biggestPopulation = allLocations.reduce((maxPop, currentPop) => {
    return currentPop.residents.length > maxPop.residents.length
      ? currentPop
      : maxPop;
  });
  console.log("Lokacija su daugiausia gyventoju:", biggestPopulation);
};
fetchAllLocations();
