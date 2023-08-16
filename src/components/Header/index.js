import { Link, useLocation } from 'react-router-dom';

import HomeSvg from '../../assets/home.svg';
import SearchSvg from '../../assets/search.svg';
import Cross from '../../assets/cross.png';
import './style.scss'

function Header({ search, setSearch, handleFocus }) {
  const location = useLocation();
  return (
    <nav>
      {location.pathname === '/' ? (
        <div className='search-container'>
          <img className='search' src={SearchSvg} alt='search-icon' />
          <input
            type='text'
            name='Search'
            id='Search-input'
            value={search}
            onChange={e => setSearch(e.target.value)}
            onFocus={handleFocus}
            placeholder='Search'
          />
          {search && (
            <img
              className='cross'
              src={Cross}
              alt='clear-search'
              onClick={() => setSearch('')}
            />
          )}
        </div>
      ) : (
        <h1>Movie Details</h1>
      )}
      <Link className='home' to='/'>
        <img src={HomeSvg} alt='Home' />
      </Link>
    </nav>
  );
}
export default Header;
