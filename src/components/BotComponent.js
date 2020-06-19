import React from 'react';
import ReactInterval from 'react-interval';
import { HashLink as Link } from 'react-router-hash-link';
import BotComponentSpan from "./BotComponentSpan"
import App from "../App.css";


class BotComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInput: "",
      predictionsFromBot: "What is the future of journalism? There has never been a better time to be a journalist. However, our job is far from over. The internet has created a plethora of new companies, organizations, and news services. New institutions — especially younger ones — that have been built on the same ideals, values and principles are springing up all the time. If we're to maintain the powerful position of American journalism, we'll have to be ready to evolve along with the technology we use and our audience's demands. It's time for us to think differently. There's no longer a need for a single standard — no longer do we need a golden age. Instead, we have the opportunity to uphold the same values of truth, credibility, and independence that led"
    };
  };

  handleChange = (event) => {
    this.setState({
      userInput: event.target.value
    })
  }

   renderInputQuestion = () => {
     return (
       <div className="bot_input_question_section">
          <input
            value={this.state.userInput}
            onChange={this.handleChange}
            placeholder={"here"}/>
            <button>send here</button>
       </div>
     );
   };

   renderPredictionTransformer = () => {
     if(!this.state.predictionsFromBot){
       return null;
     }
     return (
       <div className="bot_input_prediction_section">
          <p>{this.state.predictionsFromBot}</p>
       </div>
     );
   };

   renderClosingDiv = () => {
     return (
       <div>
          <span onClick={this.props.closeChatBot}>X</span>
       </div>
     )
   }


  render() {

    return (
      <div className="bot_component_container">
        {this.renderClosingDiv()}
        {this.renderInputQuestion()}
        {this.renderPredictionTransformer()}
      </div>
    );
  }
};

export default BotComponent;
