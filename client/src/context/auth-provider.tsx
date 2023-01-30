import { useReducer, Reducer, FC, ReactNode, useEffect } from "react";

import authContext, { IAuthContext } from "./auth-context";

interface Props {
  children: ReactNode;
}

export interface IAuthState {
  token: string;
}

type TAction =
  | { type: "ADDUSER"; payload: IAuthState }
  | { type: "REMOVEUSER" };

const authReducer: Reducer<IAuthState, TAction> = (state, action) => {
  if (action.type === "ADDUSER") {
    return action.payload;
  } else if (action.type === "REMOVEUSER") {
    return { token: "" };
  }
  return state;
};

const AuthProvider: FC<Props> = ({ children }) => {
  const initialstate = {
    token: "",
  };

  const [state, dispatch] = useReducer(authReducer, initialstate);

  const handleAddUser = (token: string) => {
    dispatch({ type: "ADDUSER", payload: { token } });
    localStorage.setItem("token", token);
  };

  const handleRemoveUser = () => {
    dispatch({ type: "REMOVEUSER" });
    localStorage.removeItem("token");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      dispatch({ type: "ADDUSER", payload: { token } });
    }
  }, []);

  const authState: IAuthContext = {
    token: state.token,
    addUser: handleAddUser,
    removeUser: handleRemoveUser,
  };

  return (
    <authContext.Provider value={authState}>{children}</authContext.Provider>
  );
};

export default AuthProvider;
