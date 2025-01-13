"use client";

import * as React from "react";
import { XIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Card, CardContent, CardTitle } from "./ui/card";

export default function TranslationPopup() {
  const [goal, setGoal] = React.useState(350);

  function onClick(adjustment: number) {
    setGoal(Math.max(200, Math.min(400, goal + adjustment)));
  }

  const [openDrawer, setOpenDrawer] = React.useState(true);

  const wordData = { word: "Hello" };
  return (
    <Drawer open={openDrawer}>
      <DrawerContent>
        <DrawerTrigger asChild>
          <Button
            variant="outline"
            className=" absolute right-2"
            onClick={() => setOpenDrawer(false)}
          >
            <XIcon className="h-5 w-5" />
          </Button>
        </DrawerTrigger>
        <div className="mx-auto w-full max-w-sm items-center flex flex-col ">
          <DrawerHeader>
            <DrawerTitle className="text-4xl">{wordData.word}</DrawerTitle>
          </DrawerHeader>
        </div>

        <div className="flex justify-center gap-8">
          <Card className="p-4" style={{ fontSize: "30px" }}>
            <CardTitle className="text-center">Meaning</CardTitle>
            <CardContent className="text-lg">
              The meaning of this word is very interesting.
            </CardContent>
          </Card>
          <Card className="p-4" style={{ fontSize: "30px" }}>
            <CardTitle>Meaning</CardTitle>
            <CardContent className="text-lg">
              The meaning of this word is very interesting.
            </CardContent>
          </Card>
          <Card className="p-4" style={{ fontSize: "30px" }}>
            <CardTitle>Meaning</CardTitle>
            <CardContent className="text-lg">
              The meaning of this word is very interesting.
            </CardContent>
          </Card>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
