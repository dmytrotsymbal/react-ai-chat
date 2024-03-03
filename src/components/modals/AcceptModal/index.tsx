import { Dialog, DialogContent, styled } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import "./AcceptModal.scss";

type Props = {
  open: boolean;
  handleClose: () => void;
  deleteChat: () => void;
};
const AcceptModal = ({ open, handleClose, deleteChat }: Props) => {
  return (
    <MuiDialog open={open} onClose={handleClose}>
      <DialogContent>
        <h2 className="accept-modal-text">
          Are you sure you want to delete this chat?
        </h2>
      </DialogContent>
      <div className="accept-modal-actions">
        <button className="cancel-button" onClick={handleClose}>
          Cancel
        </button>

        <button className="delete-button" onClick={deleteChat}>
          Delete
        </button>
      </div>

      <button className="close-button" onClick={handleClose}>
        <CloseIcon />
      </button>
    </MuiDialog>
  );
};
export default AcceptModal;

const MuiDialog = styled(Dialog)(({ theme }) => ({
  ".MuiPaper-root": {
    position: "relative",
    boxShadow: "none",
    padding: 10,
    borderRadius: "5px",
    backgroundColor: "#202123",
    width: "380px",
    color: "white",
    border: "0.1px solid hsla(0, 0%, 100%, 0.2)",
    [theme.breakpoints.down("sm")]: {
      maxWidth: "99%",
    },
  },
}));
