type Props = {
  currentImgChat: any;
};
const ImageMessagesList = ({ currentImgChat }: Props) => {
  return (
    <ul className="image-messages-list">
      {currentImgChat.length === 0 ? (
        <p>No images yet</p>
      ) : (
        currentImgChat.map((imageMessage: any, index: number) => (
          <li
            key={index}
            className={
              imageMessage.role === "user" ? "user-message" : "bot-message"
            }
          >
            <div className="message-montent">
              {imageMessage.role === "user" ? (
                <div className="userIcon">U</div>
              ) : (
                <div className="botIcon">AI</div>
              )}

              {imageMessage.role === "user" ? (
                <p className="userTextPrompt">{imageMessage.content}</p>
              ) : (
                <img
                  className="botImageResponse"
                  src={imageMessage.content}
                  alt="generatedImage"
                />
              )}
            </div>
          </li>
        ))
      )}
    </ul>
  );
};
export default ImageMessagesList;
