import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './Home';
import HashLinkPage from './HashLinkPage';

function App() {
  return (
    <div>
      <Switch>
        <Route component={HashLinkPage} />
      </Switch>
    </div>
  );
}

export default App;
