import React from 'react';
import { Provider } from 'react-redux';
import { browserHistory, Route, Router } from 'react-router';
import { PersistGate } from 'redux-persist/integration/react';

class Routes extends React.Component {

    render() {
        return (
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <Router history={browserHistory}>
                        <Route component={App}>
                        </Route>
                    </Router>
                </PersistGate>
            </Provider>
        );
    }
}

export default Routes;