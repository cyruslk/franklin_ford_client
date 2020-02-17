import React, { Component, PropTypes } from 'react';
import FirstFoldTweetsContainer from "./FirstFoldTweetsContainer.js";
import FirstFoldMetadataContainer from "./FirstFoldMetadataContainer.js"
import App from "../App.css";


class FirstFold extends React.Component {


  constructor(props) {
   super(props);
   this.state = {
     tweetsArray: null,
     counter: 0,
     counterReset: null,
     overflow: "hidden"
   };
 }

 componentDidMount(){
   if(!this.props.mockDataTweets){
     return "loading"
   }else{
     return this.makeFormattedData()
   }
 }


 makeFormattedData = () => {
   let formattedData = this.props.mockDataTweets
     .map((ele, index) => ({
        index,
        tweet: ele.randomString,
        sourceMetadata: ele.sourceData,
        twitterMetadata: ele.twitterData,
        visible: index === this.state.counter,
        animation: index === this.state.counter
     }))
   this.setState({
     tweetsArray: formattedData,
     counterReset: this.props.mockDataTweets.length
   })
 }


 changeTweetsArray = () => {
   setTimeout(this.updateStateCounter, 3000);
   this.updateScrollOnDivs()
 }



 updateScrollOnDivs = () => {
   var targetedDiv = document.getElementById("typed_tweets");
   var isScrolledToBottom = targetedDiv.scrollHeight - targetedDiv.clientHeight <= targetedDiv.scrollTop + 1;
   if(!isScrolledToBottom){
     return targetedDiv.scrollTop = targetedDiv.scrollHeight;
   }
 }

 updateScrollOnDivsMetadata = () => {
   var targetedDiv = document.getElementById("displayed_metadata");
   var isScrolledToBottom = targetedDiv.scrollHeight - targetedDiv.clientHeight <= targetedDiv.scrollTop + 1;
   if(!isScrolledToBottom){
     return targetedDiv.scrollTop = targetedDiv.scrollHeight;
   }
 }

 updateStateCounter = () => {
   this.setState({
     counter: this.state.counter+1
   }, () => {
     let formattedDataUpdated = this.props.mockDataTweets
       .map((ele, index) => ({
          index,
          tweet: ele.randomString,
          sourceMetadata: ele.sourceData,
          twitterMetadata: ele.twitterData,
          visible: index <= this.state.counter,
          animation: index === this.state.counter
       }))

     this.setState({
       tweetsArray: formattedDataUpdated
     }, () => {
       return this.renderFirstFoldTweets()
     })
   })
 }


renderFirstFoldTweets = () => {
   if(!this.state.tweetsArray){
     return null
   }
   return this.state.tweetsArray
   .map((ele, index) => {
     return (
       <FirstFoldTweetsContainer
        updateScrollOnDivs={this.updateScrollOnDivs}
        changeTweetsArray={this.changeTweetsArray}
        data={ele}
        key={index}
      />
     )
   })
 }

 renderFirstFoldMetadata = () => {
   if(!this.state.tweetsArray){
     return null
   }
   return this.state.tweetsArray
   .map((ele, index) => {
     return (
       <FirstFoldMetadataContainer
          updateScrollOnDivs={this.updateScrollOnDivsMetadata}
          data={ele}
          key={index}
      />
     )
   })
 }

 handleScroll = e => {
  console.log(this.div.scrollTop);
};

  render(){
    console.log(this.state);
    return (
      <div>
      <main className="first_fold_container">
          <div
          style={{overflow: this.state.overflow}}
          id="typed_tweets"
          className="typed_tweets">
            {this.renderFirstFoldTweets()}
          </div>
          <div
          style={{overflow: this.state.overflow}}
          id="displayed_metadata"
          className="displayed_metadata">
            {this.renderFirstFoldMetadata()}
        </div>
      </main>
      </div>
    );
  }
}

export default FirstFold;
