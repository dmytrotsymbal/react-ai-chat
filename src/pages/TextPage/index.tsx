import TextChatInput from "../../components/TextChat-Input/input";
import InfoBlock from "../../components/ui/InfoBlock";
import "./TextPage.scss";

type Props = {};
const TextPage = (props: Props) => {
  return (
    <div className="text-page">
      {/* <TextMessagesList currentChat={currentChat} /> */}

      <div className="bottom-section">
        <div className="text-input-container">
          <TextChatInput />

          <InfoBlock />
        </div>
      </div>
    </div>
  );
};
export default TextPage;
