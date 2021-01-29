import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import Pagination from "./common/pagination";

import { paginate } from '../utils/paginate';
class Movies extends Component {
  
  state = {
    movies: getMovies(),
    pageSize: 3,
    currentPage: 1
  };


  hundleDelete = (movie) => {
    const movies = this.state.movies.filter((m) => m._id !== movie._id);
    this.setState({ movies });
  };

  handlePageChange = page => {
    this.setState({currentPage: page})
  }


  render() {
    const { length: count } = this.state.movies;
    const {pageSize, currentPage, movies: allMovies} = this.state;

    if (count === 0) return <p>There is no movies in database</p>;

    const movies =  paginate(allMovies, currentPage, pageSize )

    return (
      <React.Fragment>
        <p>There is {count} in the database</p>
        <table className='table'>
          <thead>
            <tr>
              <th>Title</th>
              <th>Genre</th>
              <th>Stock</th>
              <th>Rate</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {movies.map((movie) => (
              <tr key={movie._id}>
                <td>{movie.title}</td>
                <td>{movie.genre.name}</td>
                <td>{movie.numberInStock}</td>
                <td>{movie.dailyRentalRate}</td>
                <td>
                  <button
                    onClick={() => this.hundleDelete(movie)}
                    className='btn btn-danger btn-sm'
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination 
        itemsCount={count} 
        pageSize = {pageSize} 
        currentPage = {currentPage}
        onPageChange = {this.handlePageChange} />
      </React.Fragment>
    );
  }
}

export default Movies;
