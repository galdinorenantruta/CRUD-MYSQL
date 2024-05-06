


import { useState, useEffect } from 'react'

import axios from 'axios'
import './App.css'

interface Movie {
  movieName: string;
  movieReview: string;
}


function App() {

const [movieList, setMovieList] = useState<Movie[]>([]);
const [movieName, setMovieName] = useState<string>('');
const [movieReview, setMovieReview] = useState<string>('');
const [newReview, setNewReview] = useState<string>('')

useEffect(() => {
  axios.get("http://localhost:3001/api/get" ).then((response)=>{
    console.log(response.data)
    setMovieList(response.data)
  })
}, [])

const submitMReview = () => {
  axios.post("http://localhost:3001/api/insert", {movieName: movieName, movieReview: movieReview})

  setMovieList([...movieList,{movieName:movieName, movieReview:movieReview}])
    
setMovieName(" ")
setMovieReview(" ")
  

}

const deleteReview = (movie: string) => {
  axios.delete(`http://localhost:3001/api/delete/${movie}`)
}

const updateReview = (movie: string) => {
  axios.put("http://localhost:3001/api/update",  { movieName: movie, movieReview: newReview, })
  setNewReview("")
}

  return (
    <div className='app'>
      <h1>CRUD Applications</h1>
      <div className='form'>
        <label htmlFor="movieName">Movie Name:</label>
        <input type="text" name="movieName" id='movieName' onChange={(e) => {setMovieName(e.target.value)}} />
        <label htmlFor="review">Your Review:</label>
        <input type="text" name='review' id='review'  onChange={(e) => {setMovieReview(e.target.value)}}/>
        <button onClick={submitMReview}>Submit</button>

        {movieList.map((val, index)=>(
          <div className="card" key={index}>
            <h2 >Movie Name: {val.movieName}</h2>
            <p>Movie Review: {val.movieReview}</p>
            <button onClick={()=>{deleteReview(val.movieName)}}>Delete</button>
            <input onChange={(e) => {setNewReview(e.target.value)}} type="text" id='update-input'/>
            <button onClick={() => { updateReview( val.movieName)}} >Update</button>
          </div>
           
        ))}
      </div>
    </div>
  )
}

export default App
