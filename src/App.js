import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { fetchMovies, setPage, setLoader } from './reducers/MovieReducers';
import { useDispatch, useSelector } from 'react-redux';

import Loader from './components/SubmitLoader';
import MovieList from './components/MovieList';
import MovieDetail from './pages/MovieDetail';
import Header from './components/Header';
import { fetchConfig } from './reducers/configReducer';
import './App.scss';

function App() {
  const [search, setSearch] = useState('');
  const dispatch = useDispatch();
  const list = useSelector(state => state.movieList.movieList);
  const page = useSelector(state => state.movieList.pageNo);
  const isLoading = useSelector(state => state.movieList.loading);

  async function getData(currentPage = page) {
    dispatch(setLoader(true));
    let url = '';
    // fetch infinite scrolling results based on if search term exists
    if (search) {
      url = `https://api.themoviedb.org/3/search/movie?query=${search}&include_adult=false&language=en-US&page=${
        page + 1
      }`;
    } else {
      url = `https://api.themoviedb.org/3/discover/movie?page=${page + 1}`;
    }
    dispatch(fetchMovies(url));
  }

  // get search results
  async function getSearchData() {
    dispatch(setLoader(true));
    let url = '';
    if (search) {
      url = `https://api.themoviedb.org/3/search/movie?query=${search}&include_adult=false&language=en-US&page=${1}`;
      dispatch(fetchMovies(url));
    } else {
      getData();
    }
  }

  // handle infinite scrolling
  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight ||
      isLoading
    ) {
      return;
    }
    getData(page + 1);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
    // eslint-disable-next-line
  }, [isLoading]);

  useEffect(() => {
    getData();
    dispatch(fetchConfig());
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
      {isLoading && <Loader />}
      <Header search={search} setSearch={setSearch} handleFocus={handleFocus} />
      <Routes>
        <Route path='/' element={<MovieList movies={list} />} />
        <Route path='/movies/:id' element={<MovieDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
