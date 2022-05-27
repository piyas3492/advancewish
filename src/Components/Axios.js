import axios from "axios";
const instance = axios.create({
  baseURL: "https://advancewish-api.herokuapp.com",
});
export default instance;
