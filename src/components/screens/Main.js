import {
  useState,
  useEffect
} from "react";
import axios from "axios";
import "./Main.css";
import TinderCards from "./subMain/TinderCards"
import SwipeButtons from "./subMain/SwipeButtons"
import Header from "./Header"

const Main = () => {


  const [error, setError] = useState(null)



  return error ? (< span className="error-message" > {
    error
  } </span>
  ) : (
    <div>
      <Header />
      <TinderCards />
      <SwipeButtons />
    </div>
  );
};

export default Main;