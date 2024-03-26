import { Avatar, Grid, IconButton } from "@mui/material";
import { useState } from "react";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import "./ImageMessagesList.scss";
import UserAvatar from "../../../assets/Useravatar.png";
import ImgAIavatar from "../../../assets/ImgAIavatar.png";
import EmptyImageChat from "../EmptyImageChat";
import ImageModal from "../../modals/ImageModal";

type Props = {
  currentImgChat: any;
};
const ImageMessagesList = ({ currentImgChat }: Props) => {
  const [isLiked, setIsLiked] = useState<any>({});

  const handleLikeClick = (messageId: number) => {
    setIsLiked((prevMessageLikes: any) => ({
      ...prevMessageLikes,
      [messageId]: !prevMessageLikes[messageId],
    }));
  };

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<string>("");

  const handleImageClick = (imageSrc: string) => {
    setSelectedImage(imageSrc);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // save image

  const handleSaveImage = (imageSrc: string) => {
    // Создаем элемент <a>, который мы будем использовать как "ссылку" для загрузки
    const link = document.createElement("a");
    link.href = imageSrc;

    // Мы должны также добавить атрибут 'download' в наш тег <a>, чтобы обеспечить загрузку, а не переход
    // Мы можем даже указать имя файла
    link.download = "downloaded_image.png";

    // Этот код будет имитировать клик пользователя по ссылке, что приведет к загрузке изображения
    document.body.appendChild(link);
    link.click();

    // После клика ссылка больше не нужна, удаляем её
    document.body.removeChild(link);
  };

  return (
    <>
      <ul className="image-messages-list">
        {currentImgChat.length === 0 ? (
          <EmptyImageChat />
        ) : (
          currentImgChat.map((imageMessage: any, index: number) => (
            <li
              key={index}
              className={
                imageMessage.role === "user" ? "user-message" : "bot-message"
              }
            >
              <Grid container spacing={2} className="message-container">
                <Grid
                  item
                  xs={2}
                  sx={{
                    minHeight: "100%",

                    display: "flex",
                    justifyContent: "center",
                    alignItems: "flex-start",
                  }}
                >
                  {imageMessage.role === "user" ? (
                    <Avatar alt="UserAvatar" src={UserAvatar} />
                  ) : (
                    <Avatar alt="ImgAIavatar" src={ImgAIavatar} />
                  )}
                </Grid>

                <Grid
                  item
                  xs={8}
                  sx={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                  }}
                >
                  {imageMessage.role === "user" ? (
                    <p
                      className="user-prompt"
                      style={{
                        textAlign: "left",
                        fontSize: "14px",
                        wordWrap: "break-word",
                      }}
                    >
                      {imageMessage.content}
                    </p>
                  ) : (
                    <img
                      className="bot-image-response"
                      src={imageMessage.content}
                      alt="generatedImage"
                      onClick={() => handleImageClick(imageMessage.content)}
                    />
                  )}
                </Grid>

                <Grid
                  item
                  xs={2}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "flex-end",
                  }}
                >
                  {imageMessage.role === "user" ? null : (
                    <div className="message-actions">
                      <IconButton onClick={() => handleLikeClick(index)}>
                        {isLiked[index] ? (
                          <ThumbUpIcon sx={{ width: "15px", height: "15px" }} />
                        ) : (
                          <ThumbUpOffAltIcon
                            sx={{ width: "15px", height: "15px" }}
                          />
                        )}
                      </IconButton>
                    </div>
                  )}
                </Grid>
              </Grid>
            </li>
          ))
        )}
      </ul>

      <ImageModal
        selectedImage={selectedImage}
        isModalOpen={isModalOpen}
        handleCloseModal={handleCloseModal}
        handleSaveImage={handleSaveImage}
      />
    </>
  );
};
export default ImageMessagesList;
