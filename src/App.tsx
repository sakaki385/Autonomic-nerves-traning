import React, { createContext, useContext, useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import "./App.css";
import Main from "./component/Main";
import SignIn from "./component/SignIn";
import { auth } from "./component/firebase";

type User = {
  currentUser: User | null | undefined;
};

export const TestContext = createContext<User>({ currentUser: undefined });

function App() {
  const [currentUser, setCurrentUser] = useState<any>(undefined);

  const [user] = useAuthState(auth);
  useEffect(() => {
    setCurrentUser(user);
    console.log(TestContext);
  }, [user]);

  const contextValue = currentUser;

  return (
    <TestContext.Provider value={{ currentUser: currentUser }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/Main" element={<Main />} />
        </Routes>
      </BrowserRouter>
    </TestContext.Provider>
  );
}

export default App;

// Routerを使った遷移処理を完成させる。
//   サインインすると質問ページに飛ぶ【済み】
//   サインインしてなかったらサインインページに飛ばす。
//   サインアウトしたらユーザー情報をクリアしてサインインページに飛ばす。

// 採点結果のPost処理を完成させる。
//　現状だと送信ボタンを2回押さないと送信されない【済】
//　過去の記録をアプリ上で確認できるようにする【調査】

// useContextを実装してユーザーの状態管理をする。
