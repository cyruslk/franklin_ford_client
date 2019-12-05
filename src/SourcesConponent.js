import React, { Component } from "react";
import './App.css';

class SourcesConponent extends Component {

  constructor() {
    super();
    this.state = {
      toggled: false
    }
  }

  componentDidMount(){

  }

  toggledBody = () => {
    this.setState({
      toggled: !this.state.toggled
    })
  }

  renderCell = () => {
    if(!this.props.ele){
      return null;
    };

    let ele = this.props.ele;
    let index = this.props.index;

    return(
      <div onClick={this.toggledBody} className="sources_container_main">
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
        dvfdvfdvfd
      </div>
    )
  }

  render() {
    return (
      <div>
        {this.renderCell()}
        {this.renderBody()}
      </div>
    );
  }
}

export default SourcesConponent;
