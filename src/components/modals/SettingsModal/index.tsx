import {
  Dialog,
  DialogActions,
  DialogContent,
  FormControl,
  Grid,
  InputLabel,
  styled,
  Select,
  MenuItem,
} from "@mui/material";
import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";
import CloseIcon from "@mui/icons-material/Close";

type Props = {
  open: boolean;
  handleClose: () => void;
  currentModel: string;
  setCurrentModel: (value: string) => void;
  handleDeleteAllChats: () => void;
};
const SettingsModal = ({
  open,
  handleClose,
  currentModel,
  setCurrentModel,
  handleDeleteAllChats,
}: Props) => {
  const isMobile = window.innerWidth < 768;
  return (
    <MuiDialog open={open} onClose={handleClose}>
      <br />
      <br />
      <Grid
        container
        spacing={2}
        sx={{
          width: isMobile ? "250px" : "300px",
          height: "100%",
        }}
      >
        <Grid
          item
          xs={8}
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "flex-start",
          }}
        >
          <DialogContent
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              alignItems: "flex-start",
            }}
          >
            <h6>Model</h6>

            <h6>Delete all chats</h6>
          </DialogContent>
        </Grid>

        <Grid
          item
          xs={3}
          sx={{
            height: "100%",
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "flex-start",
          }}
        >
          <DialogActions
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              alignItems: "center",
              height: "100%",
            }}
          >
            <FormControl
              fullWidth
              sx={{
                color: "#ececf1 !important",
                padding: "0px !important",
              }}
            >
              <InputLabel
                id="model-select-label"
                sx={{
                  color: "#ececf1 !important",
                  padding: "0px !important",
                }}
              >
                Model
              </InputLabel>
              <Select
                labelId="model-select-label"
                id="model-select"
                value={currentModel}
                label="Model"
                onChange={(e) => setCurrentModel(e.target.value)}
                sx={{
                  color: "#ececf1 !important",
                  padding: "0px !important",
                }}
              >
                <StyledMenuItem value="ChatGPT3">ChatGPT 3.5</StyledMenuItem>
                <StyledMenuItem value="ChatGPT4">ChatGPT 4</StyledMenuItem>
              </Select>
            </FormControl>

            <HtmlTooltip title="Delete all chats" arrow placement="bottom">
              <button
                className="delete-button"
                onClick={() => {
                  handleDeleteAllChats();
                  handleClose();
                }}
                style={{
                  width: "100%",
                  height: "40px",
                  borderRadius: "5px",
                  border: "0.1px solid hsla(0, 0%, 100%, 0.2)",
                  backgroundColor: "red",
                  color: "#ececf1",
                  fontSize: "12px",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              >
                Delete all
              </button>
            </HtmlTooltip>
          </DialogActions>
        </Grid>
      </Grid>
      <button className="close-button" onClick={handleClose}>
        <CloseIcon />
      </button>
    </MuiDialog>
  );
};
export default SettingsModal;

const MuiDialog = styled(Dialog)(({ theme }) => ({
  ".MuiPaper-root": {
    position: "relative",
    boxShadow: "none",
    padding: 10,
    borderRadius: "5px",
    backgroundColor: "#202123",
    width: "350px",
    height: "200px",
    color: "#ececf1",
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

const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
  backgroundColor: "#202123 !important",
  color: "#ececf1 !important",
  padding: "0px 20px !important",
  margin: "-8px !important",
  fontSize: "12px !important",
  height: "40px !important",
  overflow: "hidden",
  overflowX: "hidden",
  overflowY: "hidden",
  border: "2px solid rgba(255, 255, 255, 0.1)",
  borderRadius: "3px !important",
}));
