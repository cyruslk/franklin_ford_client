import React, { Component, PropTypes } from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './Home';


class App extends React.Component {
  render(){
    return (
      <div>
        <Switch>
          <Route component={Home} />
        </Switch>
      </div>
    );
  }
}

export default App;
