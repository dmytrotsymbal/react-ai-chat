import AddIcon from "@mui/icons-material/Add";
import SettingsIcon from "@mui/icons-material/Settings";
import InfoIcon from "@mui/icons-material/Info";
import LightModeIcon from "@mui/icons-material/LightMode";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import "./Sidebar.scss";
import React from "react";
import RouterModal from "../../modals/RouterModal";

type Props = {
  uniqueTextTitles: any;
  uniqueImgTitles: any;
  createNewChat: () => void;
  handleTextClick: (uniqueTitle: string) => void;
  handleImgClick: (uniqueTitle: string) => void;
  deleteChat: (uniqueTitle: string) => void;
  // deleteImgChat: (uniqueTitle: string) => void;
  currentTextTitle: string | null;
  currentImgTitle: string | null;
};
const Sidebar = ({
  uniqueTextTitles,
  uniqueImgTitles,
  createNewChat,
  handleTextClick,
  handleImgClick,
  deleteChat,
  // deleteImgChat,
  currentTextTitle,
  currentImgTitle,
}: Props) => {
  const [isRoutesModalOpen, setIsRoutesModalOpen] = React.useState(false);

  const handleRoutesModalOpen = () => {
    setIsRoutesModalOpen(true);
  };

  const handleRoutesModalClose = () => {
    setIsRoutesModalOpen(false);
  };

  return (
    <>
      <RouterModal
        open={isRoutesModalOpen}
        handleClose={handleRoutesModalClose}
      />

      <aside className="sidebar">
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
                onClick={() => handleTextClick(uniqueTextTitle)}
              >
                {uniqueTextTitle}
                {uniqueTextTitle === currentTextTitle ? (
                  <div className="activeChatButtons">
                    <button className="editChatButton">
                      <EditIcon sx={{ width: "15px", height: "15px" }} />
                    </button>
                    <button
                      className="deleteChatButton"
                      onClick={() => deleteChat(uniqueTextTitle)}
                    >
                      <DeleteIcon sx={{ width: "15px", height: "15px" }} />
                    </button>
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
                onClick={() => handleImgClick(uniqueImgTitle)}
              >
                {uniqueImgTitle}
                {uniqueImgTitle === currentImgTitle ? (
                  <div className="activeChatButtons">
                    <button className="editChatButton">
                      <EditIcon sx={{ width: "15px", height: "15px" }} />
                    </button>
                    <button
                      className="deleteChatButton"
                      onClick={() => deleteChat(uniqueImgTitle)}
                    >
                      <DeleteIcon sx={{ width: "15px", height: "15px" }} />
                    </button>
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
