import { useState, useEffect } from 'react';

const useProcessedData = (finalData, type) => {
  const [processedData, setProcessedData] = useState([]);

  useEffect(() => {
    if (finalData) {
      let processedData = [];
      if (type === "pie") {
        processedData = finalData.map((product, index) => {
          const label = product?.xaxis || `Unknown${index + 1}`;
          const hslColor = Math.floor(Math.random() * 360);
          console.log({ product })

          const value = Object.keys(product)
            .filter((key) => key !== "xaxis") // Exclude 'xaxis'
            .map((key) => parseFloat(product[key]) || 0) // Parse numerical values, default to 0
            .reduce((acc, curr) => acc + curr, 0); // Aggregate values (sum in this case)

          return {
            id: label,
            label: label,
            value: value || 0,
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