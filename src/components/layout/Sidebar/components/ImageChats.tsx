import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";
import { Grid, IconButton, Menu, MenuItem, styled } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import StarIcon from "@mui/icons-material/Star";
import { shortenText } from "../../../../utils/shortenText";

type Props = {
  uniqueImgTitles: any;
  currentImgTitle: any;
  handleImgClick: (uniqueImgTitle: string) => void;
  toggleSidebar: () => void;
  handleMenuClick: (
    event: React.MouseEvent<HTMLButtonElement>,
    uniqueTextTitle: string
  ) => void;
  handleMenuClose: () => void;
  menuAnchorEl: null | HTMLElement;
  currentActiveMenu: string | null;
  handleRenameModalOpen: () => void;
  requestDeleteChat: (chatId: string) => void;
  favoriteChats: any;
  toggleFavorite: (chatId: string) => void;
};
const ImageChats = ({
  uniqueImgTitles,
  currentImgTitle,
  handleImgClick,
  toggleSidebar,
  handleMenuClick,
  menuAnchorEl,
  currentActiveMenu,
  handleMenuClose,
  handleRenameModalOpen,
  requestDeleteChat,
  favoriteChats,
  toggleFavorite,
}: Props) => {
  return (
    <ul className="images-history">
      {uniqueImgTitles?.map((uniqueImgTitle: string, index: number) => (
        <li
          className={uniqueImgTitle === currentImgTitle ? "activeTitle" : ""}
          key={index}
          onClick={() => {
            toggleSidebar();
            handleImgClick(uniqueImgTitle);
          }}
        >
          <Grid container spacing={1}>
            <Grid
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
              }}
              item
              xs={2}
            >
              {favoriteChats.has(uniqueImgTitle) && <StyledStarIcon />}
            </Grid>

            <Grid
              item
              xs={8}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
              }}
            >
              {shortenText(uniqueImgTitle, 19)}
            </Grid>
          </Grid>

          <Grid
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
            item
            xs={2}
          >
            {uniqueImgTitle === currentImgTitle ? (
              <HtmlTooltip title="More options" arrow placement="top">
                <IconButton
                  aria-label="more"
                  aria-controls="long-menu"
                  aria-haspopup="true"
                  onClick={(event) => handleMenuClick(event, uniqueImgTitle)}
                >
                  <MoreHorizIcon
                    sx={{ width: "17px", height: "17px", color: "#ececf1" }}
                  />
                </IconButton>
              </HtmlTooltip>
            ) : null}
            <Menu
              sx={{
                "& .MuiList-root": {
                  backgroundColor: "#202123",
                  border: "2px solid rgba(255, 255, 255, 0.1)",
                  borderRadius: "3px !important",
                },
              }}
              id="long-menu"
              anchorEl={menuAnchorEl}
              keepMounted
              open={
                Boolean(menuAnchorEl) && currentActiveMenu === uniqueImgTitle
              }
              onClose={handleMenuClose}
            >
              <StyledMenuItem
                onClick={() => {
                  handleMenuClose();
                  toggleFavorite(uniqueImgTitle);
                }}
              >
                <StarIcon /> Favorite
              </StyledMenuItem>
              <StyledMenuItem
                onClick={() => {
                  handleRenameModalOpen();
                }}
              >
                <EditIcon /> Rename
              </StyledMenuItem>
              <StyledMenuItem
                onClick={() => {
                  requestDeleteChat(uniqueImgTitle);
                  handleMenuClose();
                }}
              >
                <DeleteIcon /> Delete chat
              </StyledMenuItem>
            </Menu>
          </Grid>
        </li>
      ))}
    </ul>
  );
};
export default ImageChats;

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

const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
  fontSize: "12px",
  padding: "7px 15px",
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.05) !important",
  },
}));

const StyledStarIcon = styled(StarIcon)(({ theme }) => ({
  color: "#f2b91a",
  width: "17px",
  height: "17px",
  marginRight: "5px",
  cursor: "pointer",
  "&:hover": {
    color: "#f2b91a",
  },
}));
