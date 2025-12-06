import { useEffect } from "react";
import {
  enable as enableDarkMode,
  disable as disableDarkMode,
  isEnabled as isDarkReaderEnabled
} from "darkreader";

interface DarkReaderConfig {
    brightness: number;
    contrast: number;
    sepia: number;
}

export default function useDarkReader(isDark: boolean): boolean {
    useEffect(() => {
        if (isDark) {
            const config: DarkReaderConfig = {
                brightness: 100,
                contrast: 90,
                sepia: 10,
            };
            enableDarkMode(config);
        } else {
            disableDarkMode();
        }
    }, [isDark]);

    return isDarkReaderEnabled();
}
