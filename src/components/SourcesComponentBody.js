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
    console.log(data);

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

    // get the props here


    return (
      <div>
        <div className="pdf_source_component">
          <div>
            <span>SEE THE PDF ONLINE</span>
          </div>
          <div>
            <span>SEE THE OCR'ED TEXT ONLINE</span>
          </div>
        </div>
      </div>
    )
  }

  renderTweetIfAny = () => {

    // to change with real props;
    let tweetIDProps = ["1226738250389344258", "1226738250389344258"];

    let tweetIdPropsMaped = tweetIDProps.map((ele, index) => {
      return (
        <div key={index}>
          <Tweet tweetId={ele}/>
        </div>
      )
    });
    return (
      <div>
        {tweetIdPropsMaped}
      </div>
    )
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
          <section>
            {this.renderContentPDF()}
          </section>
          <section>
            {this.renderTweetIfAny()}
          </section>
      </div>
    );
  }
}

export default SourcesComponentBody;
