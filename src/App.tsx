import React, { createContext, useContext, useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./component/firebase";
import "./App.css";
import Main from "./component/Main";
import SignIn from "./component/SignIn";
import SignUp from "./component/SignUp";

export const GoogleUserContext = createContext({ currentUser: null });

function App() {
  const [currentUser, setCurrentUser] = useState<any>(undefined);
  const [user] = useAuthState(auth);

  useEffect(() => {
    setCurrentUser(user);
  }, [user]);

  const userValue = { currentUser, setCurrentUser };

  return (
    <GoogleUserContext.Provider value={userValue}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/Main" element={<Main />} />
          <Route path="/SignUp" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </GoogleUserContext.Provider>
  );
}

export default App;
