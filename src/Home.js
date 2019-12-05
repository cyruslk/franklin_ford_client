import React from 'react';
import Interactive from 'react-interactive';
import { HashLink as Link } from 'react-router-hash-link';

function Home() {
  return (
    <div>

      <nav>
        <h3 style={{ fontSize: '18px', marginTop: '2.5vh' }}>Go to example page:</h3>
        <ul>
          <li><Link to="/foo#about">Section One</Link></li>
          <li><Link to="/bar#sources">Section Two</Link></li>
          <li><Link to="/baz#who">Section Three</Link></li>
        </ul>
          ffvdvfvfdvfdvdvdvdv dfvdfvfdvfdv
      </nav>

    </div>
  );
}

export default Home;
