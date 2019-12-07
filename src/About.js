import React from 'react';
import App from "./App.css";


class About extends React.Component {


  renderAboutContent = () => {
    if(!this.props.mockDataCms){
      return null
    }
    let data = this.props.mockDataCms[0].about;
    let mapedData = data.map((ele, index) => {
      return (
        <div key={index}>
          <h1>{ele.title}</h1>
          <p>{ele.body}</p>
        </div>
      )
    })
    return mapedData;
  }

  render(){
    return (
      <div className="about_container">
        {this.renderAboutContent()}
      </div>
    );
  }
}

export default About;
