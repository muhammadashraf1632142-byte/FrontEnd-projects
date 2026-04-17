import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export default function AuthContextProvider(props) {
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [userData, setUserData] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [userName, setUserName] = useState(null);

  async function getUserData(currentToken = token) {
    if (!currentToken) {
      setUserData(null);
      setUserName(null);
      setLoadingUser(false);
      return null;
    }

    try {
      setLoadingUser(true);

      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/users/profile-data`,
        {
          headers: {
            token: currentToken,
          },
        },
      );

      console.log("profile response:", response.data);

      const profileData = response?.data?.data ?? null;
      const profileName = profileData?.user?.name || "User";

      setUserData(profileData);
      setUserName(profileName);
      localStorage.setItem("name", profileName);

      return profileData;
    } catch (error) {
      console.log("profile error:", error.response?.data || error.message);

      localStorage.removeItem("token");
      localStorage.removeItem("name");
      setToken(null);
      setUserData(null);
      setUserName(null);

      return null;
    } finally {
      setLoadingUser(false);
    }
  }

  function login(savedToken) {
    localStorage.setItem("token", savedToken);
    setToken(savedToken);
  }

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    setToken(null);
    setUserData(null);
    setLoadingUser(false);
    setUserName(null);
  }

  useEffect(() => {
    getUserData(token);
  }, [token]);

  return (
    <AuthContext.Provider
      value={{
        token,
        setToken,
        userData,
        setUserData,
        getUserData,
        login,
        logout,
        loadingUser,
        userName,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
