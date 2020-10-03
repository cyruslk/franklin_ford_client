import React, { Component, PropTypes } from 'react';
import styled, { css, keyframes } from 'styled-components';
import App from "../../App.css";


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

     let sourceMetadata = this.props.data.sourceMetadata;
     let twitterMetadata = this.props.data.twitterMetadata;

     let metaData = {
       sourceMetadata,
       twitterMetadata
     }


     let data = this.props.data.tweet;

     let visible = this.props.data.visible;
     return this.handleContentState(metaData, visible);
 }

  handleContentState = (metaData, visible) => {
    if(!visible){
      return this.hideDiv(metaData)
    }else{
      return this.makeDivVisible(metaData)
    }
  }

  hideDiv = (metaData) => {
    this.setState({
      formattedContent: ""
    })
  }

  makeDivVisible = (metaData) => {

    let sourceMetadata = metaData.sourceMetadata;
    let twitterMetadata = metaData.twitterMetadata;

    let formattedContent = () => {
      return (
        <div className="metadata_first_fold">
            <span>Author_name: {sourceMetadata.Author_name},</span>
            <span>PDF_name: {sourceMetadata.PDF_name},</span>
            <span>Tweet_created_at: {twitterMetadata.Tweet_created_at},</span>
            <span>Tweet_id_string: {twitterMetadata.Tweet_id_string}</span>
        </div>
      )
    }
    this.setState({
      formattedContent: formattedContent()
    }, () => {
      return this.props.updateScrollOnDivs()

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
