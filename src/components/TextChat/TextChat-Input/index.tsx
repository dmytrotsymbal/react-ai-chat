type Props = {
  textValue: string;
  setTextValue: (value: string) => void;
  getMessages: () => void;
};
const TextChatInput = ({ textValue, setTextValue, getMessages }: Props) => {
  return (
    <>
      <input
        className="text-input"
        value={textValue || ""}
        onChange={(e) => setTextValue(e.target.value)}
        type="text"
        placeholder="Type your prompt..."
        style={{
          paddingRight: "60px",
        }}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            getMessages();
          }
        }}
      />

      <button
        className="submit-btn"
        onClick={getMessages}
        style={{
          cursor: textValue ? "pointer" : "not-allowed",
          opacity: textValue ? 1 : 0.5,
          pointerEvents: textValue ? "auto" : "none",
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
export default TextChatInput;
