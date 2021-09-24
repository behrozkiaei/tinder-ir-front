import axios from "axios";

export const getUserInfo = async (dispatch) => {
    try {

        const res = await axios.get("/api/tinder/getUserInfo")

        dispatch({
            type: "LOGIN_SUCCESS",
            payload: res?.data?.data || null
        })


    } catch (errror) { }
}

export const getAllmessages = async (dispatch) => {
    //get all messages 
    axios.post("/api/chat/getAllConvMess").then(res => {


        //if there is new messages add it in to the store
        dispatch({
            type: "SET_MESSAGES",
            payload: res.data?.data
        })

    })
}