import React, { Component } from 'react';
import axios from "axios";
import _ from "lodash";
import Typist from 'react-typist';
import { HashLink as Link } from 'react-router-hash-link';

import App from "./App.css"
import About from "./About.js";
import FirstFold from "./FirstFold.js"
import Sources from "./Sources.js";
import Who from "./Who.js";

var config = require('./config.js');
const mock_data_tweets = require("./mock_data_tweets.js");
const mock_data_cms = require("./mock_data_cms.js");

class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      mockDataTweets: _.reverse(mock_data_tweets),
      mockDataCms: mock_data_cms,
      spreadsheetData: null,
      typistIndex: 0,
      abouts: null,
      whos: null,
      news: null,
      acknowledgments: null
    };
  }

  componentDidMount(){

    // call to the spreadsheetAPI
    let spreadsheetAPI = config.preFix + config.sheetID + config.postFix;
    axios.get(spreadsheetAPI)
      .then((response) => {
        this.setState({
          spreadsheetData: response.data.feed.entry
        })
      }).catch((err) => {
      console.log(err);
    })

    // call the spreadsheet API;
    fetch(spreadsheetAPI)
    .then((response) => {
      console.log(response.json());
    })

    //call the cms routes here
    fetch("https://franklin-ford-cms.herokuapp.com/abouts")
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        this.setState({
          abouts: data
        })
    })

    fetch("https://franklin-ford-cms.herokuapp.com/whos")
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        this.setState({
          whos: data
        })
    })


    fetch("https://franklin-ford-cms.herokuapp.com/acknowledgments")
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        this.setState({
          acknowledgments: data
        })
    })

    fetch("https://franklin-ford-cms.herokuapp.com/news")
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        this.setState({
          news: data
        })
    })
  }


displayMenuSticky = () => {
return (
  <div className="sticky_container">
    <ul>
      <li><Link smooth to={`${window.location.pathname}#about`}><span>About</span></Link></li>
      <li><Link smooth to={`${window.location.pathname}#sources`}><span>Sources</span></Link></li>
      <li><Link smooth to={`${window.location.pathname}#who`}><span>Who</span></Link></li>
      <li><Link smooth to={`${window.location.pathname}#news`}><span>News</span></Link></li>
      <li><Link smooth to={`${window.location.pathname}#acknowledgments`}><span>Acknowledgments</span></Link></li>
    </ul>
  </div>
)
}

// change this from the CMS?
renderInfoText = () => {
  return (
    <div className="main_container">
      <div className="info_text_container">
        <p>
          <span>
              In this case, the primacy is with the news organization per se.
          </span>
        </p>
        <p>@franklinfordbot is a bot that tweets excerpts from the writings of Franklin Ford. An intriguing figure in the history of American journalism, Franklin Ford (1849-1918) is mostly known for his association with John Dewey, with whom he tried to launch Thought News, a "philosophical newspaper" that never saw the light of day. But beyond that footnote in Dewey's career and in journalism history, Ford's role and his contribution need to be revisited, not only because he was a fascinating media theorist and a compelling writer, but also because reading Ford is a jumping-off point for experimentations and theoretical developments that speak to contemporary media problems. In that regard, @franklinfordbot is an experiment, a remediation of Franklin Ford.</p>
      </div>
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

renderFirstFold = () => {
  return <FirstFold {...this.state} />
}


  render(){


    return (
      <div>
      {this.displayMenuSticky()}
      {this.renderFirstFold()}
      {this.renderInfoText()}
      </div>
    )
  }

}

export default Home;
