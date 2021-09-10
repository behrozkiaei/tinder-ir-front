
import axios from "axios"


export   const interceptor = ()=>{

  
    axios.defaults.baseURL = process.env.REACT_APP_MODE === "STAGE" ? process.env.REACT_APP_BASEURL_STAGE : process.env.REACT_APP_BASEURL;

    // Important: If axios is used with multiple domains, the AUTH_TOKEN will be sent to all of them.
    // See below for an example using Custom instance defaults instead.
    axios.interceptors.request.use(req=>{
        if(window.localStorage.getItem("authToken")){
            req.headers.authorization =  "Bearer "+window.localStorage.getItem("authToken");
        }
        console.log(req)
        axios.defaults.headers.common['Content-Type'] = "application/json";
        return req;
    })


}
export default interceptor;