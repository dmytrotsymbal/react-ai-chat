import { lazy, Suspense, useState } from "react";
import Sidebar from "./components/layout/Sidebar";
import "./styles/App.scss";
import { Route, Routes, useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import CustomLoader from "./components/ui/CustomLoader";
import ScrollToTop from "./utils/scrollToTop";
import useLocalStorage from "./hooks/useLocalStorage";

const TextPage = lazy(() => import("./pages/TextPage"));
const ImagePage = lazy(() => import("./pages/ImagePage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));

const App = () => {
  const navigate = useNavigate();

  const [textValue, setTextValue] = useLocalStorage<string>("textValue", "");
  const [textMessage, setTextMessage] = useLocalStorage<string | null>(
    "textMessage",
    null
  );
  const [currentTextTitle, setCurrentTextTitle] = useLocalStorage<
    string | null
  >("currentTextTitle", null);
  const [previousTextChats, setPreviousTextChats] = useLocalStorage<Array<any>>(
    "previousTextChats",
    []
  );

  const [imgValue, setImgValue] = useLocalStorage<string>("imgValue", "");
  const [imgMessage, setImgMessage] = useLocalStorage<string | null>(
    "imgMessage",
    null
  );
  const [currentImgTitle, setCurrentImgTitle] = useLocalStorage<string | null>(
    "currentImgTitle",
    null
  );
  const [previousImgChats, setPreviousImgChats] = useLocalStorage<Array<any>>(
    "previousImgChats",
    []
  );

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

  const deleteChat = (uniqueTitle: string) => {
    setPreviousTextChats((prevTextChats) =>
      prevTextChats.filter((prevTextChat) => prevTextChat.title !== uniqueTitle)
    );
    setPreviousImgChats((prevImgChats) =>
      prevImgChats.filter((prevImgChat) => prevImgChat.title !== uniqueTitle)
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
          {showSidebar ? (
            <ArrowBackIosIcon sx={{ color: "#ececf1" }} />
          ) : (
            <ArrowForwardIosIcon sx={{ color: "#ececf1" }} />
          )}
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
