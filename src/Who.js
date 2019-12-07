import React, { Component, PropTypes } from 'react';
import App from "./App.css";


class Who extends React.Component {


  renderWhoContent = () => {
    if(!this.props.mockDataCms){
      return null
    }
    let data = this.props.mockDataCms[1].who
    let mapedData = data.map((ele, index) => {
      return (
        <div key={index}>
          <h1>{ele.title}</h1>
          <p>{ele.body}</p>
        </div>
      )
    })
    return mapedData;
  }

  render(){
    return (
      <div className="who_container">
        {this.renderWhoContent()}
      </div>
    );
  }
}

export default Who;
