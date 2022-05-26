import Dashboard from "../Views/Dashboard";
import Logout from "../Views/Logout";

const Protectedroutes = [
  {
    path: "/dashboard",
    component: Dashboard,
  },
  {
    path: "/logout",
    component: Logout,
  },
];

export default Protectedroutes;
