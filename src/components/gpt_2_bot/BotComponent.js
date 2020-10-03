import React from 'react';
import emailjs from 'emailjs-com';
import BotComponentInput from "./BotComponentInput";
import Typist from 'react-typist';
import config from "../../config.js"
import App from "../../App.css";


class BotComponent extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      displayPrediction: null,
      sentQuestion: null,
      randomLoadingMessage: null,
    };
  };

  componentDidMount(){

    let loadingMessages = [
      "Please wait while we transfer your request by telegraph.",
      "Connecting to the central bureau in New York by telephone.",
    ];

    var randomLoadingMessage = loadingMessages
    [Math.floor(Math.random()*loadingMessages.length)];

    this.setState({
      randomLoadingMessage
    })
  }

  displayPrediction = (data) => {
    let displayPrediction = data;
    this.setState({
      displayPrediction
    })
  };


  togglingLoadingSection = (sentQuestion) => {
    this.setState({
      sentQuestion
    })
  };


  displayLoadingMessages = () => {
    if(!this.state.randomLoadingMessage){
      return null;
    }
    return (
      <p>{this.state.randomLoadingMessage}</p>
    )
  };


  renderBotPrediction = () => {
    if(!this.state.displayPrediction
      && this.state.sentQuestion){
      return (
        <div className="bot_input_prediction_section">
        <Typist
          avgTypingDelay={200}
          cursor={false}>
          {this.displayLoadingMessages()}
        </Typist>
        </div>
      )
    }else if(this.state.displayPrediction && this.state.sentQuestion){
      return (
        <div className="bot_input_prediction_section">
          {this.state.displayPrediction}
        </div>
      )
    }else{
      return null;
    }
   };


   sendEntryViaEmail = () => {
     if(!this.state.displayPrediction || !this.state.sentQuestion){
         return;
     }

     var service_id = config.emailJs_service_id;
     var template_id = config.emailJs_template_id;
     var user_id = config.emailJs_user_id;

     emailjs.send(service_id, template_id, this.state, user_id)
     .then((response) => {
       console.log("email sent");
     }, (err) => {
       console.log(err);
     })
   };

    closeChatBot = () => {
     this.sendEntryViaEmail();
     return this.props.closeChatBot();
    };

    renderBotInputComponent = () => {
      return (
        <BotComponentInput
          closeChatBot={this.closeChatBot}
          displayPrediction={this.displayPrediction}
          togglingLoadingSection={this.togglingLoadingSection}
        />
      )
    };

  render(){
    return(
      <div className="bot_component_container">
        {this.renderBotInputComponent()}
        {this.renderBotPrediction()}
      </div>
    )
  }
};

export default BotComponent;
