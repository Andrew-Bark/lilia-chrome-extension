// import { useState } from "react";
import "./App.css";

import DifficultySelector from "./components/DifficultySelector";
import LanguageSelector from "./components/LanguageSelector";

function App() {
  // const flagArray = Object.values(flags);
  // const SvgComponent = ({ index, array }: { index: number; array: any[] }) => {
  //   if (index < 0 || index >= array.length) {
  //     throw new Error("Index out of bounds");
  //   }
  //   const Svg = array[index];
  //   return <Svg />;
  // };

  return (
    <div className="flex flex-col items-center justify-center w-full p-4 font-semibold">
      <div className="space-y-8 border-2 p-4 border-black rounded-md w-fit">
        {/* Language input */}
        <LanguageSelector />
        {/* Difficulty input */}
        <DifficultySelector />
      </div>
    </div>
  );
}

export default App;
