import AddIcon from '@mui/icons-material/Add';
import SettingsIcon from '@mui/icons-material/Settings';
import InfoIcon from '@mui/icons-material/Info';
import LightModeIcon from '@mui/icons-material/LightMode';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import '../../styles/Sidebar.scss';

const SideBar = ({
  uniqueTextTitles,
  uniqueImgTitles,
  createNewChat,
  handleTextClick,
  handleImgClick,
  deleteChat,
  deleteImgChat,
  currentTitle,
  imgCurrentTitle,
}) => {
  return (
    <aside className="sideBar">
      <button className="newChatButton" onClick={createNewChat}>
        <AddIcon /> New chat!
      </button>

      <div className="chatsList">
        <ul className="history">
          {uniqueTextTitles?.map((uniqueTitle, index) => (
            <li
              className={uniqueTitle === currentTitle ? 'activeTitle' : ''}
              key={index}
              onClick={() => handleTextClick(uniqueTitle)}
            >
              {uniqueTitle}
              {uniqueTitle === currentTitle ? (
                <div className="activeChatButtons">
                  <button className="editChatButton">
                    <EditIcon sx={{ width: '15px', height: '15px' }} />
                  </button>
                  <button
                    className="deleteChatButton"
                    onClick={() => deleteChat(uniqueTitle)}
                  >
                    <DeleteIcon sx={{ width: '15px', height: '15px' }} />
                  </button>
                </div>
              ) : null}
            </li>
          ))}
        </ul>

        <div className="saparator"></div>

        <ul className="imgHistory">
          {uniqueImgTitles?.map((uniqueTitle, index) => (
            <li
              className={uniqueTitle === imgCurrentTitle ? 'activeTitle' : ''}
              key={index}
              onClick={() => handleImgClick(uniqueTitle)}
            >
              {uniqueTitle}
              {uniqueTitle === imgCurrentTitle ? (
                <div className="activeChatButtons">
                  <button className="editChatButton">
                    <EditIcon sx={{ width: '15px', height: '15px' }} />
                  </button>
                  <button
                    className="deleteChatButton"
                    onClick={() => deleteImgChat(uniqueTitle)}
                  >
                    <DeleteIcon sx={{ width: '15px', height: '15px' }} />
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
  );
};
export default SideBar;
