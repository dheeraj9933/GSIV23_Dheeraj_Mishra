import { Link, useLocation } from 'react-router-dom';

import HomeSvg from '../../assets/home.svg';
import SearchSvg from '../../assets/search.svg';
import Cross from '../../assets/cross.png';

function Header({ search, setSearch, handleFocus }) {
  const location = useLocation();
  return (
    <nav>
      {location.pathname === '/' ? (
        <div className='search-container'>
          <img className='search' src={SearchSvg} alt='' />
          <input
            type='text'
            name=''
            id=''
            value={search}
            onChange={e => setSearch(e.target.value)}
            onFocus={handleFocus}
            placeholder='Search'
          />
          {search && (
            <img
              className='cross'
              src={Cross}
              alt=''
              onClick={() => setSearch('')}
            />
          )}
        </div>
      ) : (
        <h1>Movie Details</h1>
      )}
      <Link className='home' to='/'>
        <img src={HomeSvg} alt='' />
      </Link>
    </nav>
  );
}
export default Header;
