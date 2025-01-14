import { BookOpen, XIcon } from "lucide-react";
import DifficultySelector from "./components/DifficultySelector";
import LanguageSelector from "./components/LanguageSelector";
import { Button } from "./components/ui/button";
import Book from "@/components/book-icon.svg";
import DictionaryComponent from "./components/DictionaryComponent";
import { useState } from "react";
function App() {
  const [dictionary, setDictionary] = useState<Object | null>(null);
  const fetchDictionary = async () => {
    try {
      const response = await fetch("http://localhost:3000/dictionary");
      const data = await response.json();
      console.log("data", data);
      setDictionary(data);
    } catch (error) {
      console.log("error in fetching dictionary", error);
    }
  };
  return (
    <div className="flex relative flex-col items-center justify-center w-[400px] p-4 font-semibold border-4 border-green-600 bg-white">
      <img src="lily-screenshot.png" className="h-[100px] mb-[20px]" />
      <div className="text-lg pb-5">Customise your language parameters</div>
      <div className="space-y-8 border-2 p-4 border-black rounded-md w-fit">
        {/* Language input */}
        <LanguageSelector type={"sourceLanguage"} />
        <LanguageSelector type={"targetLanguage"} />

        {/* Difficulty input */}
        <DifficultySelector />
      </div>

      <Button className="p-4 pb-6 pt-6 m-4" onClick={fetchDictionary}>
        Dictionary <BookOpen size="24" />
      </Button>
      {dictionary && <DictionaryComponent data={dictionary} />}
    </div>
  );
}

export default App;
