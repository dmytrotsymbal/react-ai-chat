import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";
import { Grid, IconButton, Menu, MenuItem, styled } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import StarIcon from "@mui/icons-material/Star";
import { shortenText } from "../../../../utils/shortenText";

type Props = {
  uniqueTextTitles: any;
  currentTextTitle: any;
  handleTextClick: (uniqueTextTitle: string) => void;
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
const TextChats = ({
  uniqueTextTitles,
  currentTextTitle,
  handleTextClick,
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
    <ul className="text-history">
      {uniqueTextTitles?.map((uniqueTextTitle: string, index: number) => (
        <li
          className={uniqueTextTitle === currentTextTitle ? "activeTitle" : ""}
          key={index}
          onClick={() => {
            toggleSidebar();
            handleTextClick(uniqueTextTitle);
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
              {favoriteChats.has(uniqueTextTitle) && <StyledStarIcon />}
            </Grid>
            <Grid
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
              }}
              item
              xs={8}
            >
              {shortenText(uniqueTextTitle, 19)}
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
              {uniqueTextTitle === currentTextTitle ? (
                <HtmlTooltip title="More options" arrow placement="top">
                  <IconButton
                    aria-label="more"
                    aria-controls="long-menu"
                    aria-haspopup="true"
                    onClick={(event: any) =>
                      handleMenuClick(event, uniqueTextTitle)
                    }
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
                  Boolean(menuAnchorEl) && currentActiveMenu === uniqueTextTitle
                }
                onClose={handleMenuClose}
              >
                <StyledMenuItem
                  onClick={() => {
                    toggleFavorite(uniqueTextTitle);
                    handleMenuClose();
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
                    requestDeleteChat(uniqueTextTitle);
                    handleMenuClose();
                  }}
                >
                  <DeleteIcon /> Delete chat
                </StyledMenuItem>
              </Menu>
            </Grid>
          </Grid>
        </li>
      ))}
    </ul>
  );
};
export default TextChats;

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
  color: "#f2b91a !important",
  width: "17px",
  height: "17px",
  marginRight: "5px",
  cursor: "pointer",
  "&:hover": {
    color: "#f2b91a !important",
  },
}));
