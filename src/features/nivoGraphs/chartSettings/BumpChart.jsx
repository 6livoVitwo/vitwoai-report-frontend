import React, { useEffect, useState } from "react";
import { format, parse } from 'date-fns';
import { getAllDates } from "../graphUtils/common";
import Bump from "../nivo/Bump";

const BumpChart = ({ liveData = [], startDate = "", endDate = "", dynamicWidth = 1200, inputType = "" }) => {
  const [data, setData] = useState([]);

  const allDates = getAllDates(inputType, startDate, endDate);

  useEffect(() => {
    let maxCount = 0;
    const updatedData = liveData?.map((d, i) => {
      const currentDates = d.data.map(item => item.x);
      maxCount = Math.max(maxCount, currentDates.length);

      const monthPlaceholders = allDates
        .filter(date => !currentDates.includes(format(date, 'MM-yyyy')))
        .map(missingDate => ({
          x: format(missingDate, 'MM-yyyy'),
          y: 0
        }));

      const yearPlaceholders = allDates
        .filter(date => !currentDates.includes(format(date, 'yyyy')))
        .map(missingDate => ({
          x: format(missingDate, 'yyyy'),
          y: 0
        }));

      const dayPlaceholders = allDates
        .filter(date => !currentDates.includes(date))
        .map(missingDate => ({
          x: missingDate,
          y: 0
        }));

      // Combine the original data with the placeholders
      return {
        ...d,
        data: inputType === "month" ? [...d.data, ...monthPlaceholders].sort((a, b) => {
          const dateA = parse(a.x, 'MM-yyyy', new Date());
          const dateB = parse(b.x, 'MM-yyyy', new Date());
          return dateA - dateB
        }) : inputType === "year"
          ? [...d.data, ...yearPlaceholders].sort((a, b) => parseInt(a.x) - parseInt(b.x)) : [...d.data, ...dayPlaceholders].sort((a, b) => new Date(a.x) - new Date(b.x))
      };
    });

    // Update the state
    if (JSON.stringify(updatedData) !== JSON.stringify(data)) {
      setData(updatedData);
    }

  }, [startDate, endDate, dynamicWidth, liveData, inputType, allDates, data]);

  return (
    <>
      {liveData.length > 0 ? (
        <Bump data={data} dynamicWidth={dynamicWidth} />
      ) : (
        <Bump dynamicWidth={dynamicWidth} />
      )}
    </>
  );
};

export default BumpChart;
