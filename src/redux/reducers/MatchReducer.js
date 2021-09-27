const INITIAL_STATE = {
    match: JSON.parse(localStorage.getItem("match")) || null,
};



export const matchReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "SET_MATCHES":

            window.localStorage.removeItem("match");
            window.localStorage.setItem("match", JSON.stringify(action.payload))
            return {
                ...state,
                match: action.payload
            };

        default:
            return state;
    }
}