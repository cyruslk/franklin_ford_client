import React, { Component, PropTypes } from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './Home';
import HashLinkPage from './HashLinkPage';
var config = require('./config.js');


class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render(){
    return (
      <div>
        <Switch>
          <Route component={HashLinkPage} />
        </Switch>
      </div>
    );
  }
}

export default App;
