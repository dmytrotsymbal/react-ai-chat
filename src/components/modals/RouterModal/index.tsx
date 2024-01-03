import { Dialog, DialogContent, styled } from "@mui/material";
import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";
import "./RouterModal.scss";

type Props = {
  open: boolean;
  handleClose: () => void;
};
const RouterModal = ({ open, handleClose }: Props) => {
  return (
    <MuiDialog open={open} onClose={handleClose}>
      <DialogContent>
        <h2 className="router-modal-text">
          Please choose what type of content you want to generate
        </h2>
      </DialogContent>
      <div className="router-modal-actions">
        <Link to="/" style={{ textDecoration: "none" }}>
          <HtmlTooltip
            title="The latest version of GPT-4 with no additional capabilities"
            arrow
            placement="left"
          >
            <button onClick={handleClose}>Text</button>
          </HtmlTooltip>
        </Link>

        <Link to="/images" style={{ textDecoration: "none" }}>
          <HtmlTooltip
            title="Let me turn your imagination into imagery!"
            arrow
            placement="right"
          >
            <button onClick={handleClose}>Images</button>
          </HtmlTooltip>
        </Link>
      </div>

      <button className="close-button" onClick={handleClose}>
        <CloseIcon />
      </button>
    </MuiDialog>
  );
};
export default RouterModal;

const MuiDialog = styled(Dialog)(({ theme }) => ({
  ".MuiPaper-root": {
    position: "relative",
    boxShadow: "none",
    padding: 10,
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
