import React from 'react';
import logo from './logo.svg';
import './App.css';
// import moviesData from './moviesData';
import MovieItem from './components/movieItem'
import {API_URL, API_KEY_3} from "./utils/api"
import MovieTabs from "./components/MovieTabs"
import PlussPage from "./components/plussPage"



class App extends React.Component{
  constructor(){
    super();
    this.state = {
      movies:[],
      movieWillWatch:[],
      sort_by:"popularity.desc",
      pages:1
      };
  console.log("constructor")
    }

    componentDidMount (){
      console.log("didMount")
fetch(`${API_URL}/discover/movie?page=${this.state.pages}&api_key=${API_KEY_3}&sort_by=${this.state.sort_by}`).then((response) => {
console.log("then")
return response.json()
}).then((data) => {
console.log("data", data)
this.setState({
  movies: data.results
})
});
    }

    componentDidUpdate(prevProps, prevState) {
      if(prevState.sort_by !== this.state.sort_by){
        fetch(`${API_URL}/discover/movie?page=${this.state.pages}&api_key=${API_KEY_3}&sort_by=${this.state.sort_by}`).then((response) => {
          console.log("then")
          return response.json()
          }).then((data) => {
          console.log("data", data)
          this.setState({
            movies: data.results
          })
          });
      
      }
          }
        

    removeMovie = movie => {
      const updateMovies = this.state.movies.filter(function(item){
        return item.id !== movie.id;
      });
    
      this.setState({
        movies: updateMovies
      })
    
      console.log(updateMovies)
    }

    addMovieToWillWatch = movie => {

      const updateMovies = [...this.state.movieWillWatch, movie];
     
      this.setState({
        movieWillWatch: updateMovies
      });

    };

    
    removeMovieFromWillWatch = movie => {
      const updateMoviesWillWatch = this.state.movieWillWatch.filter(function(item){
        return item.id !== movie.id;
      });
    
      this.setState({
        movieWillWatch: updateMoviesWillWatch
      })
    }

    updateSortBy = value => {
      this.setState({
        sort_by: value
      })
    }

    updatePlussPage = value => {
      this.setState({
        pages: value  
      })
    }

   
   
  render(){
    console.log(this);
    return(
      <div className="container">
        <div className="row">
          <div className="col-9">
            <div className="row mb-8 mt-5">
            <div className="col-12">
              <MovieTabs
              sort_by={this.state.sort_by} 
              updateSortBy={this.updateSortBy}
              />
              </div>
        {this.state.movies.map((movie) =>{
          return ( <div className="col-sm-4 mt-4"> <MovieItem
           key={movie.id}
           movie={movie} 
           removeMovie={this.removeMovie}
           addMovieToWillWatch={this.addMovieToWillWatch}
           removeMovieFromWillWatch={this.removeMovieFromWillWatch}/>

           </div>
          );
      })}
      </div>
          </div>
          <div className="col-3 mt-5">
            <h4>Will Watch: {this.state.movieWillWatch.length} movies</h4>
            <ul className="list-group">
              {this.state.movieWillWatch.map(movie => (
                <li key={movie.id} className="list-group-item">
                  <div className="d-flex justify-content-between">
                    <p>{movie.title}</p>
                    <p>{movie.vote_average}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <PlussPage pages={this.state.pages}
          updatePlussPage={this.updatePlussPage}/>
      </div>
    );
  }
}

export default App;