import { createContext, useState } from "react";

export const SettingsContext = createContext();

export const SettingsProvider = ({children}) => {
    const [weekStart, setWeekStart] = useState("M");
    const [mode, setMode] = useState();

    return(
        <SettingsContext.Provider value={{weekStart, setWeekStart}}>
            {children}
        </SettingsContext.Provider>
    );
};