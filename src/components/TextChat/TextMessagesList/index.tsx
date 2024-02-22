import "./TextMessagesList.scss";
import IconButton from "@mui/material/IconButton";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { useState } from "react";
import { Avatar, Grid } from "@mui/material";
import EmptyTextChat from "../EmptyTextChat";
import UserAvatar from "../../../assets/Useravatar.png";
import TextAIavatar from "../../../assets/TextAIavatar.png";

type Props = {
  currentTextChat: any;
};

const TextMessagesList = ({ currentTextChat }: Props) => {
  const [isLiked, setIsLiked] = useState<any>({});

  const handleLikeClick = (messageId: number) => {
    setIsLiked((prevMessageLikes: any) => ({
      ...prevMessageLikes,
      [messageId]: !prevMessageLikes[messageId],
    }));
  };

  return (
    <ul className="text-messages-list">
      {currentTextChat.length === 0 ? (
        <EmptyTextChat />
      ) : (
        currentTextChat.map((chatMessage: any, index: number) => (
          <li
            key={index}
            className={
              chatMessage.role === "user" ? "user-message" : "bot-message"
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
                {chatMessage.role === "user" ? (
                  <Avatar alt="UserAvatar" src={UserAvatar} />
                ) : (
                  <Avatar alt="TextAIavatar" src={TextAIavatar} />
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
                <p
                  style={{
                    textAlign: "left",
                    fontSize: "14px",
                    wordWrap: "break-word",
                  }}
                  className="message-text"
                >
                  {chatMessage.content}
                </p>
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
                {chatMessage.role === "user" ? null : (
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
export default TextMessagesList;
