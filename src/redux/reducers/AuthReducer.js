const INITIAL_STATE = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  isFetching: false,
  error: false,
};



export const AuthReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "LOGIN_START":

      window.localStorage.removeItem("user");
      return {
        ...state,
        user: null,
          isFetching: true,
          error: false,

      };
    case "LOGIN_SUCCESS":

      window.localStorage.removeItem("user")
      window.localStorage.setItem("user", JSON.stringify(action.payload))

      return {
        ...state,
        user: action.payload,
          isFetching: false,

      };
    case "LOGIN_FAILURE":
      return {
        ...state,
        user: null,
          isFetching: false,
          error: true,

      };

    case "LOGOUT":
      window.localStorage.removeItem('authToken');
      window.localStorage.removeItem('user');
      return {
        ...state,
        user: null,
          isFetching: false,

      };
    case "LOGIN_ERROR":
      return {
        ...state,
        user: null,
          isFetching: null,
          error: action.payload,

      };

    default:
      return state;
  }
};

// export default AuthReducer;