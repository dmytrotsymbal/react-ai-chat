import Sidebar from "./components/layout/Sidebar";
import TextPage from "./pages/TextPage";
import "./App.scss";

const App = () => {
  return (
    <div className="app">
      <Sidebar />
      <section className="main">
        <TextPage />
      </section>
    </div>
  );
};

export default App;
