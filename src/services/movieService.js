import httpService from "./httpService";
// import config from "./../config.json";

// const apiEndpoint = config.apiUrl + "/movies";
const apiEndpoint = "/movies";

export function getMovies() {
  return httpService.get(apiEndpoint);
}

export function getMovie(id) {
  return httpService.get(apiEndpoint + "/" + id);
}

export function saveMovie(movie) {
  const body = { ...movie };
  delete body._id;
  if (movie._id) {
    return httpService.put(apiEndpoint + "/" + movie._id, body);
  }
  return httpService.post(apiEndpoint, body);
}

export function deleteMovie(id) {
  return httpService.delete(apiEndpoint + "/" + id);
}

export async function toggleLike(id) {
  const { data: movie } = await getMovie(id);
  const body = {
    title: movie.title,
    genreId: movie.genre._id,
    numberInStock: movie.numberInStock,
    dailyRentalRate: movie.dailyRentalRate,
    liked: movie.liked ? !movie.liked : true,
  };
  return httpService.put(apiEndpoint + "/" + id, body);
}
