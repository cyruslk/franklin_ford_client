import React from 'react';
import App from "../App.css";


class BotComponentBody extends React.Component {



  constructor(props) {
    super(props);
    this.state = {

    };
  };

  componentWillReceiveProps(){
    console.log(this.props);
  }

  render() {

    return (
      <div className="bot_input_prediction_section">
        vvfdv
      </div>
    );
  }
};

export default BotComponentBody;
