import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import axios from "axios";
// Routing
import PrivateRoute from "./components/routing/PrivateRoute";

// Screens
import Main from "./components/screens/Main";
import LoginScreen from "./components/screens/LoginScreen";
import RegisterScreen from "./components/screens/RegisterScreen";
import ForgotPasswordScreen from "./components/screens/ForgotPasswordScreen";
import ResetPasswordScreen from "./components/screens/ResetPasswordScreen";
import Profile from "./components/screens/Profile"
import interceptor from "./interceptor/interceptor";

const App = () => {
interceptor();
  return (< Router >
    <div className="app" >
      <Switch>
        <PrivateRoute exact path="/"
          component={
            Main
          } />{" "}
        <PrivateRoute exact path="/profile"
          component={
            Profile
          } />{" "}
        <Route exact path="/login"
          component={
            LoginScreen
          }
        />{" "}
        <Route exact path="/register"
          component={
            RegisterScreen
          }
        />{" "}
        <Route exact path="/forgotpassword"
          component={
            ForgotPasswordScreen
          }
        />{" "}
        <Route exact path="/passwordreset/:resetToken"
          component={
            ResetPasswordScreen
          }
        />{" "} </Switch > {
        " "
      }
    </div>{" "} </Router>
  );
};

export default App;