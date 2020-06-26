import React from 'react';
import BotComponentInput from "./BotComponentInput";
import App from "../App.css";


class BotComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      displayPrediction: null,
      sentQuestion: null
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
    })
  };

  resetPrediction = () => {
    this.setState({
      displayPrediction: null
    })
  }

  renderBotPrediction = () => {
    if(!this.state.displayPrediction && this.state.sentQuestion){
      return (
        <div className="bot_input_prediction_section">
          Processing : {this.state.sentQuestion}
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


  renderBotInputComponent = () => {
    return (
      <BotComponentInput
        closeChatBot={this.props.closeChatBot}
        displayPrediction={this.displayPrediction}
        resetPrediction={this.resetPrediction}
        togglingLoadingSection={this.togglingLoadingSection}
      />
    )
  }

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
