import { useState, useEffect } from 'react';
import { getAllDates } from '../graphUtils/common';
import { format, parse } from 'date-fns';

const useProcessedDataTimeSeriesSeq = ({ finalData = [], startDate = "", endDate = "", dynamicWidth = 1200, inputType = "" }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (!finalData || finalData.length === 0) {
      console.log("No liveData provided");
      return;
    }
    const allDates = getAllDates(inputType, startDate, endDate);
    console.log("Generated allDates:", allDates);

    const updatedData = finalData?.map((d) => {
      const currentDates = d.data.map((item) => item.x);
      console.log("Current Dates:", currentDates);

      const placeholders = inputType === "month"
        ? allDates
            .filter((date) => !currentDates.includes(format(date, 'MM-yyyy')))
            .map((missingDate) => ({ x: format(missingDate, 'MM-yyyy'), y: 0 }))
        : inputType === "year"
        ? allDates
            .filter((date) => !currentDates.includes(format(date, 'yyyy')))
            .map((missingDate) => ({ x: format(missingDate, 'yyyy'), y: 0 }))
        : allDates
            .filter((date) => !currentDates.includes(date))
            .map((missingDate) => ({ x: missingDate, y: 0 }));

      console.log("Placeholders:", placeholders);

      return {
        ...d,
        data: [...d.data, ...placeholders].sort((a, b) =>
          inputType === "month"
            ? parse(a.x, 'MM-yyyy', new Date()) - parse(b.x, 'MM-yyyy', new Date())
            : inputType === "year"
            ? parseInt(a.x) - parseInt(b.x)
            : new Date(a.x) - new Date(b.x)
        ),
      };
    });

    console.log("Updated Data:", updatedData);

    setData(updatedData);
  }, [startDate, endDate, dynamicWidth, finalData, inputType]);

  return data;
};

export default useProcessedDataTimeSeriesSeq;
