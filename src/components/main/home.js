import React from 'react';
import SearchPage from '../search/searchPage';

function Home(props) {
  
  return (
      <div className="site-layout-content">
        <div style={{ padding: '2% 20%' }}>
          <SearchPage />
        </div>  
      </div>
  );
}

export default Home;
