import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Button,
  Text,
  Badge,
} from "@chakra-ui/react";
import { IoMdAdd } from "react-icons/io";
import GraphViewSettings from "./graphViewSettings";
import { dashboardView } from "../fakeData";
import MyCharts from "../nivoCharts/MyCharts";
import { MdBookmarkAdded } from "react-icons/md";
import { FiPlus, FiSettings } from "react-icons/fi";

const Dashboard = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [graphViewSettings, setGraphViewSettings] = useState(
    dashboardView?.charts || []
  );
  const [singleGraphData, setSingleGraphData] = useState({});

  const {
    onOpen: onOpenGraphSettingsModal,
    onClose: onCloseGraphSettingsModal,
    isOpen: isOpenGraphSettingsModal,
  } = useDisclosure();

  const handleToggleAddChart = (index, chart) => {
    console.log({ index, chart });
    setGraphViewSettings((prev) => {
      const foundIndex = prev.findIndex((item) => item.id === chart.id);

      if (foundIndex !== -1) {
        return prev.map((item, i) => {
          if (i === foundIndex) {
            return { ...item, pinned: !item.pinned };
          } else {
            return item;
          }
        });
      } else {
        return [
          ...prev,
          {
            ...chart,
            pinned: true,
          },
        ];
      }
    });
  };

  const handleGraphSettings = (chart) => {
    console.log({ chart });
    onOpenGraphSettingsModal();
    setSingleGraphData(chart);
  };
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          "& button": {
            color: "#718296",
            padding: "20px 20px",
            fontSize: "14px",
            border: "1px solid #dee2e6",
            backgroundColor: "white",
          },
          "& button:hover": {
            backgroundColor: "rgb(0, 48, 96)",
            borderRadius: "5px",
          },
        }}
        mb={6}>
        <Text fontWeight="bold">{dashboardView?.title}</Text>
        <Button
          type="button"
          variant="outlined"
          onClick={onOpen}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            _hover: {
              color: "white",
            },
          }}>
          <FiPlus />
          Add Widgets
        </Button>
        <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="xl">
          <DrawerOverlay />
          <DrawerContent
            maxW="70vw"
            sx={{
              "& .stickyTop": {
                position: "sticky",
                top: 0,
                zIndex: 1,
                backgroundColor: "white",
              },
            }}>
            <DrawerCloseButton style={{ color: "white" }} />
            <DrawerHeader
              style={{
                backgroundColor: "#003060",
                color: "white",
              }}>
              Select Your Chart
            </DrawerHeader>
            <DrawerBody>
              <Box
                className="stickyTop"
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 4px",
                  p: 2,
                  my: 2,
                }}>
                <Text fontWeight="bold" fontSize="14px"></Text>
                <Text fontWeight="bold" fontSize="14px" color={"#003060"}>
                  {" "}
                  Count - {graphViewSettings?.length || 0}{" "}
                </Text>
              </Box>
              <Box
                display="flex"
                flexWrap="wrap"
                justifyContent="space-between"
                marginTop="10px">
                {graphViewSettings?.map((chart, index) => {
                  return (
                    <Box
                      key={index}
                      width={{
                        base: "100%",
                        lg: "48%",
                      }}
                      mb={6}>
                      <Box
                        sx={{
                          backgroundColor: "white",
                          padding: "15px",
                          borderRadius: "8px",
                          border: "1px solid #c4c4c4",
                        }}
                        mb={3}>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "flex-end",
                            "& button": {
                              color: "#718296",
                              padding: "20px 20px",
                              fontSize: "14px",
                              border: "1px solid #dee2e6",
                              backgroundColor: "white",
                              borderRadius: "8px",
                            },
                            "& button:hover": {
                              backgroundColor: "rgb(0, 48, 96)",
                              borderRadius: "5px",
                              color: "white",
                            },
                          }}
                          mb={6}>
                          <Button
                            type="button"
                            variant="outlined"
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                              _hover: {
                                color: "white",
                              },
                            }}
                            onClick={() => handleGraphSettings(chart)}>
                            <FiSettings
                              sx={{
                                mr: "6px",
                              }}
                            />
                            Select Graph
                          </Button>
                          {chart?.pinned ? (
                            <Button
                              onClick={() => handleToggleAddChart(index, chart)}
                              ml={3}>
                              Added <MdBookmarkAdded color="green" />
                            </Button>
                          ) : (
                            <Button
                              onClick={() => handleToggleAddChart(index, chart)}
                              ml={3}>
                              Add <IoMdAdd />
                            </Button>
                          )}
                        </Box>
                        <Box
                          sx={{
                            width: "100%",
                            height: "200px",
                          }}>
                          <MyCharts chart={chart} />
                        </Box>
                        <Badge colorScheme="blue" py={0} px={3} fontSize={9}>
                          {chart?.title}
                        </Badge>
                      </Box>
                    </Box>
                  );
                })}
              </Box>
            </DrawerBody>

            <DrawerFooter>
              <Button
                variant="outline"
                style={{
                  padding: "20px 20px",
                  fontSize: "14px",
                  color: "#718296",
                }}
                mr={3}
                onClick={onClose}>
                Cancel
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </Box>

      <Box display="flex" flexWrap="wrap" justifyContent="space-between">
        {graphViewSettings?.map((chart, index) => {
          if (chart?.pinned === false) return null;
          return (
            <Box
              width={{
                base: "100%",
                lg: "49%",
              }}
              mb={6}>
              <Box
                sx={{
                  backgroundColor: "white",
                  padding: "15px",
                  borderRadius: "8px",
                  transition: "0.5s ease",
                  // transition: "box-shadow 0.3s ease-in-out",
                  "&:hover": {
                    transform: "scale(1.02)",
                    border: "1px solid #b5b2b28a",
                  },
                }}
                mb={3}>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  mb={8}>
                  <Box
                    style={{
                      padding: "10px",
                      fontWeight: 600,
                      color: "black",
                    }}>
                    {chart.title}
                    <Text
                      sx={{
                        color: "#718296",
                        fontSize: "10px",
                      }}>
                      {chart.description}
                    </Text>
                  </Box>
                  <Box
                    style={{
                      padding: "10px",
                      fontWeight: 600,
                      color: "black",
                    }}>
                    <Button
                      variant="outline"
                      style={{
                        padding: "15px 10px",
                        fontSize: "12px",
                        color: "#718296",
                      }}
                      mr={3}
                      onClick={() => handleGraphSettings(chart)}>
                      <FiSettings style={{ marginRight: "6px" }} /> Settings
                    </Button>
                  </Box>
                </Box>
                <Box sx={{ height: "300px" }}>
                  <MyCharts chart={chart} />
                </Box>
              </Box>
            </Box>
          );
        })}
      </Box>

      <GraphViewSettings
        isOpen={isOpenGraphSettingsModal}
        onClose={onCloseGraphSettingsModal}
        singleGraphData={singleGraphData}
      />
    </>
  );
};

export default Dashboard;
