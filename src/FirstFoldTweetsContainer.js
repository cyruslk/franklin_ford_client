import React, { Component, PropTypes } from 'react';
import styled, { css, keyframes } from 'styled-components';
import App from "./App.css";


class FirstFoldTweetsContainer extends React.Component {


  renderContentOnString = () => {
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
      return null
    }
    else if(visible && !animation){
      return (
        <div>
          {data.randomString}
        </div>
      )
    }else{
      return (
        <div>
          {this.typingEffect(data.randomString)}
        </div>
      )
    }
  }

  typingEffect = (string) => {
    let stringMaped = string
    .split("")
    .map((ele, index) => {
      let style = {
        animation: `${index}s typing ease-out`
      }
      return (
        <span key={index} style={style}>
          {ele}
        </span>
      )
    })
    return stringMaped;
  }



  render(){
    return this.renderContentOnString()
  }
}

export default FirstFoldTweetsContainer;
