import React, { Component, PropTypes } from 'react';
import SourcesComponent from "./SourcesComponent.js"
import App from "../App.css";


class Sources extends React.Component {
  renderSourcesContent = () => {
    if(!this.props.spreadsheetData){
      return null;
    }
    let spreadSheetData = this.props.spreadsheetData;
    let cellSources = spreadSheetData.map((ele, index) => {
      return (
        <SourcesComponent
          ele={ele}
          index={index}
        />
      )
    })
    return (
        <div
        id="sources"
        className="source_container">
          {cellSources}
        </div>
      )
  }

  render(){
    return (
      <div>
        {this.renderSourcesContent()}
      </div>
    );
  }
}

export default Sources;
