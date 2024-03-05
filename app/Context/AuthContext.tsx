"use client";
import { createContext, useContext, useState } from "react";

interface AuthContextType {
  isLoggedIn: boolean;
  signIn: (payload: UserLogInInterace) => {};
  signOut: () => void;
}

interface UserLogInInterace {
  username: string;
  password: string;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: React.PropsWithChildren<{}>) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const signIn = async (payload: UserLogInInterace) => {
    try {
      const response = await fetch("http://localhost:8080/auth/signIn", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: payload.username,
          password: payload.password,
        }),
      });
      if (response.status !== 200) {
        // set error message
        throw new Error("Unable to log user in");
      }
      setIsLoggedIn(true);

      return true;
    } catch (error) {
      console.log(error);
    }
  };

  const signOut = () => {
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("useAuthContext must be used within a AuthProvider");
  }
  return authContext;
};
