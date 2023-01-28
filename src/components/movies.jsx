import React, { Component } from "react";
import { getMovies, deleteMovie, toggleLike } from "../services/movieService";
import { getGenres } from "../services/genreService";
import { toast } from "react-toastify";
import Paginator from "./common/paginator";
import ListGroup from "./common/listGroup";
import { paginate } from "../utils/paginate";
import MoviesTable from "./moviesTable";
import SearchBox from "./common/searchBox";
import { Link } from "react-router-dom";
import _ from "lodash";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1,
    selectedGenre: {},
    searchString: "",
    sortColumn: { path: "title", order: "asc" },
  };

  async componentDidMount() {
    const { data: theGenres } = await getGenres();
    const genres = [{ _id: "-1", name: "All Genres" }, ...theGenres];
    const { data: movies } = await getMovies();
    this.setState({
      movies: movies,
      genres: genres,
      selectedGenre: genres[0],
    });
  }

  handleDelete = async (movie) => {
    const originalMovies = this.state.movies;
    const movies = this.state.movies.filter((m) => m._id !== movie._id);
    this.setState({ movies: movies });

    try {
      await deleteMovie(movie._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        toast.error("This movie has already been deleted.");
      }
      this.setState({ movies: originalMovies });
    }
  };

  handleLike = async (movie) => {
    await toggleLike(movie._id);
    const movies = [...this.state.movies];
    const idx = movies.indexOf(movies.find((m) => m._id === movie._id));
    movies[idx] = { ...movie };
    movies[idx].liked = !movies[idx].liked;
    this.setState({ movies: movies });
  };

  handlePageChanged = (pageNumber) => {
    this.setState({ currentPage: pageNumber });
  };

  handleGenreSelected = (genre) => {
    this.setState({ selectedGenre: genre, currentPage: 1, searchString: "" });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  handleSearchChange = (e) => {
    const str = e.currentTarget.value;
    const selectedGenre = str
      ? this.state.genres[0]
      : { ...this.state.selectedGenre };
    this.setState({ searchString: str, selectedGenre, currentPage: 1 });
  };

  getPagedData = (
    selectedGenre,
    searchString,
    movies,
    sortColumn,
    currentPage,
    pageSize
  ) => {
    const filteredMovies = searchString
      ? movies.filter((m) =>
          m.title.toLowerCase().includes(searchString.toLowerCase())
        )
      : selectedGenre._id === "-1" //Code for all genres.
      ? movies
      : movies.filter((m) => m.genre._id === selectedGenre._id);

    const sortedMovies = _.orderBy(
      filteredMovies,
      [sortColumn.path],
      [sortColumn.order]
    );
    const moviesToShow = paginate(sortedMovies, currentPage, pageSize);
    const moviesToShowCount = sortedMovies.length;

    return { moviesToShowCount, moviesToShow };
  };

  render() {
    const {
      pageSize,
      currentPage,
      selectedGenre,
      searchString,
      movies,
      sortColumn,
    } = this.state;

    const { moviesToShowCount, moviesToShow } = this.getPagedData(
      selectedGenre,
      searchString,
      movies,
      sortColumn,
      currentPage,
      pageSize
    );

    const { user } = this.props;
    return (
      <React.Fragment>
        <div className="row">
          <div className="col-auto ">
            <ListGroup
              items={this.state.genres}
              selectedItem={this.state.selectedGenre}
              onItemSelect={this.handleGenreSelected}
            />
          </div>
          <div className="col ms-4">
            {user && (
              <Link className="btn btn-primary mb-2" to={`/movies/new`}>
                New Movie
              </Link>
            )}
            <SearchBox
              value={searchString}
              onChange={this.handleSearchChange}
            />
            <p className=" mb-4">
              {(moviesToShowCount &&
                `Showing ${moviesToShowCount} movies in the database.`) ||
                `There are no movies in the database.`}
            </p>
            {moviesToShowCount > 0 && (
              <MoviesTable
                moviesToShow={moviesToShow}
                sortColumn={sortColumn}
                onLike={this.handleLike}
                onDelete={this.handleDelete}
                onSort={this.handleSort}
              />
            )}
            <Paginator
              itemsCount={moviesToShowCount}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChanged={this.handlePageChanged}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Movies;
