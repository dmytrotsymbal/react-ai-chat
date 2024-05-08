import AddIcon from "@mui/icons-material/Add";
import SettingsIcon from "@mui/icons-material/Settings";
import InfoIcon from "@mui/icons-material/Info";
import "./Sidebar.scss";
import React, { useEffect, useState } from "react";
import RouterModal from "../../modals/RouterModal";
import AcceptModal from "../../modals/AcceptModal";
import RenameModal from "../../modals/RenameModal";
import TextChats from "./components/TextChats";
import ImageChats from "./components/ImageChats";
import SettingsModal from "../../modals/SettingsModal";
import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material";
import Saparator from "../../ui/Saparator";
import useLocalStorage from "../../../hooks/useLocalStorage";

type Props = {
  createNewChat: () => void;
  handleTextClick: (uniqueTitle: string) => void;
  handleImgClick: (uniqueTitle: string) => void;
  deleteChat: (uniqueTitle: string) => void;
  currentTextTitle: string | null;
  currentImgTitle: string | null;
  showSidebar: boolean;
  toggleSidebar: () => void;
  previousTextChats: any;
  previousImgChats: any;
  setPreviousTextChats: any;
  setPreviousImgChats: any;
  setCurrentTextTitle: any;
  setCurrentImgTitle: any;
};
const Sidebar = ({
  createNewChat,
  handleTextClick,
  handleImgClick,
  deleteChat,
  currentTextTitle,
  currentImgTitle,
  showSidebar,
  toggleSidebar,
  previousTextChats,
  previousImgChats,
  setPreviousTextChats,
  setPreviousImgChats,
  setCurrentTextTitle,
  setCurrentImgTitle,
}: Props) => {
  const uniqueTextTitles = Array.from(
    new Set(previousTextChats.map((previousChat: any) => previousChat.title))
  );

  const uniqueImgTitles = Array.from(
    new Set(
      previousImgChats.map((previousImgChat: any) => previousImgChat.title)
    )
  );
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
    setCurrentActiveMenu(null);
  };

  //=============================================================================

  const [renameModalOpen, setRenameModalOpen] = useState<boolean>(false);

  const handleRenameModalOpen = () => {
    setRenameModalOpen(true);
  };

  const handleRename = (newName: string) => {
    if (currentTextTitle) {
      const updatedTextChats = previousTextChats.map((chat: any) =>
        chat.title === currentTextTitle ? { ...chat, title: newName } : chat
      );
      setPreviousTextChats(updatedTextChats);
      setCurrentTextTitle(newName);
    } else if (currentImgTitle) {
      const updatedImgChats = previousImgChats.map((chat: any) =>
        chat.title === currentImgTitle ? { ...chat, title: newName } : chat
      );
      setPreviousImgChats(updatedImgChats);
      setCurrentImgTitle(newName);
    }
    setRenameModalOpen(false);
  };

  //=============================================================================

  const [favoriteChats, setFavoriteChats] = useState(() => {
    const savedFavorites = localStorage.getItem("favoriteChats");
    return savedFavorites ? new Set(JSON.parse(savedFavorites)) : new Set();
  });

  useEffect(() => {
    localStorage.setItem("favoriteChats", JSON.stringify([...favoriteChats]));
  }, [favoriteChats]);

  const toggleFavorite = (chatId: string) => {
    setFavoriteChats((prevFavorites) => {
      const newFavorites = new Set(prevFavorites);
      if (newFavorites.has(chatId)) {
        newFavorites.delete(chatId);
      } else {
        newFavorites.add(chatId);
      }
      const favoriteArray = [...newFavorites];
      localStorage.setItem("favoriteChats", JSON.stringify(favoriteArray));
      return newFavorites;
    });
  };

  //=============================================================================

  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [currentModel, setCurrentModel] = useLocalStorage<string>(
    "currentModel",
    "ChatGPT3"
  );

  const handleSettingsModalOpen = () => {
    setIsSettingsModalOpen(true);
  };

  const handleSettingsModalClose = () => {
    setIsSettingsModalOpen(false);
  };

  const handleDeleteAllChats = () => {
    localStorage.removeItem("previousTextChats");
    localStorage.removeItem("previousImgChats");
    setPreviousTextChats([]);
    setPreviousImgChats([]);
  };

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
        handleClose={() => setRenameModalOpen(false)}
        handleSave={handleRename}
        currentName={currentTextTitle || currentImgTitle}
      />

      <SettingsModal
        open={isSettingsModalOpen}
        handleClose={handleSettingsModalClose}
        currentModel={currentModel}
        setCurrentModel={setCurrentModel}
        handleDeleteAllChats={handleDeleteAllChats}
      />

      <aside className={showSidebar ? "sidebar open" : "sidebar"}>
        <HtmlTooltip
          title="Press here to create a new chat"
          arrow
          placement="right"
        >
          <button
            className="new-chat-button"
            onClick={() => {
              handleRoutesModalOpen();
              createNewChat();
            }}
          >
            <AddIcon /> New chat!
          </button>
        </HtmlTooltip>

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
            favoriteChats={favoriteChats}
            toggleFavorite={toggleFavorite}
          />

          <Saparator />

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
            favoriteChats={favoriteChats}
            toggleFavorite={toggleFavorite}
          />
        </div>

        <Saparator />

        <div className="lower">
          <HtmlTooltip
            title="Press here to open the settings"
            arrow
            placement="top"
            sx={{
              textAlign: "center",
            }}
          >
            <button onClick={handleSettingsModalOpen}>
              <SettingsIcon />
            </button>
          </HtmlTooltip>
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
