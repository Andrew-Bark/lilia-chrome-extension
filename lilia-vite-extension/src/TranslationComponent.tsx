import ReactDOM from "react-dom";

function TranslationPopup() {
  return (
    <div className="w-[400px] h-[300px] bg-red-500">
      <h4>Translation</h4>
      <p>
        <strong>Word:</strong>{" "}
      </p>
      <p>
        <strong>Sentence:</strong>{" "}
      </p>
      <p>
        <strong>Translation:</strong>{" "}
      </p>
    </div>
  );
}

function mountTranslationPopup() {
  const root = document.createElement("div");
  root.id = "translation-popup-root";
  document.body.appendChild(root);
  ReactDOM.createPortal(<TranslationPopup />, root);
}

export default mountTranslationPopup;
