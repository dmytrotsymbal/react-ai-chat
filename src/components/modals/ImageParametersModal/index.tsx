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
              <InputLabel
                id="style-select-label"
                sx={{
                  color: "white !important",
                  padding: "0px !important",
                }}
              >
                Style
              </InputLabel>
              <Select
                labelId="style-select-label"
                id="style-select"
                value={selectedStyle}
                label="Style"
                onChange={handleStyleChange}
                sx={{
                  color: "white !important",
                  padding: "0px !important",
                }}
              >
                <StyledMenuItem selected value="default">
                  Default
                </StyledMenuItem>
                <StyledMenuItem value="Create me a super realistic photo with lots of detail and it will portray a super realistic picture: ">
                  Super realistic
                </StyledMenuItem>
                <StyledMenuItem value="Paint me an oil painting in the style of a Vangogov painting: ">
                  Van Gogh
                </StyledMenuItem>
                <StyledMenuItem value="Create me a picture with an effect as if it were hand drawn on a white piece of paper - it will show: ">
                  Hand
                </StyledMenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel
                sx={{
                  color: "white !important",
                  padding: "0px !important",
                }}
                id="size-select-label"
              >
                Size
              </InputLabel>
              <Select
                labelId="size-select-label"
                id="size-select"
                value={selectedSize}
                label="Size"
                onChange={handleSizeChange}
                sx={{
                  color: "white !important",
                  padding: "0px !important",
                }}
              >
                <StyledMenuItem selected value="256x256">
                  256x256
                </StyledMenuItem>
                <StyledMenuItem value="512x512">512x512</StyledMenuItem>
                <StyledMenuItem value="768x768">768x768</StyledMenuItem>
                <StyledMenuItem value="1024x1024">1024x1024</StyledMenuItem>
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

const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
  backgroundColor: "#202123 !important",
  color: "white",

  "&:hover": {
    backgroundColor: "#202129 !important",
  },
}));
