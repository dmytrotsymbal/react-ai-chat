import "./CustomWriteLoader.scss";

type Props = {};
const CustomWriteLoader = (props: Props) => {
  return (
    <div className="loading-dots">
      <span>.</span>
      <span>.</span>
      <span>.</span>
    </div>
  );
};
export default CustomWriteLoader;
