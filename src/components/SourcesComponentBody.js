import React, { Component } from "react";
import { Tweet } from 'react-twitter-widgets'
import App from "../App.css";

class SourcesComponentBody extends Component {

  renderPDF = () => {
    return (
      <a>show PDF</a>
    )
  }
  renderContentMetadata = () => {
    let data = this.props;
    let ele = this.props.ele;

    return (
      <div className="metadata_source_component">
          <span>&#123;</span>
          <span>gsx$title: {ele.gsx$title.$t}</span>
          <span>gsx$authorname: {ele.gsx$authorname.$t}</span>
          <span>gsx$dateyear: {ele.gsx$dateyear.$t}</span>
          <span>gsx$fulldateifknown: {ele.gsx$fulldateifknown.$t}</span>
          <span>gsx$publishedin: {ele.gsx$publishedin.$t}</span>
          <span>gsx$pages: {ele.gsx$pages.$t}</span>
          <span>gsx$lieu: {ele.gsx$lieu.$t}</span>
          <span>gsx$filenamepdf: {ele.gsx$filenamepdf.$t}</span>
          <span>gsx$filenametxt: {ele.gsx$filenametxt.$t}</span>
          <span>gsx$notes: {ele.gsx$notes.$t}</span>
          <span>gsx$manuscrittapuscrit: {ele.gsx$manuscrittapuscrit.$t}</span>
          <span>gsx$archive: {ele.gsx$archive.$t}</span>
        <span>&#123;</span>
      </div>
    )
  }


  renderContentPDF = () => {

    let ele = this.props.ele;
    let cloudinaryPDFLink = ele.gsx$pdfoncloudinary.$t;
    let cloudinaryTxtLink = ele.gsx$txtoncloudinary.$t;
    let isAllowedOnWebsite = ele.gsx$isallowedonwebsite.$t;
    if(isAllowedOnWebsite === "TRUE"){
      return (
        <section>
        <div>
          <div className="pdf_source_component">
            <div>
              <a href={cloudinaryPDFLink} target="_blank">
                <span>SEE THE PDF ONLINE</span>
              </a>
            </div>
            <div>
              <a href={cloudinaryTxtLink} target="_blank">
                <span>SEE THE OCR'ED TEXT ONLINE</span>
              </a>
            </div>
          </div>
        </div>
        </section>
      )
    }else{
      return null;
    }
  }


  // change this.
  renderTweetIfAny = () => {
    let tweetsData = this.props.tweetsData;
    let tweetsDataLength = tweetsData.length;
    if(!tweetsData || tweetsDataLength === 0){
        return null;
      }else{
        return this.mapThroughTweets(tweetsData)
      }
  }

  mapThroughTweets = (listOfTweets) => {
    // console.log(listOfTweets.length, "length");
    // console.log(listOfTweets);
    return listOfTweets.map((ele, index) => {
      return (
        <div>
        </div>
      )
    })
  }

  render() {
    if(!this.props){
      return null;
    }
    return (
      <div
        className="source_container_body"
        id={this.props.anchorTagBody}
        style={{display: this.props.display}}>
          <section>
            {this.renderContentMetadata()}
          </section>
            {this.renderContentPDF()}
            {this.renderTweetIfAny()}
      </div>
    );
  }
}

export default SourcesComponentBody;
