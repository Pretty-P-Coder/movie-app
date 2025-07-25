const APILINK = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=fb7fb277c3e954653ccce492e486e219&page=1";
const IMG_PATH = "https://image.tmdb.org/t/p/w500";
const SEARCHAPI = "https://api.themoviedb.org/3/search/movie?api_key=fb7fb277c3e954653ccce492e486e219&query=";

const main = document.getElementById("section");
const form = document.getElementById("form");
const search = document.getElementById("query");

returnMovies(APILINK);

function returnMovies(url) {
  fetch(url)
    .then(res => res.json())
    .then(data => {
      console.log(data.results);
      main.innerHTML = ""; // clear before adding new
      const row = document.createElement("div");
      row.classList.add("row");

      data.results.forEach(movie => {
        if (!movie.poster_path) return;

        const column = document.createElement("div");
        column.classList.add("column");

        const card = document.createElement("div");
        card.classList.add("card");

        const image = document.createElement("img");
        image.classList.add("thumbnail");
        image.src = IMG_PATH + movie.poster_path;
        image.alt = movie.title;

        const title = document.createElement("h3");
        title.textContent = movie.title;

        card.appendChild(image);
        card.appendChild(title);
        column.appendChild(card);
        row.appendChild(column);
      });

      main.appendChild(row);
    });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchTerm = search.value;
  if (searchTerm) {
    returnMovies(SEARCHAPI + searchTerm);
    search.value = "";
  }
});
