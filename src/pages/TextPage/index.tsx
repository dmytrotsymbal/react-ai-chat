import { useEffect } from "react";
import TextChatInput from "../../components/TextChat-Input";
import InfoBlock from "../../components/ui/InfoBlock";
import "./TextPage.scss";
import TextMessagesList from "../../components/TextMessagesList";

type Props = {
  previousTextChats: any;
  setPreviousTextChats: any;
  currentTextTitle: any;
  setCurrentTextTitle: any;
  textValue: any;
  setTextValue: any;
  textMessage: any;
  setTextMessage: any;
};
const TextPage = ({
  previousTextChats,
  setPreviousTextChats,
  currentTextTitle,
  setCurrentTextTitle,
  textValue,
  setTextValue,
  textMessage,
  setTextMessage,
}: Props) => {
  const getMessages = async () => {
    const options = {
      method: "POST",
      body: JSON.stringify({
        message: textValue,
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
      setTextMessage(data.choices[0].message);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!currentTextTitle && textValue && textMessage) {
      setCurrentTextTitle(textValue);
    }

    if (currentTextTitle && textValue && textMessage) {
      setPreviousTextChats((prevChats: any) => [
        ...prevChats,
        {
          title: currentTextTitle,
          role: "user",
          content: textValue,
        },
        {
          title: currentTextTitle,
          role: "bot",
          content: textMessage.content,
        },
      ]);
    }
  }, [textMessage, currentTextTitle]);

  const currentChat = previousTextChats.filter(
    (previousChat: any) => previousChat.title === currentTextTitle
  );
  return (
    <div className="text-page">
      <TextMessagesList currentChat={currentChat} />

      <div className="bottom-section">
        <div className="text-input-container">
          <TextChatInput
            textValue={textValue}
            setTextValue={setTextValue}
            getMessages={getMessages}
          />

          <InfoBlock />
        </div>
      </div>
    </div>
  );
};
export default TextPage;
