import {
  useState,
  useEffect
} from "react";
import axios from "axios";
import {
  Link
} from "react-router-dom";
import {
  useHistory
} from "react-router"
import "./LoginScreen.css";
import {
  useDispatch
} from "react-redux"

import { CircularProgress } from "@material-ui/core";
const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isFetching, setIsFetching] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  const loginHandler = async (e) => {
    e.preventDefault();
    setIsFetching(true)

    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    try {
      const {
        data
      } = await axios.post(
        "/api/auth/login", {
        email,
        password
      },
        config
      );

      window.localStorage.setItem("authToken", data.token);





      //get info 



      try {

        const res = await axios.get("/api/tinder/getUserInfo")

        dispatch({
          type: "LOGIN_SUCCESS",
          payload: res?.data?.data
        })



        setTimeout(() => {
          history.push("/splash")
        }, 2000)

      } catch (errror) {

      }


    } catch (error) {
      setError(error?.response?.data?.error || "something goes wrong..!");
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  return (< div className="login-screen" >
    <form onSubmit={
      loginHandler
    }
      className="login-screen__form" >
      <h3 className="login-screen__title" > Login < /h3> {
        error && < span className="error-message" > {
          error}
        </span>}
        <div className="form-group" >
          <label htmlFor="email" > Email: < /label> <
            input type="email"
            required id="email"
            placeholder="Email address"
            onChange={
              (e) => setEmail(e.target.value)
            }
            value={
              email
            }
            tabIndex={
              1
            } />
        </div >
        <div className="form-group" >
          <label htmlFor="password" >
            Password: {" "}
            <Link to="/forgotpassword"
              className="login-screen__forgotpassword" >
              Forgot Password ?
            </Link>
          </label >
          <input type="password"
            required id="password"
            autoComplete="true"
            placeholder="Enter password"
            onChange={
              (e) => setPassword(e.target.value)
            }
            value={
              password
            }
            tabIndex={
              2
            }
          />
        </div>
        <button type="submit"
          className="btn btn-primary" >  {isFetching ? (
            <CircularProgress color="secondary" size="20px" />
          ) : (
            "Login"
          )}</button>
        <span className="login-screen__subtext" >
          Don 't have an account? <Link to="/register">Register</Link> </span >
    </form> </div >);
};

export default LoginScreen;