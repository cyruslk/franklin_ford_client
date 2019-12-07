import React, { Component, PropTypes } from 'react';
import App from "./App.css";


class FirstFold extends React.Component {


  constructor(props) {
   super(props);
   this.state = {
     displayedTweets: null,
     displayedMetadata: null,
     stringTypedArray: [],
     stringTypedIndex: 0
   };
 }

 componentDidMount(){
   return this.typingEffect("hello world")
 }


  displayTweets = () => {
  if(!this.props.mockDataTweets){
    return null
  }else{
    let getRandomTweetsStrings = () => {
        return this.randomlySelectElements(10, this.state.mockDataTweets)
        .map((ele, index) => {
          return ele.randomString
      })
    }

    return (
      <div>
        <span>I find that the sinking fund of New York city dates from 1813, the year following the inception of the funded debt proper.</span>
      </div>
    )
  }
}

typingEffect = (string) => {
  let splitedString = string.split("");
  let splitedStringLength = splitedString.length;

  setInterval(() => {
      return this.pushToTheContainer(splitedString, splitedStringLength)
    }, 1000);
}

pushToTheContainer = (array, arrayLength) => {
  let currentLetter = array[this.state.stringTypedIndex];

  this.setState({
    stringTypedArray: [...this.state.stringTypedArray, currentLetter]
  }, () => {
    if(this.state.stringTypedIndex === arrayLength){
      this.setState({
        stringTypedIndex: 0,
        stringTypedArray: []
      })
    }else{
      this.setState({
        stringTypedIndex: this.state.stringTypedIndex+1
      })
    }
  })
}


displayMetadataFromTweets = () => {
    if(!this.props.mockDataTweets){
      return null;
    }
    let returnTweetMetadata = () => {
      return (
        <div className="metadata_first_fold">
          <span>Tweet_created_at:  {this.props.mockDataTweets[this.props.typistIndex].twitterData.Tweet_created_at}</span>
          <span>Tweet_id_string: {this.props.mockDataTweets[this.props.typistIndex].twitterData.Tweet_id_string}</span>
          <span>Author_name: {this.props.mockDataTweets[this.props.typistIndex].sourceData.Author_name}</span>
          <span>PDF_name: {this.props.mockDataTweets[this.props.typistIndex].sourceData.PDF_name}</span>
        </div>
      )
    }

    return (
      <div>
          {returnTweetMetadata()}
      </div>
    )
}


next = () => {
  this.setState({
    typistIndex: this.state.typistIndex+1
  }, () => {
    if(this.state.typistIndex === this.state.mockDataTweets.length-1){
      this.setState({
        typistIndex: 0
      })
    }
  })
}

renderStateOnView = () => {
  if(this.state.stringTypedArray.length === 0){
    return null
  }
  let stateMaped = this.state.stringTypedArray
  .map((ele, index) => {
    return (
      <span key={index}>
        {ele}
      </span>
    )
  })
  return stateMaped;
}

  render(){
    return (
      <main className="first_fold_container">
          <div className="typed_tweets">
            {this.displayTweets()}
          </div>
          <div className="displayed_metadata">
          {this.displayMetadataFromTweets()}
        </div>
      </main>
    );
  }
}

export default FirstFold;
