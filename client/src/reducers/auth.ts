import { Action } from "redux";
import { ThunkAction } from "redux-thunk";

const AUTH = "AUTH";
const LOGOUT = "LOGOUT";

type AuthData = {
  name: string;
  picture: string;
  sub: string;
};

interface InitialState {
  authData: null | AuthData;
}

interface authAction extends Action<typeof AUTH> {
  authData: {
    name: string;
    picture: string;
    sub: string;
  };
}
interface logoutAction extends Action<typeof LOGOUT> {
  authData: {
    name: string;
    picture: string;
    sub: string;
  };
}

export const authReducer = (
  state = null as InitialState,
  action: authAction | logoutAction
) => {
  switch (action.type) {
    case AUTH:
      localStorage.setItem("profile", JSON.stringify({ ...action?.authData }));
      return { ...state, authData: action.authData };
    case LOGOUT:
      localStorage.clear();
      return { ...state, authData: action.authData };
    default:
      return state;
  }
};
