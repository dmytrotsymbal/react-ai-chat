import AddIcon from "@mui/icons-material/Add";
import SettingsIcon from "@mui/icons-material/Settings";
import InfoIcon from "@mui/icons-material/Info";
import LightModeIcon from "@mui/icons-material/LightMode";
import "./Sidebar.scss";
import React, { useState } from "react";
import RouterModal from "../../modals/RouterModal";
import AcceptModal from "../../modals/AcceptModal";
import RenameModal from "../../modals/RenameModal";
import TextChats from "./components/TextChats";
import ImageChats from "./components/ImageChats";

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
          <TextChats
            uniqueTextTitles={uniqueTextTitles}
            currentTextTitle={currentTextTitle}
            handleTextClick={handleTextClick}
            toggleSidebar={toggleSidebar}
            handleMenuClick={handleMenuClick}
            handleMenuClose={handleMenuClose}
            menuAnchorEl={menuAnchorEl}
            currentActiveMenu={currentActiveMenu}
            handleRenameModalOpen={handleRenameModalOpen}
            requestDeleteChat={requestDeleteChat}
          />

          <div className="saparator"></div>

          <ImageChats
            uniqueImgTitles={uniqueImgTitles}
            currentImgTitle={currentImgTitle}
            handleImgClick={handleImgClick}
            toggleSidebar={toggleSidebar}
            handleMenuClick={handleMenuClick}
            handleMenuClose={handleMenuClose}
            menuAnchorEl={menuAnchorEl}
            currentActiveMenu={currentActiveMenu}
            handleRenameModalOpen={handleRenameModalOpen}
            requestDeleteChat={requestDeleteChat}
          />
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
