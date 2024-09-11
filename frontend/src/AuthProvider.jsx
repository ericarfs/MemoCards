import { jwtDecode } from "jwt-decode";
import api from "./api";

import { REFRESH_TOKEN, ACCESS_TOKEN } from "./constants";
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext("");

export const AuthProvider = ({ children }) => {
  const [isAuthorized, setIsAuthorized] = useState(null);
  const [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem(ACCESS_TOKEN)
        ? localStorage.getItem(ACCESS_TOKEN)
        : null
  );
  const [user, setUser] = useState(() => 
    localStorage.getItem(ACCESS_TOKEN)
        ? jwtDecode(localStorage.getItem(ACCESS_TOKEN))
        : null
  );

  const refreshToken = async () => {
    const refreshtoken = localStorage.getItem(REFRESH_TOKEN);

    try {
      const res = await api.post("/api/token/refresh/", {
        refresh: refreshtoken,
      });
      if (res.status === 200) {
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        setAuthTokens(res.data.access);
        setUser(jwtDecode(res.data.access));
        setIsAuthorized(true);
      } else {
        setIsAuthorized(false);
      }
    } catch (error) {
      console.log(error);
      setIsAuthorized(false);
    }
  };

  const auth = async () => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    console.log("aqui")
    if (!token) {
      setIsAuthorized(false);
      return;
    }

    const decoded = jwtDecode(token);
    const tokenExpiration = decoded.exp;
    const now = Date.now() / 1000;

    if (tokenExpiration < now) {
      await refreshToken();
    } else {
      setIsAuthorized(true);
    }
  };

  useEffect(() => {
    auth();
  }, [authTokens]);
  
  return (
    <AuthContext.Provider value={{ authTokens, isAuthorized, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth =  () => {
  return useContext(AuthContext);
};