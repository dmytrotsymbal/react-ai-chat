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
import useLocalStorage from "../../../hooks/useLocalStorage";

type Props = {
  open: boolean;
  handleClose: () => void;
  setImgSize: (value: string) => void;
  setImgStyle: (value: string) => void;
  setImgQuantity: (value: number) => void;
};
const ImageParametersModal = ({
  open,
  handleClose,
  setImgSize,
  setImgStyle,
  setImgQuantity,
}: Props) => {
  const [selectedSize, setSelectedSize] = useLocalStorage<string>(
    "selectedSize",
    "256x256"
  );
  const [selectedStyle, setSelectedStyle] = useLocalStorage<string>(
    "selectedStyle",
    "default"
  );
  const [selectedQuantity, setSelectedQuantity] = useLocalStorage<number>(
    "selectedQuantity",
    1
  );

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

  const handleQuantityChange = (event: any) => {
    const newQuality = event.target.value;
    setSelectedQuantity(newQuality);
    setImgQuantity(newQuality);
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
          <Grid item xs={4}>
            <FormControl fullWidth>
              <InputLabel
                id="style-select-label"
                sx={{
                  color: "#ececf1 !important",
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
                  color: "#ececf1 !important",
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
                  Hand-drawn
                </StyledMenuItem>
                <StyledMenuItem value="Create an image with bold, abstract shapes and bright colors in the style of Pablo Picasso's cubism: ">
                  Pablo Picasso's cubism
                </StyledMenuItem>
                <StyledMenuItem value="Create an image that embodies the motley, colorful style of street art and graffiti, draw inspiration from street art and street culture:">
                  Graffity
                </StyledMenuItem>
                <StyledMenuItem value="Draw a picture that captures the vibrant energy and clean lines of modern anime. Include bright, expressive characters and a dynamic background:">
                  Anime
                </StyledMenuItem>
                <StyledMenuItem value="Create an image that glows with neon lights, featuring bright, luminous colors against a dark background to create a nighttime cityscape vibe:">
                  Neon Lights
                </StyledMenuItem>
                <StyledMenuItem value="Generate a picture with the intricate and geometric nature of a mosaic. Use a multitude of small, colorful, square pieces to create an overall coherent image:">
                  Mosaic
                </StyledMenuItem>
                <StyledMenuItem value="Craft an image that mimics the art of origami. Display folded paper animals or objects with sharp creases and a three-dimensional appearance on a flat surface:">
                  Origami
                </StyledMenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={4}>
            <FormControl fullWidth>
              <InputLabel
                sx={{
                  color: "#ececf1 !important",
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
                  color: "#ececf1 !important",
                  padding: "0px !important",
                }}
              >
                <StyledMenuItem selected value="256x256">
                  256x256
                </StyledMenuItem>
                <StyledMenuItem value="512x512">512x512</StyledMenuItem>
                <StyledMenuItem value="1024x1024">1024x1024</StyledMenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={4}>
            <FormControl fullWidth>
              <InputLabel
                sx={{
                  color: "#ececf1 !important",
                  padding: "0px !important",
                }}
                id="size-select-label"
              >
                Size
              </InputLabel>
              <StyledSelect
                labelId="size-select-label"
                id="size-select"
                value={selectedQuantity}
                label="Size"
                onChange={handleQuantityChange}
                sx={{
                  color: "#ececf1 !important",
                  padding: "0px !important",
                }}
              >
                <StyledMenuItem selected value="1">
                  1
                </StyledMenuItem>
                <StyledMenuItem value="2">2</StyledMenuItem>
                <StyledMenuItem value="4">4</StyledMenuItem>
              </StyledSelect>
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
    color: "#ececf1",
    border: "0.1px solid hsla(0, 0%, 100%, 0.2)",
    [theme.breakpoints.down("sm")]: {
      maxWidth: "99%",
    },
  },
}));

const StyledSelect = styled(Select)(({ theme }) => ({
  backgroundColor: "#202123 !important",
  color: "#ececf1",
}));

const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
  backgroundColor: "#202123 !important",
  color: "#ececf1",
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
