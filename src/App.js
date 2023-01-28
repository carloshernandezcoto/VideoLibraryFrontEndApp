import React, { Component } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import auth from "./services/authService";
import Movies from "./components/movies";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import LoginForm from "./components/loginForm";
import Logout from "./components/logout";
import RegisterForm from "./components/registerForm";
import NavBar from "./components/NavBar";
import NotFound from "./components/notFound";
import MovieForm from "./components/movieForm";
import withRouter from "./utils/withRouter";
import "react-toastify/dist/ReactToastify.css";
import "./css/App.css";

class App extends Component {
  state = {};

  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({ user });
  }
  render() {
    const { user } = this.state;
    return (
      <main className="container">
        <ToastContainer />
        <NavBar user={user} />
        <div className="content">
          <Routes>
            <Route
              path="/movies/:_id"
              element={
                user ? <MovieForm /> : <LoginForm from={this.props.location} />
              }
            />
            <Route path="/movies/" element={<Movies user={user} />} />
            <Route path="/customers/" element={<Customers />} />
            <Route path="/login/" element={<LoginForm />} />
            <Route path="/logout/" element={<Logout />} />
            <Route path="/register/" element={<RegisterForm />} />
            <Route path="/rentals/" element={<Rentals />} />
            <Route path="/not-found" element={<NotFound />} />
            <Route path="/" element={<Navigate to="/movies" />} />
            <Route path="*" element={<Navigate to="/not-found" replace />} />
          </Routes>
        </div>
      </main>
    );
  }
}

export default withRouter(App);
// function App() {
//   return (
//     <main className="container">
//       <ToastContainer />
//       <NavBar />
//       <div className="content">
//         <Routes>
//           <Route path="/movies/:_id" element={<MovieForm />} />
//           <Route path="/movies/" element={<Movies />} />
//           <Route path="/customers/" element={<Customers />} />
//           <Route path="/login/" element={<LoginForm />} />
//           <Route path="/register/" element={<RegisterForm />} />
//           <Route path="/rentals/" element={<Rentals />} />
//           <Route path="/not-found" element={<NotFound />} />
//           <Route path="/" element={<Navigate to="/movies" />} />
//           <Route path="*" element={<Navigate to="/not-found" replace />} />
//         </Routes>
//       </div>
//     </main>
//   );
// }

// export default App;
