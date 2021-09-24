import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import axios from "axios";
// Routing


// Screens
import Main from "./components/screens/Main";
import LoginScreen from "./components/screens/LoginScreen";
import RegisterScreen from "./components/screens/RegisterScreen";
import ForgotPasswordScreen from "./components/screens/ForgotPasswordScreen";
import ResetPasswordScreen from "./components/screens/ResetPasswordScreen";
import Profile from "./components/screens/Profile"
import interceptor from "./interceptor/interceptor";
import Message from "./components/chat/Message"
import Conversation from "./components/chat/ConversationList"


import {
  useHistory
} from "react-router"
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
import {
  Chat
} from "@material-ui/icons";
import SplashScreen from "./components/splash/SplashScreen";
import EditPro from "./components/profile/EditPro";
import Settings from "@material-ui/icons/Settings";
import Setting from "./components/setting/Setting";

const App = () => {

  const Auth = useSelector(state => state.Auth.user);
  const history = useHistory();
  const dispatch = useDispatch();
  const [token] = useState(localStorage.getItem("authToken"))

  interceptor(history, dispatch);




  return (


    <Router>

      <div className="app" >
        <Switch >
          <Route exact path="/" > {
            (Auth) ? < SplashScreen /> : < LoginScreen />}
          </Route>
          <Route exact path="/main" > {
            (Auth) ? < Main /> : < LoginScreen />}
          </Route>
          <Route exact path="/splash">
            < SplashScreen />
          </Route>

          <Route exact path="/conversations" > {
            (Auth) ? < Conversation /> : < LoginScreen />}
          </Route>
          <Route exact path="/chat/:conversation_id" > {
            (Auth) ? < Message /> : < LoginScreen />}
          </Route>

          {/* Profile */}

          <Route exact path="/profile" > {
            (Auth) ? < Profile /> : < LoginScreen />}
          </Route>

          <Route exact path="/editPro" > {
            (Auth) ? < EditPro /> : < LoginScreen />}
          </Route>

          <Route exact path="/setting" > {
            (Auth) ? < Setting /> : < LoginScreen />}
          </Route>
          {/* Auth */}

          <Route exact path="/login" > {
            (token) ? < SplashScreen /> : < LoginScreen />}
          </Route>


          <Route exact path="/register" > {
            (Auth) ? < Main /> : < LoginScreen />
          }
          </Route>

          <Route exact path="/forgotpassword"
            component={
              ForgotPasswordScreen
            }
          />
          <Route exact path="/passwordreset/:resetToken"
            component={
              ResetPasswordScreen
            }
          />
        </Switch > </div> </Router >
  );
};

export default App;