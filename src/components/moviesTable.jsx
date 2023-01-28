import React, { Component } from "react";
import { Link } from "react-router-dom";
import Like from "./common/like";
import Table from "./common/table";
import auth from "../services/authService";

class MoviesTable extends Component {
  columns = [
    //{ path: "title", label: "Title" },
    {
      key: "title",
      label: "Title",
      path: "title",
      content: (movie) => (
        <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
      ),
    },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    ,
    ,
  ];

  deleteColumn = {
    key: "delete",
    content: (movie) =>
      auth.getCurrentUser() &&
      auth.getCurrentUser().isAdmin && (
        <button
          className="btn btn-danger btn-sm"
          onClick={() => {
            this.props.onDelete(movie);
          }}
        >
          Delete
        </button>
      ),
  };

  likeColumn = {
    key: "like",
    content: (movie) => (
      <Like
        liked={movie.liked}
        onLike={() => {
          this.props.onLike(movie);
        }}
      />
    ),
  };

  constructor() {
    super();
    const user = auth.getCurrentUser();
    if (user) this.columns.push(this.likeColumn);
    if (user && user.isAdmin) this.columns.push(this.deleteColumn);
  }

  render() {
    const { moviesToShow, sortColumn, onSort } = this.props;
    return (
      <Table
        columns={this.columns}
        sortColumn={sortColumn}
        data={moviesToShow}
        onSort={onSort}
      />
    );
  }
}

export default MoviesTable;
