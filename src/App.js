import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

// Routing
import PrivateRoute from "./components/routing/PrivateRoute";
import axios from "axios"
// Screens
import PrivateScreen from "./components/screens/PrivateScreen";
import LoginScreen from "./components/screens/LoginScreen";
import RegisterScreen from "./components/screens/RegisterScreen";
import ForgotPasswordScreen from "./components/screens/ForgotPasswordScreen";
import ResetPasswordScreen from "./components/screens/ResetPasswordScreen";
const App = () => {
  axios.defaults.baseURL = 'https://tinder-ir-back.herokuapp.com/';
  return ( <
    Router >
    <
    div className = "app" >
    <
    Switch >
    <
    PrivateRoute exact path = "/"
    component = {
      PrivateScreen
    }
    /> <
    Route exact path = "/login"
    component = {
      LoginScreen
    }
    /> <
    Route exact path = "/register"
    component = {
      RegisterScreen
    }
    /> <
    Route exact path = "/forgotpassword"
    component = {
      ForgotPasswordScreen
    }
    /> <
    Route exact path = "/passwordreset/:resetToken"
    component = {
      ResetPasswordScreen
    }
    /> < /
    Switch > <
    /div> < /
    Router >
  );
};

export default App;