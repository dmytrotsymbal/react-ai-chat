import "./EmptyTextChat.scss";

type Props = {};
const EmptyTextChat = (props: Props) => {
  return (
    <div className="empty-text-chat">
      <img
        className="empty-text-chat__img"
        src="https://image.knowing.asia/5ea8da02-fd92-43b3-b28d-86fcaacdbee2/50b4c6f3dec5685e0ee8d1595456899d.png"
        alt="AI-avatar"
      />

      <h2 className="empty-text-chat__heading">How can I help you today?</h2>

      <p className="empty-text-chat__text">
        You can start a new chat and ask me anything
      </p>
    </div>
  );
};
export default EmptyTextChat;
