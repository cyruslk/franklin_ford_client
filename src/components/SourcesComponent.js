import React, { Component } from "react";
import SourcesComponentBody from "./SourcesComponentBody.js"
import App from "../App.css";

class SourcesConponent extends Component {

  constructor() {
    super();
    this.state = {
      canBeToggled: false,
      toggled: false,
      sourceId: null
    }
  }

  componentDidMount(){
    let ele = this.props.ele;
  }

  toggleContent = () => {
    this.setState({
      toggled: !this.state.toggled
    })
  }

  triggerIndicator = (bool) => {
    this.props.triggerIndicator(bool)
  }

  renderCell = () => {
    if(!this.props.ele){
      return null;
    };

    let ele = this.props.ele;
    let index = this.props.index;
    let titleFormatted = ele.gsx$title.$t;

    return(
      <div
      onMouseEnter={() => this.triggerIndicator(true)}
      onMouseLeave={() => this.triggerIndicator(false)}
      onClick={this.toggleContent}
      className="sources_container_main">
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
      </div>
    )
  }

  renderBody = () => {
    if(!this.state.toggled){
      return null;
    }
    return (
      <div>
        <SourcesComponentBody {...this.props}/>
      </div>
    )
  }

  render() {
    return (
      <div className="sources_container_main_container">
        {this.renderCell()}
        {this.renderBody()}
      </div>
    );
  }
}

export default SourcesConponent;
