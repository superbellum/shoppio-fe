import type {ReactNode} from "react";
import {StrictMode} from "react"
import {createRoot} from "react-dom/client"
import "./index.css"
import App from "./App"
import {PrimeReactProvider} from "primereact/api";
import {Provider} from "react-redux";
import {store} from "./store";

const rootNode = (
  <StrictMode>
    <PrimeReactProvider>
      <Provider store={store}>
        <App/>
      </Provider>
    </PrimeReactProvider>
  </StrictMode>
) as ReactNode;

createRoot(document.getElementById("root")!).render(rootNode);
