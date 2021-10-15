import {
  useState,
  useEffect
} from "react";
import axios from "axios";
import "./Main.css";
import Header from "./Header"
import { useDispatch, useSelector } from "react-redux"
import SwipeButtons from "./subMain/SwipeButtons"
import TinderCards from "./subMain/TinderCards"


const Main = () => {
  const [error, setError] = useState("");
  const [privateData, setPrivateData] = useState("");
  const dispatch = useDispatch();
  const Auth = useSelector(state => state.Auth.user);
  useEffect(() => {

    if (!Auth?.user) {
      dispatch({
        type: "LOGOUT"
      })
      window.location.reload();
    }
  }, [])


  return error ? (<
    span className="error-message" > {
      error
    } </span>
  ) : (<div > {
    <>
      <Header />
      <TinderCards />

    </>
  } </div>
  );
};

export default Main;