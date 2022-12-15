import React, { createContext, useContext, useState, useEffect } from "react";
import { auth, provider, db, analytics } from "./firebase";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { GoogleUserContext } from "../App";

const SignIn = () => {
  const [email, setEmail] = useState<string>("");
  //const [user, setUser] = useState("");
  const [password, setPassword] = useState<string>("");
  const googleUser = useContext(GoogleUserContext);
  const navigate = useNavigate();

  //メールアドレスで登録しているユーザーのサインイン処理
  const handleSignIn = async (event: { preventDefault: () => any }) => {
    event.preventDefault();
    signInWithEmailAndPassword(auth, email, password).then(() => {
      console.log(auth.currentUser);
      navigate("/Main");
    });
  };

  //メールアドレスで登録しているユーザーが既にログイン状態ならMainに遷移する
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user !== null) {
        if (user.emailVerified === true) {
          navigate("/Main");
        }
      }
    });
  }, []);

  //signInWithPopupでGoogleサインイン
  const handleGoogleSignIn = () => {
    signInWithPopup(auth, provider);
  };
  //GoogleサインインしたらnavigateでMainに遷移する
  useEffect(() => {
    if (googleUser.currentUser) {
      navigate("/Main");
    }
  }, [googleUser.currentUser]);

  //登録ボタンを押したらアカウント登録画面へnavigate
  const navigateSignUp = () => {
    navigate("/SignUp");
  };

  //ログインフォームの入力値の監視
  useEffect(() => {
    console.log(email);
  }, [email]);
  useEffect(() => {
    console.log(password);
  }, [password]);

  return (
    <div>
      <h2 className="title">自律神経管理アプリ</h2>
      <input
        type="email"
        placeholder="email"
        value={email}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setEmail(e.target.value)
        }
      ></input>
      <br />
      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          //ここ、e.target.valueでvalueの{password}をsetしようとしているのに値が更新されていくのはなぜ？(e)じゃだめなのか
          setPassword(e.target.value)
        }
      ></input>
      <br />
      <button type="submit" onClick={handleSignIn}>
        送信
      </button>
      <button onClick={navigateSignUp}>
        アカウント登録
        <br />
      </button>
      <button onClick={handleGoogleSignIn}>Googleでサインイン</button>
    </div>
  );
};

export default SignIn;
