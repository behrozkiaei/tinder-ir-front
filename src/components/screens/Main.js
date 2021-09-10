import {
  useState,
  useEffect
} from "react";
import axios from "axios";
import "./Main.css";
import Header from "./Header"

import SwipeButtons from "./subMain/SwipeButtons"
import TinderCards from "./subMain/TinderCards"

const Main = () => {
  const [error, setError] = useState("");
  const [privateData, setPrivateData] = useState("");

  useEffect(() => {
    const fetchPrivateDate = async () => {
     

      try {
        const {
          data
        } = await axios.get("/api/private");
        setPrivateData(data.data);
      } catch (error) {
        localStorage.removeItem("authToken");
        setError("You are not authorized please login");
      }
    };

    fetchPrivateDate();
  }, []);
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