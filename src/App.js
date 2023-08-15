import './App.css';
import axios from 'axios'

function App() {
  const READ_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNTNkOTQxNTA0YjNiZWY2NmM4YTIyZDI1MDFlNDRhMyIsInN1YiI6IjY0ZGFmZjk5MzcxMDk3MDBmZmI3OGJkNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1bVcEpBS-Y1eOX1nMepnqUDpNQ9pDw24vEfT3sCoTNc'
  const API_KEY = '153d941504b3bef66c8a22d2501e44a3'
  const url = `https://api.themoviedb.org/3/discover/movie?page=2&api_key=${API_KEY}`
  axios.get(url).then(res => console.log(res))
  return (
    <div className="App">
      test
    </div>
  );
}

export default App;
