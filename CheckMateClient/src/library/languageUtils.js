import { LOCALE_IMPORT_PATH } from "./constants";

export const getWeekDaysArray = (locale) => {
    var baseDate = new Date(Date.UTC(2017, 0, 1));
    var weekDays = [];
    for (var i = 0; i < 7; i++) {
        weekDays.push(baseDate.toLocaleDateString(locale, { weekday: 'long' }).toUpperCase());
        baseDate.setDate(baseDate.getDate() + 1);
    }
    return weekDays;
};

export const getMonthNamesArray = (locale) => {
    var baseDate = new Date(Date.UTC(2017, 0, 1));
    var months = [];
    for (var i = 0; i < 12; i++) {
        months.push(baseDate.toLocaleDateString(locale, { month: 'long' }));
        baseDate.setMonth(baseDate.getMonth() + 1);
    }
    return months;
};

export const loadLabels = async (languageCode) => {
    const labels = await import(`./locales/${languageCode}.json`);
    return labels.default;
};