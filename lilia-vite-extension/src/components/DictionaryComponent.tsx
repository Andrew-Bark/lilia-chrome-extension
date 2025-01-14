import { XIcon } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";

const DictionaryComponent = ({ data }: any) => {
  data.sort((a: any, b: any) => a.word.localeCompare(b.word));
  console.log("dictionary component ", data);
  const [words, setWords] = useState(data);
  const deleteWord = (wordToDelete: any) => {
    const newWords = words.filter(
      (word: any) => word.word !== wordToDelete.word
    );
    setWords(newWords);
  };
  return (
    <div className="bg-white absolute overflow-y-scroll w-full h-full border-4 border-green-600 flex flex-col items-center">
      <img src="lily-screenshot.png" className="h-[40px] mt-5" />
      <h1 className="text-3xl p-5">My Dictionary</h1>
      <div id="words" className="w-full p-4 cursor-pointer">
        {words.map((word: any) => (
          <div className="text-xl flex gap-2 border-2 relative  border-gray-200 border-opacity-50 p-2 rounded-md my-1">
            <div className="max-w-[88%]">
              <div>{word.word}</div>
              <div className="italic text-sm text-gray-400 font-normal">
                {word.meaning}
              </div>
            </div>
            <Button
              variant={"ghost"}
              className="  absolute top-0 right-0 "
              onClick={() => {
                deleteWord(word);
              }}
            >
              <XIcon />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DictionaryComponent;
