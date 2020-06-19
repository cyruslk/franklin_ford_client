import React from 'react';
import App from "../App.css";
var parse = require('html-react-parser');


class News extends React.Component {

  renderNewsContent = () => {
    if(!this.props.news){
      return null
    }

    let newsMaped = this.props.news
    .map((ele, index) => {
      let parsedText = parse(ele.Body_text)
      return (
        <div>
          <div className="about_container_main">
            <h1>{parse(ele.headline)}</h1>
            <span>{parse(ele.Date)}</span>
            <p>{parsedText}</p>
          </div>
        </div>
      )
    })

    return (
      <div>
        {newsMaped}
      </div>
    )
  }

  render(){
    return (
      <div className="main_container">
        <div id="news" className="news_container">
          {this.renderNewsContent()}
        </div>
      </div>
    );
  }
}

export default News;
