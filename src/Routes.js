import React from 'react';
import { Provider } from 'react-redux';
import { browserHistory, Route, Router } from 'react-router';
import { PersistGate } from 'redux-persist/integration/react';
import App from './App';

class Routes extends React.Component {
  render() {
    return (

          <Router history={browserHistory}>
            <Route component={App} />
          </Router>
        
    );
  }
}

export default Routes;
