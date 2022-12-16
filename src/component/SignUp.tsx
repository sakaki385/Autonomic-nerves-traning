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
        window.alert(
          "確認メールを送信しました。\nメールのURLからユーザー登録を完成させてください。"
        );
      }
      //一度サインインページに戻す。
      navigate("/");
    });
  };

  return (
    <div>
      <h2>新規登録</h2>
      <form onSubmit={handleSubmit}>
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
        <button type="submit">送信</button>
      </form>
    </div>
  );
};

export default SignUp;
