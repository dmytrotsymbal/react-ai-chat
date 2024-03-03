import { Avatar, Grid, IconButton, Skeleton } from "@mui/material";
import { useState } from "react";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import "./ImageMessagesList.scss";
import UserAvatar from "../../../assets/Useravatar.png";
import ImgAIavatar from "../../../assets/ImgAIavatar.png";
import EmptyImageChat from "../EmptyImageChat";

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

  return (
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
  );
};
export default ImageMessagesList;
