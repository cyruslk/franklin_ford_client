import React, { Component, PropTypes } from 'react';
import styled, { css, keyframes } from 'styled-components';
import App from "./App.css";


class FirstFoldTweetsContainer extends React.Component {


  constructor(props) {
   super(props);
   this.state = {
     tweetStringTypedArray: [],
     tweetStringTypedIndex: 0,
     formattedContent: null,
   };
 }

 componentDidMount(){
   if(!this.props.data){
     return null
   }else{
     return this.renderContent();
   }
 }

 componentDidUpdate(prevProps) {
  if (prevProps.data !== this.props.data) {
    return this.renderContent();
  }
  console.log(this.props.data);
}

 renderContent = () => {
     let tweet = this.props.data.tweet;
     let visible = this.props.data.visible;
     let animation = this.props.data.animation;
     return this.handleContentState(tweet, visible, animation);
 }

  handleContentState = (tweet, visible, animation) => {
    if(!visible){
      return this.hideDiv(tweet)
    }
    else if(visible && !animation){
      return this.makeDivVisible(tweet)
    }else{
      return this.makeTypingAnimation(tweet)
    }
  }

  hideDiv = (tweet) => {
    this.setState({
      formattedContent: ""
    })
  }

  // make div visible without animation;
  makeDivVisible = (tweet) => {
    let formattedContent = () => {
      return (
        <div>
          <span>
            {tweet}
          </span>
        </div>
      )
    }
    this.setState({
      formattedContent: formattedContent()
    })
  }

  makeTypingAnimation = (tweet) => {
    let splitedString= tweet.split("");
    let splitedStringLength = splitedString.length;
    let intervalId = setInterval(this.pushToTheState, 50);
    this.setState({
      intervalId: intervalId
    })
  };

  pushToTheState = () => {
    let array = this.props.data.tweet.split("")
    let arrayLength = array.length
    let currentLetter = array[this.state.tweetStringTypedIndex];

    this.setState({
      tweetStringTypedArray: [...this.state.tweetStringTypedArray, currentLetter]
    }, () => {
      if(this.state.tweetStringTypedIndex === arrayLength){
       return this.clearAndSendProps()
      }else{
        this.setState({
          tweetStringTypedIndex: this.state.tweetStringTypedIndex+1
        }, () => {
          return this.formtattedTypedContent();
        })
      }
    })
  }

  clearAndSendProps = () => {
    clearInterval(this.state.intervalId)
    return this.props.changeTweetsArray()
  }


  formtattedTypedContent = () => {
    let formattedContentSpans = this.state.tweetStringTypedArray
    .map((ele, index) => {
      return (
        <span key={index}>{ele}</span>
      )
    })
    let formattedContent = () => {
      return (
        <div>
            <span>
              {formattedContentSpans}
            </span>
        </div>
      )
    }
    this.setState({
      formattedContent: formattedContent()
    })
  }

  render(){
    if(!this.state.formattedContent){
      return null
    }else{
      return this.state.formattedContent
    }
  }
}

export default FirstFoldTweetsContainer;
