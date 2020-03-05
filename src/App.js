import React from 'react';
import {BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { getItem } from './utils/localStore';
import LoginComponent from './container/login/login';
import ForgetPasswordComponent from './container/forgetpassword/forgetPassword';
import UsersComponent from './container/users/users';
import ApplicationsComponent from './container/applications/applications';
import CreateUserComponent from './container/createUser/createUser';
import EditUserComponent from './container/editUser/editUser';
import CreateApplicationComponent from './container/createApplication/createApplication';
import UpdateApplicationComponent from './container/updateApplication/updateApplication';
import CreateNotificationComponent from './container/createNotification/createNotification';
import ResetPasswordComponent from './container/passwordreset/reset-password';
import AdminDetailsComponent from './container/adminDetails/adminDetails';
import CreateAdminComponent from './container/createAdmin/createAdmin';
import NovusBiComponent from './container/novusBi/novusBi';
import NovusBiCreateComponent from './container/novusBiCreate/novusBiCreate';
import NovusBiArticleComponent from './container/novusBiArticle/novusBiArticle';

class App extends React.PureComponent {
  
  render() {
    const TOKEN = getItem('auth_token');

    if(TOKEN === null) {
      return(
        <React.Fragment>
          <BrowserRouter>
            <Switch>
              <Route exact={true} path="/" component={LoginComponent} />
              <Route path="/forgetpassword" component={ForgetPasswordComponent} />
              <Route path="/resetpassword/:token" component={ResetPasswordComponent} />
              <Route render={() => (<Redirect to={'/'} />)} />
            </Switch>
          </BrowserRouter>
        </React.Fragment>       
      )
    } else if (TOKEN !== null) {
      return(
        <div>
          <React.Fragment>
            <BrowserRouter>
              <Switch>
                <Route path="/users" component={UsersComponent} />
                <Route path="/createUser" component={CreateUserComponent} />
                <Route path="/updateUser" component={EditUserComponent} />
                <Route path="/applications" component={ApplicationsComponent} />
                <Route path="/create-application" component={CreateApplicationComponent} />
                <Route path="/update-application" component={UpdateApplicationComponent} />
                <Route path="/notification" component={CreateNotificationComponent} />
                <Route path="/adminDetails" component={AdminDetailsComponent} />
                <Route path="/create-admin" component={CreateAdminComponent} />
                <Route path="/novus-bi" component={NovusBiComponent} />
                <Route path="/novus-bi-create" component={NovusBiCreateComponent} />
                <Route path="/novus-bi-article" component={NovusBiArticleComponent} />
                <Route render={() => (<Redirect to="/users" />)} />
                
              </Switch>
            </BrowserRouter>
          </React.Fragment>
        </div>
      )
    }
  }
}

export default App;
