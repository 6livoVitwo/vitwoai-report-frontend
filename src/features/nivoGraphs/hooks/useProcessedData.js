import { useState, useEffect } from 'react';

const useProcessedData = (finalData, type) => {
  const [processedData, setProcessedData] = useState([]);

  useEffect(() => {
    if (finalData) {
      let processedData = [];
      if (type === "pie") {
        processedData = finalData.map((product, index) => {
          const label = product?.xaxis || `Unknown${index+1}`;
          const hslColor = Math.floor(Math.random() * 360);
          return {
            id: label,
            label: label,
            value: product?.all_total_amt,
            color: `hsl(${hslColor}, 70%, 50%)`,
          };
        });
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