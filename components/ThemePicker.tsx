"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { themes } from "@/constants";
import { useGenerationStore } from "@/lib/themeSelect";

const ThemePicker = () => {
  const { theme, setTheme } = useGenerationStore();
  const [selectedTheme, setSelectedTheme] = useState<string | null>(null); // State to track selected theme

  const selectTheme = (theme: any) => {
    setTheme(theme);
    setSelectedTheme(theme.name);
  };
  useEffect(() => setSelectedTheme(theme.name), [theme]);

  return (
    <div className="flex flex-col w-full">
      <h1 className="text-sm max-h-max font-extralight">Themes</h1>
      <div className="flex space-x-4 max-h-max mt-4">
        {themes.map((theme, index) => (
          <Button
            key={index}
            variant="default" // Highlight selected theme
            className={`${
              theme.name === selectedTheme && "border-white"
            } p-0 w-6 hover:border-stone-300 h-6 border-2 flex-shrink-0`}
            onClick={() => selectTheme(theme)}
          >
            {/* Render two color boxes */}
            <div className="flex w-full h-full">
              <div
                className="w-1/2 h-full"
                style={theme.name === "default" ? {backgroundColor: '#171717'} :{ backgroundColor: theme.primary }}
              />
              <div
                className="w-1/2 h-full"
                style={theme.name === "default" ? {backgroundColor: '#1f1f1f'} :{ backgroundColor: theme.secondary }}
              />
            </div>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default ThemePicker;
