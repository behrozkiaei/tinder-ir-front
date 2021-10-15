const INITIAL_STATE = {
    cards: JSON.parse(localStorage.getItem("cards")) || null,
};



export const CardsReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "SET_CARDS":

            window.localStorage.removeItem("cards");
            window.localStorage.setItem("cards", JSON.stringify(action.payload))
            return {
                cards: action.payload
            };


        case "REMOVE_CARD":

            let newcards = state?.cards?.filter(p => p._id === action.payload?.user_t0);

            window.localStorage.removeItem("cards");
            window.localStorage.setItem("cards", JSON.stringify(newcards))
            return {
                cards: newcards
            };

        default:
            return state;
    }
};
// export default AuthReducer;