import React, { useState, useEffect, useContext, createContext } from "react";
import nookies from "nookies";
import firebaseClient from "./firebase-client";
import firebase from "firebase/app";
import "firebase/auth";
const AuthContext = createContext({})

// auth file wraps everything inside a app in an auth context to handle protection for any pasts
export const AuthProvider = ({ children }) => {
  
  firebaseClient();
  const [user, setUser] = useState('');

  useEffect(() => {
    return firebase.auth().onIdTokenChanged(async (user) => {
      console.log("auth changed");
   
      if (!user) {
        setUser(null);
        nookies.set(undefined, "token", "", {});
        return;
      }
      
      const token = await user.getIdToken();
      setUser(user.uid);
      nookies.set(undefined, "token", token, {});
      console.log(user)
    });
  }, []);
  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};
export const useAuth = () => useContext(AuthContext);
