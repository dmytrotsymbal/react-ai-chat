import { Avatar, Grid, Skeleton } from "@mui/material";
import ImgAIavatar from "../../../assets/ImgAIavatar.png";
import UserAvatar from "../../../assets/Useravatar.png";

type Props = {
  imgValue?: string;
};

const CustomImageLoader = ({ imgValue }: Props) => {
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
              {imgValue}
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
            <Avatar alt="ImgAIavatar" src={ImgAIavatar} />
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
            <Skeleton
              variant="rectangular"
              width={250}
              height={250}
              animation="wave"
            />
          </Grid>
        </Grid>
      </li>
    </>
  );
};
export default CustomImageLoader;
