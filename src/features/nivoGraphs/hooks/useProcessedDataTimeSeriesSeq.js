import { useState, useEffect } from 'react';
import { getAllDates } from '../graphUtils/common';
import { format, parse } from 'date-fns';

const useProcessedDataTimeSeriesSeq = ({ finalData = [], startDate = "", endDate = "", dynamicWidth = 1200, inputType = "" }) => {
  const [data, setData] = useState([]);

  return data;
};

export default useProcessedDataTimeSeriesSeq;
