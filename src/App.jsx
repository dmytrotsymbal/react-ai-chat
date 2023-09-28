import "./styles/App.scss";
import { useState, useEffect } from "react";
import EmptyChat from './assets/empty.png'
import ChatImg from './assets/chat.png'
import PhotoImg from './assets/photo.png' 
import AddIcon from '@mui/icons-material/Add';
import SettingsIcon from '@mui/icons-material/Settings';
import InfoIcon from '@mui/icons-material/Info';
import LightModeIcon from '@mui/icons-material/LightMode';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const App = () => {
  const [value, setValue] = useState(null);
  const [message, setMessage] = useState(null);
  const [previousChats, setPreviousChats] = useState([]);
  const [currentTitle, setCurrentTitle] = useState(null);

  const createNewChat = () => {
    setMessage(null);
    setValue("");
    setCurrentTitle(null);
  };

  const handleClick = (uniqueTitle) => {
    setCurrentTitle(uniqueTitle);
    setMessage(null);
    setValue("");
  };

  const deleteChat = (uniqueTitle) => {
    setPreviousChats((prevChats) =>
      prevChats.filter((prevChat) => prevChat.title !== uniqueTitle)
    );
  };

  const getMessages = async () => {
    const options = {
      method: "POST",
      body: JSON.stringify({
        message: value,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await fetch(
        "http://localhost:8000/completions",
        options
      );
      const data = await response.json();
      setMessage(data.choices[0].message);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!currentTitle && value && message) {
      setCurrentTitle(value);
    }

    if (currentTitle && value && message) {
      setPreviousChats((prevChats) => [
        ...prevChats,
        {
          title: currentTitle,
          role: "user",
          content: value,
        },
        {
          title: currentTitle,
          role: message.role,
          content: message.content,
        },
      ]);
    }
  }, [message, currentTitle]);

  const currentChat = previousChats.filter(
    (previousChat) => previousChat.title === currentTitle
  );

  const uniqueTitles = Array.from(
    new Set(previousChats.map((previousChat) => previousChat.title))
  );

  return (
    <div className="App">
      <aside className="sideBar">
        <button className="newChatButton" onClick={createNewChat}>
          <AddIcon /> New chat!
        </button>

        <ul className="history">
          {uniqueTitles?.map((uniqueTitle, index) => (
            <li
              className={uniqueTitle === currentTitle ? "activeTitle" : ""}
              key={index}
              onClick={() => handleClick(uniqueTitle)}
            >
              {uniqueTitle}
              {uniqueTitle === currentTitle ? (
                <div className="activeChatButtons">
                  <button className="editChatButton">
                    <EditIcon sx={{ width: "15px", height: "15px" }} />
                  </button>
                  <button
                    className="deleteChatButton"
                    onClick={() => deleteChat(uniqueTitle)}
                  >
                    <DeleteIcon sx={{ width: "15px", height: "15px" }} />
                  </button>
                </div>
              ) : null}
            </li>
          ))}
        </ul>

        <div className="lower">
          <button>
            <LightModeIcon />
          </button>
          <button>
            <SettingsIcon />
          </button>
          <button>
            <InfoIcon />
          </button>
        </div>
      </aside>

      <section className="mainChat">
        {!currentTitle && <h1>ChatGPT</h1>}

        <ul className="messages">
          {currentChat.length === 0 ? (
            <img className="emptyChatImg" src={EmptyChat} alt="Empty chat" />
          ) : (
            currentChat.map((chatMessage, index) => (
              <li
                key={index}
                className={
                  chatMessage.role === "user" ? "userMessage" : "botMessage"
                }
              >
                <div className="messageContent">
                  <div
                    className={
                      chatMessage.role === "user" ? "userIcon" : "botIcon"
                    }
                  ></div>
                  <p className="messageText">{chatMessage.content}</p>
                </div>
              </li>
            ))
          )}
        </ul>

        <div className="convButtonsDiv">
          {currentChat.length === 0 ? (
            <div className="convButtonsDivContainer">
              <button className="textButton">
                Start chat
                <img src={ChatImg} alt="ChatImg" />
              </button>

              <button className="imgButton">
                Photo
                <img src={PhotoImg} alt="PhotoImg" />
              </button>
            </div>
          ) : null}
        </div>

        <div className="bottomSection">
          <div className="inputContainer">
            <input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              type="text"
              placeholder="Send a message"
            />

            <button id="submit" onClick={getMessages}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="none"
                className="icon-sm m-1 md:m-0"
              >
                <path
                  d="M.5 1.163A1 1 0 0 1 1.97.28l12.868 6.837a1 1 0 0 1 0 1.766L1.969 15.72A1 1 0 0 1 .5 14.836V10.33a1 1 0 0 1 .816-.983L8.5 8 1.316 6.653A1 1 0 0 1 .5 5.67V1.163Z"
                  fill="currentColor"
                ></path>
              </svg>
            </button>

            <p className="info">
              Free Research Preview. ChatGPT may produce inaccurate information
              about people, places, or facts. ChatGPT August 3 Version
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default App;
