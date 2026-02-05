const songs = [
  {
    title: "Midnight City",
    artist: "M83",
    mood: "energetic",
    energy: 8,
    danceability: 7,
    acoustic: 2,
    tags: ["synth", "retro", "anthem"],
  },
  {
    title: "Levitating",
    artist: "Dua Lipa",
    mood: "uplifting",
    energy: 8,
    danceability: 9,
    acoustic: 2,
    tags: ["pop", "disco", "bright"],
  },
  {
    title: "Pink + White",
    artist: "Frank Ocean",
    mood: "chill",
    energy: 5,
    danceability: 4,
    acoustic: 7,
    tags: ["soul", "dreamy", "warm"],
  },
  {
    title: "Stay High",
    artist: "Tove Lo",
    mood: "moody",
    energy: 6,
    danceability: 7,
    acoustic: 3,
    tags: ["alt-pop", "night"],
  },
  {
    title: "Electric Feel",
    artist: "MGMT",
    mood: "uplifting",
    energy: 7,
    danceability: 7,
    acoustic: 3,
    tags: ["indie", "psychedelic"],
  },
  {
    title: "Adore You",
    artist: "Harry Styles",
    mood: "romantic",
    energy: 6,
    danceability: 6,
    acoustic: 5,
    tags: ["pop", "sunset"],
  },
  {
    title: "Cigarette Daydreams",
    artist: "Cage The Elephant",
    mood: "chill",
    energy: 4,
    danceability: 3,
    acoustic: 8,
    tags: ["indie", "acoustic"],
  },
  {
    title: "Blinding Lights",
    artist: "The Weeknd",
    mood: "energetic",
    energy: 9,
    danceability: 9,
    acoustic: 1,
    tags: ["synth", "neon"],
  },
  {
    title: "Sunflower",
    artist: "Post Malone",
    mood: "chill",
    energy: 6,
    danceability: 6,
    acoustic: 4,
    tags: ["vibe", "warm"],
  },
  {
    title: "Yellow",
    artist: "Coldplay",
    mood: "romantic",
    energy: 5,
    danceability: 4,
    acoustic: 7,
    tags: ["anthem", "guitar"],
  },
  {
    title: "Wildest Dreams",
    artist: "Taylor Swift",
    mood: "moody",
    energy: 6,
    danceability: 6,
    acoustic: 4,
    tags: ["dreamy", "pop"],
  },
  {
    title: "Somewhere Only We Know",
    artist: "Keane",
    mood: "uplifting",
    energy: 5,
    danceability: 4,
    acoustic: 6,
    tags: ["piano", "cinematic"],
  },
];

const songInput = document.getElementById("songInput");
const moodSelect = document.getElementById("moodSelect");
const danceability = document.getElementById("danceability");
const energy = document.getElementById("energy");
const acoustic = document.getElementById("acoustic");
const findButton = document.getElementById("findButton");
const resultsGrid = document.getElementById("resultsGrid");
const resultsSummary = document.getElementById("resultsSummary");
const vibePill = document.getElementById("vibePill");

const clampScore = (value) => Math.max(0, Math.min(1, value));

const scoreSong = (song, preferences) => {
  const moodScore = song.mood === preferences.mood ? 1 : 0.4;
  const danceScore = 1 - Math.abs(song.danceability - preferences.danceability) / 10;
  const energyScore = 1 - Math.abs(song.energy - preferences.energy) / 10;
  const acousticScore = 1 - Math.abs(song.acoustic - preferences.acoustic) / 10;

  return clampScore(
    0.35 * moodScore + 0.25 * danceScore + 0.25 * energyScore + 0.15 * acousticScore
  );
};

const renderResults = (recommendations) => {
  resultsGrid.innerHTML = "";

  recommendations.forEach((song) => {
    const card = document.createElement("article");
    card.className = "song-card";

    const title = document.createElement("h4");
    title.textContent = song.title;

    const artist = document.createElement("p");
    artist.textContent = song.artist;

    const tags = document.createElement("p");
    tags.textContent = `Vibe tags: ${song.tags.join(" · ")}`;

    card.append(title, artist, tags);
    resultsGrid.appendChild(card);
  });
};

const handleSearch = () => {
  const preferences = {
    mood: moodSelect.value,
    danceability: Number(danceability.value),
    energy: Number(energy.value),
    acoustic: Number(acoustic.value),
  };

  const query = songInput.value.trim();
  const queryText = query ? `for "${query}"` : "based on your vibe";
  vibePill.textContent = `Vibe: ${preferences.mood}`;

  const recommendations = songs
    .map((song) => ({
      ...song,
      score: scoreSong(song, preferences),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 6);

  resultsSummary.textContent = `Top matches ${queryText}.`;
  renderResults(recommendations);
};

findButton.addEventListener("click", handleSearch);

renderResults(songs.slice(0, 6));
