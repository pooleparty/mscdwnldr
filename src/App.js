import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import {
  BrowserRouter as Router,
  Route,
  browserHistory
} from 'react-router-dom';
import MainViewContainer from './containers/MainViewContainer';

injectTapEventPlugin();

const routeStyle = {
  margin: 10
};

export default class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <div>
          <Router history={browserHistory}>
            <div style={routeStyle}>
              <Route path="/" component={MainViewContainer} />
            </div>
          </Router>
        </div>
      </MuiThemeProvider>
    );
  }
}
