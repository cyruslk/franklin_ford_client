import React, { Component } from "react";
import './App.css';
import axios from "axios";
const apiLink = "https://webhooks.mongodb-stitch.com/api/client/v2.0/app/ford-bot-read-donpl/service/http/incoming_webhook/webhook-ford";

class App extends Component {
  constructor() {
    super();
    this.state = {
      rawData: null,
      tweetsStrings: null
    }
  }

  componentDidMount(){
    axios.get(apiLink)
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
    console.log(this.state.rawData, "||");
    return (
      <div className="App">
        <header>
          <h1>In this case, the primacy is with the news organization per se.</h1>
        </header>
        <nav>
          <ul>
            <li>About</li>
            <li>Sources</li>
            <li>Who</li>
            <li>News</li>
            <li>Acknowledgments</li>
          </ul>
        </nav>
        <section>
          <div>
            @franklinfordbot is a bot that tweets excerpts from the writings of Franklin Ford. An intriguing figure in the history of American journalism, Franklin Ford (1849-1918) is mostly known for his association with John Dewey, with whom he tried to launch Thought News, a "philosophical newspaper" that never saw the light of day. But beyond that footnote in Dewey's career and in journalism history, Ford's role and his contribution need to be revisited, not only because he was a fascinating media theorist and a compelling writer, but also because reading Ford is a jumping-off point for experimentations and theoretical developments that speak to contemporary media problems. In that regard, @franklinfordbot is an experiment, a remediation of Franklin Ford.
          </div>
        </section>
      </div>
    );
  }
}
export default App;
