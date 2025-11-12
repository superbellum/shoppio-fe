import type { ReactNode } from "react";
import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import App from "./App"
import { PrimeReactProvider } from "primereact/api";
import "primereact/resources/themes/lara-light-cyan/theme.css";

const rootNode = (
  <StrictMode>
    <PrimeReactProvider>
      <App/>
    </PrimeReactProvider>
  </StrictMode>
) as ReactNode;

createRoot(document.getElementById("root")!).render(rootNode);
