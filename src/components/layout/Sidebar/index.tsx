import AddIcon from "@mui/icons-material/Add";
import SettingsIcon from "@mui/icons-material/Settings";
import InfoIcon from "@mui/icons-material/Info";
import LightModeIcon from "@mui/icons-material/LightMode";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import "./Sidebar.scss";
import React, { useState } from "react";
import RouterModal from "../../modals/RouterModal";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import StarIcon from "@mui/icons-material/Star";

type Props = {
  uniqueTextTitles: any;
  uniqueImgTitles: any;
  createNewChat: () => void;
  handleTextClick: (uniqueTitle: string) => void;
  handleImgClick: (uniqueTitle: string) => void;
  deleteChat: (uniqueTitle: string) => void;
  deleteImgChat: (uniqueTitle: string) => void;
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
  deleteImgChat,
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

  const [activeDropdownId, setActiveDropdownId] = useState<string | null>(null);

  // Функция для переключения дропдауна
  const toggleDropdown = (id: string) => {
    if (activeDropdownId === id) {
      setActiveDropdownId(null);
    } else {
      setActiveDropdownId(id);
    }
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
                {uniqueTextTitle.length > 20 ? (
                  <>{uniqueTextTitle.slice(0, 20)}...</>
                ) : (
                  <>{uniqueTextTitle}</>
                )}
                {uniqueTextTitle === currentTextTitle ? (
                  <div className="active-chat-buttons">
                    <button
                      className="dropdown-button"
                      onClick={() => toggleDropdown(uniqueTextTitle)}
                    >
                      <MoreHorizIcon sx={{ width: "15px", height: "15px" }} />
                    </button>

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
                          onClick={() => deleteChat(uniqueTextTitle)}
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
                onClick={() => handleImgClick(uniqueImgTitle)}
              >
                {uniqueImgTitle.length > 20 ? (
                  <>{uniqueImgTitle.slice(0, 20)}...</>
                ) : (
                  <>{uniqueImgTitle}</>
                )}
                {uniqueImgTitle === currentImgTitle ? (
                  <div className="active-chat-buttons">
                    <button
                      className="dropdown-button"
                      onClick={() => toggleDropdown(uniqueImgTitle)}
                    >
                      <MoreHorizIcon sx={{ width: "15px", height: "15px" }} />
                    </button>

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
                          onClick={() => deleteImgChat(uniqueImgTitle)}
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
