import { useState, useEffect } from 'react';

const useProcessedData = (finalData, type) => {
  const [processedData, setProcessedData] = useState([]);

  useEffect(() => {
    if (finalData) {
      let processedData = [];
      if (type === "pie") {
        processedData = finalData.map((product, index) => ({
          id: index,
          label: product?.yaxis,
          value: product?.all_total_amt,
        }));
      } else if (type === "bar") {
        processedData = finalData;
      } else {
        processedData = finalData.map((item) => ({
          ...item,
          data: item?.data?.map((entry) => ({
            ...entry,
            y: parseFloat(entry?.y),
          }))
        }));
      }
      setProcessedData(processedData);
    }
  }, [finalData, type]);

  return processedData;
};

export default useProcessedData;