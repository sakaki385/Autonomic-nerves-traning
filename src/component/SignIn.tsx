import React, { createContext, useContext, useState, useEffect } from "react";
import { auth, provider, db, analytics } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import App from "../App";
import { UserContext } from "../App";

const SignIn = () => {
  //const [user] = useAuthState(auth);
  // const [users, SetUsers] = useState(user);
  // const contextValue = user;

  const user = useContext(UserContext);
  const navigate = useNavigate();
  const handleSignIn = () => {
    signInWithPopup(auth, provider);
  };

  //サインインしたらnavigateでMainに遷移する
  useEffect(() => {
    if (user.currentUser) {
      navigate("/Main");
    }
  }, [user.currentUser]);

  return (
    <div>
      <h2 className="title">自律神経管理アプリ</h2>
      <button onClick={handleSignIn}>サインイン</button>
    </div>
  );
};

export default SignIn;
