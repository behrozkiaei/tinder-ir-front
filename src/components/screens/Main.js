import {
  useState,
  useEffect
} from "react";
import axios from "axios";
import "./Main.css";
import Header from "./Header"
import { useDispatch } from "react-redux"
import SwipeButtons from "./subMain/SwipeButtons"
import TinderCards from "./subMain/TinderCards"

const Main = () => {
  const [error, setError] = useState("");
  const [privateData, setPrivateData] = useState("");
  const dispatch = useDispatch();


  return error ? (<
    span className="error-message" > {
      error
    } </span>
  ) : (<div > {
    <>
      <Header />
      <TinderCards />
      <SwipeButtons />
    </>
  } </div>
  );
};

export default Main;