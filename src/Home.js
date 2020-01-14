import React, { Component } from 'react';
import ReactContactForm from 'react-mail-form';
import axios from "axios";
import _ from "lodash";
import Typist from 'react-typist';
import { HashLink as Link } from 'react-router-hash-link';

import App from "./App.css";
import Canvas from "./Canvas.js"
import About from "./About.js";
import News from "./News.js";
import FirstFold from "./FirstFold.js";
import FirstImageFold from "./FirstImageFold.js";
import SourcesComponent from "./SourcesComponent.js"
import Sources from "./Sources.js";
import Who from "./Who.js";

var parse = require('html-react-parser');
var config = require('./config.js');
const mock_data_tweets = require("./mock_data_tweets.js");
const mock_data_cms = require("./mock_data_cms.js");

class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      mockDataTweets: _.reverse(mock_data_tweets),
      spreadsheetData: null,
      typistIndex: 0,
      about: null,
      whos: null,
      news: null,
      acknowledgments: null,
      windowScroll: 0,
      scrolled: 0
    };
  }

  componentDidMount(){

    window.addEventListener('scroll', this.listenToScroll)

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

    //call the cms routes here
    fetch("https://franklin-ford-cms.herokuapp.com/abouts")
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        this.setState({
          about: data
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


    fetch("https://franklin-ford-cms.herokuapp.com/mains")
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        this.setState({
          intro: data
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


  listenToScroll = () => {
    const windowScroll = document.body.scrollTop || document.documentElement.scrollTop
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight
    const scrolled = windowScroll / height;
    this.setState({
      windowScroll,
      scrolled
    })
  }

renderMenu = () => {
  return (
    <div className="sticky_container">
        <div>
            <span className="first">@FranklinFordBot</span>
            <Link smooth to={`${window.location.pathname}#about`}><span>1. About</span></Link>
            <Link smooth to={`${window.location.pathname}#sources`}><span>2. Sources</span></Link>
            <Link smooth to={`${window.location.pathname}#news`}><span>3. News</span></Link>
            <Link smooth to={`${window.location.pathname}#who`}><span>4. Who</span></Link>
            <Link smooth to={`${window.location.pathname}#colophon`}><span>5. Colophon</span></Link>
            <Link smooth to={`${window.location.pathname}#contact`}><span className="last">6. Contact</span></Link>
        </div>
    </div>
  )
}

// change this from the CMS?
renderIntroText = () => {
  if(!this.state.intro){
    return null;
  }
  let intro = this.state.intro;


  return (
    <div className="main_container">
      <div className="info_text_container">
        <p>
          <span>
            {parse(intro[0].headline)}
          </span>
        </p>
        <p>
            {parse(intro[0].Body_text)}
        </p>
      </div>
    </div>
  )
};

renderBackgroundImagesGroup1 = () => {
  if(this.state.windowScroll > 3000
    && this.state.windowScroll < 6000){
    return (
      <section className="group_1">
        <img className="small" src="https://res.cloudinary.com/www-c-t-l-k-com/image/upload/v1573080265/ford/f_f_2.svg" />
        <img className="small" src="https://res.cloudinary.com/www-c-t-l-k-com/image/upload/v1573080265/ford/f_f_3.svg" />
        <img className="big" src="https://res.cloudinary.com/www-c-t-l-k-com/image/upload/v1573080265/ford/f_f_4.svg" />
      </section>
    )
  }else{
    return null
  }
}

renderBackgroundImagesGroup2 = () => {
  if(this.state.windowScroll > 4500
    && this.state.windowScroll < 8000){
      return (
        <section className="group_2">
          <img className="small" src="https://res.cloudinary.com/www-c-t-l-k-com/image/upload/v1578910716/ford/5-02-02.svg" />
        </section>
      )
    }
}

renderBackgroundImagesGroup3 = () => {
  if(this.state.windowScroll > 4000
    && this.state.windowScroll < 7000){
      return (
        <section className="group_3">
          <img className="big" src="https://res.cloudinary.com/www-c-t-l-k-com/image/upload/v1578914029/ford/7-02.svg" />
          <img className="small" src="https://res.cloudinary.com/www-c-t-l-k-com/image/upload/v1578914029/ford/6-02.svg" />
        </section>
      )
    }
}

renderBackgroundImagesGroup4 = () => {
  if(this.state.windowScroll > 2000
    && this.state.windowScroll < 5000){
      return (
        <section className="group_4">
          <img className="big" src="https://res.cloudinary.com/www-c-t-l-k-com/image/upload/v1578915177/ford/9-02.svg" />
          <img className="small" src="https://res.cloudinary.com/www-c-t-l-k-com/image/upload/v1578915177/ford/8-02-02.svg" />
        </section>
      )
    }
};

renderBackgroundImagesGroup5 = () => {
  if(this.state.windowScroll > 6500
    && this.state.windowScroll < 12000){
      return (
        <section className="group_5">
          <img className="big" src="https://res.cloudinary.com/www-c-t-l-k-com/image/upload/v1575927998/franklin_ford/1.svg" />
        </section>
      )
    }
}


renderBackgroundImagesGroup6 = () => {
  if(this.state.windowScroll > 6500
    && this.state.windowScroll < 14000){
      return (
        <section className="group_6">
          <img className="big" src="https://res.cloudinary.com/www-c-t-l-k-com/image/upload/v1578940980/ford/10-02-02.svg" />
        </section>
      )
    }
}


renderBackgroundImagesGroup7 = () => {
  if(this.state.windowScroll > 7000
    && this.state.windowScroll < 7600){
      return (
        <section className="group_7">
          <img className="big" src="https://res.cloudinary.com/www-c-t-l-k-com/image/upload/v1579010050/ford/15-02-02-02.svg" />
        </section>
      )
    }
}

renderBackgroundImagesGroup8 = () => {
  if(this.state.windowScroll > 0
    && this.state.windowScroll < 820){
      return (
        <section className="group_8">
          <img className="big" src="https://res.cloudinary.com/www-c-t-l-k-com/image/upload/v1575929180/franklin_ford/4.svg" />
        </section>
      )
    }
}




renderBackgroundImagesOnScreen = () =>  {
  return (
    <div className="background_images_container">
      {this.renderBackgroundImagesGroup1()}
      {this.renderBackgroundImagesGroup2()}
      {this.renderBackgroundImagesGroup3()}
      {this.renderBackgroundImagesGroup4()}
      {this.renderBackgroundImagesGroup5()}
      {this.renderBackgroundImagesGroup6()}
      {this.renderBackgroundImagesGroup8()}
    </div>
  )
}

renderFirstFold = () => {
  return <FirstFold {...this.state} />
}

renderSources = () => {
  return <Sources {...this.state} />
}

renderImagesFold = () => {
  return <FirstImageFold {...this.state} />
}

renderAbout = () => {
  return <About {...this.state} />
};

renderNews = () => {
  return <News {...this.state} />
}


renderEmailForm = () => {
  return (
    <div>
      <div className="main_container">
        <div id="contact" className="contact_container">
          <ReactContactForm
            className="email_form"
            titlePlaceholder="Title..."
            contentsPlaceholder="Content..."
            buttonText="SEND EMAIL"
            to="address@gmail.com"
           />
        </div>
      </div>
    </div>
  )
}


  render(){
    return (
      <div>
      <p style={{position: "fixed"}}>{this.state.windowScroll}</p>
      {this.renderBackgroundImagesOnScreen()}
      {this.renderMenu()}
      {this.renderFirstFold()}
      {this.renderIntroText()}
      {this.renderImagesFold()}
      {this.renderAbout()}
      {this.renderSources()}
      {this.renderNews()}
      {this.renderEmailForm()}
      </div>
    )
  }

}

export default Home;
