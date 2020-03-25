import React from 'react'


class movieItem extends React.Component {
  constructor(){
    super();

    this.state = {
      willWatch:false
    }
  }

  render(){
  
    const {movie , removeMovieFromWillWatch , addMovieToWillWatch , removeMovie} = this.props ;

    const getBtnClick = (value) => {
return (
  this.setState({
    willWatch:value
  })
  );
}
    

  return ( <div className="card">
      <img
  className="card-img-top"
  src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path ||
    movie.poster_path}`}
  alt=""
/>
  <div className="card-body">
    <h6 className="card-title">{movie.title}</h6>
    <div className="d-flex justify-content-between align-items-center">
      <p className="mb-0">Rating: {movie.vote_average}</p>
      {this.state.willWatch  ? (<button type="button" className="btn btn-success" onClick={() =>{
       getBtnClick(false);
       removeMovieFromWillWatch(movie)}}>
      Remove
     </button>) : (<button type="button" className="btn btn-secondary" onClick={() =>{
      getBtnClick(true);
      addMovieToWillWatch(movie);}}>
       Will Watch
     </button>)}
   </div>
   <button onClick={removeMovie.bind(null, this.props.movie)}>
     Delete movie</button>
 </div>
</div>
)}

}



export default movieItem;