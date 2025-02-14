import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import TranslationPopup from "@/components/TranslationPopup";

function mountTranslationPopup(messageData: any) {
  console.log("Hello from mounting function", messageData);
  const root = document.createElement("div");
  root.id = "translation-popup-root";
  document.body.append(root);
  createRoot(root).render(
    <StrictMode>
      <TranslationPopup messageData={messageData} />
    </StrictMode>
  );
}

export default mountTranslationPopup;
