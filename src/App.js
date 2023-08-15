import { useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import MovieList from './components/MovieList';
import './App.scss';
import MovieDetail from './pages/MovieDetail';
import Header from './components/Header';
import { fetchMovies, setPage, setLoader } from './reducers/MovieReducers';
import { useDispatch, useSelector } from 'react-redux';

function App() {
  const [search, setSearch] = useState('');
  const [config, setConfig] = useState({});
  const dispatch = useDispatch();
  const list = useSelector(state => state.movieList.movieList);
  const page = useSelector(state => state.movieList.pageNo);
  const isLoading = useSelector(state => state.movieList.loading);
  console.log(useSelector(state => state.movieList));
  const getConfig = () => {
    axios
      .get(
        `https://api.themoviedb.org/3/configuration?api_key=${process.env.REACT_APP_API_KEY}`
      )
      .then(res => setConfig(res.data));
  };

  async function getData(currentPage = page) {
    dispatch(setLoader(true));
    let url = '';
    if (search) {
      url = `https://api.themoviedb.org/3/search/movie?query=${search}&include_adult=false&language=en-US&page=${
        page + 1
      }`;
    } else {
      url = `https://api.themoviedb.org/3/discover/movie?page=${
        page + 1
      }`;
    }
    dispatch(fetchMovies(url));
  }

  async function getSearchData() {
    dispatch(setLoader(true));
    let url = '';
    if (search) {
      url = `https://api.themoviedb.org/3/search/movie?query=${search}&include_adult=false&language=en-US&page=${
        1
      }`;
      dispatch(fetchMovies(url));
    } 
  }

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight ||
      isLoading
    ) {
      return;
    }
    getData(page+1);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
    // eslint-disable-next-line
  }, [isLoading]);

  useEffect(() => {
    getData();
    getConfig();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    getSearchData();
    // eslint-disable-next-line
  }, [search]);

  const handleFocus = () => {
    if (search === '') {
      dispatch(setPage(0));
    }
  };

  return (
    <BrowserRouter>
      <div className='App'>
        <Header
          search={search}
          setSearch={setSearch}
          handleFocus={handleFocus}
        />
        <Routes>
          <Route
            path='/'
            element={<MovieList movies={list} config={config} />}
          />
          <Route path='/movies/:id' element={<MovieDetail />} config={config} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
