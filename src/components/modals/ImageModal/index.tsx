import {
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
  styled,
} from "@mui/material";
import GetAppIcon from "@mui/icons-material/GetApp";
import "./ImageModal.scss";

type Props = {
  selectedImage: string;
  isModalOpen: boolean;
  handleCloseModal: () => void;
  handleSaveImage: (imageSrc: string) => void;
};
const ImageModal = ({
  selectedImage,
  isModalOpen,
  handleCloseModal,
  handleSaveImage,
}: Props) => {
  return (
    <MuiDialog open={isModalOpen} onClose={handleCloseModal}>
      <DialogContent>
        <img src={selectedImage} alt="selected-img" className="selected-img" />
      </DialogContent>

      <DialogActions>
        <IconButton
          className="save-button"
          onClick={() => handleSaveImage(selectedImage)}
        >
          <GetAppIcon
            sx={{ width: "15px", height: "15px", color: "#ececf1" }}
          />
        </IconButton>
      </DialogActions>
    </MuiDialog>
  );
};
export default ImageModal;

const MuiDialog = styled(Dialog)(({ theme }) => ({
  ".MuiPaper-root": {
    position: "relative",
    boxShadow: "none",
    padding: "0px !important",
    borderRadius: "5px",
    backgroundColor: "#202123",
    width: "auto",
    height: "auto",
    color: "white",
    border: "0.1px solid hsla(0, 0%, 100%, 0.2)",
    [theme.breakpoints.down("sm")]: {
      maxWidth: "99%",
    },
  },
}));
