import "./App.css";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Header from "./components/header";
import Homepage from "./containers/homepage";
import { Provider } from "react-redux";
import store from "./store";

function App() {
  return (
    <div className="App" id="App">
      <Provider store={store}>
        <DndProvider backend={HTML5Backend}>
          <Header />
          <Homepage />
        </DndProvider>
      </Provider>
    </div>
  );
}

export default App;
