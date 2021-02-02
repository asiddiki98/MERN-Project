import React from 'react';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import { Switch } from 'react-router-dom';
import NavBarContainer from './nav/navbar_container';
import SplashContainer from './session/splash_container';
import SignupFormContainer from './session/signup_form_container';
import MainPage from './main/main_page';

const App = () => (
  <div>
    <NavBarContainer />
    <Switch>
      <AuthRoute exact path="/" component={SplashContainer} />
      <ProtectedRoute path="/home" component={MainPage} />
      <AuthRoute path="/signup" component={SignupFormContainer} />
    </Switch>
  </div>
);

export default App;