import React, { Component } from "react";
import axios from "axios";

class App extends Component {
  constructor() {
    super();
    this.state = {
      rawData: null,
      tweetsStrings: null
    }
  }

  componentDidMount(){
    axios.get("https://webhooks.mongodb-stitch.com/api/client/v2.0/app/ford-bot-read-donpl/service/http/incoming_webhook/webhook-ford")
    .then((response) => {
      this.setState({
        rawData: response.data,
      })
      
    })
    .catch((err) => {
      console.log(err);
    })
  }


render(){
    return (
      <div className="App">
      </div>
    );
  }
}
export default App;

