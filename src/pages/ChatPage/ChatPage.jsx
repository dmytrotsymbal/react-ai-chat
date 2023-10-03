import { useEffect } from 'react';
import TextMessagesList from './TextMessagesList';

const ChatPage = ({
  previousChats = [],
  setPreviousChats,
  currentTitle,
  setCurrentTitle,
  value,
  setValue,
  message,
  setMessage,
}) => {
  const getMessages = async () => {
    const options = {
      method: 'POST',
      body: JSON.stringify({
        message: value,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const response = await fetch(
        'http://localhost:8000/completions',
        options,
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
          role: 'user',
          content: value,
        },
        {
          title: currentTitle,
          role: 'bot',
          content: message.content,
        },
      ]);
    }
  }, [message, currentTitle]);

  const currentChat = previousChats.filter(
    (previousChat) => previousChat.title === currentTitle,
  );

  return (
    <section className="textChat">

      <TextMessagesList currentChat={currentChat} />

      <div className="bottomSection">
        <div className="inputContainer">
          <input
            value={value || ''}
            onChange={(e) => setValue(e.target.value)}
            type="text"
            placeholder="Type your prompt..."
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
  );
};
export default ChatPage;
