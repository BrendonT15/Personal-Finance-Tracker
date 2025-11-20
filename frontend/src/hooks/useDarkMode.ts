import {useState, useEffect} from "react"

export const useDarkMode = () => { 

  const [isDark, setIsDark] = useState<boolean>(() => {
    const savedMode = localStorage.getItem("dark-mode");
    return savedMode ? JSON.parse(savedMode) : false;
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("dark-mode", JSON.stringify(isDark));
  }, [isDark]);

  const toggleDarkMode = () => setIsDark(!isDark);

  return {isDark, toggleDarkMode}
};

