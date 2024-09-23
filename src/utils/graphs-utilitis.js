import { eachDayOfInterval, eachMonthOfInterval, eachYearOfInterval, format, parseISO } from "date-fns";
import { split } from "lodash";

export const getDateDifference = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    // Difference in milliseconds
    const differenceInTime = endDate - startDate;
    const differenceInDays = differenceInTime / (1000 * 60 * 60 * 24);
    return differenceInDays;
};

export const getMonthDifference = (start, end) => {
    const [startYear, startMonth] = start.split('-').map(Number);
    const [endYear, endMonth] = end.split('-').map(Number);

    const yearDifference = endYear - startYear;
    const monthDifference = endMonth - startMonth;

    // Total month difference
    return yearDifference * 12 + monthDifference;
};

export const getYearDifference = (startYear, endYear) => {
    const start = parseInt(startYear, 10); // Convert startYear to an integer
    const end = parseInt(endYear, 10); // Convert endYear to an integer
    const yearDifference = end - start;
    return yearDifference;
};

export const setDateRange = (data) => {
    if (data === 'month') {
        return {
            startDate: '2024-01',
            endDate: '2024-12',
        }
    } else if (data === 'year') {
        return {
            startDate: '2021',
            endDate: '2026',
        }
    } else {
        return {
            startDate: '2024-01-01',
            endDate: '2024-01-20',
        }
    }
}

export const createBodyWise = (data, startDate, endDate, priceOrQty) => {
    if (data === 'month') {
        return {
            "priceOrQty": `${priceOrQty}`,
            "yearFrom": split(startDate, '-')[0],
            "yearTo": split(endDate, '-')[0],
            "monthFrom": split(startDate, '-')[1],
            "monthTo": split(endDate, '-')[1],
        }
    } else if (data === 'year') {
        return {
            "priceOrQty": `${priceOrQty}`,
            "yearFrom": startDate,
            "yearTo": endDate,
        }
    } else {
        return {
            "priceOrQty": `${priceOrQty}`,
            "dateString": `${startDate} to ${endDate}`,
        }
    }
}

export const calculateCount = (data, startDate, endDate) => {
    if (data === 'month') {
        return getMonthDifference(startDate, endDate);
    } else if (data === 'year') {
        return getYearDifference(startDate, endDate);
    } else {
        return getDateDifference(startDate, endDate);
    }
}

export const updateCountAndWidth = (inputType, startDate, endDate, setDynamicWidth) => {
    const count = inputType === 'month' ? getMonthDifference(startDate, endDate) : inputType === 'year' ? getYearDifference(startDate, endDate) : getDateDifference(startDate, endDate);
    setDynamicWidth(200 * count);
};

export const updateBodyWise = (inputType, startDate, endDate, bodyWise) => {
    if (inputType === 'month') {
        return {
            ...bodyWise,
            "yearFrom": split(startDate, '-')[0],
            "monthFrom": split(startDate, '-')[1],
            "yearTo": split(endDate, '-')[0],
            "monthTo": split(endDate, '-')[1],
        };
    } else if (inputType === 'year') {
        return {
            ...bodyWise,
            "yearFrom": startDate,
            "yearTo": endDate,
        };
    } else {
        return {
            ...bodyWise,
            dateString: `${startDate} to ${endDate}`,
        };
    }
};

export const generateDateRange = (start, end) => {
    const parsedStart = parseISO(start);
    const parsedEnd = parseISO(end);
    const dates = eachDayOfInterval({ start: parsedStart, end: parsedEnd });
    return dates.map(date => format(date, 'yyyy-MM-dd'));
};

export const generateMonthRange = (startYear, startMonth, endYear, endMonth) => {
    const months = eachMonthOfInterval({
        start: new Date(startYear, startMonth - 1),
        end: new Date(endYear, endMonth - 1)
    })
    return months.map((month) => format(month, "yyyy-MM"));
}

export const generateYearRange = (start, end) => {
    const parsedStart = parseISO(start);
    const parsedEnd = parseISO(end);
    const years = eachYearOfInterval({ start: parsedStart, end: parsedEnd });
    return years.map((year) => format(year, "yyyy"));
};

export const getAllDates = (inputType, startDate, endDate) => {
    const startYear = (split(startDate, '-')[0] || '2024');
    const startMonth = (split(startDate, '-')[1] || '01');
    const endYear = (split(endDate, '-')[0] || '2024');
    const endMonth = (split(endDate, '-')[1] || '12');

    if (inputType === "month") {
        return generateMonthRange(startYear, startMonth, endYear, endMonth);
    } else if (inputType === "year") {
        return generateYearRange(startDate, endDate);
    } else {
        return generateDateRange(startDate, endDate);
    }
}