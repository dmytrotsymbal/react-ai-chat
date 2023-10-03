import '../../styles/ImagePage.scss';
import { useEffect } from 'react';
import EmptyChat from '../../assets/empty.png';
const ImagePage = ({
  imgPreviousChats = [],
  setImgPreviousChats,
  imgCurrentTitle,
  imgValue,
  setImgValue,
  imgMessage,
  setImgMessage,
  setImgCurrentTitle,
}) => {
  const IMG_KEY = 'ahahah aga udachi';

  const getImages = async () => {
    const options = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${IMG_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: imgValue,
        n: 1,
        size: '256x256',
      }),
    };

    try {
      const response = await fetch(
        'https://api.openai.com/v1/images/generations',
        options,
      );
      const data = await response.json();
      setImgMessage(data.data[0].url);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!imgCurrentTitle && imgValue && imgMessage) {
      setImgCurrentTitle(imgValue);
    }

    if (imgCurrentTitle && imgValue && imgMessage) {
      setImgPreviousChats((prevChats) => [
        ...prevChats,
        {
          title: imgCurrentTitle,
          role: 'user',
          content: imgValue,
        },
        {
          title: imgCurrentTitle,
          role: 'bot',
          content: imgMessage,
        },
      ]);
    }
  }, [imgMessage, imgCurrentTitle]);

  const currentImgChat = imgPreviousChats.filter(
    (previousImgChat) => previousImgChat.title === imgCurrentTitle,
  );
  return (
    <section className="imageChat">
      <ul className="imageMessages">
        {currentImgChat.length === 0 ? (
          <img className="emptyImageChatImg" src={EmptyChat} alt="Empty chat" />
        ) : (
          currentImgChat.map((chatMessage, index) => (
            <li
              key={index}
              className={
                chatMessage.role === 'user' ? 'userMessage' : 'botMessage'
              }
            >
              <div className="messageContent">
                {chatMessage.role === 'user' ? (
                  <div className="userIcon">U</div>
                ) : (
                  <div className="botIcon">AI</div>
                )}

                {chatMessage.role === 'user' ? (
                  <p className="userTextPrompt">{chatMessage.content}</p>
                ) : (
                  <img
                    className="botImageResponse"
                    src={chatMessage.content}
                    alt="generatedImage"
                  />
                )}
              </div>
            </li>
          ))
        )}
      </ul>

      <div className="bottomSection">
        <div className="inputContainer">
          <input
            value={imgValue || ''}
            onChange={(e) => setImgValue(e.target.value)}
            type="text"
            placeholder="Generate an image"
          />

          <button id="submit" onClick={getImages}>
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
export default ImagePage;
