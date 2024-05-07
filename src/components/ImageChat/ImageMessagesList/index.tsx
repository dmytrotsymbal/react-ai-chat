import { Avatar, Box, Grid, IconButton } from "@mui/material";
import { useState } from "react";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import "./ImageMessagesList.scss";
import UserAvatar from "../../../assets/Useravatar.png";
import ImgAIavatar from "../../../assets/ImgAIavatar.png";
import EmptyImageChat from "../EmptyImageChat";
import ImageModal from "../../modals/ImageModal";
import CustomImageLoader from "../../ui/CustomImageLoader/CustomImageLoader";
import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material";

type Props = {
  currentImgChat: any;
  imgValue: string;
  isLoading: boolean;
  imgQuantity: number;
};
const ImageMessagesList = ({
  currentImgChat,
  imgValue,
  isLoading,
  imgQuantity,
}: Props) => {
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

  const handleSaveImage = (imageSrc: string) => {
    const link = document.createElement("a");
    link.href = imageSrc;
    link.download = "downloaded_image.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <ul className="image-messages-list">
        {currentImgChat.length === 0 && !isLoading ? (
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
                    <p className="user-prompt">{imageMessage.content}</p>
                  ) : Array.isArray(imageMessage.content) ? (
                    <Grid container spacing={1}>
                      {imageMessage.content.map(
                        (url: string, imageIndex: number) => (
                          <Grid item xs={6} key={imageIndex}>
                            <>
                              {!imageMessage.content ? (
                                <img
                                  className="bot-image-response"
                                  src="https://thumbs.dreamstime.com/b/expired-stamp-grunge-vintage-isolated-white-background-sign-122341209.jpg"
                                  alt="asdasdasd"
                                />
                              ) : (
                                <img
                                  className="bot-image-response"
                                  src={url}
                                  alt={`generatedImage-${imageIndex}`}
                                  onClick={() => handleImageClick(url)}
                                  style={{ width: "100%", height: "auto" }}
                                />
                              )}
                            </>
                          </Grid>
                        )
                      )}
                    </Grid>
                  ) : (
                    <>
                      {!imageMessage.content ? (
                        <img
                          className="bot-image-response"
                          src="https://thumbs.dreamstime.com/b/expired-stamp-grunge-vintage-isolated-white-background-sign-122341209.jpg"
                          alt="generatedImage"
                          onClick={() => handleImageClick(imageMessage.content)}
                        />
                      ) : (
                        <img
                          className="bot-image-response"
                          src={imageMessage.content}
                          alt="generatedImage"
                          onClick={() => handleImageClick(imageMessage.content)}
                        />
                      )}
                    </>
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
                    <Box className="message-actions">
                      <HtmlTooltip title="Like" arrow placement="top">
                        <IconButton onClick={() => handleLikeClick(index)}>
                          {isLiked[index] ? (
                            <ThumbUpIcon
                              sx={{
                                width: "15px",
                                height: "15px",
                                color: "#ececf1",
                              }}
                            />
                          ) : (
                            <ThumbUpOffAltIcon
                              sx={{
                                width: "15px",
                                height: "15px",
                                color: "#ececf1",
                              }}
                            />
                          )}
                        </IconButton>
                      </HtmlTooltip>
                    </Box>
                  )}
                </Grid>
              </Grid>
            </li>
          ))
        )}

        {isLoading && (
          <CustomImageLoader imgValue={imgValue} imgQuantity={imgQuantity} />
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

const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#202123",
    color: "#c5c5d2",
    maxWidth: 150,
    padding: 5,
    fontSize: "12px",
    borderRadius: "5px",
    border: "0.1px solid hsla(0, 0%, 100%, 0.2)",
  },
}));
