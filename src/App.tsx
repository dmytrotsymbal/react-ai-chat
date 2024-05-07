import React, { lazy, Suspense, useEffect, useState } from "react";
import Sidebar from "./components/layout/Sidebar";
import "./styles/App.scss";
import { Route, Routes, useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import CustomLoader from "./components/ui/CustomLoader";
import ScrollToTop from "./utils/scrollToTop";

const TextPage = lazy(() => import("./pages/TextPage"));
const ImagePage = lazy(() => import("./pages/ImagePage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));

const App = () => {
  const navigate = useNavigate();

  const [textValue, setTextValue] = useState<string>("");
  const [textMessage, setTextMessage] = useState(null);
  const [currentTextTitle, setCurrentTextTitle] = useState(null);
  const [previousTextChats, setPreviousTextChats] = useState(() => {
    const savedTextData = localStorage.getItem("previousTextChats");
    return savedTextData ? JSON.parse(savedTextData) : [];
  });

  const [imgValue, setImgValue] = useState<string>("");
  const [imgMessage, setImgMessage] = useState(null);
  const [currentImgTitle, setCurrentImgTitle] = useState(null);
  const [previousImgChats, setPreviousImgChats] = useState(() => {
    const savedImgData = localStorage.getItem("previousImgChats");
    return savedImgData ? JSON.parse(savedImgData) : [];
  });

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
    setCurrentImgTitle(null);
    setTextMessage(null);
    setTextValue("");
    navigate("/");
  };

  const handleImgClick = (uniqueTitle: any) => {
    setCurrentImgTitle(uniqueTitle);
    setCurrentTextTitle(null);
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

  const [showSidebar, setShowSidebar] = useState(false);
  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <div className="app">
      <Sidebar
        createNewChat={createNewChat}
        handleTextClick={handleTextClick}
        handleImgClick={handleImgClick}
        deleteChat={deleteChat}
        currentTextTitle={currentTextTitle}
        currentImgTitle={currentImgTitle}
        showSidebar={showSidebar}
        toggleSidebar={toggleSidebar}
        previousTextChats={previousTextChats}
        previousImgChats={previousImgChats}
        setPreviousTextChats={setPreviousTextChats}
        setPreviousImgChats={setPreviousImgChats}
        setCurrentTextTitle={setCurrentTextTitle}
        setCurrentImgTitle={setCurrentImgTitle}
      />

      <section className="main">
        <ScrollToTop />
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

            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </section>
    </div>
  );
};

export default App;
