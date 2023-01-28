import httpService from "./httpService";
// import config from "./../config.json";

export const genres = [
  { _id: "5b21ca3eeb7f6fbccd471818", name: "Action" },
  { _id: "5b21ca3eeb7f6fbccd471814", name: "Comedy" },
  { _id: "5b21ca3eeb7f6fbccd471820", name: "Thriller" },
];

export function getGenres() {
  // return httpService.get("http://localhost:3900/api/genres/");
  // return httpService.get(config.apiUrl + "/genres/");
  return httpService.get("/genres/");
}
