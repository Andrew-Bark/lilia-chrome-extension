import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

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
  return (
    <div className="items-start flex flex-col space-y-4 ">
      <Label htmlFor="email">Select your language</Label>
      <Select>
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
