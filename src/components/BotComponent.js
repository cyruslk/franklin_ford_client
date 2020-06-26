import React from 'react';
import BotComponentInput from "./BotComponentInput";
import App from "../App.css";


class BotComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      displayPrediction: null
    };
  };

  displayPrediction = (data) => {
    let displayPrediction = data;
    this.setState({
      displayPrediction
    })
  };

  renderBotPrediction = () => {
    if(!this.state.displayPrediction){
      return "loading"
    }
    return (
      <div style={{position: "fixed", top: "2vw", backgroundColor: "red"}}>{this.state.displayPrediction}</div>
    )
  };

  renderBotInputComponent = () => {
    return (
      <BotComponentInput
        closeChatBot={this.props.closeChatBot}
        displayPrediction={this.displayPrediction}
      />
    )
  }

  render(){
    return(
      <div>
        {this.renderBotInputComponent()}
        {this.renderBotPrediction()}
      </div>
    )
  }
};

export default BotComponent;
