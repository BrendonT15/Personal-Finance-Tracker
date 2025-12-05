// src/components/DarkModeToggle.jsx
import { useState } from "react";
import useDarkReader from "../../../hooks/useDarkReader";

export default function DarkModeToggle() {
  const [dark, setDark] = useState(false);

  // Run Darkreader whenever dark value changes
  const active = useDarkReader(dark);

  return (
    <button
      onClick={() => setDark(!dark)}
      className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700"
    >
      {active ? "Switch to Light Mode" : "Switch to Dark Mode"}
    </button>
  );
}