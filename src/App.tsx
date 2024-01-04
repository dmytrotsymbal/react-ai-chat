import React, { lazy, Suspense, useState } from "react";
import Sidebar from "./components/layout/Sidebar";
import "./App.scss";
import { Route, Routes, useNavigate } from "react-router-dom";

const TextPage = lazy(() => import("./pages/TextPage"));
const ImagePage = lazy(() => import("./pages/ImagePage"));

const App = () => {
  const navigate = useNavigate();
  const [textValue, setTextValue] = useState<string>("");
  const [textMessage, setTextMessage] = useState(null);
  const [previousTextChats, setPreviousTextChats] = useState([]);
  const [currentTextTitle, setCurrentTextTitle] = useState(null);

  //-------------------------------------------------------------------------

  const [imgValue, setImgValue] = useState<string>("");
  const [imgMessage, setImgMessage] = useState(null);
  const [previousImgChats, setPreviousImgChats] = useState([]);
  const [currentImgTitle, setCurrentImgTitle] = useState(null);

  //-------------------------------------------------------------------------

  const createNewChat = () => {
    setTextMessage(null);
    setTextValue("");
    setImgValue("");
    setCurrentTextTitle(null);
    setCurrentImgTitle(null);
  };

  const handleTextClick = (uniqueTitle: any) => {
    setCurrentTextTitle(uniqueTitle);
    setTextMessage(null);
    setTextValue("");
    navigate("/");
  };

  // const handleImgClick = (uniqueTitle: any) => {
  //   setCurrentImgTitle(uniqueTitle);
  //   setImgMessage(null);
  //   setImgValue("");
  //   navigate("/images");
  // };

  //-------------------------------------------------------------------------

  const deleteChat = (uniqueTitle: any) => {
    setPreviousTextChats((prevChats: any) =>
      prevChats.filter((prevChat: any) => prevChat.title !== uniqueTitle)
    );

    setPreviousImgChats((prevImgChats: any) =>
      prevImgChats.filter(
        (prevImgChat: any) => prevImgChat.title !== uniqueTitle
      )
    );
  };

  // const deleteImgChat = (uniqueTitle: any) => {
  //   setPreviousImgChats((prevImgChats: any) =>
  //     prevImgChats.filter(
  //       (prevImgChat: any) => prevImgChat.title !== uniqueTitle
  //     )
  //   );
  // };

  const uniqueTextTitles = Array.from(
    new Set(
      previousTextChats.map(
        (previousChat: any) => previousChat.title.split(" ")[0]
      )
    )
  );

  const uniqueImgTitles = Array.from(
    new Set(
      previousImgChats.map(
        (previousImgChat: any) => previousImgChat.title.split(" ")[0]
      )
    )
  );

  const currentImgChat = previousImgChats.filter(
    (previousImgChat: any) => previousImgChat.title === currentImgTitle
  );

  return (
    <div className="app">
      <Sidebar
        uniqueTextTitles={uniqueTextTitles}
        uniqueImgTitles={uniqueImgTitles}
        createNewChat={createNewChat}
        handleTextClick={handleTextClick}
        // handleImgClick={handleImgClick}
        deleteChat={deleteChat}
        // deleteImgChat={deleteImgChat}
        currentTextTitle={currentTextTitle}
        currentImgTitle={currentImgTitle}
      />
      <section className="main">
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route
              path="/"
              element={
                <TextPage
                  previousTextChats={previousTextChats}
                  setPreviousTextChats={setPreviousTextChats}
                  currentTextTitle={currentTextTitle}
                  setCurrentTextTitle={setCurrentTextTitle}
                  textValue={textValue}
                  setTextValue={setTextValue}
                  textMessage={textMessage}
                  setTextMessage={setTextMessage}
                />
              }
            />
            <Route path="/images" element={<ImagePage />} />
          </Routes>
        </Suspense>
      </section>
    </div>
  );
};

export default App;
