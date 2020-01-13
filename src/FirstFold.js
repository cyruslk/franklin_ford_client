import React, { Component, PropTypes } from 'react';
import FirstFoldTweetsContainer from "./FirstFoldTweetsContainer.js";
import FirstFoldMetadataContainer from "./FirstFoldMetadataContainer.js"
import App from "./App.css";


class FirstFold extends React.Component {


  constructor(props) {
   super(props);
   this.state = {
     tweetsArray: null,
     counter: 0
   };
 }

 componentDidMount(){
   if(!this.props.mockDataTweets){
     return "loading"
   }else{
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
       tweetsArray: formattedData
     })
   }
 }


 changeTweetsArray = () => {
   setTimeout(this.updateStateCounter, 3000);
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
          data={ele}
          key={index}
      />
     )
   })
 }

  render(){
    return (
      <main className="first_fold_container">
          <div className="typed_tweets">
            {this.renderFirstFoldTweets()}
          </div>
          <div className="displayed_metadata">
            {this.renderFirstFoldMetadata()}
        </div>
      </main>
    );
  }
}

export default FirstFold;
