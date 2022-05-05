import { createContext, useEffect, useReducer } from "react";
import Reducer from "./Reducer";

import { getLoggedInUserId, getUserInfo } from "../web3/users";

const INIT_STATE = {
  user: null,
};

export const Context = createContext(INIT_STATE);

export const ContextProvider = ({ children }) => {
  let [state, dispatch] = useReducer(Reducer, INIT_STATE);

  useEffect(() => {
    const getLogin = async () => {
      try {
        const userId = await getLoggedInUserId();
        if (userId !== 0) {
          const userInfo = await getUserInfo(userId);

          dispatch({ type: "LOGIN", payload: userInfo });

          console.log("Logged in as", userInfo);
        }
      } catch (e) {
        console.log(e);
      }
    };

    getLogin();
  }, []);

  return (
    <Context.Provider value={{ ...state, dispatch }}>
      {children}
    </Context.Provider>
  );
};
