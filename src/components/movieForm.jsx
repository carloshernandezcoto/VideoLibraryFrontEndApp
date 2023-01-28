import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { getGenres } from "../services/genreService";
// import { getMovie, saveMovie } from "../services/fakeMovieService";
import { getMovie, saveMovie } from "../services/movieService";
import withRouter from "../utils/withRouter";

class MovieForm extends Form {
  state = {
    data: { title: "", genreId: "", numberInStock: "", dailyRentalRate: "" },
    errors: {},
    genres: [],
  };

  schema = {
    _id: Joi.string().label("Id"),
    title: Joi.string().required().label("Title"),
    genreId: Joi.string().required().label("Genre"),
    numberInStock: Joi.number()
      .required()
      .label("Number in Stock")
      .integer()
      .min(0)
      .max(100),
    dailyRentalRate: Joi.number()
      .required()
      .label("Daily rental rate")
      .min(0)
      .max(10),
  };

  async populateGenres() {
    const { data: genres } = await getGenres();
    this.setState({ genres });
  }

  async populateMovies() {
    try {
      const movieId = this.props.match.params._id;
      if (movieId === "new") return;
      const { data } = await getMovie(movieId);
      const movie = data;
      this.setState({ data: this.mapToViewModel(movie) });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        return setTimeout(() => {
          this.props.navigate("/not-found", { replace: true });
        }, 0);
    }
  }

  async componentDidMount() {
    await this.populateGenres();
    await this.populateMovies();
  }

  mapToViewModel(movie) {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate,
    };
  }

  //Call the server
  doSubmit = async () => {
    await saveMovie(this.state.data);
    this.props.navigate("/movies", { replace: true });
  };

  render() {
    return (
      <div>
        <h1>Movie Form</h1>

        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title")}
          {this.renderSelect("genreId", "Genre", this.state.genres)}
          {this.renderInput("numberInStock", "Number in Stock", "number")}
          {this.renderInput("dailyRentalRate", "Daily rental rate", "number")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default withRouter(MovieForm);
