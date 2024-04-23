import React, { lazy, Suspense, useEffect, useState } from "react";
import Sidebar from "./components/layout/Sidebar";
import "./App.scss";
import { Route, Routes, useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import CustomLoader from "./components/ui/CustomLoader";

const TextPage = lazy(() => import("./pages/TextPage"));
const ImagePage = lazy(() => import("./pages/ImagePage"));

const App = () => {
  const navigate = useNavigate();

  //====TEXT CHAT STATES====================================================
  const [textValue, setTextValue] = useState<string>("");
  const [textMessage, setTextMessage] = useState(null);
  const [previousTextChats, setPreviousTextChats] = useState(() => {
    const savedTextData = localStorage.getItem("previousTextChats");

    return savedTextData ? JSON.parse(savedTextData) : [];
  });

  const [currentTextTitle, setCurrentTextTitle] = useState(null);

  //====IMAGE CHAT STATES====================================================

  const [imgValue, setImgValue] = useState<string>("");
  const [imgMessage, setImgMessage] = useState(null);
  const [previousImgChats, setPreviousImgChats] = useState(() => {
    const savedImgData = localStorage.getItem("previousImgChats");
    return savedImgData ? JSON.parse(savedImgData) : [];
  });
  const [currentImgTitle, setCurrentImgTitle] = useState(null);

  useEffect(() => {
    localStorage.setItem(
      "previousTextChats",
      JSON.stringify(previousTextChats)
    );

    localStorage.setItem("previousImgChats", JSON.stringify(previousImgChats));
  }, [previousTextChats, previousImgChats]);

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

  const handleImgClick = (uniqueTitle: any) => {
    setCurrentImgTitle(uniqueTitle);
    setImgMessage(null);
    setImgValue("");
    navigate("/images");
  };

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

  const deleteImgChat = (uniqueImgTitles: any) => {
    setPreviousImgChats((prevImgChats: any) =>
      prevImgChats.filter(
        (prevImgChat: any) => prevImgChat.title !== uniqueImgTitles
      )
    );
  };

  const uniqueTextTitles = Array.from(
    new Set(previousTextChats.map((previousChat: any) => previousChat.title))
  );

  const uniqueImgTitles = Array.from(
    new Set(
      previousImgChats.map((previousImgChat: any) => previousImgChat.title)
    )
  );

  const [showSidebar, setShowSidebar] = useState(false);
  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <div className="app">
      <Sidebar
        uniqueTextTitles={uniqueTextTitles}
        uniqueImgTitles={uniqueImgTitles}
        createNewChat={createNewChat}
        handleTextClick={handleTextClick}
        handleImgClick={handleImgClick}
        deleteChat={deleteChat}
        deleteImgChat={deleteImgChat}
        currentTextTitle={currentTextTitle}
        currentImgTitle={currentImgTitle}
        showSidebar={showSidebar}
        toggleSidebar={toggleSidebar}
      />

      <section className="main">
        <IconButton
          onClick={toggleSidebar}
          className={
            showSidebar
              ? "toggle-sidebar-button active"
              : "toggle-sidebar-button"
          }
        >
          {showSidebar ? <ArrowBackIosIcon /> : <ArrowForwardIosIcon />}
        </IconButton>
        <Suspense
          fallback={
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
              }}
            >
              <CustomLoader />
            </div>
          }
        >
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
            <Route
              path="/images"
              element={
                <ImagePage
                  previousImgChats={previousImgChats}
                  setPreviousImgChats={setPreviousImgChats}
                  currentImgTitle={currentImgTitle}
                  setCurrentImgTitle={setCurrentImgTitle}
                  imgValue={imgValue}
                  setImgValue={setImgValue}
                  imgMessage={imgMessage}
                  setImgMessage={setImgMessage}
                />
              }
            />
          </Routes>
        </Suspense>
      </section>
    </div>
  );
};

export default App;
