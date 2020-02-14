import React, { Component } from "react";
import SourcesComponentBody from "./SourcesComponentBody.js"
import App from "../App.css";

class SourcesConponent extends Component {

  constructor() {
    super();
    this.state = {
      canBeToggled: false,
      title: null,
      toggled: false,
      sourceId: null,
      anchorTag: null,
      tweetsData: null
    }
  }

  componentDidMount(){
    if(this.props.ele && this.props.dbContent){

      let ele = this.props.ele;
      let title = ele.gsx$title.$t;
      let anchorTag = this.cleaningTheAnchorTag(title);
      this.setState({
        title,
        anchorTag
      }, () => {
        let dbContent = this.props.dbContent;
        return this.filterThroughDBToFindTweets(dbContent);
      })
    };
  }

  filterThroughDBToFindTweets = (dbContent) => {
    let title = this.state.title;
    let filtering =  dbContent.filter((ele) => {
      return ele.entry.selectedItem.source_title === title
    })
    this.setState({
      tweetsData: filtering
    })
  }

  cleaningTheAnchorTag = (stringToClean) => {
     let stringToLowerCase = stringToClean.toLowerCase();
     return stringToLowerCase.split("")
     .map((ele, index) => {
       if(ele === " "){
         return "-"
       }else{
         return ele;
       }
     }).join("");
   };


  toggleContent = () => {
    this.setState({
      toggled: !this.state.toggled
    })
  }

  triggerIndicator = (bool) => {
    this.props.triggerIndicator(bool, this.state.tweetsData)
  }

  renderCell = () => {
    if(!this.props.ele && !this.state.anchorTag){
      return null;
    };
    let ele = this.props.ele;
    let index = this.props.index;
    return(
      <div
      id={this.state.anchorTag}
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


  // this is a bit hacky
  renderBody = () => {
    if(!this.state.anchorTag){
      return null;
    }else{
      let anchorTagBody = `${this.state.anchorTag}_body`;
      if(this.state.toggled){
        return (
          <div>
            <SourcesComponentBody
              display={"block"}
              anchorTagBody={anchorTagBody}
              tweetsData={this.state.tweetsData}
              {...this.props}
             />
          </div>
        )
      }else{
        return (
          <div>
            <SourcesComponentBody
              display={"none"}
              anchorTagBody={anchorTagBody}
              tweetsData={this.state.tweetsData}
              {...this.props}
            />
          </div>
        )
      }
    }
  }

  render() {
    if(!this.state.tweetsData){
      return "loading"
    }else{
      return (
        <div className="sources_container_main_container">
          {this.renderCell()}
          {this.renderBody()}
        </div>
      );
    }
  }
}

export default SourcesConponent;
