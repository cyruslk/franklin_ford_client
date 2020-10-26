import React from 'react';
import ReactInterval from 'react-interval';
import { HashLink as Link } from 'react-router-hash-link';
import config from "../../config.js"
import App from "../../App.css";


class BotComponentInput extends React.Component {

  ws = new WebSocket(`ws://${config.gpt2Endpoint}`)

  constructor(props) {
    super(props);
    this.state = {
      userInput: "",
      dataFromServer: null,
      userInputLength: 0,
      openWsConnection: true,
      renderOnErrorMessage: false
    };
  };

  componentDidMount(){
    document.addEventListener("keydown", this.handleKeyDown);

    this.ws.onopen = () => {


      this.ws.onmessage = evt => {

        let data = evt.data;
        let userInput = this.state.userInput;
        let cleanedUserInput = data.replace(userInput, "");

        this.setState({
          dataFromServer: cleanedUserInput
        }, () => {
          this.props.displayPrediction(cleanedUserInput)
        })
      };
    };
  };

  openWsConnection = () => {
    this.ws.onopen();
  };

  closeWsConnection = () => {
      this.ws.close();
  };

  componentWillUnmount(){
    document.removeEventListener("keydown", this.handleKeyDown);
    this.closeWsConnection();
  };

  handleChange = (event) => {
    this.setState({
      userInput: event.target.value,
      userInputLength: event.target.value.length
    })
  };

  handleKeyDown = (event) => {
    if(this.state.userInput.length === 0
    || event.keyCode !== 13){
      return null;
    }
    return this.sendDataToServer();
  };

  sendDataToServer = () => {

    if(this.state.userInputLength < 7){
        return this.handleErrorMessage();
    }

    let dataToSend = this.state.userInput;
    this.ws.send(dataToSend);
    this.props.togglingLoadingSection(this.state.userInput);
    return this.resetPrediction();
  };

  handleErrorMessage = () => {
    this.setState({
      renderOnErrorMessage: true
    }, () => {
      setTimeout(() => {
         this.setState({
           renderOnErrorMessage: false
         });
       }, 2500);
    })
    return this.resetPrediction();
  }

  resetPrediction = () => {
    this.setState({
      userInput: "",
      userInputLength: 0
    })
  };

   renderInputQuestion = () => {
     return (
       <div className="bot_input_outer">
            <input
              onClick={this.resetPrediction}
              value={this.state.userInput}
              onChange={this.handleChange}
              placeholder={"What is your inquiry?"}
            />
            <button onClick={this.sendDataToServer}>
              &rarr;
            </button>
       </div>
     );
   };

   handleCloseChatBot = () => {
     return (
       <div
       className="close_the_bot">
          <span onClick={this.props.closeChatBot}>
              Close the bot
          </span>
          <span onClick={this.scrollToSection}>
            How does it work?
          </span>
       </div>
     )
   };

   scrollToSection = () => {
     document.getElementById("anatomy-of-a-bot")
     .scrollIntoView({behavior: "smooth"})
   };


   renderOnErrorMessage = () => {
    if(this.state.renderOnErrorMessage){
      return (
        <div className="bot_error_message">
          <span>Your input must be longer!</span>
        </div>
      )
    }
   }

  render() {
    return (
      <div className="bot_input_question_section">
        {this.renderOnErrorMessage()}
        {this.handleCloseChatBot()}
        {this.renderInputQuestion()}
      </div>
    );
  }
};

export default BotComponentInput;
