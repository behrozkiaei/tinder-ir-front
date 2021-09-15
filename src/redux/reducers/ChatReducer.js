const INITIAL_STATE = {
    conversations: JSON.parse(localStorage.getItem("conversations")) || null,
    message : JSON.parse(localStorage.getItem("message")) || null,
    isFetching: false,
    error: false,
};



export const ChatReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "SET_COONVERSATIONS":
            window.localStorage.removeItem("conversations");
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
        default:
            return state;
    }
};

// export default AuthReducer;