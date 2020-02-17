import React, { Component, PropTypes } from 'react';
import SourcesComponent from "./SourcesComponent.js"
import App from "../App.css";
var parse = require('html-react-parser');


class FirstImageFold extends React.Component {

  render(){
    if(!this.props.mockDataImages){
      return "loading"
    }

    let mockDataImages = this.props.mockDataImages[0];

    let mockDataImagesFormattedFirstRaw = mockDataImages
    .slice(0, 3)
    .map((ele, index) => {
      return (
        <div index={index} className="img_full">
          <img src={ele.img} />
          <span>{parse(ele.txt)}</span>
        </div>
      )
    });

    let mockDataImagesFormattedSecondRaw = mockDataImages
    .slice(3, 6)
    .map((ele, index) => {
      return (
        <div index={index} className="img_full">
          <img src={ele.img} />
          <span>{parse(ele.txt)}</span>
        </div>
      )
    })

    return (
      <div>
        <div className="img_first_fold_container">
          {mockDataImagesFormattedFirstRaw}
        </div>
        <div className="img_first_fold_container">
          {mockDataImagesFormattedSecondRaw}
        </div>
      </div>
    );
  }
}

export default FirstImageFold;
