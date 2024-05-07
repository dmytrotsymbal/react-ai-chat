import { useEffect, useState } from "react";
import TextChatInput from "../../components/TextChat/TextChat-Input";
import InfoBlock from "../../components/ui/InfoBlock";
import "./TextPage.scss";
import TextMessagesList from "../../components/TextChat/TextMessagesList";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/system";

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
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const getMessages = async () => {
    setIsLoading(true);
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
      setIsLoading(false);
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

    setTextValue("");
  }, [textMessage, currentTextTitle]);

  const currentTextChat = previousTextChats.filter(
    (previousTextChat: any) => previousTextChat.title === currentTextTitle
  );

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down(500));
  return (
    <div className="text-page">
      <TextMessagesList
        currentTextChat={currentTextChat}
        isLoading={isLoading}
        textValue={textValue}
      />

      <div className="bottom-section">
        <div className="text-input-container">
          <TextChatInput
            textValue={textValue}
            setTextValue={setTextValue}
            getMessages={getMessages}
          />

          {!isMobile && <InfoBlock />}
        </div>
      </div>
    </div>
  );
};
export default TextPage;
