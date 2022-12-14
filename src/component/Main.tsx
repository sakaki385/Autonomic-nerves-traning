import React, { useState, useEffect, useContext } from "react";
import { auth, provider, db, analytics } from "./firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";

const Main = () => {
  const [user] = useAuthState(auth);
  const [date, setDate] = useState("");
  const navigate = useNavigate();
  const userContext = useContext(UserContext);

  const [points, setPoints] = useState(Array(15).fill(2));
  const [scores, setScores] = useState();
  const [answers, setAnswer] = useState("");

  //日付の追加。setDateでdateに日付が入る
  useEffect(() => {
    const date = new Date();
    const createDate =
      String(date.getFullYear()) +
      ("0" + (date.getMonth() + 1)).slice(-2) +
      ("0" + date.getDate()).slice(-2);
    setDate(createDate);
  }, []);

  //ユーザーが空ならサインインページへ
  useEffect(() => {
    if (user === null) {
      navigate("/");
    }
  }, [user]);

  //ラジオボタンに変更があったら総合点を計算
  useEffect(() => {
    const totalScore = points.reduce((acc, currentValue) => {
      return acc + currentValue;
    });
    setScores(totalScore);
  }, [points]);

  //質問の配列
  const [questions, setQuestions] = useState([
    { id: 1, question: "朝起きて日光は浴びましたか？" },
    { id: 2, question: "しっかりと朝食は摂りましたか？" },
    { id: 3, question: "３食抜かずに食べましたか？" },
    {
      id: 4,
      question: "1日を通して栄養バランスのいい食事を摂れましたか？",
    },
    { id: 5, question: "普段と同じ時間に食事ができましたか？" },
    { id: 6, question: "おなかの調子はよかったですか" },
    { id: 7, question: "喫煙や深酒はしませんでしたか" },
    {
      id: 8,
      question: "適度な運動はしましたか？（ウォーキング程度で可）",
    },
    { id: 9, question: "風呂に浸かりましたか？" },
    { id: 10, question: "強いストレスは受けていませんか？" },
    { id: 11, question: "ストレスは発散できましたか？" },
    { id: 12, question: "いつもと同じ時間に起きられましたか？" },
    { id: 13, question: "いつもと同じ時間に寝られましたか？" },
    { id: 14, question: "睡眠は足りていますか？" },
    { id: 15, question: "寝る前にパソコンやスマホを見ないで眠れましたか？" },
  ]);

  // 点数を計算
  const ScoreCalculation = () => {
    const totalScore = points.reduce((acc, currentValue) => {
      return acc + currentValue;
    });
    console.log(totalScore);
    setScores(totalScore);

    const newAnswer = (scores: number) => {
      if (scores < 10) {
        setAnswer("がんばりましょう");
      } else if (scores < 20) {
        setAnswer("あと少しです");
      } else {
        setAnswer("よくできました");
      }
    };
    newAnswer(totalScore);
  };

  // ポイント書き換え
  // インデックス番号と加算したい数字を受け取って、setPointsで受け取ったインデックス番号と合うオブジェクトのみnewPointで書き換える
  const handleChangePoints = (i: number, newPoint: number) => {
    setPoints(points.map((point, index) => (index === i ? newPoint : point)));
  };

  //Getの処理
  const GetUserInfo = async () => {
    const docRef = doc(db, "users", "3Se1DqTfAdTgNjoKiAug");
    const docSnap = await getDoc(docRef);
    const TestDocRef = doc(db, "users", user!.uid);
    const TestDocSnap = await getDoc(TestDocRef);
    console.log(TestDocSnap.data());
    console.log(user);
  };
  //Postの処理
  const PostUserInfo = async () => {
    ScoreCalculation();
    const userPost = doc(db, "users", user!.uid, date, "data");

    await setDoc(userPost, {
      name: user?.displayName,
      result: scores,
    });
  };
  //サインアウト処理
  const handleSignOut = () => {
    auth.signOut();
  };

  return (
    <div className="loginform">
      {user ? (
        <div>
          <button onClick={handleSignOut}>サインアウト</button>
          <button onClick={GetUserInfo}>Get</button>
          <button onClick={PostUserInfo}>Post</button>
          <p>{`こんにちは！${user!.displayName}さん`}</p>
          <div>
            <h3>昨日の生活について思い出してみてください。</h3>

            <ul>
              {/* itemは配列の中の一つ一つのオブジェクト、iはインデックス番号の意 */}
              {questions.map((item, i) => (
                <li key={i}>
                  <h5>{item.question}</h5>
                  <label>
                    <input
                      type="radio"
                      name={`${item.id}問目`}
                      defaultChecked
                      onChange={() => {
                        // インデックス番号と加算したいポイント数をhandleChangePointsに渡す
                        handleChangePoints(i, 2);
                      }}
                    />
                    はい
                  </label>
                  <label>
                    <input
                      type="radio"
                      name={`${item.id}問目`}
                      onChange={() => {
                        handleChangePoints(i, 1);
                      }}
                    />
                    どちらとも言えない
                  </label>
                  <label>
                    <input
                      type="radio"
                      name={`${item.id}問目`}
                      onChange={() => {
                        handleChangePoints(i, 0);
                      }}
                    />
                    いいえ
                  </label>
                </li>
              ))}
            </ul>
            <button
              type="submit"
              onClick={() => {
                PostUserInfo();
              }}
            >
              送信
            </button>
            <div>
              {answers === "" ? "" : <h2>{`結果は${scores}点でした`}</h2>}
              {answers === "" ? "" : <h5>{answers}</h5>}
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Main;
