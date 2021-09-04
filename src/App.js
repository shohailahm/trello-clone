import "./App.css";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Header from "./components/header";

function App() {
  return (
    <div className="App">
      <DndProvider backend={HTML5Backend}>
        <Header />
      </DndProvider>
    </div>
  );
}

export default App;
