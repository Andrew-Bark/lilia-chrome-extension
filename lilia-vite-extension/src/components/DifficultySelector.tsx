import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
const DifficultySelector = () => {
  const difficultyLevels = ["A1", "A2", "B1", "B2", "C1", "C2"];
  const [isDifficultyEnabled, setIsDifficultyEnabled] = useState(true);
  const [difficulty, setDifficulty] = useState(0);

  const sendDataToExtension = () => {
    chrome.runtime.sendMessage(
      {
        type: "SEND_DATA",
        data: { isDifficultyEnabled, difficulty },
      },
      (response) => console.log("Response from background", response)
    );
  };

  const handleDifficultyToggle = () => {
    setIsDifficultyEnabled((prevstate) => !prevstate);
    chrome.runtime.sendMessage(
      {
        type: "SEND_DATA",
        data: { isDifficultyEnabled: !isDifficultyEnabled },
      },
      (response) => console.log("Response from background", response)
    );
  };
  return (
    <div className=" flex flex-col space-y-4 items-start">
      <div className="flex items-center justify-between w-full ">
        <Label htmlFor="difficulty-toggle">{"Enable language level"}</Label>
        <Checkbox
          id="difficulty-toggle"
          checked={isDifficultyEnabled}
          onCheckedChange={handleDifficultyToggle}
        />
      </div>
      {isDifficultyEnabled && (
        <div className="flex flex-col gap-2 w-full">
          <Slider
            id="difficulty"
            min={0}
            max={5}
            step={1}
            value={[difficulty]}
            onValueChange={(value) => setDifficulty(value[0])}
            onValueCommit={sendDataToExtension}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-gray-500">
            {difficultyLevels.map((level, index) => (
              <span
                key={level}
                className={index === difficulty ? "font-bold" : ""}
              >
                {level}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DifficultySelector;
