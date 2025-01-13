import { ReactNode, useState } from "react";
import { XIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
interface Translations {
  Meaning: string;
  Synonyms: string;
  Examples: string;
  OtherMeanings: string;
}
const cardArray: Record<string, Translations> = {
  Spanish: {
    Meaning: "Significado",
    Synonyms: "Sinónimos",
    Examples: "Ejemplos",
    OtherMeanings: "Otros significados",
  },
  Portuguese: {
    Meaning: "Significado",
    Synonyms: "Sinônimos",
    Examples: "Exemplos",
    OtherMeanings: "Outros significados",
  },
  Italian: {
    Meaning: "Significato",
    Synonyms: "Sinonimi",
    Examples: "Esempi",
    OtherMeanings: "Altri significati",
  },
  English: {
    Meaning: "Meaning",
    Synonyms: "Synonyms",
    Examples: "Examples",
    OtherMeanings: "Other meanings",
  },
  Danish: {
    Meaning: "Betydning",
    Synonyms: "Synonymer",
    Examples: "Eksempler",
    OtherMeanings: "Andre betydninger",
  },
  Swedish: {
    Meaning: "Betydelse",
    Synonyms: "Synonymer",
    Examples: "Exempel",
    OtherMeanings: "Andra betydelser",
  },
  Norwegian: {
    Meaning: "Betydning",
    Synonyms: "Synonymer",
    Examples: "Eksempler",
    OtherMeanings: "Andre betydninger",
  },
  French: {
    Meaning: "Signification",
    Synonyms: "Synonymes",
    Examples: "Exemples",
    OtherMeanings: "Autres significations",
  },
  German: {
    Meaning: "Bedeutung",
    Synonyms: "Synonyme",
    Examples: "Beispiele",
    OtherMeanings: "Andere Bedeutungen",
  },
};

interface CardComponentProps {
  title: keyof Translations;
  targetLanguage: keyof typeof cardArray;
  children: ReactNode;
}
interface messageDataProps {
  messageData: {
    data: {
      meaning: string;
      other_meanings: string[];
      synonyms: string[];
      examples: string[];
    };

    difficulty: number;
    isDifficultyEnabled: boolean;
    sentence: string;
    sourceLanguage: string;
    targetLanguage: string;
    word: string;
  };
}
const CardComponent = ({
  title,
  children,
  targetLanguage,
}: CardComponentProps) => {
  return (
    <>
      <Card
        style={{
          fontSize: "30px",
          width: "30%",
          height: "300px",
          marginBottom: "10px",
          overflowY: "scroll",
          scrollbarWidth: "none",
          padding: "10px",
        }}
      >
        <CardTitle style={{ padding: "10px", textAlign: "center" }}>
          {cardArray[targetLanguage][title]}
        </CardTitle>
        <CardContent
          style={{ textAlign: "left", fontSize: "18px", lineHeight: "1.75em" }}
        >
          {children}
        </CardContent>
      </Card>
    </>
  );
};
export default function TranslationPopup({ messageData }: messageDataProps) {
  const [openDrawer, setOpenDrawer] = useState(true);
  console.log("data", messageData);
  const targetLanguage = messageData.targetLanguage;
  console.log("target", targetLanguage);
  return (
    <Drawer open={openDrawer}>
      <DrawerContent>
        <DrawerTrigger asChild>
          <Button
            variant="outline"
            style={{ position: "absolute", top: "5px", right: "5px" }}
            onClick={() => setOpenDrawer(false)}
          >
            <XIcon style={{ color: "black" }} />
          </Button>
        </DrawerTrigger>
        <div
          style={{
            marginLeft: "auto",
            marginRight: "auto",
            width: "100%",
            maxWidth: "20rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <DrawerHeader>
            <DrawerTitle
              style={{
                fontSize: "2.25rem",
                lineHeight: "2.5rem",
                color: "black",
              }}
            >
              {messageData.word}
            </DrawerTitle>
          </DrawerHeader>
        </div>

        <div style={{ display: "flex", justifyContent: "center", gap: "2rem" }}>
          <CardComponent title="Meaning" targetLanguage={targetLanguage}>
            <div>{messageData.data.meaning}</div>
            <h1
              style={{
                fontSize: "20px",
                fontWeight: "600",
                paddingBlock: "10px",
              }}
            >
              {cardArray[targetLanguage]["OtherMeanings"]}
            </h1>

            {messageData.data.other_meanings.map((meaning: string) => (
              <div style={{ paddingBlock: "5px" }}>{meaning}</div>
            ))}
          </CardComponent>
          <CardComponent title="Synonyms" targetLanguage={targetLanguage}>
            {messageData.data.synonyms.map((synonym: string) => (
              <div style={{ paddingBlock: "5px" }}>{synonym}</div>
            ))}
          </CardComponent>
          <CardComponent title="Examples" targetLanguage={targetLanguage}>
            {messageData.data.examples.map((example: string) => (
              <div style={{ paddingBlock: "5px" }}>{example}</div>
            ))}
          </CardComponent>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
