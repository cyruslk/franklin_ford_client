import React, { Component, PropTypes } from 'react';
import SourcesComponent from "./SourcesComponent.js"
import App from "../App.css";


class Sources extends React.Component {


  constructor(props) {
   super(props);
   this.state = {
    isHoveredIndicator: false,
    tweetData: null,
    index: 0
   };
 };


  triggerIndicator = (isHoveredIndicator, tweetData) => {
    this.setState({
      isHoveredIndicator,
      tweetData
    })
  };


  renderSourcesContent = () => {
    if(!this.props.spreadsheetData){
      return null;
    };

    let spreadSheetData = this.props.spreadsheetData;
    let cellSources = spreadSheetData.map((ele, index) => {

      return (
        <SourcesComponent
          dbContent={this.props.dbContent}
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
  };

  renderHoverIndicator = () => {
    if(!this.state.isHoveredIndicator){
      return null;
    };
    return (
      <div className="source_indicator">
        <span>Click to to see more</span>
        {this.renderHoverTweetData()}
      </div>
    )
  };

  renderHoverTweetData = () => {
    if(!this.state.tweetData){
      return null;
    };
    let countTweets = this.state.tweetData.length;
    return (
      <div className="source_tweet_indicator">
        <span>Tweeted: {countTweets} times </span>
      </div>
    )
  }

  render(){
    return (
      <div
        id="sources"
        className="source_container">
        {this.renderHoverIndicator()}
        {this.renderSourcesContent()}
      </div>
    );
  };
};

export default Sources;
