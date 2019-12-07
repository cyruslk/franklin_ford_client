import React, { Component, PropTypes } from 'react';
import App from "./App.css";


class FirstFold extends React.Component {


  constructor(props) {
   super(props);
   this.state = {
     tweets: null,
     selectedTweets: null,
     displayedTweets: null,
     displayedMetadata: null,
     tweetStringTypedArray: [],
     tweetStringTypedIndex: 0,
     tweetsArray: [],
     tweetsIndex: 0
   };
 }

 componentDidMount(){
   if(!this.props.mockDataTweets){
     return "loading"
   }else{
     this.setState({
       tweets: this.props.mockDataTweets
     }, () => {
       return this.initiateTypingEffect(
         this.state.tweets[this.state.tweetsIndex].randomString
       )
     })
   }
 }

initiateTypingEffect = (string) => {
  let splitedString = string.split("");
  let splitedStringLength = splitedString.length;

  setInterval(() => {
      return this.pushToTheStateContainer(splitedString, splitedStringLength)
    }, 200);
  }


pushToTheStateContainer = (array, arrayLength) => {
  let currentLetter = array[this.state.tweetStringTypedIndex];
  this.setState({
    tweetStringTypedArray: [...this.state.tweetStringTypedArray, currentLetter]
  }, () => {
    if(this.state.tweetStringTypedIndex === arrayLength){
      return;
    }else{
      this.setState({
        tweetStringTypedIndex: this.state.tweetStringTypedIndex+1
      })
    }
  })
}


renderStringTyped = () => {
  if(this.state.tweetStringTypedArray.length === 0){
    return null
  }
  let stateMaped = this.state.tweetStringTypedArray
  .map((ele, index) => {
    return (
      <span key={index}>
        {ele}
      </span>
    )
  })
  return (
    <div>
      {stateMaped}
    </div>
  )
}

  render(){
    return (
      <main className="first_fold_container">
          <div className="typed_tweets">
            {this.renderStringTyped()}
          </div>
          <div className="displayed_metadata">
        </div>
      </main>
    );
  }
}

export default FirstFold;
