import { Link } from "react-router-dom";
import '../../styles/Header.scss';

const Header = () => {
  return (
    <header>
      <nav>
        <Link to="/">
          <button>Generate text</button>
        </Link>

        <Link to="/images">
          <button>Generate images</button>
        </Link>
      </nav>
    </header>
  );
};
export default Header;
