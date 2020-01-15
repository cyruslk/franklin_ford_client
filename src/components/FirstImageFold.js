import React, { Component, PropTypes } from 'react';
import SourcesComponent from "./SourcesComponent.js"
import App from "../App.css";


class FirstImageFold extends React.Component {

  render(){
    return (
      <div>
        <div class="img_first_fold_container">
          <div class="img_full">
              <img src="https://res.cloudinary.com/www-c-t-l-k-com/image/upload/v1577364059/franklin_ford/8445504396_27f3d5a00c_o.png" />
          </div>
        </div>
      </div>
    );
  }
}

export default FirstImageFold;
