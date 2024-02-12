import { Avatar, Grid, IconButton } from "@mui/material";
import { useState } from "react";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import "./ImageMessagesList.scss";

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
        <p>No images yet</p>
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
                  <Avatar
                    alt="USER-avatar"
                    src="https://files.oaiusercontent.com/file-s2NReLFPtGUzv6WIY3VW38Ev?se=2024-01-04T12%3A21%3A45Z&sp=r&sv=2021-08-06&sr=b&rscc=max-age%3D31536000%2C%20immutable&rscd=attachment%3B%20filename%3D7c6d4e49-4d14-4aad-b60d-3ee40ee69a46.webp&sig=kY3sO7HNEgvmrP7KfGSFhPAG%2Bno9xBra7pp%2B9V4sbvQ%3D"
                  />
                ) : (
                  <Avatar
                    alt="AI-avatar"
                    src="https://image.knowing.asia/5ea8da02-fd92-43b3-b28d-86fcaacdbee2/50b4c6f3dec5685e0ee8d1595456899d.png"
                  />
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
