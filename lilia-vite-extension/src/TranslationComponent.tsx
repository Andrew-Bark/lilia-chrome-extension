import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import TranslationPopup from "@/components/TranslationPopup";

function mountTranslationPopup() {
  console.log("Hello from mounting function");
  const root = document.createElement("div");
  root.id = "translation-popup-root";
  document.body.append(root);
  createRoot(root).render(
    <StrictMode>
      <TranslationPopup />
    </StrictMode>
  );
}

export default mountTranslationPopup;
