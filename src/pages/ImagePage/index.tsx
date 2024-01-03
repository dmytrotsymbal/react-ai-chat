import ImageChatInput from "../../components/ImageChat-Input/input";
import InfoBlock from "../../components/ui/InfoBlock";
import "./ImagePage.scss";

type Props = {};
const ImagePage = (props: Props) => {
  return (
    <div className="image-page">
      {/* <ul className="imageMessages">
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
      </ul> */}

      <div className="bottom-section">
        <div className="image-input-container">
          <ImageChatInput />

          <InfoBlock />
        </div>
      </div>
    </div>
  );
};
export default ImagePage;
