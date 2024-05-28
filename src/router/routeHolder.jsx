import React, { useState, lazy, Suspense, useRef, useEffect } from 'react';
import { Provider, useDispatch } from 'react-redux';
import {
	BrowserRouter as Router,
	Routes,
	Route,
	useLocation,
	useNavigate,
} from 'react-router-dom';
import HashLoader from 'react-spinners/HashLoader';
import Store from '../store/store';
import { Center, Container } from '@chakra-ui/react';
import DetectOffline from '../modules/global/components/ofline';
import Layout from '../modules/global/components/layout';
import PortalForLayout from '../modules/global/components/PortalForLayout';
import TransactionalDayBook from '../modules/transactionalDayBook/components/index';
import BalanceSheet from '../modules/balanceSheet/components/index';
import ProfitAndLoss from '../modules/profitAndLoss/components/index';
import Receivable from '../modules/receivable/components/index';
import InventoryAgeingIssueDate from '../modules/inventoryAgeingIssueDate/components/index';
import InventoryAgeingReceivedDate from '../modules/inventoryAgeingReceivedDate/components/index';
import ProductWise from '../modules/productWise/components/index';
import TransactionalDayBookTableView from '../modules/transactionalDayBook/components/transactionalDayBookTableView';
import TransactionalDayBookGraphView from '../modules/transactionalDayBook/components/transactionalDayBookGraphView';
import BalanceSheetTableView from '../modules/balanceSheet/components/balanceSheetTableView';
import BalanceSheetGraphView from '../modules/balanceSheet/components/balanceSheetGraphView';
import ProfitAndLossGraphView from '../modules/profitAndLoss/components/profitAndLossGraphView';
import ProfitAndLossTableView from '../modules/profitAndLoss/components/profitAndLossTableView';
import InventoryAgeingReceivedDateGraphView from '../modules/inventoryAgeingReceivedDate/components/inventoryAgeingReceivedDateGraphView';
import InventoryAgeingReceivedDateTableView from '../modules/inventoryAgeingReceivedDate/components/inventoryAgeingReceivedDateTableView';
import ProductWiseGraphView from '../modules/productWise/components/productWiseGraphView';
import ProductWiseTableView from '../modules/productWise/components/productWiseTableView';
import ProductionOrder from '../modules/productionOrder/components/index';
import ProductionOrderTableView from '../modules/productionOrder/components/productionOrderTableView';
import ProductionOrderGraphView from '../modules/productionOrder/components/productionOrderGraphView';
import ProductionOrderTracking from '../modules/productionOrderTracking/components/index';
import ProductionOrderTrackingTableView from '../modules/productionOrderTracking/components/productionOrderTrackingTableView';
import ProductionOrderTrackingGraphView from '../modules/productionOrderTracking/components/productionOrderTrackingGraphView';
import SectionWise from '../modules/sectionWise/components/index';
import SectionWiseTableView from '../modules/sectionWise/components/sectionWiseTableView';
import SectionWiseGraphView from '../modules/sectionWise/components/sectionWiseGraphView';
import VendorWise from '../modules/vendorWise/components/index';
import VendorWiseTableView from '../modules/vendorWise/components/vendorWiseTableView';
import VendorWiseGraphView from '../modules/vendorWise/components/vendorWiseGraphView';
import TdsReturn from '../modules/tdsReturn/components/index';
import TdsReturnTableView from '../modules/tdsReturn/components/tdsReturnTableView';
import TdsReturnGraphView from '../modules/tdsReturn/components/tdsReturnGraphView';
import ExceptionReport from '../modules/exceptionReport/components/index';
import ExceptionReportTableView from '../modules/exceptionReport/components/exceptionReportTableView';
import ExceptionReportGraphView from '../modules/exceptionReport/components/exceptionReportGraphView';
import TrialBalance from '../modules/trialBalance/components/index';
import TrialBalanceTableView from '../modules/trialBalance/components/trialBalanceTableView';
import TrialBalanceGraphView from '../modules/trialBalance/components/trialBalanceGraphView';
import ReceivableTableView from '../modules/receivable/components/receivableTableView';
import ReceivableGraphView from '../modules/receivable/components/receivableGraphView';
import PayableTableView from '../modules/payable/components/payableTableView';
import PayableGraphView from '../modules/payable/components/payableGraphView';
import Payable from '../modules/payable/components/index';
import InventoryAgeingIssueDateTableView from '../modules/inventoryAgeingIssueDate/components/inventoryAgeingIssueDateTableView';
import InventoryAgeingIssueDateGraphView from '../modules/inventoryAgeingIssueDate/components/inventoryAgeingIssueDateGraphView';
import StockReport from '../modules/stockReport/components/index';
import StockReportTableView from '../modules/stockReport/components/stockReportTableView';
import StockReportGraphView from '../modules/stockReport/components/stockReportGraphView';
import StockLog from '../modules/stockLog';
import StockLogTableView from '../modules/stockLog/stockLogTableView';
import StockLogGraphView from '../modules/stockLog/stockLogGraphView';
import SpentAnalysis from '../modules/spentAnalysis/components/index';
import SpentAnalysisTableView from '../modules/spentAnalysis/components/spentAnalysisTableView';
import SpentAnalysisGraphView from '../modules/spentAnalysis/components/spentAnalysisGraphView';
import SalesProductWise from '../modules/salesProductWise/components/index';
import SalesProductWiseTableView from '../modules/salesProductWise/components/salesProductWiseTableView';
import SalesProductWiseGraphView from '../modules/salesProductWise/components/salesProductWiseGraphView';
import SalesCustomerWise from '../modules/salesCustomerWise/components/index';
import SalesCustomerWiseTableView from '../modules/salesCustomerWise/components/salesCustomerWiseTableView';
import SalesCustomerWiseGraphView from '../modules/salesCustomerWise/components/salesCustomerWiseGraphView';
import SalesVerticalWise from '../modules/salesVerticalWise/components/index';
import SalesVerticalWiseTableView from '../modules/salesVerticalWise/components/salesVerticalWiseTableView';
import SalesVerticalWiseGraphView from '../modules/salesVerticalWise/components/salesVerticalWiseGraphView';
import PoWise from '../modules/poWise/components/index';
import PoWiseTableView from '../modules/poWise/components/poWiseTableView';
import PoWiseGraphView from '../modules/poWise/components/poWiseGraphView';
import SalesSoWise from '../modules/salesSoWise/components/index';
import SalesSoWiseTableView from '../modules/salesSoWise/components/salesSoWiseTableView';
import SalesSoWiseGraphView from '../modules/salesSoWise/components/salesSoWiseGraphView';
import GlobalCss from '../modules/global/css';
import { setAuthDetails } from './slice';
import Allreports from '../modules/allreports';
const Dashboard = lazy(() => import('../modules/dashboard/components'));

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
			const tokenIndex = url.indexOf('token=');
			if (tokenIndex !== -1) {
				const token = url.substring(tokenIndex + 6);
				return token;
			} else {
				return null;
			}
		};

		const storeTokenLocally = (token) => {
			if (typeof Storage !== 'undefined') {
				localStorage.setItem('authToken', token);

				setGlobalStaticFragmennt(true);
				nevigate('/');
				console.log('Token stored successfully.');
			} else {
				console.log(
					'Sorry, your browser does not support Web Storage. Token cannot be stored.'
				);
			}
		};
		const token = getTokenFromURL();
		if (token !== null) {
			storeTokenLocally(token);
		} else {
			console.log('Token not found in the URL.');
		}

		// Check if token already exists in local storage
		const existingToken = localStorage.getItem('authToken');
		if (existingToken) {
			setGlobalStaticFragmennt(true);
		}
		dispatch(setAuthDetails(existingToken));
	}, [dispatch]);

	return (
		<>
			{globalStaticFragmennt ? <Layout portalId={commonPortalRef} /> : ''}
			<Suspense
				fallback={
					<Center h='100vh'>
						<HashLoader
							color='#105380'
							size={20}
							speedMultiplier={1}
						/>
					</Center>
				}>
				<Routes location={locate} key={locate.key}>
					<Route
						path='/'
						element={
							<PortalForLayout
								globalLayout={globalStaticFragmennt}
								portalId={commonPortalRef}>
								<Dashboard
									globalLayout={setGlobalStaticFragmennt}
								/>
							</PortalForLayout>
						}
					/>
					<Route
						path='/all-reports'
						element={
							<PortalForLayout
								globalLayout={globalStaticFragmennt}
								portalId={commonPortalRef}>
								<Allreports
									globalLayout={setGlobalStaticFragmennt}
								/>
							</PortalForLayout>
						}></Route>
					<Route
						path='/reports/transactional-day-book'
						element={
							<PortalForLayout
								globalLayout={globalStaticFragmennt}
								portalId={commonPortalRef}>
								<TransactionalDayBook
									globalLayout={setGlobalStaticFragmennt}
								/>
							</PortalForLayout>
						}>
						<Route
							path='/reports/transactional-day-book/table-view'
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
							path='/reports/transactional-day-book/graph-view'
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
						path='/reports/balance-sheet'
						element={
							<PortalForLayout
								globalLayout={globalStaticFragmennt}
								portalId={commonPortalRef}>
								<BalanceSheet
									globalLayout={setGlobalStaticFragmennt}
								/>
							</PortalForLayout>
						}>
						<Route
							path='/reports/balance-sheet/table-view'
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
							path='/reports/balance-sheet/graph-view'
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
						path='/reports/profit-and-loss'
						element={
							<PortalForLayout
								globalLayout={globalStaticFragmennt}
								portalId={commonPortalRef}>
								<ProfitAndLoss
									globalLayout={setGlobalStaticFragmennt}
								/>
							</PortalForLayout>
						}>
						<Route
							path='/reports/profit-and-loss/table-view'
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
							path='/reports/profit-and-loss/graph-view'
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
						path='/reports/trial-balance'
						element={
							<PortalForLayout
								globalLayout={globalStaticFragmennt}
								portalId={commonPortalRef}>
								<TrialBalance
									globalLayout={setGlobalStaticFragmennt}
								/>
							</PortalForLayout>
						}>
						<Route
							path='/reports/trial-balance/table-view'
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
							path='/reports/trial-balance/graph-view'
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
						path='/reports/receivable'
						element={
							<PortalForLayout
								globalLayout={globalStaticFragmennt}
								portalId={commonPortalRef}>
								<Receivable
									globalLayout={setGlobalStaticFragmennt}
								/>
							</PortalForLayout>
						}>
						<Route
							path='/reports/receivable/table-view'
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
							path='/reports/receivable/graph-view'
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
						path='/reports/payable'
						element={
							<PortalForLayout
								globalLayout={globalStaticFragmennt}
								portalId={commonPortalRef}>
								<Payable
									globalLayout={setGlobalStaticFragmennt}
								/>
							</PortalForLayout>
						}>
						<Route
							path='/reports/payable/table-view'
							element={
								<PortalForLayout
									globalLayout={globalStaticFragmennt}
									portalId={commonPortalRef}>
									<PayableTableView
										globalLayout={setGlobalStaticFragmennt}
									/>
								</PortalForLayout>
							}
						/>
						<Route
							path='/reports/payable/graph-view'
							element={
								<PortalForLayout
									globalLayout={globalStaticFragmennt}
									portalId={commonPortalRef}>
									<PayableGraphView
										globalLayout={setGlobalStaticFragmennt}
									/>
								</PortalForLayout>
							}
						/>
					</Route>

					<Route
						path='/reports/spent-analysis'
						element={
							<PortalForLayout
								globalLayout={globalStaticFragmennt}
								portalId={commonPortalRef}>
								<SpentAnalysis
									globalLayout={setGlobalStaticFragmennt}
								/>
							</PortalForLayout>
						}>
						<Route
							path='/reports/spent-analysis/table-view'
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
							path='/reports/spent-analysis/graph-view'
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
						path='/reports/inventory-ageing-issue-date'
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
							path='/reports/inventory-ageing-issue-date/table-view'
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
							path='/reports/inventory-ageing-issue-date/graph-view'
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
						path='/reports/stock-report'
						element={
							<PortalForLayout
								globalLayout={globalStaticFragmennt}
								portalId={commonPortalRef}>
								<StockReport
									globalLayout={setGlobalStaticFragmennt}
								/>
							</PortalForLayout>
						}>
						<Route
							path='/reports/stock-report/table-view'
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
							path='/reports/stock-report/graph-view'
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
						path='/reports/stock-log'
						element={
							<PortalForLayout
								globalLayout={globalStaticFragmennt}
								portalId={commonPortalRef}>
								<StockLog
									globalLayout={setGlobalStaticFragmennt}
								/>
							</PortalForLayout>
						}>
						<Route
							path='/reports/stock-log/table-view'
							element={
								<PortalForLayout
									globalLayout={globalStaticFragmennt}
									portalId={commonPortalRef}>
									<StockLogTableView
										globalLayout={setGlobalStaticFragmennt}
									/>
								</PortalForLayout>
							}
						/>
						<Route
							path='/reports/stock-log/graph-view'
							element={
								<PortalForLayout
									globalLayout={globalStaticFragmennt}
									portalId={commonPortalRef}>
									<StockLogGraphView
										globalLayout={setGlobalStaticFragmennt}
									/>
								</PortalForLayout>
							}
						/>
					</Route>

					<Route
						path='/reports/inventory-ageing-received-date'
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
							path='/reports/inventory-ageing-received-date/table-view'
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
							path='/reports/inventory-ageing-received-date/graph-view'
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
						path='/reports/product-wise'
						element={
							<PortalForLayout
								globalLayout={globalStaticFragmennt}
								portalId={commonPortalRef}>
								<ProductWise
									globalLayout={setGlobalStaticFragmennt}
								/>
							</PortalForLayout>
						}>
						<Route
							path='/reports/product-wise/table-view'
							element={
								<PortalForLayout
									globalLayout={globalStaticFragmennt}
									portalId={commonPortalRef}>
									<ProductWiseTableView
										globalLayout={setGlobalStaticFragmennt}
									/>
								</PortalForLayout>
							}
						/>
						<Route
							path='/reports/product-wise/graph-view'
							element={
								<PortalForLayout
									globalLayout={globalStaticFragmennt}
									portalId={commonPortalRef}>
									<ProductWiseGraphView
										globalLayout={setGlobalStaticFragmennt}
									/>
								</PortalForLayout>
							}
						/>
					</Route>

					<Route
						path='/reports/production-order'
						element={
							<PortalForLayout
								globalLayout={globalStaticFragmennt}
								portalId={commonPortalRef}>
								<ProductionOrder
									globalLayout={setGlobalStaticFragmennt}
								/>
							</PortalForLayout>
						}>
						<Route
							path='/reports/production-order/table-view'
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
							path='/reports/production-order/graph-view'
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
						path='/reports/section-wise'
						element={
							<PortalForLayout
								globalLayout={globalStaticFragmennt}
								portalId={commonPortalRef}>
								<SectionWise
									globalLayout={setGlobalStaticFragmennt}
								/>
							</PortalForLayout>
						}>
						<Route
							path='/reports/section-wise/table-view'
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
							path='/reports/section-wise/graph-view'
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
						path='/reports/vendor-wise'
						element={
							<PortalForLayout
								globalLayout={globalStaticFragmennt}
								portalId={commonPortalRef}>
								<VendorWise
									globalLayout={setGlobalStaticFragmennt}
								/>
							</PortalForLayout>
						}>
						<Route
							path='/reports/vendor-wise/table-view'
							element={
								<PortalForLayout
									globalLayout={globalStaticFragmennt}
									portalId={commonPortalRef}>
									<VendorWiseTableView
										globalLayout={setGlobalStaticFragmennt}
									/>
								</PortalForLayout>
							}
						/>
						<Route
							path='/reports/vendor-wise/graph-view'
							element={
								<PortalForLayout
									globalLayout={globalStaticFragmennt}
									portalId={commonPortalRef}>
									<VendorWiseGraphView
										globalLayout={setGlobalStaticFragmennt}
									/>
								</PortalForLayout>
							}
						/>
					</Route>

					<Route
						path='/reports/tds-return'
						element={
							<PortalForLayout
								globalLayout={globalStaticFragmennt}
								portalId={commonPortalRef}>
								<TdsReturn
									globalLayout={setGlobalStaticFragmennt}
								/>
							</PortalForLayout>
						}>
						<Route
							path='/reports/tds-return/table-view'
							element={
								<PortalForLayout
									globalLayout={globalStaticFragmennt}
									portalId={commonPortalRef}>
									<TdsReturnTableView
										globalLayout={setGlobalStaticFragmennt}
									/>
								</PortalForLayout>
							}
						/>
						<Route
							path='/reports/tds-return/graph-view'
							element={
								<PortalForLayout
									globalLayout={globalStaticFragmennt}
									portalId={commonPortalRef}>
									<TdsReturnGraphView
										globalLayout={setGlobalStaticFragmennt}
									/>
								</PortalForLayout>
							}
						/>
					</Route>

					<Route
						path='/reports/exception-report'
						element={
							<PortalForLayout
								globalLayout={globalStaticFragmennt}
								portalId={commonPortalRef}>
								<ExceptionReport
									globalLayout={setGlobalStaticFragmennt}
								/>
							</PortalForLayout>
						}>
						<Route
							path='/reports/exception-report/table-view'
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
							path='/reports/exception-report/graph-view'
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
						path='/reports/production-order-tracking'
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
							path='/reports/production-order-tracking/table-view'
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
							path='/reports/production-order-tracking/graph-view'
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
						path='/reports/sales-product-wise'
						element={
							<PortalForLayout
								globalLayout={globalStaticFragmennt}
								portalId={commonPortalRef}>
								<SalesProductWise
									globalLayout={setGlobalStaticFragmennt}
								/>
							</PortalForLayout>
						}>
						<Route
							path='/reports/sales-product-wise/table-view'
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
							path='/reports/sales-product-wise/graph-view'
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
						path='/reports/sales-customer-wise/'
						element={
							<PortalForLayout
								globalLayout={globalStaticFragmennt}
								portalId={commonPortalRef}>
								<SalesCustomerWise
									globalLayout={setGlobalStaticFragmennt}
								/>
							</PortalForLayout>
						}>
						<Route
							path='/reports/sales-customer-wise/table-view'
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
							path='/reports/sales-customer-wise/graph-view'
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
						path='/reports/sales-vertical-wise/'
						element={
							<PortalForLayout
								globalLayout={globalStaticFragmennt}
								portalId={commonPortalRef}>
								<SalesVerticalWise
									globalLayout={setGlobalStaticFragmennt}
								/>
							</PortalForLayout>
						}>
						<Route
							path='/reports/sales-vertical-wise/table-view'
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
							path='/reports/sales-vertical-wise/graph-view'
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
						path='/reports/sales-so-wise/'
						element={
							<PortalForLayout
								globalLayout={globalStaticFragmennt}
								portalId={commonPortalRef}>
								<SalesSoWise
									globalLayout={setGlobalStaticFragmennt}
								/>
							</PortalForLayout>
						}>
						<Route
							path='/reports/sales-so-wise/table-view'
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
							path='/reports/sales-so-wise/graph-view'
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
						path='/reports/po-wise/'
						element={
							<PortalForLayout
								globalLayout={globalStaticFragmennt}
								portalId={commonPortalRef}>
								<PoWise
									globalLayout={setGlobalStaticFragmennt}
								/>
							</PortalForLayout>
						}>
						<Route
							path='/reports/po-wise/table-view'
							element={
								<PortalForLayout
									globalLayout={globalStaticFragmennt}
									portalId={commonPortalRef}>
									<PoWiseTableView
										globalLayout={setGlobalStaticFragmennt}
									/>
								</PortalForLayout>
							}
						/>
						<Route
							path='/reports/po-wise/graph-view'
							element={
								<PortalForLayout
									globalLayout={globalStaticFragmennt}
									portalId={commonPortalRef}>
									<PoWiseGraphView
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
				display='flex'
				flexDirection='row'
				justifyContent='center'
				className='wrapper'
				p={0}
				maxW='100vw'
				minH='100vh'
				color='grey.100'>
				<DetectOffline showOverlay={false} showToast />
				<Router>
					<AllRoutes />
				</Router>
			</Container>
		</Provider>
	);
};

export default RouteHolder;
