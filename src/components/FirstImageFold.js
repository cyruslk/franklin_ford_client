import React, { Component, PropTypes } from 'react';
import SourcesComponent from "./SourcesComponent.js"
import App from "../App.css";


class FirstImageFold extends React.Component {

  render(){
    return (
      <div>
        <div class="img_first_fold_container">
            <div className="img_full">
              <img src="https://res.cloudinary.com/www-c-t-l-k-com/image/upload/v1579134911/franklin_ford/1882_Ford---Tontine-What-It-Is-How-It-Works-1.jpg" />
              <span>1882_Ford---Tontine-What-It-Is-How-It-Works-1.jpg</span>
            </div>
            <div className="img_full">
              <img src="https://res.cloudinary.com/www-c-t-l-k-com/image/upload/v1579170346/franklin_ford/1914_Letter_Foxwell_AND_1910_Duplicate_-The_Public_Necessity-2.jpg" />
              <span>01. fvdfv</span>
            </div>
            <div className="img_full">
              <img src="https://res.cloudinary.com/www-c-t-l-k-com/image/upload/v1579135274/franklin_ford/2_1882_Ford---Tontine-What-It-Is-How-It-Works-1.jpg" />
              <span>01. fvdfv</span>
            </div>
        </div>
        <div class="img_first_fold_container">
            <div className="img_full">
              <img src="https://res.cloudinary.com/www-c-t-l-k-com/image/upload/v1579170346/franklin_ford/1914_Letter_Foxwell_AND_1910_Duplicate_-The_Public_Necessity-2.jpg" />
              <span>01. fvdfv</span>
            </div>
            <div className="img_full">
            <img src="https://res.cloudinary.com/www-c-t-l-k-com/image/upload/v1579169683/franklin_ford/1897_-Ford---New-York-and-the-Country---Textile-America.jpg" />
            <span>01. fvdfv</span>
            </div>
            <div className="img_full">
              <img src="https://res.cloudinary.com/www-c-t-l-k-com/image/upload/v1579171085/franklin_ford/1_______1869-1887_Edward-Atkinson-papers_Carton-12-16.jpg" />
              <span>01. fvdfv</span>
            </div>
        </div>
      </div>
    );
  }
}

export default FirstImageFold;
