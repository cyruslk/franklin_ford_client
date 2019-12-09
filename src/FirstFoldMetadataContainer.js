import React, { Component, PropTypes } from 'react';
import styled, { css, keyframes } from 'styled-components';
import App from "./App.css";


class FirstFoldMetadataContainer extends React.Component {


  constructor(props) {
   super(props);
   this.state = {
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
}

 renderContent = () => {

   console.log(this.props, "here");

     let sourceMetadata = this.props.data.sourceMetadata;
     let twitterMetadata = this.props.data.twitterMetadata;

     let data = this.props.data.tweet;

     let visible = this.props.data.visible;
     return this.handleContentState(data, visible);
 }

  handleContentState = (data, visible) => {
    if(!visible){
      return this.hideDiv(data)
    }else{
      return this.makeDivVisible(data)
    }
  }

  hideDiv = (data) => {
    this.setState({
      formattedContent: ""
    })
  }

  makeDivVisible = (data) => {
    let formattedContent = () => {
      return (
        <div>
          <span>
            {data}
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


export default FirstFoldMetadataContainer;
