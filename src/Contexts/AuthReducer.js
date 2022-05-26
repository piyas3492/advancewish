const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        user: action.payload,
      };
    case "LOGIN_FAILURE":
      return {
        user: null,
      };
    case "LOGOUT_SUCCESS":
      return {
        user: null,
      };
    default:
      return state;
  }
};

export default AuthReducer;
