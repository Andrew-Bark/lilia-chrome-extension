import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useState } from "react";

const LanguageSelector = () => {
  const languageArray = [
    { code: "da", name: "Danish" },
    { code: "en", name: "English" },
    { code: "fr", name: "French" },
    { code: "de", name: "German" },
    { code: "it", name: "Italian" },
    { code: "no", name: "Norwegian" },
    { code: "pt", name: "Portuguese" },
    { code: "es", name: "Spanish" },
    { code: "sv", name: "Swedish" },
  ];
  const [userLanguage, setUserLanguage] = useState("English");

  const handleLanguageChange = (language: string) => {
    setUserLanguage(language);
    chrome.runtime.sendMessage(
      {
        type: "SEND_DATA",
        data: { language },
      },
      (response) => console.log("Response from background", response)
    );
  };
  return (
    <div className="items-start flex flex-col space-y-4 ">
      <Label htmlFor="email">Select your language</Label>
      <Select value={userLanguage} onValueChange={handleLanguageChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Language" />
        </SelectTrigger>
        <SelectContent>
          {languageArray.map((lang, index) => (
            <SelectItem key={index} value={lang.name}>
              <span className=" flex items-center align-center gap-x-2">
                <div className=" size-4 translate-y-[12%]">
                  {/* <SvgComponent index={index} array={flagArray} /> */}
                </div>
                {lang.name}
              </span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default LanguageSelector;
