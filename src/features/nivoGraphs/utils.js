import { split } from "lodash";
import AreaBumpChart from "./chartSettings/AreaBumpChart";
import BumpChart from "./chartSettings/BumpChart";
import LineChart from "./chartSettings/LineChart";
import FunnelChart from "./chartSettings/FunnelChart";
import HeatMapChart from "./chartSettings/HeatMapChart";
import BarChart from "./chartSettings/BarChart";
import PieChart from "./chartSettings/PieChart";

// all chart components here
export const chartComponents = {
    areaBump: AreaBumpChart,
    bump: BumpChart,
    line: LineChart,
    funnel: FunnelChart,
    heatmap: HeatMapChart,
    bar: BarChart,
    pie: PieChart,
};

export const graphDescriptions = {
    bar: "The Bar chart can display multiple data series, either stacked or side by side. It supports both vertical and horizontal layouts, with negative values positioned below the respective axes. You can customize the bar item component to render any valid SVG element, receiving styles, data, and event handlers. The responsive variant is called ResponsiveBar, available in the @nivo/api package. For legend configuration, you'll need to specify the dataFrom property, which determines how to compute the legend's data using indexes or keys.",
    pie: "This component generates a pie chart from an array of data, where each item must include an id and a value property. Keep in mind that the margin object does not account for radial labels, so you should adjust it accordingly to provide sufficient space. The responsive version of this component is called ResponsivePie.",
    areaBump:
        "The AreaBump chart combines ranking and values, displaying both over time on the y-axis. This makes it ideal for understanding trends in performance. If your primary interest lies in rankings alone, the Bump chart is a more streamlined option. It effectively highlights shifts in position without the added complexity of values. Choose based on your specific data needs!",
    bump: "The Bump chart visualizes the rankings of multiple series over time. While it resembles line charts, it focuses solely on displaying rankings rather than specific measurements on the y-axis. This makes it easy to track changes in position for each series at any given moment. By highlighting only the rankings, it simplifies the analysis of competitive dynamics. It's an effective tool for showcasing shifts in standings over time.",
    line: "This line chart supports stacking capabilities. It takes an array of data series, each with an id and a nested array of points (containing x and y properties), to compute the line for each series. Any datum with a null x or y value will be treated as a gap, resulting in skipped segments of the corresponding line.",
};

export const newEndpoint = (data = "", type = "", processFlow = "") => {
    if (data === "sales-product-wise") {
        if (type === "bump" || type === "areaBump" || type === "line") {
            return "/sales/graph/product-wise-time-series-seq";
        } else if (type === "bar" || type === "pie") {
            return "/sales/sales-graph-two";
        }
    } else if (data === "sales-customer-wise") {
        if (type === "bump" || type === "areaBump" || type === "line") {
            return "/sales/graph/customer-wise-time-series-seq";
        } else if (type === "bar" || type === "pie") {
            return "/sales/sales-graph-two";
        }
    } else if (data === "sales-so-wise") {
        if (type === "funnel") {
            return processFlow;
        }
    } else if (data === "sales-kam-wise") {
        if (type === "bump" || type === "areaBump" || type === "line") {
            return "/sales/graph/kam-wise-time-series-seq";
        } else if (type === "heatmap") {
            return "/sales/graph/kam-wise-heat-density";
        } else if (type === "bar" || type === "pie") {
            return "/sales/sales-graph-two";
        }
    } else if (data === "sales-region-wise") {
        if (type === "bump" || type === "areaBump" || type === "line") {
            return "/sales/graph/region-wise-time-series-seq";
        } else if (type === "heatmap") {
            return "/sales/graph/region-wise-heat-density";
        } else if (type === "bar" || type === "pie") {
            return "/sales/sales-graph-two";
        }
    } else if (data === "purchase-product-wise") {
        if (type === "areaBump" || type === "line" || type === "bump") {
            return "/purchase/graph/material-wise-time-series-seq"
        } else if (type === "bar" || type === "pie") {
            return "/purchase/purchase-graph-two";
        }
    } else if (data === "purchase-vendor-wise") {
        if (type === "areaBump" || type === "line" || type === "bump") {
            return "/purchase/graph/vendor-wise-time-series-seq"
        } else if (type === "bar" || type === "pie") {
            return "/purchase/purchase-graph-two";
        }
    } else if (data === "purchase-po-wise") {
        if (type === "funnel") {
            return processFlow;
        } else if (type === "bar" || type === "pie") {
            return "/purchase/purchase-graph-two";
        }
    }
};

export const initialBodyWise = (
    selectedWise = "",
    type = "",
    priceOrQty = "",
    startDate = "",
    endDate = "",
    regionWise = ""
) => {
    if (selectedWise === "sales-product-wise") {
        if (type === "bump" || type === "areaBump" || type === "line") {
            return {
                priceOrQty: `${priceOrQty}`,
                yearFrom: split(startDate, "-")[0],
                yearTo: split(endDate, "-")[0],
                monthFrom: split(startDate, "-")[1],
                monthTo: split(endDate, "-")[1],
            };
        } else if (type === "bar" || type === "pie") {
            return {
                xaxis: "items.itemName",
                yaxis: [
                    "salesPgi.salesDelivery.totalAmount",
                    "salesPgi.totalAmount",
                    "quotation.totalAmount",
                    "salesOrder.totalAmount",
                    "all_total_amt",
                ],
                groupBy: ["items.itemName"],
                valuetype: "count",
                filter: [
                    {
                        column: "invoice_date",
                        operator: "between",
                        type: "date",
                        value: [startDate, endDate],
                    },
                ],
            };
        }
    } else if (selectedWise === "sales-so-wise") {
        if (type === "funnel") {
            return {
                "startDate": "2024-01-01",
                "endDate": "2024-10-01"
            }
        }
    } else if (selectedWise === "sales-customer-wise") {
        if (type === "bump" || type === "areaBump" || type === "line") {
            return {
                monthFrom: "3",
                monthTo: "7",
                yearFrom: 2024,
                yearTo: 2024,
            };
        } else if (type === "bar" || type === "pie") {
            return {
                "xaxis": "items.goodsItems.goodsGroup.goodGroupName",
                "yaxis": [
                    "salesPgi.salesDelivery.totalAmount",
                    "salesPgi.totalAmount",
                    "quotation.totalAmount",
                    "salesOrder.totalAmount",
                    "all_total_amt"
                ],
                "groupBy": [
                    "items.goodsItems.goodsGroup"
                ],
                "valuetype": "count",
                "filter": [
                    {
                        "column": "invoice_date",
                        "operator": "between",
                        "type": "date",
                        "value": [startDate, endDate]
                    }
                ]
            };
        }
    } else if (selectedWise === "sales-kam-wise") {
        if (type === "bump" || type === "areaBump" || type === "line") {
            return {
                monthFrom: "3",
                monthTo: "7",
                yearFrom: 2024,
                yearTo: 2024,
            };
        } else if (type === "heatmap") {
            return {
                "priceOrQty": `${priceOrQty}`,
                "monthFrom": "3",
                "monthTo": "7",
                "yearFrom": 2024,
                "yearTo": 2024
            }
        } else if (type === "bar" || type === "pie") {
            return {
                "xaxis": "kam.kamName",
                "yaxis": [
                    "salesPgi.salesDelivery.totalAmount",
                    "salesPgi.totalAmount",
                    "quotation.totalAmount",
                    "salesOrder.totalAmount",
                    "all_total_amt"
                ],
                "groupBy": [
                    "kam.kamCode"
                ],
                "valuetype": "count",

                "filter": [
                    {
                        "column": "invoice_date",
                        "operator": "between",
                        "type": "date",
                        "value": [startDate, endDate]
                    }
                ]
            }
        }
    } else if (selectedWise === "sales-region-wise") {
        if (type === "bump" || type === "areaBump" || type === "line") {
            return {
                day: 12,
                month: 6,
                year: 2024,
                wise: "",
            };
        } else if (type === "heatmap") {
            return {
                "wise": `${regionWise}`,
                "yearFrom": 2024,
                "yearTo": 2024,
                "monthFrom": 1,
                "monthTo": 5
            }
        } else if (type === "bar" || type === "pie") {
            return {
                "xaxis": "customer.customerAddress.customer_address_state",
                "yaxis": [
                    "salesPgi.salesDelivery.totalAmount",
                    "salesPgi.totalAmount",
                    "quotation.totalAmount",
                    "salesOrder.totalAmount",
                    "all_total_amt"
                ],
                "groupBy": [
                    "customer.customerAddress.customer_address_state"
                ],
                "valuetype": "count",

                "filter": [
                    {
                        "column": "invoice_date",
                        "operator": "between",
                        "type": "date",
                        "value": [startDate, endDate]
                    }
                ]
            }
        }
    } else if (selectedWise === "purchase-product-wise") {
        if (type === "bump" || type === "areaBump" || type === "line") {
            return {
                priceOrQty: `${priceOrQty}`,
                yearFrom: split(startDate, "-")[0],
                yearTo: split(endDate, "-")[0],
                monthFrom: split(startDate, "-")[1],
                monthTo: split(endDate, "-")[1],
            };
        } else if (type === "bar" || type === "pie") {
            return {
                xaxis: "items.goodName",
                yaxis: [
                    "grnInvoice.grnSubTotal",
                    "grnInvoice.grnTotalCgst",
                    "grnInvoice.grnTotalIgst",
                    "grnInvoice.grnTotalAmount",
                ],
                groupBy: ["items.goodCode"],
                valuetype: "count",
                filter: [
                    {
                        column: "vendorDocumentDate",
                        operator: "between",
                        type: "date",
                        value: [startDate, endDate],
                    },
                ],
            };
        }
    } else if (selectedWise === "purchase-vendor-wise") {
        if (type === "bump" || type === "areaBump" || type === "line") {
            return {
                yearFrom: split(startDate, "-")[0],
                yearTo: split(endDate, "-")[0],
                monthFrom: split(startDate, "-")[1],
                monthTo: split(endDate, "-")[1],
            };
        } else if (type === "bar" || type === "pie") {
            return {
                "xaxis": "vendors.trade_name",
                "yaxis": [
                    "grnInvoice.grnSubTotal",
                    "grnInvoice.grnTotalCgst",
                    "grnInvoice.grnTotalIgst",
                    "grnInvoice.grnTotalAmount"
                ],
                "groupBy": [
                    "vendors.vendor_code"
                ],
                "valuetype": "count",
                "filter": [
                    {
                        "column": "vendorDocumentDate",
                        "operator": "between",
                        "type": "date",
                        "value": [startDate, endDate]
                    }
                ]
            }
        }
    } else if (selectedWise === "purchase-po-wise") {
        if (type === "bar" || type === "pie") {
            return {
                "xaxis": "po.po_number",
                "yaxis": [
                    "grnInvoice.grnSubTotal",
                    "grnInvoice.grnTotalCgst",
                    "grnInvoice.grnTotalIgst",
                    "grnInvoice.grnTotalAmount"
                ],
                "groupBy": [
                    "po.po_number"
                ],
                "valuetype": "count",
                "filter": [
                    {
                        "column": "vendorDocumentDate",
                        "operator": "between",
                        "type": "date",
                        "value": [startDate, endDate]
                    }
                ]
            }
        } else if (type === "funnel") {
            return {
                "wise": `${regionWise}`,
                "yearFrom": 2024,
                "yearTo": 2024,
                "monthFrom": 1,
                "monthTo": 5
            }
        }
    }
};

export const initialStartDate = (inputType, type) => {
    if (type === "bar" || type === "pie") {
        return "2024-05-20";
    } else {
        if (inputType === "month") {
            return "2024-01";
        } else if (inputType === "year") {
            return "2021";
        } else if (inputType === "date") {
            return "2024-01-01";
        }
    }
};

export const initialEndDate = (inputType, type) => {
    if (type === "bar" || type === "pie") {
        return "2024-05-31";
    } else {
        if (inputType === "month") {
            return "2024-12";
        } else if (inputType === "year") {
            return "2021";
        } else if (inputType === "date") {
            return "2024-01-01";
        }
    }
};

export const newProcessFlow = (selectedWise = "") => {
    if (selectedWise === "purchase-po-wise") {
        return "/purchase/graph/po-wise-flow-process"
    } else {
        return "/sales/graph/so-wise-flow-process"
    }
}

export const initialChartApiConfig = (selectedWise, type, processFlow, bodyWise) => {
    return {
        areaBump: [
            {
                wise: "sales",
                method: "POST",
                endpoint: newEndpoint(selectedWise, type, processFlow),
                body: bodyWise,
            },
        ],
        bump: [
            {
                wise: "sales",
                method: "POST",
                endpoint: newEndpoint(selectedWise, type, processFlow),
                body: bodyWise,
            },
        ],
        line: [
            {
                wise: "sales",
                method: "POST",
                endpoint: newEndpoint(selectedWise, type, processFlow),
                body: bodyWise,
            },
        ],
        funnel: [
            {
                wise: "sales",
                method: "POST",
                endpoint: newEndpoint(selectedWise, type, processFlow),
                body: bodyWise,
            },
        ],
        heatmap: [
            {
                wise: "sales",
                method: "POST",
                endpoint: newEndpoint(selectedWise, type, processFlow),
                body: bodyWise,
            },
        ],
        bar: [
            {
                wise: "sales",
                method: "POST",
                endpoint: newEndpoint(selectedWise, type, processFlow),
                body: bodyWise,
            },
        ],
        pie: [
            {
                wise: "sales",
                method: "POST",
                endpoint: newEndpoint(selectedWise, type, processFlow),
                body: bodyWise,
            },
        ],
    }
}

export const yAxisOptions = (reportType) => {
    if (reportType === "sales") {
        return [
            {
                value: "salesPgi.salesDelivery.totalAmount",
                label: "Sales PGI Delivery Amount",
            },
            { value: "salesPgi.totalAmount", label: "Sales PGI Amount" },
            { value: "quotation.totalAmount", label: "Quotation Amount" },
            { value: "salesOrder.totalAmount", label: "Sales Order Amount" },
            { value: "all_total_amt", label: "All Total Amount" },
        ];
    } else if (reportType === "purchase") {
        return [
            {
                value: "grnInvoice.grnSubTotal",
                label: "GRN Subtotal",
            },
            { value: "grnInvoice.grnTotalCgst", label: "GRN Total CGST" },
            { value: "grnInvoice.grnTotalIgst", label: "GRN Total IGST" },
            { value: "grnInvoice.grnTotalAmount", label: "GRN Total Amount" },
        ];
    }
    return [];
};