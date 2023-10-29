import axios, { AxiosError, AxiosResponse } from "axios";
import { login } from "./interface/login";
import { store } from "./store/configureStore";
import { toast } from "react-toastify";

/**
 * this agent files ie Axios handles fetching data
 * @returns api data
 */
//add small delay
const sleep = () => new Promise(resolve => setTimeout(resolve, 200));

axios.defaults.baseURL = import.meta.env.VITE_API_URL;
// axios.defaults.withCredentials = true;
const responseBody = (response: AxiosResponse) => response.data;

//we can use redux in any kind of application we attach our bearer token, sending data
axios.interceptors.request.use(config => {
  const token = store.getState().account.user?.token;

  if (token) config.headers.Authorization = `Bearer ${token}`;

  return config;
});
//returning data
axios.interceptors.response.use(
  async response => {
    if (import.meta.env.DEV) await sleep();
    return response;
  },
  (error: AxiosError) => {
    //deconstruct error to get specic status type, error response as axios resp
    const { data, status } = error.response as AxiosResponse;
    //common errors
    switch (status) {
      case 400:
        if (data.errors) {
          //if more than one error
          const modelStateErrors: string[] = [];
          for (const key in data.errors) {
            if (data.errors[key]) {
              modelStateErrors.push(data.errors[key]);
            }
          }
          throw modelStateErrors.flat();
        }
        toast.error(data.title);
        break;
      case 401:
        toast.error(data.title + ": Incorrect login Credentials");
        break;
      case 403:
        toast.error(data.title);
        break;
      case 404:
        toast.error(data.title);
        break;
      case 500:
        toast.error(data.title);
        break;
      default:
        break;
    }
    return Promise.reject(error.response);
  }
);

/**
 *  Requests and data
 */
const requests = {
  get: (url: string) => axios.get(url).then(responseBody),
  post: (url: string, body: object) => axios.post(url, body).then(responseBody),
};

/**
 * account obj that handles account data
 */
const account = {
  login: (values: login) => requests.post("account/login", values),
  register: (values: login) => requests.post("account/register", values),
  currentUser: () => requests.get("account/currentUser"),
};
/**
 * gambit obj  that handles gambit data
 */
const gambit = {
  list: () => requests.get("gambit/gambits"),
};
/**
 * agent that handles the controllers
 */
const agent = {
  gambit,
  account,
};
export default agent;
