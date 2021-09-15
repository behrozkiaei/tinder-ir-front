import axios from "axios"


export const interceptor = (history, dispatch) => {


    axios.defaults.baseURL = process.env.REACT_APP_MODE === "STAGE" ? process.env.REACT_APP_BASEURL_STAGE : process.env.REACT_APP_BASEURL;

    
    // Important: If axios is used with multiple domains, the AUTH_TOKEN will be sent to all of them.
    // See below for an example using Custom instance defaults instead.
    axios.interceptors.request.use(req => {
        if (window.localStorage.getItem("authToken")) {
            req.headers.authorization = "Bearer " + window.localStorage.getItem("authToken");
        }
        
        axios.defaults.headers.common['Content-Type'] = "application/json";
        return req;
    })



    axios.interceptors.response.use(
        function (successRes) {

            return successRes;
        },
        function (error) {
            if (error.response?.status === 401) {
                console.log("oouuuuuut interceptor")
                dispatch({
                    type: "LOGOUT"
                })
                history.push("/login")

            }
            return Promise.reject(error);
        }
    );
}
export default interceptor;