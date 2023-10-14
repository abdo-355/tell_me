import { useReducer, Reducer, FC, ReactNode, useEffect } from "react";

import authContext, { IAuthContext } from "./auth-context";
import axios from "axios";

interface Props {
  children: ReactNode;
}

export interface IAuthState {
  token: string;
  isLoggedIn: boolean;
}

type TAction =
  | { type: "ADDUSER"; payload: IAuthState }
  | { type: "REMOVEUSER" };

const authReducer: Reducer<IAuthState, TAction> = (state, action) => {
  if (action.type === "ADDUSER") {
    return action.payload;
  } else if (action.type === "REMOVEUSER") {
    return { token: "", isLoggedIn: false };
  }
  return state;
};

const AuthProvider: FC<Props> = ({ children }) => {
  const initialstate = {
    token: "",
    isLoggedIn: false,
  };

  const [state, dispatch] = useReducer(authReducer, initialstate);

  const handleAddUser = (token: string) => {
    dispatch({ type: "ADDUSER", payload: { token, isLoggedIn: true } });
    localStorage.setItem("token", token);
  };

  const handleRemoveUser = () => {
    dispatch({ type: "REMOVEUSER" });
    localStorage.removeItem("token");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      handleAddUser(token);
    } else {
      axios
        .get(`${process.env.REACT_APP_BACKEND}/auth/getuser`, {
          withCredentials: true,
        })
        .then((res) => {
          handleAddUser(res.data.token);
        });
    }
  }, []);

  const authState: IAuthContext = {
    token: state.token,
    isLoggedIn: state.isLoggedIn,
    addUser: handleAddUser,
    removeUser: handleRemoveUser,
  };

  return (
    <authContext.Provider value={authState}>{children}</authContext.Provider>
  );
};

export default AuthProvider;
