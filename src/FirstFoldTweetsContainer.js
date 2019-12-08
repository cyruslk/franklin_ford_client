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

 renderContent = () => {
   if(!this.props.data){
     return "loading"
   }else{
     let data = this.props.data.data;
     let visible = this.props.data.visible;
     let animation = this.props.data.animation;
     return this.handleContentState(data, visible, animation);
   }
 }

  handleContentState = (data, visible, animation) => {
    if(!visible){
      return this.hideDiv(data)
    }
    else if(visible && !animation){
      return this.makeDivVisible(data)
    }else{
      return this.makeTypingAnimation(data)
    }
  }

  hideDiv = (data) => {
    let formattedContent = () => {
      return (
        <div style={{display: "none"}}>
          {data}
        </div>
      )
    }
    this.setState({
      formattedContent: formattedContent()
    })
  }

  // make div visible without animation;
  makeDivVisible = (data) => {
    let formattedContent = () => {
      return (
        <div>
          {data}
        </div>
      )
    }
    this.setState({
      formattedContent: formattedContent()
    })
  }

  makeTypingAnimation = (data) => {
    let splitedString= data.split("");
    let splitedStringLength = splitedString.length;
    setInterval(() => {
        return this.pushToTheState(splitedString, splitedStringLength)
      }, 200);
  };

  pushToTheState = (array, arrayLength) => {
    let currentLetter = array[this.state.tweetStringTypedIndex];
    this.setState({
      tweetStringTypedArray: [...this.state.tweetStringTypedArray, currentLetter]
    }, () => {
      if(this.state.tweetStringTypedIndex === arrayLength){
        return clearInterval(this.makeTypingAnimation(this.props.data.data),
        () => { console.log("cleared");});
      }else{
        this.setState({
          tweetStringTypedIndex: this.state.tweetStringTypedIndex+1
        }, () => {
          return this.formtattedTypedContent();
        })
      }
    })
  }


  formtattedTypedContent = () => {
    let formattedContent = this.state.tweetStringTypedArray
    .map((ele, index) => {
      return (
        <span key={index}>{ele}</span>
      )
    })
    this.setState({
      formattedContent: formattedContent
    })
  }



  render(){
    if(!this.state.formattedContent){
      return "loading"
    }else{
      return this.state.formattedContent;
    }
  }
}

export default FirstFoldTweetsContainer;
