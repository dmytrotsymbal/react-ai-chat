import AddIcon from "@mui/icons-material/Add";
import SettingsIcon from "@mui/icons-material/Settings";
import InfoIcon from "@mui/icons-material/Info";
import LightModeIcon from "@mui/icons-material/LightMode";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import "./Sidebar.scss";
import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";
import React, { useState } from "react";
import { IconButton, Menu, MenuItem, styled } from "@mui/material";
import RouterModal from "../../modals/RouterModal";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import StarIcon from "@mui/icons-material/Star";
import AcceptModal from "../../modals/AcceptModal";
import RenameModal from "../../modals/RenameModal";

type Props = {
  uniqueTextTitles: any;
  uniqueImgTitles: any;
  createNewChat: () => void;
  handleTextClick: (uniqueTitle: string) => void;
  handleImgClick: (uniqueTitle: string) => void;
  deleteChat: (uniqueTitle: string) => void;
  deleteImgChat: (uniqueImgTitles: string) => void;
  currentTextTitle: string | null;
  currentImgTitle: string | null;
  showSidebar: boolean;
  toggleSidebar: () => void;
};
const Sidebar = ({
  uniqueTextTitles,
  uniqueImgTitles,
  createNewChat,
  handleTextClick,
  handleImgClick,
  deleteChat,
  deleteImgChat,
  currentTextTitle,
  currentImgTitle,
  showSidebar,
  toggleSidebar,
}: Props) => {
  const [isRoutesModalOpen, setIsRoutesModalOpen] = useState(false);

  const handleRoutesModalOpen = () => {
    setIsRoutesModalOpen(true);
  };

  const handleRoutesModalClose = () => {
    setIsRoutesModalOpen(false);
  };

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleDeleteModalOpen = () => {
    setIsDeleteModalOpen(true);
  };

  const handleDeleteModalClose = () => {
    setIsDeleteModalOpen(false);
  };

  const [chatToDelete, setChatToDelete] = useState<string | null>(null);

  const requestDeleteChat = (chatId: string) => {
    setChatToDelete(chatId);
    handleDeleteModalOpen();
  };

  const confirmDeleteChat = () => {
    if (chatToDelete) {
      deleteChat(chatToDelete);
      setChatToDelete(null);
      handleDeleteModalClose();
    }
  };

  const [menuAnchorEl, setMenuAnchorEl] = React.useState<null | HTMLElement>(
    null
  );
  const [currentActiveMenu, setCurrentActiveMenu] = useState<string | null>(
    null
  );

  const handleMenuClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    uniqueTitle: string
  ) => {
    setMenuAnchorEl(event.currentTarget);
    setCurrentActiveMenu(uniqueTitle);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
    setCurrentActiveMenu(null); // Reset the current active menu
  };

  //=============================================================================

  const [renameModalOpen, setRenameModalOpen] = useState(false);

  const handleRenameModalOpen = () => {
    setRenameModalOpen(true);
  };

  const handleRenameModalClose = () => {
    setRenameModalOpen(false);
  };

  const [currentChat, setCurrentChat] = useState<string | null>(); // Состояние для хранения текущего чата

  const handleRename = (newName: string) => {
    if (newName) {
      setCurrentChat(newName);
    }
  };

  //=============================================================================

  return (
    <>
      <RouterModal
        open={isRoutesModalOpen}
        handleClose={handleRoutesModalClose}
      />

      <AcceptModal
        open={isDeleteModalOpen}
        handleClose={handleDeleteModalClose}
        deleteChat={confirmDeleteChat}
      />

      <RenameModal
        open={renameModalOpen}
        handleClose={handleRenameModalClose}
        handleSave={handleRename}
        currentName={currentChat ? currentChat : ""} // Передаем текущее имя чата
      />

      <aside className={showSidebar ? "sidebar open" : "sidebar"}>
        <button
          className="new-chat-button"
          onClick={() => {
            handleRoutesModalOpen();
            createNewChat();
          }}
        >
          <AddIcon /> New chat!
        </button>

        <div className="chats-list">
          <ul className="text-history">
            {uniqueTextTitles?.map((uniqueTextTitle: string, index: number) => (
              <li
                className={
                  uniqueTextTitle === currentTextTitle ? "activeTitle" : ""
                }
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
                      onClick={(event) =>
                        handleMenuClick(event, uniqueTextTitle)
                      }
                    >
                      <MoreHorizIcon sx={{ width: "17px", height: "17px" }} />
                    </IconButton>
                  </HtmlTooltip>
                ) : null}
                <Menu
                  id="long-menu"
                  anchorEl={menuAnchorEl}
                  keepMounted
                  open={
                    Boolean(menuAnchorEl) &&
                    currentActiveMenu === uniqueTextTitle
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

          <div className="saparator"></div>

          <ul className="images-history">
            {uniqueImgTitles?.map((uniqueImgTitle: string, index: number) => (
              <li
                className={
                  uniqueImgTitle === currentImgTitle ? "activeTitle" : ""
                }
                key={index}
                onClick={() => {
                  toggleSidebar();
                  handleImgClick(uniqueImgTitle);
                }}
              >
                {uniqueImgTitle.length > 20 ? (
                  <>{uniqueImgTitle.slice(0, 15)}...</>
                ) : (
                  <>{uniqueImgTitle}</>
                )}

                {uniqueImgTitle === currentImgTitle ? (
                  <HtmlTooltip title="More options" arrow placement="top">
                    <IconButton
                      aria-label="more"
                      aria-controls="long-menu"
                      aria-haspopup="true"
                      onClick={(event) =>
                        handleMenuClick(event, uniqueImgTitle)
                      }
                    >
                      <MoreHorizIcon sx={{ width: "17px", height: "17px" }} />
                    </IconButton>
                  </HtmlTooltip>
                ) : null}
                <Menu
                  id="long-menu"
                  anchorEl={menuAnchorEl}
                  keepMounted
                  open={
                    Boolean(menuAnchorEl) &&
                    currentActiveMenu === uniqueImgTitle
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
                      requestDeleteChat(uniqueImgTitle);
                      handleMenuClose();
                    }}
                  >
                    <DeleteIcon /> Delete chat
                  </MenuItem>
                </Menu>
              </li>
            ))}
          </ul>
        </div>

        <div className="saparator"></div>

        <div className="lower">
          <button>
            <LightModeIcon />
          </button>
          <button>
            <SettingsIcon />
          </button>
          <button>
            <InfoIcon />
          </button>
        </div>
      </aside>
    </>
  );
};
export default Sidebar;

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
