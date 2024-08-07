export const camelCaseToReadable = (camelCaseStr) => {
  let readableStr = camelCaseStr.replace(/([A-Z])/g, " $1");
  readableStr = readableStr.charAt(0).toUpperCase() + readableStr.slice(1);
  return readableStr;
};

export const capitalizeWord = (word) => {
  if (typeof word !== "string" || word.length === 0) {
    return "";
  }
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
};

export const lastDateOfMonth = (currentDate) => {
  // Subtract 1 month from the current date
  currentDate.setMonth(currentDate.getMonth() - 1);
  // Format the date to YYYY-MM-DD
  let year = currentDate.getFullYear();
  let month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
  let day = String(currentDate.getDate()).padStart(2, "0");

  let lastMonthDate = `${year}-${month}-${day}`;

  return lastMonthDate;
};
