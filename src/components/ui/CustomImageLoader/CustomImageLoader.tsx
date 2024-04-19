import { Avatar, Grid, Skeleton } from "@mui/material";
import ImgAIavatar from "../../../assets/ImgAIavatar.png";
import UserAvatar from "../../../assets/Useravatar.png";

type Props = {
  imgValue?: string;
  imgQuantity?: number;
};

const CustomImageLoader = ({ imgValue, imgQuantity }: Props) => {
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
            <Grid container spacing={2}>
              {Array.from({ length: imgQuantity || 0 }, (_, index) => (
                <Grid item xs={imgQuantity === 1 ? 12 : 6} key={index}>
                  <Skeleton
                    variant="rectangular"
                    width={210.66}
                    height={210.66}
                    animation="wave"
                  />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </li>
    </>
  );
};
export default CustomImageLoader;
