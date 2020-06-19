import React from 'react';
import ReactInterval from 'react-interval';
import { HashLink as Link } from 'react-router-hash-link';
import App from "../App.css";


class BotComponentSpan extends React.Component {
  constructor(props) {
    super(props);
  };

  // map every time the thing increment
  // when it reaches a certain number, send props back to the master BotComponent to untoggle the number.
  // will figure this.


  renderBotContent = () => {
    if(!this.props){
      return null
    };
    return (
      <div>
        <span>{this.props.count}</span>
        </div>
    )
  }

  render() {
    return (
      <div>
        {this.renderBotContent()}
      </div>
    );
  }
};

export default BotComponentSpan;
