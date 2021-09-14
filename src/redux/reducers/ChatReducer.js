const INITIAL_STATE = {
    conversations: JSON.parse(localStorage.getItem("conversations")) || null,
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

        default:
            return state;
    }
};

// export default AuthReducer;