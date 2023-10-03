import "./styles/App.scss";
import { useState } from "react";
import { Route, Routes, useNavigate } from "react-router";
import ChatPage from "./pages/ChatPage/ChatPage";
import ImagePage from "./pages/ImagePage/ImagePage";
import Header from "./components/layout/Header";
import SideBar from "./components/layout/SideBar";

const App = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState(null);
  const [message, setMessage] = useState(null);
  const [previousChats, setPreviousChats] = useState([]);
  const [currentTitle, setCurrentTitle] = useState(null);

  //-------------------------------------------------------------------------

  const [imgValue, setImgValue] = useState(null);
  const [imgMessage, setImgMessage] = useState(null);
  const [imgPreviousChats, setImgPreviousChats] = useState([]);
  const [imgCurrentTitle, setImgCurrentTitle] = useState(null);

  //-------------------------------------------------------------------------

  const createNewChat = () => {
    setMessage(null);
    setValue("");
    setImgValue("");
    setCurrentTitle(null);
    setImgCurrentTitle(null);
  };


  const handleTextClick = (uniqueTitle) => {
    setCurrentTitle(uniqueTitle);
    setMessage(null);
    setValue("");
    navigate("/");
  };
  

  const handleImgClick = (uniqueTitle) => {
    setImgCurrentTitle(uniqueTitle);
    setImgMessage(null);
    setImgValue("");
    navigate("/images");
  };

  //-------------------------------------------------------------------------

  const deleteChat = (uniqueTitle) => {
    setPreviousChats((prevChats) =>
      prevChats.filter((prevChat) => prevChat.title !== uniqueTitle)
    );
  };

  const deleteImgChat = (uniqueTitle) => {
    setImgPreviousChats((prevImgChats) =>
      prevImgChats.filter((prevImgChat) => prevImgChat.title !== uniqueTitle)
    );
  }

  const uniqueTextTitles = Array.from(
    new Set(previousChats.map((previousChat) => previousChat.title.split(' ')[0]))
  );

  const uniqueImgTitles = Array.from(
    new Set(imgPreviousChats.map((previousImgChat) => previousImgChat.title))
  );

  const currentChat = previousChats.filter(
    (previousChat) => previousChat.title === currentTitle
  );

  const currentImgChat = imgPreviousChats.filter(
    (previousImgChat) => previousImgChat.title === imgCurrentTitle
  );

  return (
    <div className="App">
      <SideBar
        uniqueTextTitles={uniqueTextTitles}
        uniqueImgTitles={uniqueImgTitles}
        createNewChat={createNewChat}
        handleTextClick={handleTextClick}
        handleImgClick={handleImgClick}
        deleteChat={deleteChat}
        deleteImgChat={deleteImgChat}
        currentTitle={currentTitle}
        imgCurrentTitle={imgCurrentTitle}
      />

      <section className="mainSection">
        {currentChat.length === 0 && currentImgChat.length === 0 ? <Header /> : null}
        <Routes>
          <Route
            path="/"
            element={
              <ChatPage
                previousChats={previousChats}
                setPreviousChats={setPreviousChats}
                currentTitle={currentTitle}
                setCurrentTitle={setCurrentTitle}
                value={value}
                setValue={setValue}
                message={message}
                setMessage={setMessage}
              />
            }
          />

          <Route
            path="/images"
            element={
              <ImagePage
                imgPreviousChats={imgPreviousChats}
                setImgPreviousChats={setImgPreviousChats}
                imgCurrentTitle={imgCurrentTitle}
                setImgCurrentTitle={setImgCurrentTitle}
                imgValue={imgValue}
                setImgValue={setImgValue}
                imgMessage={imgMessage}
                setImgMessage={setImgMessage}
              />
            }
          />
        </Routes>
      </section>
    </div>
  );
};

export default App;
