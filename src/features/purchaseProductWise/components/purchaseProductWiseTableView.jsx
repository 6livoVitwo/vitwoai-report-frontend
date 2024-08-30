import React, { useState, useEffect, useRef } from "react";
import CustomTable from "./purchaseProductWiseCustomTable";
import ChildComponent from "./purchaseProductWiseCustomTable";
import { Box, Spinner, Image, useToast } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import NoDataFound from "../../../asset/images/nodatafound.png";
import { useProductWisePurchaseQuery } from "../slice/purchaseProductWiseApi";
import { jwtDecode } from "jwt-decode";
import { useFetchDataQuery } from "../../apis/apiSlice";

let filters = {
"data": [
        "items.goodName",
        "items.goodCode",
        "SUM(items.goodQty)",
        "SUM(items.receivedQty)",
        "SUM(items.totalAmount)"
    ],
    "groupBy": [
        "items.goodName"
    ],
  "filter": [
    {
      "column": "companyId",
      "operator": "equal",
      "type": "integer",
      "value":  1,
    },
    {
      "column": "branchId",
      "operator": "equal",
      "type": "integer",
      "value":  1,
    },
    {
      "column": "locationId",
      "operator": "equal",
      "type": "integer",
      "value": 1,
    }
  ],
  "page": 0,
  "size": 50,
  "sortDir": "asc",
  "sortBy": "items.goodName"
}

const PurchaseProductWiseTableView = ( ) => {
  const authData = useSelector((state) => state.auth);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(50);
  const [individualItems, setIndividualItems] = useState([]);
  const toast = useToast();
  const [sortColumn, setSortColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc'); // 'asc' or 'desc'

   // Fetch data from the API with sorting parameters
   const {data:sortdata} = useFetchDataQuery(filters);
   
   console.log('Fetching data with filters:', filters);
  //  console.log('piyas');
  //  console.log(data);
   
  // Function to decode JWT token
  // const decodeToken = (token) => {
  //   try {
  //     const decodedData = jwtDecode(token); // Decode JWT token
  //     // console.log("Decoded JWT Data:", decodedData); // Log decoded data to console
  //     return decodedData;
  //   } catch (error) {
  //     // console.error("Invalid token", error);
  //     return null;
  //   }
  // };
  // Extract auth details if available
  // const decodedAuthDetails = authData.authDetails ? decodeToken(authData.authDetails) : null;


  const {
    data: sales,
    isLoading,
    isFetching,
    error,
  } = useProductWisePurchaseQuery({
    filters,
    page,
    size,
    authDetails: authData.authDetails,
  });



  const pageInfo = sales?.lastPage;

  const tableContainerRef = useRef(null);

  const flattenObject = (obj, prefix = "") => {
    let result = {};
    for (let key in obj) {
      if (typeof obj[key] === "object" && obj[key] !== null) {
        if (Array.isArray(obj[key])) {
          obj[key].forEach((item, index) => {
            Object.assign(
              result,
              flattenObject(item, `${prefix}${key}[${index}].`)
            );
          });
        } else {
          Object.assign(result, flattenObject(obj[key], `${prefix}${key}.`));
        }
      } else {
        result[`${prefix}${key}`] = obj[key];
      }
    }
    return result;
  };

  const extractFields = (data, index) => ({
    "SL No": index + 1,
    "Good Name": data["items.goodName"],
    "Good Code": data["items.goodCode"],
    "Total Quantity": data["SUM(items.goodQty)"],
    "Received Quantity": data["SUM(items.receivedQty)"],
    "Total Amount": data["SUM(items.totalAmount)"],
  });



  if (isLoading) {
    return (
      <Box
        height="calc(100vh - 75px)"
        width="100%"
        display="flex"
        alignItems="center"
        justifyContent="center">
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      </Box>
    );
  }
  if (error) {
    return (
      <Box
        bg="white"
        width="100%"
        height="calc(100vh - 103px)"
        display="flex"
        alignItems="center"
        justifyContent="center">
        <Image src={NoDataFound} alt="No Data Available" />
      </Box>
    );
  }
  if (sales?.
    totalPages <= page) {
    toast({
      title: 'No More Data',
      description: 'You have reached the end of the list.',
      status: 'warning',
      isClosable: true,
      duration: 800, //(5000 ms = 5 seconds)
    })
  }

  const mainData = sales?.content

  // console.log(mainData, 'main data');
  // console.log(newArray, 'newArray');


  return (
    <Box ref={tableContainerRef} height="calc(100vh - 75px)" overflowY="auto">
   
        <CustomTable
          newArray={mainData}
          page={page}
          setPage={setPage}
          isFetching={isFetching}
          pageInfo={pageInfo}
          setSize={setSize}
          sortColumn={sortColumn} 
          sortOrder={sortOrder} 
          setSortColumn={setSortColumn} 
          setSortOrder={setSortOrder} 
          sortdata={sortdata}
          alignment={{
            "Total Quantity": "right",
            "Received Quantity": "right",
            "Total Amount": "right",
          }}
        />
   
    </Box>
  );
};

export default PurchaseProductWiseTableView;
