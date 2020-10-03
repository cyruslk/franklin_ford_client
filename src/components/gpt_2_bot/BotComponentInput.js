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
      openWsConnection: true
    };
  };

  componentDidMount(){

    this.ws.onopen = () => {
      this.ws.onmessage = evt => {

        let data = evt.data;
        let userInput = this.state.userInput;
        let cleanedData = data.split(userInput)[1];

        this.setState({
          dataFromServer: cleanedData
        }, () => {
          this.props.displayPrediction(cleanedData)
        })
      };
    };
  };

  openWsConnection = () => {
    this.ws.onopen();
  }

  closeWsConnection = () => {
    this.ws.close();
  }

    componentWillUnmount(){
    this.closeWsConnection();
    }

  handleChange = (event) => {
    this.setState({
      userInput: event.target.value
    })
  }

  sendDataToServer = () => {
    let dataToSend = this.state.userInput;
    this.ws.send(dataToSend);
    return this.props.togglingLoadingSection(this.state.userInput)
  };


  resetPrediction = () => {
    this.setState({
      userInput: ""
    })
  }

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
          <span>How does it works?</span>
       </div>
     )
   }

  render() {
    return (
      <div className="bot_input_question_section">
        {this.handleCloseChatBot()}
        {this.renderInputQuestion()}
      </div>
    );
  }
};

export default BotComponentInput;
