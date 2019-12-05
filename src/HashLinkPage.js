import React from 'react';
import App from "./App.css"
import PropTypes from 'prop-types';
import Interactive from 'react-interactive';
import { HashLink as Link } from 'react-router-hash-link';
import objectAssign from 'object-assign';
import { Li, linkStyle } from './style';

const propTypes = {
  location: PropTypes.object.isRequired,
};

function HashLinkPage({ location }) {

  let style = {
    position: "fixed",
    backgroundColor: "red"
  }

  return (
    <div>
      <nav style={style}>
      <ul>
        <li><Link smooth to={`${location.pathname}#about`}>About</Link></li>
        <li><Link smooth to={`${location.pathname}#sources`}>Sources</Link></li>
        <li><Link smooth to={`${location.pathname}#who`}>Who</Link></li>
        <li><Link smooth to={`${location.pathname}#news`}>News</Link></li>
        <li><Link smooth to={`${location.pathname}#acknowledgments`}>acknowledgments</Link></li>

      </ul>
      </nav>

      <section id="about">
        about
      </section>
      <section id="sources">
        sources
      </section>
      <section id="who">
        who
      </section>
      <section id="news">
        news
      </section>
      <section id="acknowledgments">
        acknowledgments
      </section>
    </div>
  );
}

HashLinkPage.propTypes = propTypes;

export default HashLinkPage;
