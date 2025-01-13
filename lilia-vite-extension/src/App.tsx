import DifficultySelector from "./components/DifficultySelector";
import LanguageSelector from "./components/LanguageSelector";

function App() {
  return (
    <div className="flex flex-col items-center justify-center w-[400px] p-4 font-semibold border-4 border-green-600 bg-white">
      <img src="lily-screenshot.png" className="h-[100px] mb-[20px]" />
      <div className="text-lg pb-5">Customise your language parameters</div>
      <div className="space-y-8 border-2 p-4 border-black rounded-md w-fit">
        {/* Language input */}
        <LanguageSelector type={"sourceLanguage"} />
        <LanguageSelector type={"targetLanguage"} />

        {/* Difficulty input */}
        <DifficultySelector />
      </div>
    </div>
  );
}

export default App;
