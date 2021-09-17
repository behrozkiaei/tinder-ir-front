const INITIAL_STATE = {
    conversations: JSON.parse(localStorage.getItem("conversation")) || null,
    message: JSON.parse(localStorage.getItem("message")) || null,
    isFetching: false,
    error: false,
};



export const ChatReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "SET_CONVERSATIONS":

            window.localStorage.removeItem("conversation");
            window.localStorage.setItem("conversation", JSON.stringify(action.payload))
            return {
                ...state,
                conversations: action.payload
            };
        case "SET_MESSAGES":
            window.localStorage.removeItem("message");
            window.localStorage.setItem("message", JSON.stringify(action.payload))
            return {
                ...state,
                message: action.payload

            };

        case "ADD_MESSAGE":
            const newMess = [...state.message, action.payload]
            window.localStorage.removeItem("message");
            window.localStorage.setItem("message", JSON.stringify(newMess))
            return {
                ...state,
                message: newMess
            };

        case "ADD_CONVERSATION":
            return {
                ...state,
                conversations: state.conversations.push(action.payload)
            }
            default:
                return state;
    }
};

// export default AuthReducer;