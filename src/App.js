import React, { Component } from "react";
import './App.css';
import D3Component from "./D3Component.js"
import 'react-typed/dist/animatedCursor.css';
import axios from "axios";
import Typist from 'react-typist';
var _ = require('lodash');
var config = require('./config.js');
const mock_data = require("./mock_data.js")

class App extends Component {
  constructor() {
    super();
    this.state = {
      rawData: null,
      cmsData: null,
      typistIndex: 0
    }
  }

  componentDidMount(){
      // axios.get(config.dbApi)
      // .then((response) => {
      //   this.setState({
      //     rawData: _.reverse(mock_data)
      //     // rawData: _.reverse(response.data).filter(ele => ele.masterData.twitterData.twitter_text !== null)
      //   })
      // })
      // .catch((err) => {
      //   console.log(err);
      // })

      this.setState({
        rawData: _.reverse(mock_data)
      })

      axios.get(config.preFix + config.sheetID + config.postFix)
      .then((response) => {
        this.setState({
          cmsData: response.data.feed.entry
        })
      })
      .catch((err) => {
        console.log(err);
      })
  }

  next = () => {
    this.setState({
      typistIndex: this.state.typistIndex+1
    }, () => {
      if(this.state.typistIndex === this.state.rawData.length-1){
        this.setState({
          typistIndex: 0
        })
      }
    })
  }


  preStringTyped = () => {
    // alert("typed")
  }


  randomlySelectElements = (number, array) => {
    let shuffedArray = _.shuffle(array);
    let selectedEle = shuffedArray.slice(0, number);
    return selectedEle;
  }


  displayTweets = () => {
    if(!this.state.rawData){
      return null
    }else{
      let getRandomTweetsStrings = () => {
          return this.randomlySelectElements(10, this.state.rawData)
          .map((ele, index) => {
            return ele.randomString
            // for the real data when the db will be cleaned:
            // return ele.masterData.randomString
          })
      }

      return (
        <Typist
          key={this.state.typistIndex}
          avgTypingDelay={100}
          onLineTyped={this.next}>
          {this.state.rawData.map(word => ([
            <span className="typed_span">{word.randomString}</span>,
            <Typist.Backspace count={word.randomString.length} delay={1000} />,
          ]))}
        </Typist>
      )
    }
  }

  displayMetadataFromTweets = () => {

    if(!this.state.rawData){
      return null;
    }

    let returnTweetMetadata = () => {
      return (
        <div>
          <span>Tweet_created_at:  {this.state.rawData[this.state.typistIndex].twitterData.Tweet_created_at}</span>
          <span>Tweet_id_string: {this.state.rawData[this.state.typistIndex].twitterData.Tweet_id_string}</span>
        </div>
      )
    }

    let returnCMSMetadata = () => {
      return (
        <div>
          <span>Author_name: {this.state.rawData[this.state.typistIndex].sourceData.Author_name}</span>
          <span>PDF_name: {this.state.rawData[this.state.typistIndex].sourceData.PDF_name}</span>
        </div>
      )
    }

    return (
      <div>
          {returnTweetMetadata()}
          {returnCMSMetadata()}
      </div>
    )
  }

  displayMenuSticky = () => {
    return (
      <div className="sticky_container">
        <ul>
          <li><span>About</span></li>
          <li><span>Sources</span></li>
          <li><span>Who</span></li>
          <li><span>News</span></li>
          <li><span>Acknowledgments</span></li>
        </ul>
      </div>
    )
  }

  renderInfoText = () => {
    return (
      <div className="info_text_container">
        <p>
          <span>
              In this case, the primacy is with the news organization per se.
          </span>
        </p>
        <p>@franklinfordbot is a bot that tweets excerpts from the writings of Franklin Ford. An intriguing figure in the history of American journalism, Franklin Ford (1849-1918) is mostly known for his association with John Dewey, with whom he tried to launch Thought News, a "philosophical newspaper" that never saw the light of day. But beyond that footnote in Dewey's career and in journalism history, Ford's role and his contribution need to be revisited, not only because he was a fascinating media theorist and a compelling writer, but also because reading Ford is a jumping-off point for experimentations and theoretical developments that speak to contemporary media problems. In that regard, @franklinfordbot is an experiment, a remediation of Franklin Ford.</p>
      </div>
    )
  }

  renderSources = () => {

    if(!this.state.cmsData){
      return null;
    }

    let cmsData = this.state.cmsData;
    let cellSources = cmsData.map((ele, index) => {
      return (
        <div key={index} className="sources_cell_container">
          <div className="sources_cell_container_first">
            <div className="year">
              <span>{ele.gsx$dateyear.$t}</span>
            </div>
          </div>
          <div className="sources_cell_container_second">
            <div className="title">
              <span>{ele.gsx$title.$t}</span>
            </div>
            <div className="published_in">
              <span>{ele.gsx$publishedin.$t}</span>
            </div>
          </div>
          <div className="sources_cell_container_third">
            <div className="lieu">
              <span>{ele.gsx$lieu.$t}</span>
            </div>
          </div>
        </div>
      )
    })

    return (
      <div className="source_container">
        <p><span>Sources</span></p>
        {cellSources}
      </div>
    )
  }

  renderChatBox = () => {
    return (
      <div className="chatbox_container">
        ?
      </div>
    )
  }

  renderBackgroundImagesOnScreen = () =>  {
    return (
      <div className="background_images_container">
        <img src="https://res.cloudinary.com/www-c-t-l-k-com/image/upload/v1573080265/ford/f_f_2.svg" />
        <img src="https://res.cloudinary.com/www-c-t-l-k-com/image/upload/v1573080265/ford/f_f_3.svg" />
      </div>
    )
  }

  renderD3Visualisations = () => {
    return (
      <D3Component {...this.state}/>
    )
  }

  renderD3VisualisationsMenu = () => {
    return (
      <div className="visualisation_menu">
        <div><span>DATE</span></div>
        <div><span>LOCATION</span></div>
        <div><span>NEW</span></div>
      </div>
    )
  }

  render(){
      if(!this.state.rawData){
        return (
          <div className="loading_screen">
            LOADING THE BOT <span>.</span><span>.</span><span>.</span>
          </div>
        )
      }else{
        return (
          <div>
          {this.renderBackgroundImagesOnScreen()}
          <div className="main_container">
            {this.displayMenuSticky()}
            <main className="typed_container">
              <div>
                {this.displayTweets()}
              </div>
            </main>
            <section className="metadata_typed_tweet_section">
              {this.displayMetadataFromTweets()}
            </section>
              {this.renderInfoText()}
              <div>
                {this.renderD3VisualisationsMenu()}
                {this.renderD3Visualisations()}
              </div>
              {this.renderSources()}
              {this.renderChatBox()}
          </div>
          </div>
        )
      }
    }
  }
export default App;
