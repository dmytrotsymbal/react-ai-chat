import "./EmptyTextChat.scss";
import TextAIavatar from "../../../assets/TextAIavatar.png";

type Props = {};
const EmptyTextChat = (props: Props) => {
  return (
    <div className="empty-text-chat">
      <img
        className="empty-text-chat__img"
        src={TextAIavatar}
        alt="empty-text-chat-img"
      />

      <h2 className="empty-text-chat__heading">How can I help you today?</h2>

      <p className="empty-text-chat__text">
        You can start a new chat and ask me anything
      </p>
    </div>
  );
};
export default EmptyTextChat;
