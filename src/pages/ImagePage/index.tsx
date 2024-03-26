import { useEffect, useState } from "react";
import ImageChatInput from "../../components/ImageChat/ImageChat-Input";
import InfoBlock from "../../components/ui/InfoBlock";
import "./ImagePage.scss";
import ImageMessagesList from "../../components/ImageChat/ImageMessagesList";

type Props = {
  previousImgChats: any;
  setPreviousImgChats: any;
  currentImgTitle: any;
  setCurrentImgTitle: any;
  imgValue: any;
  setImgValue: any;
  imgMessage: any;
  setImgMessage: any;
};
const ImagePage = ({
  previousImgChats,
  setPreviousImgChats,
  currentImgTitle,
  setCurrentImgTitle,
  imgValue,
  setImgValue,
  imgMessage,
  setImgMessage,
}: Props) => {
  const [imgSize, setImgSize] = useState<string>("256x256");

  const getImages = async () => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: imgValue,
        size: imgSize,
      }),
    };

    try {
      const response = await fetch(
        "http://localhost:8000/generate-image",
        options
      );
      const data = await response.json();
      setImgMessage(data.imageUrl);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    if (!currentImgTitle && imgValue && imgMessage) {
      setCurrentImgTitle(imgValue);
    }

    if (currentImgTitle && imgValue && imgMessage) {
      setPreviousImgChats((prevChats: any) => [
        ...prevChats,
        {
          title: currentImgTitle,
          role: "user",
          content: imgValue,
        },
        {
          title: currentImgTitle,
          role: "bot",
          content: imgMessage,
        },
      ]);
    }
  }, [imgMessage, currentImgTitle]);

  const currentImgChat = previousImgChats.filter(
    (previousImgChat: any) => previousImgChat.title === currentImgTitle
  );
  return (
    <div className="image-page">
      <ImageMessagesList currentImgChat={currentImgChat} />

      <div className="bottom-section">
        <div className="image-input-container">
          <ImageChatInput
            imgValue={imgValue}
            setImgValue={setImgValue}
            getImages={getImages}
          />

          <InfoBlock />
        </div>
      </div>
    </div>
  );
};
export default ImagePage;
