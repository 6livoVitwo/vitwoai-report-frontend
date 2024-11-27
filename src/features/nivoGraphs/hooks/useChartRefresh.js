import { useDynamicNewQuery } from "../chartConfigurations/graphApi";

const useChartRefresh = (chart) => {
    const { endpoint, body, method, type, processFlow } = chart;
    const { data: graphData, isLoading, isError, error } = useDynamicNewQuery(endpoint ? { endpoint: type === "funnel" ? processFlow : endpoint, body, method } : null, { skip: !endpoint });

    const handleRefresh = () => {
        console.log('clicked...', chart);
    }

    return { graphData, isLoading, isError, error, handleRefresh };
}

export default useChartRefresh