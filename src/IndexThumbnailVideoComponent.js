import React, { Component } from 'react';
import styled, { keyframes } from 'styled-components'
import {
  Link,
} from 'react-router-dom';
import '../App.css';

  class IndexThumbnailVideoComponent extends Component {

    constructor(props) {
       super(props);
       this.state = {
         onHover: false,
         ele: null,
         eleIndex: null,
       };
     };

     componentDidMount(){

       let ele = this.props.ele;
       let index = this.props.index;
       this.setState({
         ele: ele,
         eleIndex: index
       })
     };

    toggleHoverIndexImage = (index) => {
       this.props.toggleHoverIndexImage(index);
    };

    resetThumbnailLoop = (index) => {
      this.props.resetThumbnailLoop(index);
    }

    renderProjectCaptionSection = (projectName) => {
        let projectNameSplited = projectName.split(" - ");

        return (
          <div className="index_image_component_caption">
            <h1>{projectNameSplited[0]}</h1>
            <h1>{projectNameSplited[1]}</h1>
          </div>
        )
      }


    renderThumbnail = () => {
      let ele = this.state.ele;
      let index = this.state.eleIndex;
      if(!ele || !index){
        return null;
      };

      let projectRoutePlaceholder = `/${ele.type}/${ele.slug}`;    
      const toggleVisibility = keyframes`
        0%{
          opacity:0;
          visibility: hidden
        }
         99.9% {
           opacity:0;
           visibility: hidden

         }
         100% {
           opacity:1;
           visibility: visible
         }
      `;

      const Div = styled.div`
       animation-delay: 0.5s;
       animation: ${toggleVisibility} ${index}s linear;
       animation-iteration-count: 1;`

       let id = `videoThumbnail_${index}`;

      return (
        <Link to={projectRoutePlaceholder}>
          <Div
          onAnimationEnd={()=>this.resetThumbnailLoop(index)}
          className="index_image_component_container">
          <div
            id={id}
            className="index_image_component">
            <video
              onMouseEnter={() => this.toggleHoverIndexImage(index)}
              onMouseLeave={() => this.toggleHoverIndexImage(null)}
              autoPlay
              loop
              muted>
                <source
                  src={ele.videoThumbnail}
                  type="video/mp4" />
             </video>
             {this.renderProjectCaptionSection(ele.titlePlaceholder)}
          </div>
          </Div>
        </Link>
      )
    };

    render() {
      return(
        <div style={{display: "inline"}}>
          {this.renderThumbnail()}
        </div>
      );

    };
  }

export default IndexThumbnailVideoComponent;
