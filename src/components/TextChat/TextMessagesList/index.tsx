import "./TextMessagesList.scss";
import IconButton from "@mui/material/IconButton";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { useState } from "react";
import { Avatar, Grid } from "@mui/material";
import EmptyTextChat from "../EmptyTextChat";
import UserAvatar from "../../../assets/Useravatar.png";
import TextAIavatar from "../../../assets/TextAIavatar.png";
import CustomSnackbar from "../../ui/CustomSnackbar";
import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material";
import CustomWriteLoader from "../../ui/CustomWriteLoader";

type Props = {
  currentTextChat: any;
  isLoading: boolean;
  textValue?: string;
};

const TextMessagesList = ({ currentTextChat, isLoading, textValue }: Props) => {
  const [isLiked, setIsLiked] = useState<any>({});

  const handleLikeClick = (messageId: number) => {
    setIsLiked((prevMessageLikes: any) => ({
      ...prevMessageLikes,
      [messageId]: !prevMessageLikes[messageId],
    }));
  };

  const [isCopied, setIsCopied] = useState<boolean>(false);

  const closeSnackbar = () => {
    setIsCopied(false);
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
    } catch (err) {
      console.error("Failed to copy text to clipboard", err);
    }
  };

  return (
    <>
      <ul className="text-messages-list">
        {currentTextChat.length === 0 && !isLoading ? (
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
                      <HtmlTooltip
                        title="Copy to clipboard"
                        arrow
                        placement="top"
                      >
                        <IconButton
                          onClick={() => copyToClipboard(chatMessage.content)}
                        >
                          <ContentCopyIcon
                            sx={{
                              width: "15px",
                              height: "15px",
                              color: "#ececf1",
                            }}
                          />
                        </IconButton>
                      </HtmlTooltip>

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
                    </div>
                  )}
                </Grid>
              </Grid>
            </li>
          ))
        )}

        {isLoading && <CustomWriteLoader textValue={textValue} />}
      </ul>

      {isCopied && (
        <CustomSnackbar
          open={isCopied}
          handleClose={closeSnackbar}
          message="Copied to clipboard"
        />
      )}
    </>
  );
};
export default TextMessagesList;

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
