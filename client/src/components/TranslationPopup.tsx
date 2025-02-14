import { ReactNode, useState } from "react";
import { BookmarkPlusIcon, Check, XIcon } from "lucide-react";

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
    Meaning: "Définition",
    Synonyms: "Synonymes",
    Examples: "Exemples",
    OtherMeanings: "Autres définitions",
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
      wordType: string;
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
  console.log(messageData);
  const [openDrawer, setOpenDrawer] = useState(true);
  const [saveWord, setSaveWord] = useState(false);

  console.log("data", messageData);
  const targetLanguage = messageData.targetLanguage;
  console.log("target", targetLanguage);
  const handleAddWord = async () => {
    try {
      const response = await fetch("http://localhost:3000/add", {
        method: "POST",
        body: JSON.stringify(messageData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status == 201) {
        setSaveWord(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Drawer open={openDrawer}>
      <DrawerContent>
        <DrawerTrigger asChild>
          <Button
            variant="ghost"
            style={{ position: "absolute", top: "20px", right: "20px" }}
            onClick={() => setOpenDrawer(false)}
          >
            <XIcon style={{ color: "black", width: "24px", height: "24px" }} />
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
          <DrawerHeader
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <DrawerTitle
              style={{
                fontSize: "2.25rem",
                lineHeight: "2.5rem",
                color: "black",
                position: "relative",
              }}
            >
              {messageData.word}
              <Button
                onClick={handleAddWord}
                style={{
                  position: "absolute",

                  transform: "translate(5px, 5px)",
                  color: "#e9559b",
                }}
                variant={"ghost"}
              >
                {saveWord ? (
                  <Check style={{ width: "32px", height: "32px" }} />
                ) : (
                  <BookmarkPlusIcon style={{ width: "32px", height: "32px" }} />
                )}
              </Button>
            </DrawerTitle>

            <div
              style={{
                fontStyle: "italic",
              }}
            >
              {messageData.data.wordType}
            </div>
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
