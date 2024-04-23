import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";
import React from "react";
import { IconButton, Menu, MenuItem, styled } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import StarIcon from "@mui/icons-material/Star";

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
          {uniqueTextTitle.length > 20 ? (
            <>{uniqueTextTitle.slice(0, 18)}...</>
          ) : (
            <>{uniqueTextTitle}</>
          )}
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
                <MoreHorizIcon sx={{ width: "17px", height: "17px" }} />
              </IconButton>
            </HtmlTooltip>
          ) : null}
          <Menu
            className="dropdown-menu"
            id="long-menu"
            anchorEl={menuAnchorEl}
            keepMounted
            open={
              Boolean(menuAnchorEl) && currentActiveMenu === uniqueTextTitle
            }
            onClose={handleMenuClose}
          >
            <MenuItem
              onClick={() => {
                handleMenuClose();
              }}
            >
              <StarIcon /> Favorite
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleRenameModalOpen();
              }}
            >
              <EditIcon /> Rename
            </MenuItem>
            <MenuItem
              onClick={() => {
                requestDeleteChat(uniqueTextTitle);
                handleMenuClose();
              }}
            >
              <DeleteIcon /> Delete chat
            </MenuItem>
          </Menu>
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
