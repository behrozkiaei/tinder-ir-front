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
import Message from "./components/chat/Message"
import { useHistory } from "react-router"
import {
  useRef,
  useState,
  useEffect,

} from "react";
import {
  io
} from "socket.io-client";

import {
  useSelector,
  useDispatch
} from "react-redux";
import { Chat } from "@material-ui/icons";

const App = () => {

  const Auth = useSelector(state => state.Auth.user);
  const history = useHistory();
  const dispatch = useDispatch();
  interceptor(history, dispatch);



  const socket = useRef();

  useEffect(() => {
  
    socket.current = io("ws://localhost:5000");
     //take userId and socketId from user
     socket.current.emit("userOnline", Auth?.user._id );
    socket.current.on("getMessage", (data) => {
      console.log(data)
      dispatch({
        type: "SET_COONVERSATIONS",
        payload: data,
      });

    });
  }, []);


  return (< Router >
    <div className="app" >
      <Switch >

        <Route exact path="/">
          {(Auth) ? <Main /> : <LoginScreen />}
        </Route>

        <Route exact path="/chat">
          {(Auth) ? <Message /> : <LoginScreen />}
        </Route>

        <Route exact path="/profile">
          {(Auth) ? <Profile /> : <LoginScreen />}
        </Route>

        <Route exact path="/login">
          {(Auth) ? <Main /> : <LoginScreen />}
        </Route>


        <Route exact path="/register">
          {(Auth) ? <Main /> : <LoginScreen />}
        </Route>

        < Route exact path="/forgotpassword"
          component={
            ForgotPasswordScreen
          } />
        {" "}
        < Route exact path="/passwordreset/:resetToken"
          component={
            ResetPasswordScreen
          } />{" "} </Switch > {
        " "
      } </div>{" "} </Router >
  );
};

export default App;