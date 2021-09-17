const INITIAL_STATE = {
    cards: JSON.parse(localStorage.getItem("cards")) || null,
};



export const CardsReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "SET_CARDS":

            window.localStorage.removeItem("cards");
            window.localStorage.setItem("cards", JSON.stringify(action.payload))
            return {
                ...state,
                cards: action.payload
            };

        default:
            return state;
    }
};
// export default AuthReducer;