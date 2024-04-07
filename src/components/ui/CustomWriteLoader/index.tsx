import { Avatar, Grid } from "@mui/material";
import TextAIavatar from "../../../assets/TextAIavatar.png";
import "./CustomWriteLoader.scss";
import UserAvatar from "../../../assets/Useravatar.png";

type Props = {
  textValue?: string;
};

const CustomWriteLoader = ({ textValue }: Props) => {
  return (
    <>
      <li className="user-message">
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
            <Avatar alt="Useravatar" src={UserAvatar} />
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
              {textValue}
            </p>
          </Grid>
        </Grid>
      </li>
      <li className="bot-message">
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
            <Avatar alt="TextAIavatar" src={TextAIavatar} />
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
            <div className="loading-dots">
              <span>.</span>
              <span>.</span>
              <span>.</span>
            </div>
          </Grid>
        </Grid>
      </li>
    </>
  );
};
export default CustomWriteLoader;
