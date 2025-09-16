import { createContext, useContext, useState, useEffect } from "react";
import Cookies from "universal-cookie";
import { login as loginAPI, logout as logoutAPI } from "../APIs/AuthAPI";

const AuthContext = createContext();
const cookies = new Cookies();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = cookies.get("token");
    if (token) {
      setIsLoggedIn(true);
    const fetchUserData = async () => {
      try {
        const response = await yourAPI.getMyProfile();
        setUser({
          id: response.id,
          role: response.role,
          username: response.username
        });
      } catch (error) {
        console.error("Failed to get user info:", error);
        cookies.remove("token", { path: "/" });
        setIsLoggedIn(false);
      }
    };
    
    fetchUserData();
    }
  }, []);

  const login = async (form) => {
    cookies.remove("token", { path: "/" });
    const data = await loginAPI(form);

    cookies.set("token", data.token, { path: "/", maxAge: 86400 });
    setIsLoggedIn(true);
    setUser({ id: data.id, role: data.role, username: data.username });
    return data;
  };

  const logout = async () => {
    try {
      await logoutAPI();
    } catch (e) {
      console.warn("Logout API failed, clearing cookie anyway");
    }
    cookies.remove("token", { path: "/" });
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
