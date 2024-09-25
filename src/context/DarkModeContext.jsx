import { createContext, useEffect } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState";

export const DarkModeContext = createContext();

function DarkModeProvider({ children }) {
    const [isDarkMode, setIsDarkMode] = useLocalStorageState(
        window.matchMedia("(prefers-color-scheme:dark)").matches,
        "isDarkMode"
    );

    useEffect(
        function () {
            if (isDarkMode) {
                document.documentElement.classList.add("dark-mode");
                document.documentElement.classList.remove("light-mode");
            } else {
                document.documentElement.classList.remove("dark-mode");
                document.documentElement.classList.add("light-mode");
            }
        },
        [isDarkMode]
    );

    function toggleDarkMode() {
        // console.log(isDarkMode);
        setIsDarkMode((isDark) => !isDark);
    }
    return (
        <DarkModeContext.Provider
            value={{
                isDarkMode,
                toggleDarkMode,
            }}
        >
            {children}
        </DarkModeContext.Provider>
    );
}

export { DarkModeProvider };
