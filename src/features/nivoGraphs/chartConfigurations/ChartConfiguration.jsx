import React, { useEffect, useMemo, useState } from "react";
import { Alert, AlertIcon, Box, Button, Divider, Grid, Heading, Select, Spinner, Stack, useToast, Text, Badge, Card, CardFooter, CardBody } from "@chakra-ui/react";
import { capitalizeWord } from "../../../utils/common";
import { MdRemoveRedEye, MdSave } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Accordion, AccordionTab } from "primereact/accordion";
import { MultiSelect } from "primereact/multiselect";
import { calculateCount, createBodyWise, setDateRange, updateBodyWise, updateCountAndWidth } from "../graphUtils/common";
import { useDynamicNewQuery } from "./graphApi";
import { addWidget, getAllWidgets, updateWidget } from "./graphSlice";
import { graphDescriptions, initialBodyWise, newEndpoint, initialStartDate, initialEndDate, newProcessFlow, chartComponents, initialChartApiConfig, yAxisOptions } from "../utils";
import useProcessedData from "../hooks/useProcessedData";
import TypingMaster from "../drawer/TypingMaster";

const ChartConfiguration = ({ configureChart }) => {
  const { type } = configureChart;
  const toast = useToast();
  const dispatch = useDispatch();
  const { selectedWise, reportType } = useSelector((state) => state.graphSlice);

  // all states here
  const [wise, setWise] = useState("sales");
  const [priceOrQty, setPriceOrQty] = useState("qty");
  const [valuetype, setValuetype] = useState("count");
  const [previewLoading, setPreviewLoading] = useState(false);
  const [inputType, setInputType] = useState("month");
  const [dynamicWidth, setDynamicWidth] = useState(1200);
  const [regionWise, setRegionWise] = useState("pincode");
  const [startDate, setStartDate] = useState(initialStartDate(inputType, type));
  const [endDate, setEndDate] = useState(initialEndDate(inputType, type));
  const currentDescription = graphDescriptions[type];
  const [processFlow, setProcessFlow] = useState(newProcessFlow(selectedWise));
  const [dynamicHeight, setDynamicHeight] = useState(4000);
  const [bodyWise, setBodyWise] = useState(initialBodyWise(selectedWise, type, priceOrQty, startDate, endDate, regionWise, reportType));
  const [chartApiConfig, setChartApiConfig] = useState(initialChartApiConfig(selectedWise, type, processFlow, bodyWise));
  const [selectedValues, setSelectedValues] = useState(null);
  const [selectedPieValues, setSelectedPieValues] = useState(null);
  const token = useSelector((state) => state.auth.authDetails);
  const [yearError, setYearError] = useState(null);
  const [fromYear, setFromYear] = useState(2021);
  const [toYear, setToYear] = useState(null);
  // decode data from token
  const decodedToken = useMemo(() => {
    return token ? JSON.parse(atob(token.split('.')[1])) : null;
  }, [token]);

  const handleDateRange = (data) => {
    console.log('data', data)
    let { startDate: newStartDate, endDate: newEndDate } = setDateRange(data);
    let newBodyWise = createBodyWise(data, newStartDate, newEndDate, priceOrQty);
    let count = calculateCount(data, newStartDate, newEndDate);

    setInputType(data);
    setDynamicWidth(200 * count);
    setStartDate(newStartDate);
    setEndDate(newEndDate);
    setBodyWise(newBodyWise);
    updateChartApiConfig(newBodyWise);
  };

  const handlePriceOrQty = (data) => {
    let newBodyWise = createBodyWise(inputType, startDate, endDate, data, type);
    setPriceOrQty(data);
    setBodyWise(newBodyWise);
    updateChartApiConfig(newBodyWise);
  };

  const handleValueTypeChange = (e) => {
    const selectedValueType = e.target.value;
    setValuetype(selectedValueType);

    setChartApiConfig((prevConfig) => ({
      ...prevConfig,
      [type]: prevConfig[type].map((config) => ({
        ...config,
        body: {
          ...config.body,
          valuetype: selectedValueType,
        },
      })),
    }));
  };

  const handleDateUpdate = (dateType, data, type, reportType) => {
    let newStartDate = dateType === "from" ? data : startDate;
    let newEndDate = dateType === "to" ? data : endDate;

    const updatedBodyWise = updateBodyWise(inputType, newStartDate, newEndDate, bodyWise, type, reportType, selectedWise);

    if (dateType === "from") {
      setStartDate(data);
    } else {
      setEndDate(data);
    }

    updateCountAndWidth(inputType, newStartDate, newEndDate, setDynamicWidth);
    setBodyWise(updatedBodyWise);
    updateChartApiConfig(updatedBodyWise);
  };

  const handleFromDate = (data) => {
    const yearRegex = /^(19|20)\d{2}$/; // Accepts years between 1900 and 2099

    if (inputType === "year") {
      if (data === "" || yearRegex.test(data)) {
        setFromYear(data);
        setYearError(""); // Clear any previous error
      } else {
        setYearError("Please enter a valid year (e.g., 2021)");
      }
    }
    handleDateUpdate("from", data, type, reportType);
  };

  const handleToDate = (data) => {
    const yearRegex = /^(19|20)\d{2}$/; // Accepts years between 1900 and 2099
    if (inputType === "year") {
      if (data === "" || yearRegex.test(data)) {
        if (fromYear && parseInt(data, 10) <= parseInt(fromYear, 10)) {
          setYearError("To year cannot be less than or equal to From year");
        } else {
          setToYear(data);
          setYearError("");
        }
      } else {
        setYearError("Please enter a valid year (e.g., 2021)");
      }
    }
    handleDateUpdate("to", data, type, reportType);
  };

  const handleYAxisChange = (e) => {
    const { value } = e.target;
    const newValue = Array.isArray(value) ? value : [value];
    setChartApiConfig((prevConfig) => ({
      ...prevConfig,
      [type]: prevConfig[type].map((config) => ({
        ...config,
        body: {
          ...config.body,
          yaxis: newValue,
        },
      })),
    }));
  };

  const updateChartApiConfig = (newBodyWise) => {
    setChartApiConfig((prevConfig) => ({
      ...prevConfig,
      areaBump: [
        {
          wise: "sales",
          method: "POST",
          endpoint: newEndpoint(selectedWise, type, processFlow),
          body: newBodyWise,
        },
      ],
      bump: [
        {
          wise: "sales",
          method: "POST",
          endpoint: newEndpoint(selectedWise, type, processFlow),
          body: newBodyWise,
        },
      ],
      line: [
        {
          wise: "sales",
          method: "POST",
          endpoint: newEndpoint(selectedWise, type, processFlow),
          body: newBodyWise,
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
          body: newBodyWise,
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
    }));
  };

  const chartConfig = chartApiConfig[type];
  const { endpoint, body, method } = chartConfig ? chartConfig.find((config) => config.wise === wise) : {};
  const { data: graphData, isLoading, isError, error } = useDynamicNewQuery(endpoint ? { endpoint: type === "funnel" ? processFlow : endpoint, body, method } : null, { skip: !endpoint });
  console.log('In the chart config:: ', { graphData });
  const finalData = useMemo(() => {
    if (type === "funnel") {
      return graphData?.steps || [];
    } else if (type === "bar" || type === "pie") {
      return graphData?.content || [];
    }
    return graphData?.data || [];
  }, [graphData, type]);

  useEffect(() => {
    if (type === "heatmap") {
      setInputType("");
      setEndDate("");
      setStartDate("");
    } else if (type === "bar" || type === "pie") {
      setInputType("date");
    }
  }, [type]);

  const processedData = useProcessedData(finalData, type);
  console.log({ processedData, finalData });

  const ChartComponent = chartComponents[type];
  if (isLoading) return <Spinner />;

  // if (isError) {
  //   console.log('imranali59059', { error });
  //   return (
  //     <>
  //       <Alert status="error">
  //         <AlertIcon />
  //         Error: {error?.error || "An error occurred"}
  //       </Alert>
  //     </>
  //   );
  // }

  if (!ChartComponent) {
    return <Alert status="error">No valid chart type provided</Alert>;
  }

  // handle preview button
  const handlePreviewBtn = () => {
    setPreviewLoading(true);
    setTimeout(() => {
      setPreviewLoading(false);
    }, 500);
  };

  // handle save button
  const handleSaveBtn = () => {
    const localStorageWidgets = JSON.parse(localStorage.getItem("widgets")) || [];
    const companyId = decodedToken?.data?.company_id;
    const branchId = decodedToken?.data?.branch_id;
    const locationId = decodedToken?.data?.location_id;
    const userId = decodedToken?.data?.authUserId;

    // const widgetIndex = widgets.findIndex(
    const widgetIndex = localStorageWidgets.findIndex(
      (widget) => widget.type === type && widget.selectedWise === selectedWise && widget.companyId === companyId && widget.branchId === branchId && widget.locationId === locationId && widget.userId === userId
    );

    const id = widgetIndex === -1 ? Date.now().toString() : localStorageWidgets[widgetIndex].id;
    const widgetData = {
      id: id,
      chartName: `Chart (${selectedWise})`,
      title: `${type.charAt(0).toUpperCase() + type.slice(1)} Chart`,
      type: type,
      group: "distributionComparison",
      pinned: true,
      description: `This is ${type} Chart`,
      data: processedData || [],
      selectedWise,
      reportType,
      dynamicWidth,
      dynamicHeight,
      startDate,
      endDate,
      inputType,
      endpoint,
      body,
      method,
      companyId,
      branchId,
      locationId,
      userId
    };

    const saveWidgetsToLocalStorage = (widgets) => {
      localStorage.setItem("widgets", JSON.stringify(widgets));
    }

    const updatedWidgets = [...localStorageWidgets, widgetData];
    if (widgetIndex === -1) {
      saveWidgetsToLocalStorage(updatedWidgets);
      dispatch(addWidget(widgetData));
      dispatch(getAllWidgets());
      toast({
        title: "Chart Saved Successfully",
        status: "success",
        isClosable: true,
      });
    } else {
      dispatch(updateWidget({ id, data: widgetData }));
      toast({
        title: "Chart Updated Successfully",
        status: "success",
        isClosable: true,
      })
    }
  };

  const handleProcessFlow = (value) => {
    setProcessFlow(value);
  };

  const handleMultiSelect = (value) => {
    setSelectedValues(value);
    console.log('in the handleMultiSelect', { value });
    setChartApiConfig((prevConfig) => ({
      ...prevConfig,
      [type]: prevConfig[type].map((config) => ({
        ...config,
        body: {
          ...config.body,
          yaxis: value,
        },
      })),
    }));
  }

  const handleMultiSelectPie = (value) => {
    setSelectedPieValues(value);
  }

  return (
    <Card variant={"unstyled"}>
      <CardBody sx={{ minHeight: "77vh" }}>
        <Box
          display="flex"
          flexWrap="wrap"
          justifyContent="space-between"
          marginTop="10px">
          {/* graph view section */}
          <Box
            width={{
              base: "100%",
              lg: "59%",
            }}
            mb={6}>
            <Box
              sx={{
                bg: "white",
                padding: "15px",
                borderRadius: "8px",
                border: "1px solid #c4c4c4",
              }}
              mb={3}>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mb={8}>
                <Heading mt={4} mb={4}>
                  {/* {wise !== "" ? capitalizeWord(wise) : capitalizeWord(type)} Product Wise */}
                  {capitalizeWord(selectedWise)}
                </Heading>
                <Badge colorScheme="green" px={4}>
                  {type}
                </Badge>
              </Box>
              <Box sx={{ height: "350px", width: "100%", overflowX: "auto" }}>
                {error && <Alert status="error">{error?.data?.message}</Alert>}
                {!error && <ChartComponent
                  liveData={processedData}
                  startDate={startDate}
                  endDate={endDate}
                  dynamicWidth={dynamicWidth}
                  dynamicHeight={dynamicHeight}
                  inputType={inputType}
                />}
              </Box>
            </Box>
          </Box>

          {/* accordion section */}
          <Box
            width={{
              base: "100%",
              lg: "39%",
            }}>
            <Accordion activeIndex={0}>
              <AccordionTab
                header="Basic Info"
                headerStyle={{
                  backgroundColor: "#f0f0f0",
                  color: "#333",
                  padding: "7px",
                  fontSize: "14px",
                  fontWeight: "bold",
                  borderTopLeftRadius: "6px",
                  borderTopRightRadius: "6px",
                }}
                contentStyle={{
                  border: "1px solid #ecebeb",
                }}>
                <Box mb={3}>
                  <Box style={{ lineHeight: "1.5", fontSize: "14px" }}>
                    <Heading mt={4} mb={4}>
                      Graph Info
                    </Heading>
                    <TypingMaster text={currentDescription} />
                  </Box>
                </Box>
              </AccordionTab>
              <AccordionTab
                header="Customized Graph"
                headerStyle={{
                  backgroundColor: "#f0f0f0",
                  color: "#333",
                  padding: "7px",
                  fontSize: "14px",
                  fontWeight: "bold",
                  borderTopLeftRadius: "6px",
                  borderTopRightRadius: "6px",
                }}
                contentStyle={{
                  border: "1px solid #ecebeb",
                }}>
                {type === "funnel" ? (
                  <Box>
                    <Grid templateColumns="repeat(1, 1fr)" gap={6}>
                      <Stack spacing={3}>
                        <Text fontSize="sm" fontWeight="500">
                          Process Flow
                        </Text>
                        {selectedWise !== "purchase-po-wise" ? (
                          <Select
                            size="lg"
                            value={processFlow}
                            onChange={(e) => handleProcessFlow(e.target.value)}>
                            <option value="/sales/graph/so-wise-flow-process">
                              SO
                            </option>
                            <option value="/sales/graph/request-wise-flow-process">
                              Request
                            </option>
                            <option value="/sales/graph/quotation-so-wise-flow-process">
                              Quotation SO
                            </option>
                            <option value="/sales/graph/quotation-invoice-wise-flow-process">
                              Quotation Invoice
                            </option>
                            <option value="/sales/graph/invoice-wise-flow-process">
                              Invoice
                            </option>
                          </Select>
                        ) : (
                          <Select
                            size="lg"
                            value={processFlow}
                            onChange={(e) => handleProcessFlow(e.target.value)}>
                            <option value="/purchase/graph/rfq-wise-flow-process">
                              RFQ
                            </option>
                            <option value="/purchase/graph/po-wise-flow-process">
                              PO
                            </option>
                            <option value="/purchase/graph/grn-wise-flow-process">
                              GRN
                            </option>
                            <option value="/purchase/graph/grn-invoice-wise-flow-process">
                              GRN Invoice
                            </option>
                          </Select>
                        )}
                      </Stack>
                    </Grid>
                  </Box>
                ) : (
                  <Box>
                    {type !== "heatmap" && type !== "bar" && type !== "pie" && (
                      <Grid templateColumns="repeat(1, 1fr)" gap={6}>
                        <Stack spacing={3}>
                          <Text fontSize="sm" fontWeight="500">
                            Period (
                            <span
                              style={{
                                textTransform: "capitalize",
                                fontWeight: "bold",
                                color: "green",
                              }}>
                              {inputType}
                            </span>{" "}
                            Wise)
                          </Text>
                          <Select
                            size="lg"
                            value={inputType}
                            onChange={(e) => handleDateRange(e.target.value)}>
                            <option value="date">Day</option>
                            <option value="month">Month</option>
                            <option value="year">Year</option>
                          </Select>
                        </Stack>
                      </Grid>
                    )}
                    {selectedWise !== "sales-customer-wise" &&
                      selectedWise !== "purchase-vendor-wise" &&
                      type !== "bar" &&
                      type !== "pie" && (
                        <Grid templateColumns="repeat(1, 1fr)" gap={6}>
                          <Stack spacing={3}>
                            <Text fontSize="sm" fontWeight="500">
                              Quantity
                            </Text>
                            <Select
                              size="lg"
                              value={priceOrQty}
                              onChange={(e) =>
                                handlePriceOrQty(e.target.value)
                              }>
                              <option value="qty">Qty</option>
                              <option value="price">Price</option>
                            </Select>
                          </Stack>
                        </Grid>
                      )}

                    {(type === "bar" || type === "pie") && (
                      <Grid templateColumns="repeat(1, 1fr)" gap={6} >
                        <Stack spacing={3} >
                          <Text fontSize="sm" fontWeight="500">
                            Y Axis
                          </Text>
                          {type === "pie" ? (
                            <>
                              <Select size="lg" onChange={handleYAxisChange}>
                                {yAxisOptions(reportType).map((option) => (
                                  <option key={option.value} value={option.value}>
                                    {option.label}
                                  </option>
                                ))}
                              </Select>
                              {/* <MultiSelect
                              display="chip"
                              value={selectedPieValues}
                              options={graphData?.content?.map((option, index) => {
                                console.log('in the pie option', option)
                                return {
                                  value: option?.xaxis,
                                  label: option?.xaxis,
                                }
                              })}
                              placeholder="Select X-Axis"
                              onChange={(e) => handleMultiSelectPie(e.value)}
                            /> */}
                            </>
                          ) : (
                            <MultiSelect
                              display="chip"
                              value={selectedValues}
                              options={yAxisOptions(reportType).map((option) => ({
                                value: option.value,
                                label: option.label,
                              }))}
                              placeholder="Select Y-Axis"
                              onChange={(e) => handleMultiSelect(e.value)}
                            />
                          )}
                        </Stack>
                        <Stack spacing={3} >
                          <Text fontSize="sm" fontWeight="500">
                            Filter
                          </Text>
                          <Select
                            size="lg"
                            value={valuetype}
                            onChange={handleValueTypeChange}>
                            <option value="count">Count</option>
                            <option value="sum">Sum</option>
                          </Select>
                        </Stack>
                      </Grid>
                    )}

                    {type !== "heatmap" && (
                      <Stack
                        spacing={0}
                        sx={{
                          borderRadius: "6px",
                          shadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                          border: "1px solid rgba(0, 0, 0, 0.10)",
                          mt: 4,
                          p: 4,
                          backgroundColor: `${yearError ? "rgba(255, 0, 0, 0.1)" : ""}`,
                        }}>
                        <Text fontSize="sm" fontWeight="500">
                          Date Filter (
                          <span
                            style={{
                              textTransform: "capitalize",
                              fontWeight: "bold",
                              color: "green",
                            }}>
                            {inputType}
                          </span>{" "}
                          Wise)
                        </Text>
                        <Grid templateColumns="repeat(2, 1fr)" gap={6}>
                          <Stack spacing={0}>
                            <Text fontSize="sm" fontWeight="500">
                              From Date
                            </Text>
                            <input
                              style={{
                                border: "1px solid rgba(0, 0, 0, 0.10)",
                                borderRadius: "6px",
                                paddingLeft: 4,
                                paddingRight: 4,
                              }}
                              type={inputType}
                              value={startDate}
                              onChange={(e) => handleFromDate(e.target.value)}
                            />
                          </Stack>
                          <Stack spacing={0}>
                            <Text fontSize="sm" fontWeight="500">
                              To Date
                            </Text>
                            <input
                              style={{
                                border: "1px solid rgba(0, 0, 0, 0.10)",
                                borderRadius: "6px",
                                paddingLeft: 4,
                                paddingRight: 4,
                              }}
                              type={inputType}
                              value={endDate}
                              onChange={(e) => handleToDate(e.target.value)}
                            />
                          </Stack>
                        </Grid>
                        {yearError && <p style={{ fontSize: "8px", color: "red", marginTop: "4px" }}>{yearError}</p>}
                      </Stack>
                    )}
                  </Box>
                )}
              </AccordionTab>
            </Accordion>
          </Box>
        </Box>
      </CardBody>
      {/* footer area */}
      <Divider my={6} sx={{ border: "1px solid #e4e4e4" }} />
      <CardFooter sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant="outline"
            colorScheme="pink"
            leftIcon={previewLoading ? <Spinner /> : <MdRemoveRedEye />}
            sx={{
              p: "20px 20px",
              fontSize: "14px",
            }}
            mr={3}
            onClick={handlePreviewBtn}>
            Preview
          </Button>
          <Button
            variant="solid"
            colorScheme="teal"
            leftIcon={<MdSave />}
            sx={{
              p: "20px 20px",
              fontSize: "14px",
            }}
            mr={3}
            onClick={handleSaveBtn}>
            Save
          </Button>
        </Box>
      </CardFooter>
    </Card>
  );
};

export default ChartConfiguration;