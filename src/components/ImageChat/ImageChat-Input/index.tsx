import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";

type Props = {
  imgValue: string;
  setImgValue: (value: string) => void;
  getImages: () => void;
  handleParemetersModalOpen: () => void;
};
const ImageChatInput = ({
  imgValue,
  setImgValue,
  getImages,
  handleParemetersModalOpen,
}: Props) => {
  return (
    <>
      <button className="parameters-btn" onClick={handleParemetersModalOpen}>
        <SettingsOutlinedIcon />
      </button>

      <input
        className="image-input"
        value={imgValue || ""}
        onChange={(e) => setImgValue(e.target.value)}
        type="text"
        placeholder="Generate an image"
        style={{
          paddingRight: "60px",
        }}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            getImages();
          }
        }}
      />

      <button
        className="submit-btn"
        onClick={getImages}
        style={{
          cursor: imgValue ? "pointer" : "not-allowed",
          opacity: imgValue ? 1 : 0.5,
          pointerEvents: imgValue ? "auto" : "none",
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="none"
          className="icon-sm m-1 md:m-0"
        >
          <path
            d="M.5 1.163A1 1 0 0 1 1.97.28l12.868 6.837a1 1 0 0 1 0 1.766L1.969 15.72A1 1 0 0 1 .5 14.836V10.33a1 1 0 0 1 .816-.983L8.5 8 1.316 6.653A1 1 0 0 1 .5 5.67V1.163Z"
            fill="currentColor"
          ></path>
        </svg>
      </button>
    </>
  );
};
export default ImageChatInput;
