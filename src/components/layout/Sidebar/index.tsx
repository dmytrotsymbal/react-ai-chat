import AddIcon from "@mui/icons-material/Add";
import SettingsIcon from "@mui/icons-material/Settings";
import InfoIcon from "@mui/icons-material/Info";
import LightModeIcon from "@mui/icons-material/LightMode";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import "./Sidebar.scss";
import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";
import React, { useState } from "react";
import { styled } from "@mui/material";
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

  const [activeDropdownId, setActiveDropdownId] = useState<string | null>(null);

  const toggleDropdown = (id: string) => {
    if (activeDropdownId === id) {
      setActiveDropdownId(null);
    } else {
      setActiveDropdownId(id);
    }
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
                  <>{uniqueTextTitle.slice(0, 20)}...</>
                ) : (
                  <>{uniqueTextTitle}</>
                )}
                {uniqueTextTitle === currentTextTitle ? (
                  <div className="active-chat-buttons">
                    <HtmlTooltip title="More options" arrow placement="top">
                      <button
                        className="dropdown-button"
                        onClick={() => toggleDropdown(uniqueTextTitle)}
                      >
                        <MoreHorizIcon sx={{ width: "15px", height: "15px" }} />
                      </button>
                    </HtmlTooltip>

                    {activeDropdownId === uniqueTextTitle && (
                      <div className="dropdown-menu">
                        <button className="mark-AsFav-btn">
                          <StarIcon
                            sx={{
                              width: "15px",
                              height: "15px",
                              marginRight: "10px",
                            }}
                          />
                          Favorite
                        </button>
                        <button
                          className="edit-chat-btn"
                          onClick={() => {
                            setCurrentChat(uniqueTextTitle);
                            handleRenameModalOpen();
                          }}
                        >
                          <EditIcon
                            sx={{
                              width: "15px",
                              height: "15px",
                              marginRight: "10px",
                            }}
                          />
                          Rename
                        </button>
                        <button
                          className="delete-chat-btn"
                          onClick={() => requestDeleteChat(uniqueTextTitle)}
                        >
                          <DeleteIcon
                            sx={{
                              width: "15px",
                              height: "15px",
                              marginRight: "10px",
                            }}
                          />
                          Delete chat
                        </button>
                      </div>
                    )}
                  </div>
                ) : null}
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
                  <>{uniqueImgTitle.slice(0, 20)}...</>
                ) : (
                  <>{uniqueImgTitle}</>
                )}
                {uniqueImgTitle === currentImgTitle ? (
                  <div className="active-chat-buttons">
                    <HtmlTooltip title="More options" arrow placement="top">
                      <button
                        className="dropdown-button"
                        onClick={() => toggleDropdown(uniqueImgTitle)}
                      >
                        <MoreHorizIcon sx={{ width: "15px", height: "15px" }} />
                      </button>
                    </HtmlTooltip>

                    {activeDropdownId === uniqueImgTitle && (
                      <div className="dropdown-menu">
                        <button className="mark-AsFav-btn">
                          <StarIcon
                            sx={{
                              width: "15px",
                              height: "15px",
                              marginRight: "10px",
                            }}
                          />
                          Favorite
                        </button>
                        <button className="edit-chat-btn">
                          <EditIcon
                            sx={{
                              width: "15px",
                              height: "15px",
                              marginRight: "10px",
                            }}
                          />
                          Rename
                        </button>
                        <button
                          className="delete-chat-btn"
                          onClick={() => requestDeleteChat(uniqueImgTitle)}
                        >
                          <DeleteIcon
                            sx={{
                              width: "15px",
                              height: "15px",
                              marginRight: "10px",
                            }}
                          />
                          Delete chat
                        </button>
                      </div>
                    )}
                  </div>
                ) : null}
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
