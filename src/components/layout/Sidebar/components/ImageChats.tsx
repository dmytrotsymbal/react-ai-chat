import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";
import React from "react";
import { IconButton, Menu, MenuItem, styled } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import StarIcon from "@mui/icons-material/Star";

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
          {uniqueImgTitle.length > 20 ? (
            <>{uniqueImgTitle.slice(0, 18)}...</>
          ) : (
            <>{uniqueImgTitle}</>
          )}

          {uniqueImgTitle === currentImgTitle ? (
            <HtmlTooltip title="More options" arrow placement="top">
              <IconButton
                aria-label="more"
                aria-controls="long-menu"
                aria-haspopup="true"
                onClick={(event) => handleMenuClick(event, uniqueImgTitle)}
              >
                <MoreHorizIcon sx={{ width: "17px", height: "17px" }} />
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
            open={Boolean(menuAnchorEl) && currentActiveMenu === uniqueImgTitle}
            onClose={handleMenuClose}
          >
            <StyledMenuItem
              onClick={() => {
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
                requestDeleteChat(uniqueImgTitle);
                handleMenuClose();
              }}
            >
              <DeleteIcon /> Delete chat
            </StyledMenuItem>
          </Menu>
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
