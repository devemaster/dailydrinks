import React from 'react';
import {BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import HomeComponent from './container/home/home';

class App extends React.PureComponent {
  
  render() {
      return(
        <React.Fragment>
          <BrowserRouter>
            <Switch>
              <Route exact={true} path="/" component={HomeComponent} />
              <Route render={() => (<Redirect to={'/'} />)} />
            </Switch>
          </BrowserRouter>
        </React.Fragment>       
      )
   
  }
}

export default App;
