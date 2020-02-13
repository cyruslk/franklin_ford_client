import React, { Component, PropTypes } from 'react';
import SourcesComponent from "./SourcesComponent.js"
import App from "../App.css";


class Sources extends React.Component {


  constructor(props) {
   super(props);
   this.state = {
    isTriggeredIndicator: false,
    index: 0
   };
 }

  triggerIndicator = (bool) => {
    this.setState({
      isTriggeredIndicator: bool
    })
  }


  renderSourcesContent = () => {
    if(!this.props.spreadsheetData){
      return null;
    }

    let spreadSheetData = this.props.spreadsheetData;
    let cellSources = spreadSheetData.map((ele, index) => {

      return (
        <SourcesComponent
          triggerIndicator={this.triggerIndicator}
          listCount={spreadSheetData.length}
          ele={ele}
          index={index}
        />
      )
    });


    return (
        <div>
        {cellSources}
        </div>
      )
  }



  renderIndicator = () => {
    if(!this.state.isTriggeredIndicator){
      return null;
    }
    return (
      <div className="source_indicator">
        <span>Click to to see more</span>
      </div>
    )
  }

  renderIndexOfSources = () => {

    if(!this.props.spreadsheetData){
    return null;
    }

    let spreadSheetData = this.props.spreadsheetData;
    let mapThroughPDFTitltes = spreadSheetData
    .map((ele, index) => {
      return (
        <div key={index}>
          {ele.gsx$title.$t}: 0 Tweets
        </div>
      )
    })
    return (
      <div>
        {mapThroughPDFTitltes}
      </div>
    )
  }

  render(){
    return (
      <div
        id="sources"
        className="source_container">
        {this.renderIndicator()}
        {this.renderSourcesContent()}
      </div>
    );
  }
}

export default Sources;
