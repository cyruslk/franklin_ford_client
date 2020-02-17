import React, { Component } from 'react';
import ReactContactForm from 'react-mail-form';
import axios from "axios";
import _ from "lodash";
import { HashLink as Link } from 'react-router-hash-link';

import {
  Stitch,
  AnonymousCredential,
  RemoteMongoClient
} from "mongodb-stitch-browser-sdk";


import App from "./App.css";
import About from "./components//About.js";
import News from "./components//News.js";
import FirstFold from "./components//FirstFold.js";
import FirstImageFold from "./components//FirstImageFold.js";
import SourcesComponent from "./components//SourcesComponent.js"
import Sources from "./components//Sources.js";
import Who from "./components//Who.js";

var parse = require('html-react-parser');
var scrollToElement = require('scroll-to-element');
var config = require('./config.js');
const mock_data_tweets = require("./mock_data/mock_data_tweets.js");
const mock_data_background_imgs = require("./mock_data/mock_data_background_imgs.js");
const mock_data_fold_imgs = require("./mock_data/mock_data_fold_imgs.js");


class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      menu: ["about", "sources", "news", "acknowledgments", "contact"],
      mockDataTweets: _.shuffle(mock_data_tweets),
      mockDataImages: _.shuffle(mock_data_fold_imgs),
      dbContent: null,
      tweetSamples: null,
      spreadsheetData: null,
      typistIndex: 0,
      about: null,
      whos: null,
      news: null,
      acknowledgments: null,
      windowScroll: 0,
      scrolled: 0,
      targetedSource: null,
      loadingScreen: false
    };
  }

  componentDidMount(){
    window.addEventListener('scroll', this.listenToScroll);
    // Initialize the App Client
    this.client = Stitch.initializeDefaultAppClient("ford_entries-rjcyp");
    const mongodb = this.client.getServiceClient(
      RemoteMongoClient.factory,
      "mongodb-atlas"
    );
    this.db = mongodb.db("franklin-ford-database");
    this.retrieveDataFromDBOnLoad();


    let spreadsheetAPI = config.preFix + config.sheetID + config.postFix;
    axios.get(spreadsheetAPI)
      .then((response) => {
        this.setState({
          spreadsheetData: response.data.feed.entry
        })
      }).catch((err) => {
      console.log(err);
    });


    //call the cms routes here
    fetch("https://franklin-ford-cms.herokuapp.com/abouts")
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        this.setState({
          about: data
        })
    });

    fetch("https://franklin-ford-cms.herokuapp.com/whos")
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        this.setState({
          whos: data
        })
    });


    fetch("https://franklin-ford-cms.herokuapp.com/mains")
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        this.setState({
          intro: data
        })
    });

    fetch("https://franklin-ford-cms.herokuapp.com/tweetsamples")
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        this.setState({
          tweetSamples: data
        })
    });

    fetch("https://franklin-ford-cms.herokuapp.com/acknowledgments")
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        this.setState({
          acknowledgments: data
        })
    });

    fetch("https://franklin-ford-cms.herokuapp.com/news")
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        this.setState({
          news: data
        })
    });


    this.makeDivVisible();

  };

  retrieveDataFromDBOnLoad = () => {
  // Anonymously log in and display comments on load
    this.client.auth
      .loginWithCredential(new AnonymousCredential())
      .then(this.retrieveDataFromDB)
      .catch(console.error);
  }


  retrieveDataFromDB = () => {
     // query the remote DB and update the component state
     this.db
       .collection("ford_twitter")
       .find({}, { limit: 1000 })
       .asArray()
       .then(dbContent => {
         this.setState({dbContent});
       });
    }

  makeDivVisible = () => {
    window.location.hash = window.decodeURIComponent(window.location.hash);
    let hash = window.location.hash;
    if(hash.length > 0){
      this.setState({
        loadingScreen:true
      })
      setTimeout(() => {
        this.setState({
          loadingScreen:false
        })
        window.location.hash = window.decodeURIComponent(window.location.hash);
        document.querySelector(`${window.location.hash}`).scrollIntoView();
        document.querySelector(`${window.location.hash}_body`).style.display = "block";
      }, 2000);
    }else{
      return;
    }
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


  reloadThePage = () => {
    window.scroll(0,0)
    window.location.reload()
  }


renderMenu = () => {
  return (
    <div className="sticky_container">
        <div>
            <span onClick={this.reloadThePage} className="first">@FranklinFordBot</span>
            <Link smooth to={`${window.location.pathname}#about`}><span>1. About</span></Link>
            <Link smooth to={`${window.location.pathname}#sources`}><span>2. Sources</span></Link>
            <Link smooth to={`${window.location.pathname}#news`}><span>3. News</span></Link>
            <Link smooth to={`${window.location.pathname}#who`}><span>4. Who</span></Link>
            <Link smooth to={`${window.location.pathname}#acknowledgments`}><span>5. Acknowledgments</span></Link>
            <Link smooth to={`${window.location.pathname}#contact`}><span className="last">6. Contact</span></Link>
        </div>
    </div>
  )
}

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


// will optimze this

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
          <img className="big" src="https://res.cloudinary.com/www-c-t-l-k-com/image/upload/v1579129244/ford/155_master-02.svg" />
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
  if(this.state.windowScroll > 500
    && this.state.windowScroll < 2000){
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

renderBackgroundImagesGroup9 = () => {
  if(this.state.windowScroll > 7800
    && this.state.windowScroll < 14000){
      return (
        <section className="group_9">
        <img className="small" src="https://res.cloudinary.com/www-c-t-l-k-com/image/upload/v1579128256/ford/13_master-02.svg" />
        <img className="small" src="https://res.cloudinary.com/www-c-t-l-k-com/image/upload/v1579129030/ford/16_master-02.svg" />
        </section>
      )
    }
}


renderBackgroundImagesGroup10 = () => {
  if(this.state.windowScroll > 7800
    && this.state.windowScroll < 14000){
      return (
        <section className="group_10">
        <img className="small" src="https://res.cloudinary.com/www-c-t-l-k-com/image/upload/v1579129829/ford/1444_master-02.svg" />
        </section>
      )
    }
}

renderBackgroundImagesGroup11 = () => {
  if(this.state.windowScroll > 16000
    && this.state.windowScroll < 19000){
      return (
        <section className="group_11">
        <img className="small" src="https://res.cloudinary.com/www-c-t-l-k-com/image/upload/v1579129829/ford/1444_master-02.svg" />
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
      {this.renderBackgroundImagesGroup7()}
      {this.renderBackgroundImagesGroup8()}
      {this.renderBackgroundImagesGroup9()}
      {this.renderBackgroundImagesGroup10()}
      {this.renderBackgroundImagesGroup11()}
    </div>
  )
}

renderFirstFold = () => {
  return <FirstFold
            {...this.state}
          />
};

renderSources = () => {
  if(!this.state.dbContent){
    return null;
  }
  return (
    <Sources
    {...this.state}
    />
  )
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
      <div
      id="main_containter_contact"
      className="main_container">
        <div id="contact" className="contact_container">
          <ReactContactForm
            className="email_form"
            titlePlaceholder="Title..."
            contentsPlaceholder="Content..."
            buttonText="SEND EMAIL"
            to="juliette.de.maeyer@umontreal.ca"
           />
        </div>
      </div>
    </div>
  )
}

renderWho = () => {
  if(!this.state.whos){
    return null;
  }

  let whosMaped = this.state.whos
  .map((ele, index) => {
    return(
        <section>
          <div>
            <h1>{parse(ele.Name)}</h1>
          </div>
          <div>
            <p>{parse(ele.Coordinates)}</p>
          </div>
        </section>
    )
  })

  return (
    <div className="main_container">
      <div id="who" className="who_container">
        {whosMaped}
      </div>
    </div>
  )
}

renderAcknowledgments = () => {

  if(!this.state.acknowledgments){
    return null
  }

  let acknowledgmentsMaped = this.state.acknowledgments
  .map((ele, index) => {
    return (
      <section>
        <h1>{parse(ele.headline)}</h1>
        <p>{parse(ele.Body_text)}</p>
      </section>
    )
  })

  return (
    <div className="main_container">
      <div id="acknowledgments" className="acknowledgments_container">
        {acknowledgmentsMaped}
      </div>
    </div>
  )
};

renderLargeImage = () => {
  return (
    <div className="large_image_section">
      <img src="https://res.cloudinary.com/dvtjd0zw1/image/upload/v1581969521/website_add/2_1904_1908_Ford-Canfield-39_qbamyx.jpg" />
    </div>
  )
};

  render(){
      if(this.state.loadingScreen){
        return (
          <div className="loading_screen">
            <span>Pulling the content from the database</span>
          </div>
        )
      }else{
        return (
          <div>
          {this.renderBackgroundImagesOnScreen()}
          {this.renderMenu()}
          {this.renderFirstFold()}
          {this.renderIntroText()}
          {this.renderLargeImage()}
          {this.renderAbout()}
          {this.renderSources()}
          {this.renderNews()}
          {this.renderImagesFold()}
          {this.renderWho()}
          {this.renderAcknowledgments()}
          {this.renderEmailForm()}
          </div>
        )
      }
  }

}

export default Home;
