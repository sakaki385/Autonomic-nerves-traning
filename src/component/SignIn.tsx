import React, { createContext, useContext, useState, useEffect } from "react";
import { auth, provider, db, analytics } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import App from "../App";
import { TestContext } from "../App";

//export const AuthContext = createContext();

const SignIn = () => {
  const [user] = useAuthState(auth);
  // const [users, SetUsers] = useState(user);
  // const contextValue = user;
  const contextValue = useContext(TestContext);
  const navigate = useNavigate();
  const handleSignIn = () => {
    signInWithPopup(auth, provider);
    console.log(contextValue);
  };

  useEffect(() => {
    // if (contextValue !== undefined || contextValue !== null) {
    //   navigate("/Main");
    // }
    console.log(contextValue);
  }, [contextValue]);

  return (
    <div>
      {/* <AuthContext.Provider value={contextValue}>
        <App />
      </AuthContext.Provider> */}

      <h2 className="title">自律神経管理アプリ</h2>
      <button onClick={handleSignIn}>サインイン</button>
    </div>
  );
};

export default SignIn;
