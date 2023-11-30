import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { Provider } from "react-redux";
import store from "./redux/index.ts";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <DndProvider backend={HTML5Backend}>
      <Provider store={store}>
        <App />
      </Provider>
    </DndProvider>
  </React.StrictMode>,
);
