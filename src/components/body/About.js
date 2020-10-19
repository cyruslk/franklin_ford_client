import React from 'react';
import App from "../../App.css";
var parse = require('html-react-parser');


class About extends React.Component {

  constructor(props) {
   super(props);
   this.refsArray = [];
 };


  renderAboutContent = () => {
    if(!this.props.about){
      return null
    }
    let aboutMaped = this.props.about
    .map((ele, index) => {

      let parsedText = parse(ele.Body_text)

      let headlineToID = ele.Headline
      .replace(/<[^>]*>?/gm, '')
      .replace(/[^\w\s]|_/g, "")
      .replace(/\s+/g, " ")
      .toLowerCase()
      .split(" ").join("-")

      console.log(ele);

      return (
        <div
          id={headlineToID}
          className="about_container_main_master">
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
