import React, { useState, lazy, Suspense, useRef, useEffect } from "react";
import { Provider, useDispatch } from "react-redux";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  useNavigate,
} from "react-router-dom";
import HashLoader from "react-spinners/HashLoader";
import Store from "../store/store";
import { Box, Center, Container } from "@chakra-ui/react";
import DetectOffline from "../features/global/components/ofline";
import Layout from "../features/global/components/layout";
import PortalForLayout from "../features/global/components/PortalForLayout";
import SalesProductWise from "../features/salesProductWise/components/index";
import SalesProductWiseTableView from "../features/salesProductWise/components/salesProductWiseTableView";
import SalesCustomerWise from "../features/salesCustomerWise/components/index";
import SalesCustomerWiseTableView from "../features/salesCustomerWise/components/salesCustomerWiseTableView";
import SalesVerticalWise from "../features/salesVerticalWise/components/index";
import SalesVerticalWiseTableView from "../features/salesVerticalWise/components/salesVerticalWiseTableView";
import SalesSoWise from "../features/salesSoWise/components/index";
import SalesSoWiseTableView from "../features/salesSoWise/components/salesSoWiseTableView";
import SalesRegionWise from "../features/salesRegionWise/components/index";
// import SalesRegionWiseTableView from "../features/salesRegionWise/cormponents/salesRegionWiseTableView";
import SalesRegionWiseTableView from "../features/salesRegionWise/components/salesRegionWiseTableView";
import ReceivableCustomer from "../features/receivableCustomer/components/index";
import ReceivableCustomerTableView from "../features/receivableCustomer/components/receivableCustomerTableView";
import GlobalCss from "../features/global/css";
import { setAuthDetails } from "./slice";
import Allreports from "../features/allreports";
import AllCharts from "../features/dashboard/AllCharts";
import PurchaseProductWise from "../features/purchaseProductWise/components";
import PurchaseProductWiseTableView from "../features/purchaseProductWise/components/purchaseProductWiseTableView";
import PurchaseVendorWise from "../features/purchaseVendorWise/components";
import PurchaseVendorWiseTableView from "../features/purchaseVendorWise/components/purchaseVendorWiseTableView";
import PurchaseFunctionalWise from "../features/purchaseFunctionalWise/components";
import PurchaseFunctionalWiseTableView from "../features/purchaseFunctionalWise/components/purchaseFunctionalWiseTableView";
import SalesDetails from "../features/salesDetailsReport/components";
import PurchasePoWise from "../features/purchasePoWise/components";
import PurchasePoWiseTableView from "../features/purchasePoWise/components/purchasePoWiseTableView";
import Reportdetails from "../features/reportdetails";
import DashboardNew from "../features/dashboardNew/pages/DashboardNew";
import SalesKamWise from "../features/salesKamWise/components";
import SalesKamWiseTableView from "../features/salesKamWise/components/salesKamWiseTableView";
import PurchaseDetails from "../features/purchaseDetailsReport/components";
const Dashboard = lazy(() => import("../features/dashboard/components"));

const AllRoutes = () => {
  const locate = useLocation();
  const dispatch = useDispatch();
  const nevigate = useNavigate();
  const [globalStaticFragmennt, setGlobalStaticFragmennt] = useState(
    () => false
  );
  const commonPortalRef = useRef();

  useEffect(() => {
    const getTokenFromURL = () => {
      const url = window.location.href;
      const tokenIndex = url.indexOf("token=");
      if (tokenIndex !== -1) {
        const token = url.substring(tokenIndex + 6);
        return token;
      } else {
        return null;
      }
    };

    const storeTokenLocally = (token) => {
      if (typeof Storage !== "undefined") {
        localStorage.setItem("authToken", token);

        setGlobalStaticFragmennt(true);
        nevigate("/");
      } else {
        console.log(
          "Sorry, your browser does not support Web Storage. Token cannot be stored."
        );
      }
    };
    const token = getTokenFromURL();
    console.log("Token from URL:", token);
    if (token !== null) {
      storeTokenLocally(token);
    } else {
      console.log("Token not found in the URL.");
    }

    // Check if token already exists in local storage
    const existingToken = localStorage.getItem("authToken");
    if (existingToken) {
      setGlobalStaticFragmennt(true);
    }
    dispatch(setAuthDetails(existingToken));
  }, [dispatch]);

  return (
    <>
      {globalStaticFragmennt ? <Layout portalId={commonPortalRef} /> : ""}
      <Suspense
        fallback={
          <Center h="100vh">
            <HashLoader color="#105380" size={20} speedMultiplier={1} />
          </Center>
        }>
        <Routes location={locate} key={locate.key}>
          <Route
            path="/"
            element={
              <PortalForLayout
                globalLayout={globalStaticFragmennt}
                portalId={commonPortalRef}>
                <Dashboard globalLayout={setGlobalStaticFragmennt} />
              </PortalForLayout>
            }
          />
          <Route
            path="/new-dashboard"
            element={
              <PortalForLayout
                globalLayout={globalStaticFragmennt}
                portalId={commonPortalRef}>
                <DashboardNew globalLayout={setGlobalStaticFragmennt} />
              </PortalForLayout>
            }
          />
          <Route
            path="/all-charts"
            element={
              <PortalForLayout
                globalLayout={globalStaticFragmennt}
                portalId={commonPortalRef}>
                <AllCharts globalLayout={setGlobalStaticFragmennt} />
              </PortalForLayout>
            }
          />
          <Route
            path="/all-reports"
            element={
              <PortalForLayout
                globalLayout={globalStaticFragmennt}
                portalId={commonPortalRef}>
                <Allreports globalLayout={setGlobalStaticFragmennt} />
              </PortalForLayout>
            }></Route>
          <Route
            path="/report-details"
            element={
              <PortalForLayout
                globalLayout={globalStaticFragmennt}
                portalId={commonPortalRef}>
                <Reportdetails globalLayout={setGlobalStaticFragmennt} />
              </PortalForLayout>
            }
          />

          <Route
            path="/reports-details/sales-details-report"
            element={
              <PortalForLayout
                globalLayout={globalStaticFragmennt}
                portalId={commonPortalRef}>
                <SalesDetails globalLayout={setGlobalStaticFragmennt} />
              </PortalForLayout>
            }></Route>
          <Route
            path="/reports-details/purchase-details-report"
            element={
              <PortalForLayout
                globalLayout={globalStaticFragmennt}
                portalId={commonPortalRef}>
                <PurchaseDetails globalLayout={setGlobalStaticFragmennt} />
              </PortalForLayout>
            }></Route>

          <Route
            path="/reports/purchase-product-wise"
            element={
              <PortalForLayout
                globalLayout={globalStaticFragmennt}
                portalId={commonPortalRef}>
                <PurchaseProductWise globalLayout={setGlobalStaticFragmennt} />
              </PortalForLayout>
            }>
            <Route
              path="/reports/purchase-product-wise/table-view"
              element={
                <PortalForLayout
                  globalLayout={globalStaticFragmennt}
                  portalId={commonPortalRef}>
                  <PurchaseProductWiseTableView
                    globalLayout={setGlobalStaticFragmennt}
                  />
                </PortalForLayout>
              }
            />
          </Route>

          <Route
            path="/reports/receivable-customer"
            element={
              <PortalForLayout
                globalLayout={globalStaticFragmennt}
                portalId={commonPortalRef}>
                <ReceivableCustomer globalLayout={setGlobalStaticFragmennt} />
              </PortalForLayout>
            }>
            <Route
              path="/reports/receivable-customer/table-view"
              element={
                <PortalForLayout
                  globalLayout={globalStaticFragmennt}
                  portalId={commonPortalRef}>
                  <ReceivableCustomerTableView
                    globalLayout={setGlobalStaticFragmennt}
                  />
                </PortalForLayout>
              }
            />
          </Route>

          <Route
            path="/reports/purchase-vendor-wise"
            element={
              <PortalForLayout
                globalLayout={globalStaticFragmennt}
                portalId={commonPortalRef}>
                <PurchaseVendorWise globalLayout={setGlobalStaticFragmennt} />
              </PortalForLayout>
            }>
            <Route
              path="/reports/purchase-vendor-wise/table-view"
              element={
                <PortalForLayout
                  globalLayout={globalStaticFragmennt}
                  portalId={commonPortalRef}>
                  <PurchaseVendorWiseTableView
                    globalLayout={setGlobalStaticFragmennt}
                  />
                </PortalForLayout>
              }
            />
          </Route>

          <Route
            path="/reports/purchase-functional-wise"
            element={
              <PortalForLayout
                globalLayout={globalStaticFragmennt}
                portalId={commonPortalRef}>
                <PurchaseFunctionalWise
                  globalLayout={setGlobalStaticFragmennt}
                />
              </PortalForLayout>
            }>
            <Route
              path="/reports/purchase-functional-wise/table-view"
              element={
                <PortalForLayout
                  globalLayout={globalStaticFragmennt}
                  portalId={commonPortalRef}>
                  <PurchaseFunctionalWiseTableView
                    globalLayout={setGlobalStaticFragmennt}
                  />
                </PortalForLayout>
              }
            />
          </Route>

          <Route
            path="/reports/sales-product-wise"
            element={
              <PortalForLayout
                globalLayout={globalStaticFragmennt}
                portalId={commonPortalRef}>
                <SalesProductWise globalLayout={setGlobalStaticFragmennt} />
              </PortalForLayout>
            }>
            <Route
              path="/reports/sales-product-wise/table-view"
              element={
                <PortalForLayout
                  globalLayout={globalStaticFragmennt}
                  portalId={commonPortalRef}>
                  <SalesProductWiseTableView
                    globalLayout={setGlobalStaticFragmennt}
                  />
                </PortalForLayout>
              }
            />
          </Route>

          <Route
            path="/reports/sales-customer-wise/"
            element={
              <PortalForLayout
                globalLayout={globalStaticFragmennt}
                portalId={commonPortalRef}>
                <SalesCustomerWise globalLayout={setGlobalStaticFragmennt} />
              </PortalForLayout>
            }>
            <Route
              path="/reports/sales-customer-wise/table-view"
              element={
                <PortalForLayout
                  globalLayout={globalStaticFragmennt}
                  portalId={commonPortalRef}>
                  <SalesCustomerWiseTableView
                    globalLayout={setGlobalStaticFragmennt}
                  />
                </PortalForLayout>
              }
            />
          </Route>

          <Route
            path="/reports/sales-vertical-wise/"
            element={
              <PortalForLayout
                globalLayout={globalStaticFragmennt}
                portalId={commonPortalRef}>
                <SalesVerticalWise globalLayout={setGlobalStaticFragmennt} />
              </PortalForLayout>
            }>
            <Route
              path="/reports/sales-vertical-wise/table-view"
              element={
                <PortalForLayout
                  globalLayout={globalStaticFragmennt}
                  portalId={commonPortalRef}>
                  <SalesVerticalWiseTableView
                    globalLayout={setGlobalStaticFragmennt}
                  />
                </PortalForLayout>
              }
            />
          </Route>

          <Route
            path="/reports/sales-so-wise/"
            element={
              <PortalForLayout
                globalLayout={globalStaticFragmennt}
                portalId={commonPortalRef}>
                <SalesSoWise globalLayout={setGlobalStaticFragmennt} />
              </PortalForLayout>
            }>
            <Route
              path="/reports/sales-so-wise/table-view"
              element={
                <PortalForLayout
                  globalLayout={globalStaticFragmennt}
                  portalId={commonPortalRef}>
                  <SalesSoWiseTableView
                    globalLayout={setGlobalStaticFragmennt}
                  />
                </PortalForLayout>
              }
            />
          </Route>

          <Route
            path="/reports/sales-kam-wise/"
            element={
              <PortalForLayout
                globalLayout={globalStaticFragmennt}
                portalId={commonPortalRef}>
                <SalesKamWise globalLayout={setGlobalStaticFragmennt} />
              </PortalForLayout>
            }>
            <Route
              path="/reports/sales-kam-wise/table-view"
              element={
                <PortalForLayout
                  globalLayout={globalStaticFragmennt}
                  portalId={commonPortalRef}>
                  <SalesKamWiseTableView
                    globalLayout={setGlobalStaticFragmennt}
                  />
                </PortalForLayout>
              }
            />
          </Route>

          <Route
            path="/reports/sales-region-wise/"
            element={
              <PortalForLayout
                globalLayout={globalStaticFragmennt}
                portalId={commonPortalRef}>
                <SalesRegionWise globalLayout={setGlobalStaticFragmennt} />
              </PortalForLayout>
            }>
            <Route
              path="/reports/sales-region-wise/table-view"
              element={
                <PortalForLayout
                  globalLayout={globalStaticFragmennt}
                  portalId={commonPortalRef}>
                  <SalesRegionWiseTableView
                    globalLayout={setGlobalStaticFragmennt}
                  />
                </PortalForLayout>
              }
            />
          </Route>

          <Route
            path="/reports/purchase-po-wise/"
            element={
              <PortalForLayout
                globalLayout={globalStaticFragmennt}
                portalId={commonPortalRef}>
                <PurchasePoWise globalLayout={setGlobalStaticFragmennt} />
              </PortalForLayout>
            }>
            <Route
              path="/reports/purchase-po-wise/table-view"
              element={
                <PortalForLayout
                  globalLayout={globalStaticFragmennt}
                  portalId={commonPortalRef}>
                  <PurchasePoWiseTableView
                    globalLayout={setGlobalStaticFragmennt}
                  />
                </PortalForLayout>
              }
            />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
};

const RouteHolder = () => {
  return (
    <Provider store={Store}>
      <GlobalCss />
      <Container
        display="flex"
        flexDirection="row"
        justifyContent="center"
        className="wrapper"
        p={0}
        maxW="100vw"
        minH="100vh"
        color="grey.100">
        <DetectOffline showOverlay={false} showToast />
        <Router>
          <AllRoutes />
        </Router>
      </Container>
    </Provider>
  );
};

export default RouteHolder;