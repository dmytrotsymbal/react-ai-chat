import { useEffect, useState } from "react";
import ImageChatInput from "../../components/ImageChat/ImageChat-Input";
import InfoBlock from "../../components/ui/InfoBlock";
import "./ImagePage.scss";
import ImageMessagesList from "../../components/ImageChat/ImageMessagesList";
import ImageParametersModal from "../../components/modals/ImageParametersModal";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/system";

type Props = {
  previousImgChats: any;
  setPreviousImgChats: any;
  currentImgTitle: string | any;
  setCurrentImgTitle: any;
  imgValue: any;
  setImgValue: any;
  imgMessage: string | any;
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
  const [isParametersModalOpen, setIsParametersModalOpen] =
    useState<boolean>(false);

  const [imgSize, setImgSize] = useState<string>("256x256");
  const [imgStyle, setImgStyle] = useState<string>("Default");
  const [imgQuantity, setImgQuantity] = useState<number>(1);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getImages = async () => {
    setIsLoading(true);
    const prompt = `${imgStyle} ${imgValue}`;

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: prompt,
        n: Number(imgQuantity),
        size: imgSize,
      }),
    };

    try {
      const response = await fetch(
        "http://localhost:8000/generate-image",
        options
      );
      const data = await response.json();
      setImgMessage(data.imageUrls);
      setIsLoading(false);

      console.log("Images data", data);
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

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down(500));
  return (
    <>
      {isParametersModalOpen && (
        <ImageParametersModal
          open={isParametersModalOpen}
          handleClose={() => setIsParametersModalOpen(false)}
          setImgSize={setImgSize}
          setImgStyle={setImgStyle}
          setImgQuantity={setImgQuantity}
        />
      )}
      <div className="image-page">
        <ImageMessagesList
          currentImgChat={currentImgChat}
          isLoading={isLoading}
          imgValue={imgValue}
          imgQuantity={imgQuantity}
        />

        <div className="bottom-section">
          <div className="image-input-container">
            <ImageChatInput
              handleParemetersModalOpen={() => setIsParametersModalOpen(true)}
              imgValue={imgValue}
              setImgValue={setImgValue}
              getImages={getImages}
            />

            {!isMobile && <InfoBlock />}
          </div>
        </div>
      </div>
    </>
  );
};
export default ImagePage;
