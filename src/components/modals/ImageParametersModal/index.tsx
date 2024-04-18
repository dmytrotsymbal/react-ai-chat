import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";
import CloseIcon from "@mui/icons-material/Close";
import "./ImageParametersModal.scss";
import {
  Dialog,
  DialogContent,
  styled,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Grid,
} from "@mui/material";
import { useState } from "react";

type Props = {
  open: boolean;
  handleClose: () => void;
  setImgSize: (value: string) => void;
  setImgStyle: (value: string) => void;
};
const ImageParametersModal = ({
  open,
  handleClose,
  setImgSize,
  setImgStyle,
}: Props) => {
  const [selectedSize, setSelectedSize] = useState<string>("256x256");
  const [selectedStyle, setSelectedStyle] = useState<string>("default");

  const handleSizeChange = (event: any) => {
    const newSize = event.target.value;
    setSelectedSize(newSize);
    setImgSize(newSize);
  };

  const handleStyleChange = (event: any) => {
    const newStyle = event.target.value;
    setSelectedStyle(newStyle);
    setImgStyle(newStyle);
  };
  return (
    <MuiDialog open={open} onClose={handleClose}>
      <DialogContent>
        <h2 className="image-parameteres-modal-text">
          Select parametrs for your image
        </h2>
      </DialogContent>
      <div className="image-parameteres-modal-actions">
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel id="style-select-label">Style</InputLabel>
              <Select
                labelId="style-select-label"
                id="style-select"
                value={selectedStyle}
                label="Style"
                onChange={handleStyleChange}
              >
                <MenuItem selected value="default">
                  Default
                </MenuItem>
                <MenuItem value="Create me a super realistic photo with lots of detail and it will portray a super realistic picture: ">
                  Super realistic
                </MenuItem>
                <MenuItem value="Paint me an oil painting in the style of a Vangogov painting: ">
                  Van Gogh
                </MenuItem>
                <MenuItem value="Create me a picture with an effect as if it were hand drawn on a white piece of paper - it will show: ">
                  Hand
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel id="size-select-label">Size</InputLabel>
              <Select
                labelId="size-select-label"
                id="size-select"
                value={selectedSize}
                label="Size"
                onChange={handleSizeChange}
              >
                <MenuItem selected value="256x256">
                  256x256
                </MenuItem>
                <MenuItem value="512x512">512x512</MenuItem>
                <MenuItem value="768x768">768x768</MenuItem>
                <MenuItem value="1024x1024">1024x1024</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </div>

      <button className="close-button" onClick={handleClose}>
        <CloseIcon />
      </button>
    </MuiDialog>
  );
};
export default ImageParametersModal;

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
