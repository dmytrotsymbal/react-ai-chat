import EmptyChat from '../../assets/empty.png';
import '../../styles/ChatPage.scss';
import IconButton from '@mui/material/IconButton';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { useState } from 'react';

const TextMessagesList = ({ currentChat }) => {
  const [isLiked, setIsLiked] = useState({});

  const handleLikeClick = (messageId) => {
    setIsLiked((prevMessageLikes) => ({
      ...prevMessageLikes,
      [messageId]: !prevMessageLikes[messageId],
    }));
  };

  return (
    <ul className="textMessages">
      {currentChat.length === 0 ? (
        <img className="emptyTextChatImg" src={EmptyChat} alt="Empty chat" />
      ) : (
        currentChat.map((chatMessage, index) => (
          <li
            key={index}
            className={
              chatMessage.role === 'user' ? 'userMessage' : 'botMessage'
            }
          >
            <div className="messageContainer">
              <div className="messageContent">
                {chatMessage.role === 'user' ? (
                  <div className="userIcon">U</div>
                ) : (
                  <div className="botIcon">AI</div>
                )}

                <p className="messageText">{chatMessage.content}</p>
              </div>

              {chatMessage.role === 'user' ? null : (
                <div className="messageActions">
                  <IconButton onClick={() => handleLikeClick(index)}>
                    {isLiked[index] ? (
                      <ThumbUpIcon sx={{ width: '15px', height: '15px' }} />
                    ) : (
                      <ThumbUpOffAltIcon
                        sx={{ width: '15px', height: '15px' }}
                      />
                    )}
                  </IconButton>
                </div>
              )}
            </div>
          </li>
        ))
      )}
    </ul>
  );
};
export default TextMessagesList;
