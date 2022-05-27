import Home from "../Views/Home";
import Login from "../Views/Login";
import Signup from "../Views/Signup";
const Publicroutes = [
  {
    path: "/",
    component: Login,
  },
  {
    path: "/signup",
    component: Signup,
  },
  {
    path: "/login",
    component: Login,
  },
];

export default Publicroutes;
