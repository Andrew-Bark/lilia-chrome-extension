import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import de from "@/components/flags/de.svg";
import en from "@/components/flags/en.svg";
import fr from "@/components/flags/fr.svg";
import da from "@/components/flags/da.svg";
import it from "@/components/flags/it.svg";
import no from "@/components/flags/no.svg";
import pt from "@/components/flags/pt.svg";
import es from "@/components/flags/es.svg";
import sv from "@/components/flags/sv.svg";

interface LanguageSelectorProps {
  type: string;
}

const LanguageSelector = ({ type }: LanguageSelectorProps) => {
  const inputType = type;
  const languageArray = [
    { code: "da", name: "Danish", flag: da },
    { code: "en", name: "English", flag: en },
    { code: "fr", name: "French", flag: fr },
    { code: "de", name: "German", flag: de },
    { code: "it", name: "Italian", flag: it },
    { code: "no", name: "Norwegian", flag: no },
    { code: "pt", name: "Portuguese", flag: pt },
    { code: "es", name: "Spanish", flag: es },
    { code: "sv", name: "Swedish", flag: sv },
  ];
  const [userLanguage, setUserLanguage] = useState("English");

  const handleLanguageChange = (language: string) => {
    setUserLanguage(language);
    chrome.runtime.sendMessage({
      type: "SEND_DATA",
      data: { [type]: language },
    });
    chrome.storage.local.set({ [inputType]: language });
  };
  return (
    <div className="items-start flex flex-col space-y-4 ">
      <Label htmlFor="email">
        {type === "sourceLanguage"
          ? "Select the page language"
          : "Select your language"}
      </Label>
      <Select value={userLanguage} onValueChange={handleLanguageChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Language" />
        </SelectTrigger>
        <SelectContent>
          <div style={{ overflowY: "scroll", height: "200px" }}>
            {languageArray.map((lang, index) => (
              <SelectItem key={index} value={lang.name}>
                <span className=" flex items-center align-center gap-x-2">
                  <div className=" size-4 translate-y-[12%]">
                    <img src={lang.flag} alt="your svg" />
                  </div>
                  {lang.name}
                </span>
              </SelectItem>
            ))}
          </div>
        </SelectContent>
      </Select>
    </div>
  );
};

export default LanguageSelector;
