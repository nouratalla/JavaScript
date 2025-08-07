// API
const api_key = "YOUR_API_KEY_HERE";
const api_base_url = "https://www.omdbapi.com/";

// DOM elements
const searchInput = document.getElementById("searchInput");
const resultDiv = document.getElementById("results");

async function searchMovies() {
  resultDiv.innerHTML = "Loading...";
  try {
    const response = await fetch(`${api_base_url}?s=${searchInput.value}&apikey=${api_key}`);
    const data = await response.json();

    if (data.Response === "False") {
      resultDiv.innerHTML = `<p class="text-danger">${data.Error}</p>`;
      return;
    }

    displayMovies(data.Search);
  } catch (error) {
    resultDiv.innerHTML = `<p class="text-danger">Error fetching movies</p>`;
    console.error(error);
  }
}

function displayMovies(movies) {
  resultDiv.innerHTML = "";
  movies.forEach(movie => {
    const col = document.createElement("div");
    col.className = "col-md-3";

    col.innerHTML = `
      <div class="movie-card h-100">
        <img src="${movie.Poster !== 'N/A' ? movie.Poster : 'noposter.png'}" alt="${movie.Title}">
        <h5 class="mt-2">${movie.Title}</h5>
        <p>${movie.Year}</p>
        <a href="https://www.imdb.com/title/${movie.imdbID}" target="_blank" class="btn btn-sm btn-outline-info">View on IMDb</a>
      </div>
    `;

    resultDiv.appendChild(col);
  });
}
