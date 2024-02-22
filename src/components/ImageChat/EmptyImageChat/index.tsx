import "./EmptyImageChat.scss";
import ImgAIavatar from "../../../assets/ImgAIavatar.png";

type Props = {};
const EmptyImageChat = (props: Props) => {
  return (
    <div className="empty-image-chat">
      <img
        className="empty-image-chat__img"
        src={ImgAIavatar}
        alt="empty-chat-img"
      />

      <h2 className="empty-image-chat__heading">
        Let me turn your imagination into imagery
      </h2>

      <p className="empty-image-chat__text">
        A GPT specialized in generating and refining images with a mix of <br />
        professional and friendly tone.image generator
      </p>
    </div>
  );
};
export default EmptyImageChat;
