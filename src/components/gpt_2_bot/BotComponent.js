import React from 'react';
import emailjs from 'emailjs-com';
import BotComponentInput from "./BotComponentInput";
import config from "../../config.js"
import App from "../../App.css";


class BotComponent extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      displayPrediction: null,
      counter: 0,
      sentQuestion: null,
      loadingMessages: [
        "Please wait while we transfer your request by telegraph",
        "Connecting to the central bureau in New York by telephone",
        "Please wait while we transfer your request by telegraph",
        "Connecting to the central bureau in New York by telephone",
      ]
    };
  };

  displayPrediction = (data) => {
    let displayPrediction = data;
    this.setState({
      displayPrediction
    })
  };


  togglingLoadingSection = (sentQuestion) => {
    this.setState({
      sentQuestion
    }, () => {
      return this.initLoadingScreenCounter();
    })
  };

  resetPrediction = () => {
      return this.resetLoadingScreenCounter();
  };

  renderBotPrediction = () => {
    if(!this.state.displayPrediction
      && this.state.sentQuestion){
      return (
        <div className="bot_input_prediction_section">
          {this.displayLoadingMessages()}
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


   displayLoadingMessages = () => {
     return (
       <p>{this.state.loadingMessages[this.state.counter]}</p>
     )
   };


   // fixing this, very important.
   // ref: https://dev.to/dance2die/canceling-interval-in-react-52b5
    resetLoadingScreenCounter = () => {
      clearInterval(this.intervalID);
    };

   initLoadingScreenCounter = () => {
     this.intervalID = setInterval(this.updateStateCounter, 1000);
   };

    updateStateCounter = () => {
      let valueToResetCounter = this.state.loadingMessages.length;
      this.setState({
        counter: this.state.counter+1
      }, () => {
        if(this.state.counter === valueToResetCounter){
          this.setState({
            counter: 0
          })
        }
      })
    }

    closeChatBot = () => {
     this.sendEntryViaEmail();
     return this.props.closeChatBot();
    };

    renderBotInputComponent = () => {
      return (
        <BotComponentInput
          closeChatBot={this.closeChatBot}
          displayPrediction={this.displayPrediction}
          resetPrediction={this.resetPrediction}
          togglingLoadingSection={this.togglingLoadingSection}
        />
      )
    };

  render(){
    console.log(this.state);
    return(
      <div className="bot_component_container">
        {this.renderBotInputComponent()}
        {this.renderBotPrediction()}
      </div>
    )
  }
};

export default BotComponent;
