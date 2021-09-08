import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import axios from "axios";
// Routing
import PrivateRoute from "./components/routing/PrivateRoute";

// Screens
import PrivateScreen from "./components/screens/PrivateScreen";
import LoginScreen from "./components/screens/LoginScreen";
import RegisterScreen from "./components/screens/RegisterScreen";
import ForgotPasswordScreen from "./components/screens/ForgotPasswordScreen";
import ResetPasswordScreen from "./components/screens/ResetPasswordScreen";
const App = () => {
  console.log(process.env)
  axios.defaults.baseURL = process.env.REACT_APP_MODE === "STAGE" ? process.env.REACT_APP_BASEURL_STAGE : process.env.REACT_APP_BASEURL;
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
    />{" "} <
    Route exact path = "/login"
    component = {
      LoginScreen
    }
    />{" "} <
    Route exact path = "/register"
    component = {
      RegisterScreen
    }
    />{" "} <
    Route exact path = "/forgotpassword"
    component = {
      ForgotPasswordScreen
    }
    />{" "} <
    Route exact path = "/passwordreset/:resetToken"
    component = {
      ResetPasswordScreen
    }
    />{" "} < /
    Switch > {
      " "
    } <
    /div>{" "} < /
    Router >
  );
};

export default App;