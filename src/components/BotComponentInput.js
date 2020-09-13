import React from 'react';
import ReactInterval from 'react-interval';
import { HashLink as Link } from 'react-router-hash-link';
import App from "../App.css";


class BotComponentInput extends React.Component {

  ws = new WebSocket('ws://35.226.112.179:8880/generator')

  constructor(props) {
    super(props);
    this.state = {
      userInput: "",
      dataFromServer: null,
      openWsConnection: true
    };
  };

  componentDidMount(){

    this.ws.onopen = () => {};

    this.ws.onmessage = evt => {
      console.log(this.ws.readyState);
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

  openWsConnection = () => {
    this.ws.onopen();
  }

  closeWsConnection = () => {
    this.ws.close();
  }

  componentWillUnmount(){
    this.ws.close();
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
    return this.props.resetPrediction();
  }

   renderInputQuestion = () => {
     return (
       <div>
            <input
              onClick={this.resetPrediction}
              value={this.state.userInput}
              onChange={this.handleChange}
              placeholder={"Ask Ford a question here ..."}
            />
            <button onClick={this.sendDataToServer}>
              send
            </button>
       </div>
     );
   };



   handleCloseChatBot = () => {
     return (
       <div>
          <span onClick={this.props.closeChatBot}>close the bot</span>
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
