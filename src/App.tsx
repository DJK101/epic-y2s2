import "./App.css";
import NavBar from "./components/NavBar";

function App() {
  return (
    <div className="d-flex flex-column justify-content-between vh-100">
      <div>
        <NavBar />
      </div>

      <p className="bg-body-tertiary text-center mt-5 mb-0">
        &copy; 2024 Arena Arcade
      </p>
    </div>
  );
}

export default App;
