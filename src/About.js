import React from 'react';
import App from "./App.css";
var parse = require('html-react-parser');


class About extends React.Component {

  renderAboutContent = () => {
    if(!this.props.about){
      return null
    }
    let aboutMaped = this.props.about
    .map((ele, index) => {
      let parsedText = parse(ele.Body_text)
      return (
        <div>
          <div className="about_container_main">
            <h1>{parse(ele.Headline)}</h1>
            <p>{parsedText}</p>
          </div>
        </div>
      )
    })

    return (
      <div>
        {aboutMaped}
      </div>
    )
  }




  render(){
    return (
      <div className="main_container">
        <div id="about" className="about_container">
          {this.renderAboutContent()}
        </div>
      </div>
    );
  }
}

export default About;
