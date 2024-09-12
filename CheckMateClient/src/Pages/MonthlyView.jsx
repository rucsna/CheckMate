import { useEffect, useContext } from "react";
import { DateContext } from "../Contexts/DateContext";
import { SettingsContext } from "../Contexts/SettingsContext";
import MonthTable from "../Components/MonthlyView/MonthTable";


const MonthlyView = () => {
    const { setStartDay, startDayIfMonday, startDayIfSunday} = useContext(DateContext);
    const { weekStart } = useContext(SettingsContext);


    useEffect(() => {
        if (weekStart === "M") {
            setStartDay(startDayIfMonday);
        } else {
            setStartDay(startDayIfSunday);
        }
    }, [weekStart, startDayIfMonday, startDayIfSunday, setStartDay]);


    return (
        <div className="table-container">
            <MonthTable/>
        </div>
    )
};

export default MonthlyView;