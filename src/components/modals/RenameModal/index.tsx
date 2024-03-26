import React, { useState } from "react";
import { Dialog, styled } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import "./RenameModal.scss";

type Props = {
  open: boolean;
  handleClose: () => void;
  handleSave: (newName: string) => void; // Добавляем пропс для сохранения
  currentName: string; // Текущее имя для инициализации поля ввода
};

const RenameModal = ({ open, handleClose, handleSave, currentName }: Props) => {
  const [newName, setNewName] = useState(currentName);

  const onSave = () => {
    handleSave(newName); // Вызываем функцию сохранения с новым именем
    handleClose(); // Закрываем модальное окно
  };

  return (
    <MuiDialog open={open} onClose={handleClose}>
      <div className="rename-modal-actions">
        <input
          className="rename-input"
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />
        <button className="save-button" onClick={onSave}>
          Save
        </button>
      </div>
      <button className="close-button" onClick={handleClose}>
        <CloseIcon />
      </button>
    </MuiDialog>
  );
};

export default RenameModal;

const MuiDialog = styled(Dialog)(({ theme }) => ({
  ".MuiPaper-root": {
    position: "relative",
    boxShadow: "none",
    padding: 30,
    borderRadius: "5px",
    backgroundColor: "#202123",
    width: "480px",
    color: "white",
    border: "0.1px solid hsla(0, 0%, 100%, 0.2)",
    [theme.breakpoints.down("sm")]: {
      maxWidth: "99%",
    },
  },
}));
