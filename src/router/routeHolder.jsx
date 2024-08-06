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
import TransactionalDayBook from "../features/transactionalDayBook/components/index";
import BalanceSheet from "../features/balanceSheet/components/index";
import ProfitAndLoss from "../features/profitAndLoss/components/index";
import Receivable from "../features/receivable/components/index";
import InventoryAgeingIssueDate from "../features/inventoryAgeingIssueDate/components/index";
import InventoryAgeingReceivedDate from "../features/inventoryAgeingReceivedDate/components/index";
import TransactionalDayBookTableView from "../features/transactionalDayBook/components/transactionalDayBookTableView";
import TransactionalDayBookGraphView from "../features/transactionalDayBook/components/transactionalDayBookGraphView";
import BalanceSheetTableView from "../features/balanceSheet/components/balanceSheetTableView";
import BalanceSheetGraphView from "../features/balanceSheet/components/balanceSheetGraphView";
import ProfitAndLossGraphView from "../features/profitAndLoss/components/profitAndLossGraphView";
import ProfitAndLossTableView from "../features/profitAndLoss/components/profitAndLossTableView";
import InventoryAgeingReceivedDateGraphView from "../features/inventoryAgeingReceivedDate/components/inventoryAgeingReceivedDateGraphView";
import InventoryAgeingReceivedDateTableView from "../features/inventoryAgeingReceivedDate/components/inventoryAgeingReceivedDateTableView";
import ProductionOrder from "../features/productionOrder/components/index";
import ProductionOrderTableView from "../features/productionOrder/components/productionOrderTableView";
import ProductionOrderGraphView from "../features/productionOrder/components/productionOrderGraphView";
import ProductionOrderTracking from "../features/productionOrderTracking/components/index";
import ProductionOrderTrackingTableView from "../features/productionOrderTracking/components/productionOrderTrackingTableView";
import ProductionOrderTrackingGraphView from "../features/productionOrderTracking/components/productionOrderTrackingGraphView";
import SectionWise from "../features/sectionWise/components/index";
import SectionWiseTableView from "../features/sectionWise/components/sectionWiseTableView";
import SectionWiseGraphView from "../features/sectionWise/components/sectionWiseGraphView";
import TdsReturn from "../features/tdsReturn/components/index";
import TdsReturnTableView from "../features/tdsReturn/components/tdsReturnTableView";
import TdsReturnGraphView from "../features/tdsReturn/components/tdsReturnGraphView";
import ExceptionReport from "../features/exceptionReport/components/index";
import ExceptionReportTableView from "../features/exceptionReport/components/exceptionReportTableView";
import ExceptionReportGraphView from "../features/exceptionReport/components/exceptionReportGraphView";
import TrialBalance from "../features/trialBalance/components/index";
import TrialBalanceTableView from "../features/trialBalance/components/trialBalanceTableView";
import TrialBalanceGraphView from "../features/trialBalance/components/trialBalanceGraphView";
import ReceivableTableView from "../features/receivable/components/receivableTableView";
import ReceivableGraphView from "../features/receivable/components/receivableGraphView";
import PayableTableView from "../features/payable/components/payableTableView";
import PayableGraphView from "../features/payable/components/payableGraphView";
import Payable from "../features/payable/components/index";
import InventoryAgeingIssueDateTableView from "../features/inventoryAgeingIssueDate/components/inventoryAgeingIssueDateTableView";
import InventoryAgeingIssueDateGraphView from "../features/inventoryAgeingIssueDate/components/inventoryAgeingIssueDateGraphView";
import StockReport from "../features/stockReport/components/index";
import StockReportTableView from "../features/stockReport/components/stockReportTableView";
import StockReportGraphView from "../features/stockReport/components/stockReportGraphView";
import StockLog from "../features/stockLog";
import StockLogTableView from "../features/stockLog/stockLogTableView";
import StockLogGraphView from "../features/stockLog/stockLogGraphView";
import SpentAnalysis from "../features/spentAnalysis/components/index";
import SpentAnalysisTableView from "../features/spentAnalysis/components/spentAnalysisTableView";
import SpentAnalysisGraphView from "../features/spentAnalysis/components/spentAnalysisGraphView";
import SalesProductWise from "../features/salesProductWise/components/index";
import SalesProductWiseTableView from "../features/salesProductWise/components/salesProductWiseTableView";
import SalesProductWiseGraphView from "../features/salesProductWise/components/salesProductWiseGraphView";
import SalesCustomerWise from "../features/salesCustomerWise/components/index";
import SalesCustomerWiseTableView from "../features/salesCustomerWise/components/salesCustomerWiseTableView";
import SalesCustomerWiseGraphView from "../features/salesCustomerWise/components/salesCustomerWiseGraphView";
import SalesVerticalWise from "../features/salesVerticalWise/components/index";
import SalesVerticalWiseTableView from "../features/salesVerticalWise/components/salesVerticalWiseTableView";
import SalesVerticalWiseGraphView from "../features/salesVerticalWise/components/salesVerticalWiseGraphView";
import PoWise from "../features/poWise/components/index";
import PoWiseTableView from "../features/poWise/components/poWiseTableView";
import PoWiseGraphView from "../features/poWise/components/poWiseGraphView";
import SalesSoWise from "../features/salesSoWise/components/index";
import SalesSoWiseTableView from "../features/salesSoWise/components/salesSoWiseTableView";
import SalesSoWiseGraphView from "../features/salesSoWise/components/salesSoWiseGraphView";
import GlobalCss from "../features/global/css";
import { setAuthDetails } from "./slice";
import Allreports from "../features/allreports";
import AllCharts from "../features/dashboard/AllCharts";
import PurchaseProductWise from "../features/purchaseProductWise/components";
import PurchaseProductWiseTableView from "../features/purchaseProductWise/components/purchaseProductWiseTableView";
import PurchaseProductWiseGraphView from "../features/purchaseProductWise/components/purchaseProductWiseGraphView";
import PurchaseVendorWise from "../features/purchaseVendorWise/components";
import PurchaseVendorWiseTableView from "../features/purchaseVendorWise/components/purchaseVendorWiseTableView";
import PurchaseVendorWiseGraphView from "../features/purchaseVendorWise/components/purchaseVendorWiseGraphView";
import SalesDetails from "../features/salesDetailsReport/components";
import PurchasePoWiseTableView from "../features/purchasePoWise/components/purchasePoWiseTableView";
import PurchasePoWiseGraphView from "../features/purchasePoWise/components/purchasePoWiseGraphView";
import Reportdetails from "../features/reportdetails";
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
        console.log("Token stored successfully.");
      } else {
        console.log(
          "Sorry, your browser does not support Web Storage. Token cannot be stored."
        );
      }
    };
    const token = getTokenFromURL();
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
            }></Route>
          <Route
            path="/reports/transactional-day-book"
            element={
              <PortalForLayout
                globalLayout={globalStaticFragmennt}
                portalId={commonPortalRef}>
                <TransactionalDayBook globalLayout={setGlobalStaticFragmennt} />
              </PortalForLayout>
            }>
            <Route
              path="/reports/transactional-day-book/table-view"
              element={
                <PortalForLayout
                  globalLayout={globalStaticFragmennt}
                  portalId={commonPortalRef}>
                  <TransactionalDayBookTableView
                    globalLayout={setGlobalStaticFragmennt}
                  />
                </PortalForLayout>
              }
            />
            <Route
              path="/reports/transactional-day-book/graph-view"
              element={
                <PortalForLayout
                  globalLayout={globalStaticFragmennt}
                  portalId={commonPortalRef}>
                  <TransactionalDayBookGraphView
                    globalLayout={setGlobalStaticFragmennt}
                  />
                </PortalForLayout>
              }
            />
          </Route>

          <Route
            path="/reports/balance-sheet"
            element={
              <PortalForLayout
                globalLayout={globalStaticFragmennt}
                portalId={commonPortalRef}>
                <BalanceSheet globalLayout={setGlobalStaticFragmennt} />
              </PortalForLayout>
            }>
            <Route
              path="/reports/balance-sheet/table-view"
              element={
                <PortalForLayout
                  globalLayout={globalStaticFragmennt}
                  portalId={commonPortalRef}>
                  <BalanceSheetTableView
                    globalLayout={setGlobalStaticFragmennt}
                  />
                </PortalForLayout>
              }
            />
            <Route
              path="/reports/balance-sheet/graph-view"
              element={
                <PortalForLayout
                  globalLayout={globalStaticFragmennt}
                  portalId={commonPortalRef}>
                  <BalanceSheetGraphView
                    globalLayout={setGlobalStaticFragmennt}
                  />
                </PortalForLayout>
              }
            />
          </Route>

          <Route
            path="/reports/profit-and-loss"
            element={
              <PortalForLayout
                globalLayout={globalStaticFragmennt}
                portalId={commonPortalRef}>
                <ProfitAndLoss globalLayout={setGlobalStaticFragmennt} />
              </PortalForLayout>
            }>
            <Route
              path="/reports/profit-and-loss/table-view"
              element={
                <PortalForLayout
                  globalLayout={globalStaticFragmennt}
                  portalId={commonPortalRef}>
                  <ProfitAndLossTableView
                    globalLayout={setGlobalStaticFragmennt}
                  />
                </PortalForLayout>
              }
            />
            <Route
              path="/reports/profit-and-loss/graph-view"
              element={
                <PortalForLayout
                  globalLayout={globalStaticFragmennt}
                  portalId={commonPortalRef}>
                  <ProfitAndLossGraphView
                    globalLayout={setGlobalStaticFragmennt}
                  />
                </PortalForLayout>
              }
            />
          </Route>

          <Route
            path="/reports/trial-balance"
            element={
              <PortalForLayout
                globalLayout={globalStaticFragmennt}
                portalId={commonPortalRef}>
                <TrialBalance globalLayout={setGlobalStaticFragmennt} />
              </PortalForLayout>
            }>
            <Route
              path="/reports/trial-balance/table-view"
              element={
                <PortalForLayout
                  globalLayout={globalStaticFragmennt}
                  portalId={commonPortalRef}>
                  <TrialBalanceTableView
                    globalLayout={setGlobalStaticFragmennt}
                  />
                </PortalForLayout>
              }
            />
            <Route
              path="/reports/trial-balance/graph-view"
              element={
                <PortalForLayout
                  globalLayout={globalStaticFragmennt}
                  portalId={commonPortalRef}>
                  <TrialBalanceGraphView
                    globalLayout={setGlobalStaticFragmennt}
                  />
                </PortalForLayout>
              }
            />
          </Route>

          <Route
            path="/reports/receivable"
            element={
              <PortalForLayout
                globalLayout={globalStaticFragmennt}
                portalId={commonPortalRef}>
                <Receivable globalLayout={setGlobalStaticFragmennt} />
              </PortalForLayout>
            }>
            <Route
              path="/reports/receivable/table-view"
              element={
                <PortalForLayout
                  globalLayout={globalStaticFragmennt}
                  portalId={commonPortalRef}>
                  <ReceivableTableView
                    globalLayout={setGlobalStaticFragmennt}
                  />
                </PortalForLayout>
              }
            />
            <Route
              path="/reports/receivable/graph-view"
              element={
                <PortalForLayout
                  globalLayout={globalStaticFragmennt}
                  portalId={commonPortalRef}>
                  <ReceivableGraphView
                    globalLayout={setGlobalStaticFragmennt}
                  />
                </PortalForLayout>
              }
            />
          </Route>

          <Route
            path="/reports/payable"
            element={
              <PortalForLayout
                globalLayout={globalStaticFragmennt}
                portalId={commonPortalRef}>
                <Payable globalLayout={setGlobalStaticFragmennt} />
              </PortalForLayout>
            }>
            <Route
              path="/reports/payable/table-view"
              element={
                <PortalForLayout
                  globalLayout={globalStaticFragmennt}
                  portalId={commonPortalRef}>
                  <PayableTableView globalLayout={setGlobalStaticFragmennt} />
                </PortalForLayout>
              }
            />
            <Route
              path="/reports/payable/graph-view"
              element={
                <PortalForLayout
                  globalLayout={globalStaticFragmennt}
                  portalId={commonPortalRef}>
                  <PayableGraphView globalLayout={setGlobalStaticFragmennt} />
                </PortalForLayout>
              }
            />
          </Route>

          <Route
            path="/reports/spent-analysis"
            element={
              <PortalForLayout
                globalLayout={globalStaticFragmennt}
                portalId={commonPortalRef}>
                <SpentAnalysis globalLayout={setGlobalStaticFragmennt} />
              </PortalForLayout>
            }>
            <Route
              path="/reports/spent-analysis/table-view"
              element={
                <PortalForLayout
                  globalLayout={globalStaticFragmennt}
                  portalId={commonPortalRef}>
                  <SpentAnalysisTableView
                    globalLayout={setGlobalStaticFragmennt}
                  />
                </PortalForLayout>
              }
            />
            <Route
              path="/reports/spent-analysis/graph-view"
              element={
                <PortalForLayout
                  globalLayout={globalStaticFragmennt}
                  portalId={commonPortalRef}>
                  <SpentAnalysisGraphView
                    globalLayout={setGlobalStaticFragmennt}
                  />
                </PortalForLayout>
              }
            />
          </Route>

          <Route
            path="/reports/inventory-ageing-issue-date"
            element={
              <PortalForLayout
                globalLayout={globalStaticFragmennt}
                portalId={commonPortalRef}>
                <InventoryAgeingIssueDate
                  globalLayout={setGlobalStaticFragmennt}
                />
              </PortalForLayout>
            }>
            <Route
              path="/reports/inventory-ageing-issue-date/table-view"
              element={
                <PortalForLayout
                  globalLayout={globalStaticFragmennt}
                  portalId={commonPortalRef}>
                  <InventoryAgeingIssueDateTableView
                    globalLayout={setGlobalStaticFragmennt}
                  />
                </PortalForLayout>
              }
            />
            <Route
              path="/reports/inventory-ageing-issue-date/graph-view"
              element={
                <PortalForLayout
                  globalLayout={globalStaticFragmennt}
                  portalId={commonPortalRef}>
                  <InventoryAgeingIssueDateGraphView
                    globalLayout={setGlobalStaticFragmennt}
                  />
                </PortalForLayout>
              }
            />
          </Route>

          <Route
            path="/reports/stock-report"
            element={
              <PortalForLayout
                globalLayout={globalStaticFragmennt}
                portalId={commonPortalRef}>
                <StockReport globalLayout={setGlobalStaticFragmennt} />
              </PortalForLayout>
            }>
            <Route
              path="/reports/stock-report/table-view"
              element={
                <PortalForLayout
                  globalLayout={globalStaticFragmennt}
                  portalId={commonPortalRef}>
                  <StockReportTableView
                    globalLayout={setGlobalStaticFragmennt}
                  />
                </PortalForLayout>
              }
            />
            <Route
              path="/reports/stock-report/graph-view"
              element={
                <PortalForLayout
                  globalLayout={globalStaticFragmennt}
                  portalId={commonPortalRef}>
                  <StockReportGraphView
                    globalLayout={setGlobalStaticFragmennt}
                  />
                </PortalForLayout>
              }
            />
          </Route>

          <Route
            path="/reports/stock-log"
            element={
              <PortalForLayout
                globalLayout={globalStaticFragmennt}
                portalId={commonPortalRef}>
                <StockLog globalLayout={setGlobalStaticFragmennt} />
              </PortalForLayout>
            }>
            <Route
              path="/reports/stock-log/table-view"
              element={
                <PortalForLayout
                  globalLayout={globalStaticFragmennt}
                  portalId={commonPortalRef}>
                  <StockLogTableView globalLayout={setGlobalStaticFragmennt} />
                </PortalForLayout>
              }
            />
            <Route
              path="/reports/stock-log/graph-view"
              element={
                <PortalForLayout
                  globalLayout={globalStaticFragmennt}
                  portalId={commonPortalRef}>
                  <StockLogGraphView globalLayout={setGlobalStaticFragmennt} />
                </PortalForLayout>
              }
            />
          </Route>

          <Route
            path="/reports/inventory-ageing-received-date"
            element={
              <PortalForLayout
                globalLayout={globalStaticFragmennt}
                portalId={commonPortalRef}>
                <InventoryAgeingReceivedDate
                  globalLayout={setGlobalStaticFragmennt}
                />
              </PortalForLayout>
            }>
            <Route
              path="/reports/inventory-ageing-received-date/table-view"
              element={
                <PortalForLayout
                  globalLayout={globalStaticFragmennt}
                  portalId={commonPortalRef}>
                  <InventoryAgeingReceivedDateTableView
                    globalLayout={setGlobalStaticFragmennt}
                  />
                </PortalForLayout>
              }
            />
            <Route
              path="/reports/inventory-ageing-received-date/graph-view"
              element={
                <PortalForLayout
                  globalLayout={globalStaticFragmennt}
                  portalId={commonPortalRef}>
                  <InventoryAgeingReceivedDateGraphView
                    globalLayout={setGlobalStaticFragmennt}
                  />
                </PortalForLayout>
              }
            />
          </Route>

          <Route
            path="/reports/product-wise"
            element={
              <PortalForLayout
                globalLayout={globalStaticFragmennt}
                portalId={commonPortalRef}>
                <PurchaseProductWise globalLayout={setGlobalStaticFragmennt} />
              </PortalForLayout>
            }>
            <Route
              path="/reports/product-wise/table-view"
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
            <Route
              path="/reports/product-wise/graph-view"
              element={
                <PortalForLayout
                  globalLayout={globalStaticFragmennt}
                  portalId={commonPortalRef}>
                  <PurchaseProductWiseGraphView
                    globalLayout={setGlobalStaticFragmennt}
                  />
                </PortalForLayout>
              }
            />
          </Route>

          <Route
            path="/reports/production-order"
            element={
              <PortalForLayout
                globalLayout={globalStaticFragmennt}
                portalId={commonPortalRef}>
                <ProductionOrder globalLayout={setGlobalStaticFragmennt} />
              </PortalForLayout>
            }>
            <Route
              path="/reports/production-order/table-view"
              element={
                <PortalForLayout
                  globalLayout={globalStaticFragmennt}
                  portalId={commonPortalRef}>
                  <ProductionOrderTableView
                    globalLayout={setGlobalStaticFragmennt}
                  />
                </PortalForLayout>
              }
            />
            <Route
              path="/reports/production-order/graph-view"
              element={
                <PortalForLayout
                  globalLayout={globalStaticFragmennt}
                  portalId={commonPortalRef}>
                  <ProductionOrderGraphView
                    globalLayout={setGlobalStaticFragmennt}
                  />
                </PortalForLayout>
              }
            />
          </Route>

          <Route
            path="/reports/section-wise"
            element={
              <PortalForLayout
                globalLayout={globalStaticFragmennt}
                portalId={commonPortalRef}>
                <SectionWise globalLayout={setGlobalStaticFragmennt} />
              </PortalForLayout>
            }>
            <Route
              path="/reports/section-wise/table-view"
              element={
                <PortalForLayout
                  globalLayout={globalStaticFragmennt}
                  portalId={commonPortalRef}>
                  <SectionWiseTableView
                    globalLayout={setGlobalStaticFragmennt}
                  />
                </PortalForLayout>
              }
            />
            <Route
              path="/reports/section-wise/graph-view"
              element={
                <PortalForLayout
                  globalLayout={globalStaticFragmennt}
                  portalId={commonPortalRef}>
                  <SectionWiseGraphView
                    globalLayout={setGlobalStaticFragmennt}
                  />
                </PortalForLayout>
              }
            />
          </Route>

          <Route
            path="/reports/vendor-wise"
            element={
              <PortalForLayout
                globalLayout={globalStaticFragmennt}
                portalId={commonPortalRef}>
                <PurchaseVendorWise globalLayout={setGlobalStaticFragmennt} />
              </PortalForLayout>
            }>
            <Route
              path="/reports/vendor-wise/table-view"
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
            <Route
              path="/reports/vendor-wise/graph-view"
              element={
                <PortalForLayout
                  globalLayout={globalStaticFragmennt}
                  portalId={commonPortalRef}>
                  <PurchaseVendorWiseGraphView
                    globalLayout={setGlobalStaticFragmennt}
                  />
                </PortalForLayout>
              }
            />
          </Route>

          <Route
            path="/reports/tds-return"
            element={
              <PortalForLayout
                globalLayout={globalStaticFragmennt}
                portalId={commonPortalRef}>
                <TdsReturn globalLayout={setGlobalStaticFragmennt} />
              </PortalForLayout>
            }>
            <Route
              path="/reports/tds-return/table-view"
              element={
                <PortalForLayout
                  globalLayout={globalStaticFragmennt}
                  portalId={commonPortalRef}>
                  <TdsReturnTableView globalLayout={setGlobalStaticFragmennt} />
                </PortalForLayout>
              }
            />
            <Route
              path="/reports/tds-return/graph-view"
              element={
                <PortalForLayout
                  globalLayout={globalStaticFragmennt}
                  portalId={commonPortalRef}>
                  <TdsReturnGraphView globalLayout={setGlobalStaticFragmennt} />
                </PortalForLayout>
              }
            />
          </Route>

          <Route
            path="/reports/exception-report"
            element={
              <PortalForLayout
                globalLayout={globalStaticFragmennt}
                portalId={commonPortalRef}>
                <ExceptionReport globalLayout={setGlobalStaticFragmennt} />
              </PortalForLayout>
            }>
            <Route
              path="/reports/exception-report/table-view"
              element={
                <PortalForLayout
                  globalLayout={globalStaticFragmennt}
                  portalId={commonPortalRef}>
                  <ExceptionReportTableView
                    globalLayout={setGlobalStaticFragmennt}
                  />
                </PortalForLayout>
              }
            />
            <Route
              path="/reports/exception-report/graph-view"
              element={
                <PortalForLayout
                  globalLayout={globalStaticFragmennt}
                  portalId={commonPortalRef}>
                  <ExceptionReportGraphView
                    globalLayout={setGlobalStaticFragmennt}
                  />
                </PortalForLayout>
              }
            />
          </Route>

          <Route
            path="/reports/production-order-tracking"
            element={
              <PortalForLayout
                globalLayout={globalStaticFragmennt}
                portalId={commonPortalRef}>
                <ProductionOrderTracking
                  globalLayout={setGlobalStaticFragmennt}
                />
              </PortalForLayout>
            }>
            <Route
              path="/reports/production-order-tracking/table-view"
              element={
                <PortalForLayout
                  globalLayout={globalStaticFragmennt}
                  portalId={commonPortalRef}>
                  <ProductionOrderTrackingTableView
                    globalLayout={setGlobalStaticFragmennt}
                  />
                </PortalForLayout>
              }
            />
            <Route
              path="/reports/production-order-tracking/graph-view"
              element={
                <PortalForLayout
                  globalLayout={globalStaticFragmennt}
                  portalId={commonPortalRef}>
                  <ProductionOrderTrackingGraphView
                    globalLayout={setGlobalStaticFragmennt}
                  />
                </PortalForLayout>
              }
            />
          </Route>

          <Route
            path="/reports/sales-details-report"
            element={
              <PortalForLayout
                globalLayout={globalStaticFragmennt}
                portalId={commonPortalRef}>
                <SalesDetails globalLayout={setGlobalStaticFragmennt} />
              </PortalForLayout>
            }></Route>

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
            <Route
              path="/reports/sales-product-wise/graph-view"
              element={
                <PortalForLayout
                  globalLayout={globalStaticFragmennt}
                  portalId={commonPortalRef}>
                  <SalesProductWiseGraphView
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
            <Route
              path="/reports/sales-customer-wise/graph-view"
              element={
                <PortalForLayout
                  globalLayout={globalStaticFragmennt}
                  portalId={commonPortalRef}>
                  <SalesCustomerWiseGraphView
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
            <Route
              path="/reports/sales-vertical-wise/graph-view"
              element={
                <PortalForLayout
                  globalLayout={globalStaticFragmennt}
                  portalId={commonPortalRef}>
                  <SalesVerticalWiseGraphView
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
            <Route
              path="/reports/sales-so-wise/graph-view"
              element={
                <PortalForLayout
                  globalLayout={globalStaticFragmennt}
                  portalId={commonPortalRef}>
                  <SalesSoWiseGraphView
                    globalLayout={setGlobalStaticFragmennt}
                  />
                </PortalForLayout>
              }
            />
          </Route>

          <Route
            path="/reports/po-wise/"
            element={
              <PortalForLayout
                globalLayout={globalStaticFragmennt}
                portalId={commonPortalRef}>
                <PoWise globalLayout={setGlobalStaticFragmennt} />
              </PortalForLayout>
            }>
            <Route
              path="/reports/po-wise/table-view"
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
            <Route
              path="/reports/po-wise/graph-view"
              element={
                <PortalForLayout
                  globalLayout={globalStaticFragmennt}
                  portalId={commonPortalRef}>
                  <PurchasePoWiseGraphView
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
