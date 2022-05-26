import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Contexts/AuthContext";
const Logout = () => {
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    dispatch({ type: "LOGOUT_SUCCESS" });
    localStorage.removeItem("user");
    navigate("/login");
  });

  return <></>;
};

export default Logout;
