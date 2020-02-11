import React, { Component } from "react";
import App from "../App.css";

class SourcesComponentBody extends Component {


  componentDidMount(){
    console.log(this.props);
  }

  renderPDF = () => {

    return (
      <a>show PDF</a>
    )
  }

  renderContentLeft = () => {
    let data = this.props;
    return (
      <div>
        <h1>Main info: </h1>
        <h2>{data.ele.gsx$title.$t}</h2>
        {this.renderPDF()}
      </div>
    )
  }

  renderContentRight = () => {
    return (
      <div>
        tweets if there is
      </div>
    )
  }


  render() {
    if(!this.props){
      return null;
    }
    return (
      <div>
        {this.renderContentLeft()}
        {this.renderContentRight()}
      </div>
    );
  }
}

export default SourcesComponentBody;
