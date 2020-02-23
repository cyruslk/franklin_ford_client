import React from 'react';
import { HashLink as Link } from 'react-router-hash-link';
import App from "../App.css";


class MenuLink extends React.Component {
  render(){
    if(!this.props.pathname){
      return null;
    }
    return (
      <div>
        <Link
          smooth to={`${window.location.pathname}#${this.props.pathname}`}>
          <span>{this.props.span}</span>
        </Link>
      </div>
    );
  }
}

export default MenuLink;
