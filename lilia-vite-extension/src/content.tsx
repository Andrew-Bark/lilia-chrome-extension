import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import mountTranslationPopup from "./TranslationComponent.tsx";

const root = document.createElement("div");
root.id = "crx-root";
document.body.appendChild(root);

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "DISPLAY_TRANSLATION") {
    console.log("message", message);
    sendResponse({ received: true });
    mountTranslationPopup(message.data);
  }
});
