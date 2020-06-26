import React from 'react';
import ReactInterval from 'react-interval';
import { HashLink as Link } from 'react-router-hash-link';
import BotComponentSpan from "./BotComponentSpan";
import BotComponentBody from "./BotComponentBody";
import App from "../App.css";


class BotComponent extends React.Component {

  ws = new WebSocket('ws://35.226.112.179:8880/generator')


  constructor(props) {
    super(props);
    this.state = {
      userInput: "",
      dataFromServer: null
    };
  };

  componentDidMount(){
    this.ws.onopen = () => {
      console.log('connected')
    };

    this.ws.onmessage = evt => {
      this.setState({
        dataFromServer: evt.data
      })
    };
  };

  componentDidUpdate(prevState, actualState){
    if(prevState.dataFromServer !== actualState.dataFromServer){
      console.log(this.state);
    }
  }


  handleChange = (event) => {
    this.setState({
      userInput: event.target.value
    })
  }

  sendDataToServer = () => {
    let dataToSend = this.state.userInput;
    console.log(`${dataToSend} sent to server`);
    this.ws.send(dataToSend);
  }

   renderInputQuestion = () => {
     return (
       <div className="bot_input_question_section">

          <input
            value={this.state.userInput}
            onChange={this.handleChange}
            placeholder={"here"}/>

            <button onClick={this.sendDataToServer}>
              send here
            </button>

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
        <BotComponentBody {...this.state} />
      </div>
    );
  }
};

export default BotComponent;
