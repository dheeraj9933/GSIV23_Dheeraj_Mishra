import React, { useEffect } from 'react';
import './style/style.scss';

/**
 * 
 * @description - Common component to display a perpetual loader.
 * @function SubmitLoader
 * 
 */

export default function SubmitLoader() {
  useEffect(() => {
    document.querySelector('.submit-loader').scrollIntoView();
  }, []);

  return <div className='submit-loader' />;
}
