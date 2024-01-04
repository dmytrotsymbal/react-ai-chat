import "./TextMessagesList.scss";
import IconButton from "@mui/material/IconButton";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { useState } from "react";
import { Grid } from "@mui/material";

type Props = {
  currentChat: any;
};

const TextMessagesList = ({ currentChat }: Props) => {
  const [isLiked, setIsLiked] = useState({});

  const handleLikeClick = (messageId: number) => {
    setIsLiked((prevMessageLikes: any) => ({
      ...prevMessageLikes,
      [messageId]: !prevMessageLikes[messageId],
    }));
  };

  return (
    <ul className="text-messages-list">
      {currentChat.length === 0 ? (
        <p>No messages yet</p>
      ) : (
        currentChat.map((chatMessage: any, index: number) => (
          <li
            key={index}
            className={
              chatMessage.role === "user" ? "userMessage" : "botMessage"
            }
          >
            <Grid container spacing={2} className="message-container">
              <Grid
                item
                xs={2}
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "flex-start",
                }}
              >
                {chatMessage.role === "user" ? (
                  <div className="userIcon">U</div>
                ) : (
                  <div className="botIcon">AI</div>
                )}
              </Grid>

              <Grid
                item
                xs={8}
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
              >
                <p className="message-text">{chatMessage.content}</p>
              </Grid>

              <Grid item xs={2}>
                {chatMessage.role === "user" ? null : (
                  <div className="message-actions">
                    <IconButton onClick={() => handleLikeClick(index)}>
                      {isLiked ? (
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
