export const getMonthName = (monthIndex) => new Date(1970, monthIndex, 1).toLocaleString('en-US', { month: 'long' });

export const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
};

// initializing functions for creating the month table
export const monthLengthCounter = (month, year) => new Date(year, month, 0).getDate();

export const getStartDay = (month, year, day) => new Date(year, month, day).getDay();

export const getWeekNumber = (month, year) => {
    var currDate = new Date(year, month, 1);
    var oneJan = new Date(year, 0, 1);
    var numberOfDays = Math.floor((currDate - oneJan) / (24 * 60 * 60 * 1000));
    return Math.ceil((currDate.getDay() + 1 + numberOfDays) / 7);
};