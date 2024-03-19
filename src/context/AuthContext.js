import { jwtDecode } from 'jwt-decode';
import moment from 'moment';
import { createContext, useContext, useEffect, useReducer, useState } from 'react'
import { useNavigate } from 'react-router-dom';
const AuthContext = createContext()

const initialState = { isAuthenticated: false, user: {} }

const reducer = (state, { type, payload }) => {
  switch (type) {
    case "SET_LOGGED_IN":
      return { ...state, isAuthenticated: true, user: payload.user }
    case "SET_LOGGED_OUT":
      localStorage.removeItem("jwtoken");
      localStorage.removeItem("user");
      return initialState
    default:
      return state
  }
}


export default function AuthContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [toggle, setToggle] = useState(false)
  const navigate = useNavigate();

  useEffect(() => {

    if (localStorage.jwtoken) {
      let user = jwtDecode(localStorage.jwtoken);
      const expiryDate = user.exp;
      const expiryDateMoment = moment.unix(expiryDate);
      const currentDate = moment();
      if (expiryDateMoment.isBefore(currentDate)) {
        dispatch({ type: "SET_LOGGED_OUT" });
        navigate("/auth/login")
      } else {
        let user = JSON.parse(localStorage.getItem("user")) || {}
        dispatch({ type: "SET_LOGGED_IN", payload: { user } })
      }
    } else {
      dispatch({ type: "SET_LOGGED_OUT" });
    }
  }, [toggle])


  return (
    <AuthContext.Provider value={{ ...state, dispatch, setToggle, toggle }}>
      {children}
    </AuthContext.Provider>
  )
}


export const useAuthContext = () => {
  return useContext(AuthContext)
}
