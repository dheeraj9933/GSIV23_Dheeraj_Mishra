import { useEffect, useState } from 'react';
import axios from 'axios';

import MovieList from './components/MovieList';
import './App.scss';

function App() {
  const [list, setList] = useState([]);
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState('');
  const [config, setConfig] = useState({});
  const [isLoading, setisLoading] = useState(false);
  const getConfig = () => {
    axios
      .get(
        `https://api.themoviedb.org/3/configuration?api_key=${process.env.REACT_APP_API_KEY}`
      )
      .then(res => setConfig(res.data));
  };

  const getData = async (currentPage = page) => {
    setisLoading(true);
    let url = '';
    if (search) {
      url = `https://api.themoviedb.org/3/search/movie?query=${search}&include_adult=false&language=en-US&page=${
        currentPage + 1
      }`;
    } else {
      url = `https://api.themoviedb.org/3/discover/movie?page=${
        currentPage + 1
      }`;
    }
    const req = await axios.get(url, {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.REACT_APP_READ_TOKEN}`,
      },
    });
    setisLoading(false);
    setPage(req.data.page);
    if (currentPage === 0) {
      setList([...req.data.results]);
    } else {
      setList([...list, ...req.data.results]);
    }
  };

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight ||
      isLoading
    ) {
      return;
    }
    getData();
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
    getData(0);
    // eslint-disable-next-line 
  }, [search]);

  const handleFocus = () => {
    console.log('focus');
    if (search === '') {
      setList([]);
      setPage(0);
    }
  };

  return (
    <div className='App'>
      <input
        type='text'
        name=''
        id=''
        value={search}
        onChange={e => setSearch(e.target.value)}
        onFocus={handleFocus}
      />
      <MovieList movies={list} config={config} />
    </div>
  );
}

export default App;
