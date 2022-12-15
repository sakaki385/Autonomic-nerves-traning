import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "./firebase";

const SignUp = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const navigate = useNavigate();

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    createUserWithEmailAndPassword(auth, email, password).then(() => {
      if (auth.currentUser !== null) {
        sendEmailVerification(auth.currentUser);
      }
      //ここでログイン状態になっていて、サインインページに飛ぶと自動的にMainに飛ばされる
      console.log(auth.currentUser);
      navigate("/");
    });
  };

  return (
    <div>
      <h2>新規登録</h2>
      <input
        type="email"
        placeholder="email"
        value={email}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setEmail(e.target.value);
        }}
      />
      <br />
      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setPassword(e.target.value);
        }}
      />
      <br />
      <button type="submit" onSubmit={handleSubmit}>
        送信
      </button>
    </div>
  );
};

export default SignUp;
