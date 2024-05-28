import React, { useState, useEffect, useRef } from 'react';
import {
	Box,
	Button as ChakraButton,
	Text,
	Select,
	Menu,
	MenuButton,
	MenuList,
	MenuItem,
	Drawer,
	Input,
	DrawerBody,
	DrawerFooter,
	DrawerHeader,
	DrawerOverlay,
	DrawerContent,
	DrawerCloseButton,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	useDisclosure,
} from '@chakra-ui/react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileExcel } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'primereact/button';
import { MultiSelect } from 'primereact/multiselect';
import styled from '@emotion/styled';
import { saveAs } from 'file-saver';
import 'jspdf-autotable';
import { DownloadIcon } from '@chakra-ui/icons';
import { Skeleton } from 'primereact/skeleton';
import { Link } from 'react-router-dom';
import { Calendar } from 'primereact/calendar';

const CssWrapper = styled.div`
	.p-datatable-wrapper::-webkit-scrollbar {
		width: 10px;
	}
	.p-datatable-wrapper::-webkit-scrollbar-track {
		box-shadow: inset 0 0 5px grey;
		border-radius: 10px;
	}
	.p-datatable-wrapper::-webkit-scrollbar-thumb {
		background: var(--chakra-colors-mainBlue);
		border-radius: 10px;
	}
	.p-datatable-emptymessage .p-datatable .p-datatable-tbody > tr > td {
		text-align: center;
	}
	.p-datatable .p-sortable-column .p-column-title {
		font-size: 1.2rem;
		font-weight: 600;
	}
	.p-datatable .p-datatable-tbody > tr > td {
		font-size: 1.2rem;
		color: var(--chakra-colors-textBlack);
	}
	.p-paginator {
		padding: 15px 10px;
	}
	.p-component {
		font-size: 1.3rem;
	}
	.p-dropdown-label {
		display: flex;
		align-items: center;
	}
	.p-datatable .p-column-header-content {
		justify-content: center;
	}
	.p-paginator .p-paginator-pages .p-paginator-page {
		font-size: 1.3rem;
	}
	.p-paginator .p-dropdown .p-dropdown-label {
		font-size: 1.3rem;
	}
	.p-datatable .p-datatable-tbody > tr > td {
		text-align: center;
		padding: 1px;
	}
	.p-datatable .p-datatable-header {
		border-top: none;
		background: white;
	}
	.p-datatable .p-datatable-thead > tr > th {
		background-color: #f0f3f5;
		color: var(--chakra-colors-mainBluemedium);
	}
	.p-datatable-tbody tr:nth-of-type(even) {
		background-color: #f0f3f5;
	}
	.p-input-icon-left > i:first-of-type {
		right: 0.75rem;
		color: #6b7280;
	}
	.p-datatable .p-datatable-thead > tr > th {
		text-wrap: nowrap;
		border: 1px solid #ccc;
	}
	.p-datatable > .p-datatable-wrapper {
		height: calc(100vh - 275px);
		padding-right: 5px;
		margin-right: 5px;
	}
	.custom-sort-icon {
		color: white !important;
	}
`;

const CustomTable = ({ individualItems, setFirst, first }) => {
	const dataTable = useRef(null);
	const [customers, setCustomers] = useState([]);
	const [loading, setLoading] = useState(true);
	const [globalFilterValue, setGlobalFilterValue] = useState('');
	const [columns, setColumns] = useState([]);
	const [visibleColumns, setVisibleColumns] = useState([]);
	const [lazyLoading, setLazyLoading] = useState(false);
	const [rows, setRows] = useState(20); // Initial number of rows
	const [totalRecords, setTotalRecords] = useState(0);
	const [columnFilters, setColumnFilters] = useState({});
	const [dates, setDates] = useState(null);
	const {
		onOpen: onOpenFilterModal,
		onClose: onCloseFilterModal,
		isOpen: isOpenFilterModal,
	} = useDisclosure();
	const {
		onOpen: onOpenDownloadReportModal,
		onClose: onCloseDownloadReportModal,
		isOpen: isOpenDownloadReportModal,
	} = useDisclosure();

	useEffect(() => {
		setLoading(true);
		setCustomers(getCustomers(individualItems));
		setTotalRecords(individualItems.length);
		setLoading(false);
		setColumns(getColumns(individualItems));
		setVisibleColumns(getColumns(individualItems).slice(0, 8));
	}, [individualItems]);

	const getCustomers = (data) => {
		return [...(data || [])].map((d, index) => {
			const postingDate = new Date(d['Posting Date']);
			const createdDate = new Date(d['Created Date']);
			d['Posting Date'] = postingDate.toLocaleDateString('en-US');
			d['Created Date'] = createdDate.toLocaleDateString('en-US');
			return { ...d, id: index }; // Ensure each row has a unique 'id' key
		});
	};

	const getColumns = (data) => {
		if (!data || data.length === 0) {
			return [];
		}

		const sampleItem = data[0];
		return Object.keys(sampleItem).map((key) => ({
			field: key,
			header: key,
		}));
	};

	const onColumnToggle = (event) => {
		let selectedColumns = event.value;
		setVisibleColumns(selectedColumns);
	};

	const exportToExcel = () => {
		import('xlsx').then((xlsx) => {
			const worksheet = xlsx.utils.json_to_sheet(customers);
			const workbook = {
				Sheets: { data: worksheet },
				SheetNames: ['data'],
			};
			const excelBuffer = xlsx.write(workbook, {
				bookType: 'xlsx',
				type: 'array',
			});
			saveAs(
				new Blob([excelBuffer], {
					type: 'application/octet-stream',
				}),
				'customers.xlsx'
			);
		});
	};

	const handleColumnFilterConditionChange = (field, condition) => {
		condition = String(condition);
		setColumnFilters((prevFilters) => ({
			...prevFilters,
			[field]: {
				...prevFilters[field],
				condition,
			},
		}));
	};

	const handleColumnFilterValueChange = (field, value) => {
		let type = typeof value;
		if (type === 'object' && value instanceof Date) {
			type = 'date';
		} else if (type === 'number') {
			type = 'integer';
		} else {
			type = 'string';
		}

		if (type === 'string' || type === 'integer') {
			value = value.trim();
		}

		setColumnFilters((prevFilters) => ({
			...prevFilters,
			[field]: {
				...prevFilters[field],
				value,
				column: field,
				type,
			},
		}));
	};

	const getFilteredCustomers = () => {
		let filteredData = customers;

		// Apply global filter
		filteredData = filteredData.filter((customer) =>
			Object.values(customer).some(
				(value) =>
					typeof value === 'string' &&
					value
						.toLowerCase()
						.includes(globalFilterValue.toLowerCase())
			)
		);

		return filteredData;
	};

	const excludedKeys = [];
	const columnFiltersArray = Object.keys(columnFilters)
		.filter((key) => !excludedKeys.includes(key))
		.map((key) => columnFilters[key]);

	const renderHeader = () => {
		return (
			<Box
				display='flex'
				justifyContent='space-between'
				alignItems='center'>
				<Box
					display='flex'
					gap='15px'
					sx={{
						'& .p-button-outlined': {
							color: 'mainBlue',
							padding: '5px 10px',
							fontSize: '14px',
							border: '1px solid #003060',
						},
					}}>
					<Box
						border='1px solid var(--chakra-colors-borderGrayLight)'
						borderRadius='5px'
						className='demo'>
						<MultiSelect
							value={visibleColumns}
							options={columns}
							optionLabel='header'
							onChange={onColumnToggle}
							className='w-full sm:w-20rem'
							display='chip'
						/>
					</Box>
				</Box>

				<Box display='flex' alignItems='center' gap='15px'>
					<Box
						as='span'
						border='1px solid var(--chakra-colors-borderGrayLight)'
						borderRadius='5px'
						position='relative'
						sx={{
							'& .pi.pi-search': {
								position: 'absolute',
								right: '10px',
								top: '50%',
								transform: 'translateY(-50%)',
							},
							'& .search_input': {
								padding: '7px',
							},
						}}>
						<i className='pi pi-search' />
						<InputText
							className='search_input'
							value={globalFilterValue}
							onChange={onGlobalFilterChange}
							placeholder='Keyword Search'
						/>
					</Box>
					<Menu>
						<MenuButton
							color='#718296'
							padding='7px 10px'
							fontSize='14px'
							borderRadius='5px'
							border='1px solid #dee2e6'
							_hover={{
								bg: 'rgb(0, 48, 96)',
								color: '#ffffff',
								borderRadius: '5px',
							}}>
							<DownloadIcon w='20px' h='15px' /> Download Report
						</MenuButton>
						<MenuList>
							<MenuItem
								onClick={exportToExcel}
								fontSize='13px'
								fontWeight='600'
								height='35px'>
								<Box minW='25px'>
									<FontAwesomeIcon icon={faFileExcel} />
								</Box>
								<Box as='span'>Download Table Report</Box>
							</MenuItem>
							<MenuItem
								fontSize='13px'
								fontWeight='600'
								height='35px'
								onClick={onOpenDownloadReportModal}>
								<Box minW='25px'>
									<FontAwesomeIcon icon={faFileExcel} />
								</Box>
								<Box as='span'>Download Report By Date</Box>
							</MenuItem>
							<Modal
								isCentered
								size='xl'
								isOpen={isOpenDownloadReportModal}
								onClose={onCloseDownloadReportModal}>
								<ModalOverlay />
								<ModalContent>
									<ModalHeader
										bg='var(--chakra-colors-mainBlue)'
										color='white'
										mb='10px'
										fontSize='15px'
										fontWeight='500'
										padding='15px 15px'>
										Download Report by Date Range
									</ModalHeader>
									<ModalCloseButton
										color='white'
										size='lg'
										mt='8px'
									/>
									<ModalBody>
										<Box
											display='flex'
											flexDirection='column'
											sx={{
												'& .p-calendar': {
													border: '1px solid #ccc',
													width: '100%',
													borderRadius: '5px',
												},
												'& .p-calendar input': {
													height: '30px',
												},
											}}>
											<Text
												fontWeight='600'
												mb='5px'
												fontSize='14px'>
												Select Your Date - Range
											</Text>
											<Calendar
												value={dates}
												onChange={(e) =>
													setDates(e.value)
												}
												selectionMode='range'
												readOnlyInput
												hideOnRangeSelection
											/>
										</Box>
									</ModalBody>

									<ModalFooter>
										<Button
											colorScheme='blue'
											mr={3}
											onClick={
												onCloseDownloadReportModal
											}>
											Close
										</Button>
										<Button variant='ghost'>
											Secondary Action
										</Button>
									</ModalFooter>
								</ModalContent>
							</Modal>
						</MenuList>
					</Menu>

					<Box
						sx={{
							'& button': {
								color: '#718296',
								padding: '7px 10px',
								fontSize: '14px',
								border: '1px solid #dee2e6',
							},
							'& button:hover': {
								bg: 'rgb(0, 48, 96)',
								borderRadius: '5px',
							},
							'& button:hover span': {
								color: 'white',
							},
						}}>
						<Button
							type='button'
							icon='pi pi-filter-slash'
							label='Clear'
							outlined
							onClick={clearFilter}
							_hover={{
								color: 'white',
							}}
						/>
					</Box>
					<Box
						sx={{
							'& button': {
								color: '#718296',
								padding: '7px 10px',
								fontSize: '14px',
								border: '1px solid #dee2e6',
							},
							'& button:hover': {
								bg: 'rgb(0, 48, 96)',
								borderRadius: '5px',
							},
							'& button:hover span': {
								color: 'white',
							},
						}}>
						<Button
							type='button'
							icon='pi pi-filter'
							label='Filter'
							outlined
							onClick={onOpenFilterModal}
							_hover={{
								color: 'white',
							}}
						/>
						<Drawer
							isOpen={isOpenFilterModal}
							placement='right'
							onClose={onCloseFilterModal}
							size='xl'>
							<DrawerOverlay />
							<DrawerContent>
								<DrawerCloseButton
									color='white'
									size='lg'
									mt='8px'
								/>
								<DrawerHeader
									bg='var(--chakra-colors-mainBlue)'
									color='white'
									mb='10px'
									fontSize='17px'
									fontWeight='500'
									padding='15px 15px'>
									Filter Table Report by Column
								</DrawerHeader>

								<DrawerBody>
									{visibleColumns.map((column) => (
										<Box key={column.field}>
											<Text
												color='var(--chakra-colors-textBlack)'
												fontWeight='600'
												fontSize='14px'
												mt='15px'
												mb='5px'>
												{column.header
													.split('_') // Split by underscore
													.map((word) =>
														word
															.split(/(?=[A-Z])/) // Split camel case
															.map(
																(w) =>
																	w
																		.charAt(
																			0
																		)
																		.toUpperCase() +
																	w.slice(1)
															)
															.join(' ')
													)
													.join(' ')}
											</Text>
											<Box display='flex' gap='15px'>
												<Select
													placeholder='Select option'
													size='lg'
													fontSize='14px'
													h='35px'
													value={
														columnFilters[
															column.field
														]?.condition || ''
													}
													onChange={(e) =>
														handleColumnFilterConditionChange(
															column.field,
															e.target.value
														)
													}>
													<option value='like'>
														Contain
													</option>
													<option value='notLike'>
														Not Contain
													</option>
													<option value='greaterThan'>
														Greater Than
													</option>
													<option value='greaterThanOrEqual'>
														Greater Than or Equal
													</option>
													<option value='lessThan'>
														Less Than
													</option>
													<option value='lessThanOrEqual'>
														Less Than or Equal
													</option>
													<option value='between'>
														Between
													</option>
												</Select>
												<Input
													h='35px'
													fontSize='14px'
													padding='10px 10px'
													value={
														columnFilters[
															column.field
														]?.value || ''
													}
													onChange={(e) =>
														handleColumnFilterValueChange(
															column.field,
															e.target.value
														)
													}
													placeholder={`Filter ${column.header}`}
												/>
											</Box>
										</Box>
									))}
								</DrawerBody>

								<DrawerFooter padding='15px 25px'>
									<ChakraButton
										mr={3}
										padding='15px'
										fontSize='13px'
										bg='var(--chakra-colors-mainBlue)'
										color='white'
										onClick={onCloseFilterModal}>
										Cancel
									</ChakraButton>
									<ChakraButton
										padding='15px'
										fontSize='13px'
										bg='var(--chakra-colors-mainBlue)'
										color='white'>
										Save
									</ChakraButton>
								</DrawerFooter>
							</DrawerContent>
						</Drawer>
					</Box>
					<Link to='/reports/sales-product-wise/graph-view'>
						<Box
							sx={{
								'& button': {
									color: '#718296',
									padding: '7px 10px',
									fontSize: '14px',
									border: '1px solid #dee2e6',
								},
								'& button:hover': {
									bg: 'rgb(0, 48, 96)',
									borderRadius: '5px',
								},
								'& button:hover span': {
									color: 'white',
								},
							}}>
							<Button
								type='button'
								icon='pi pi-chart-bar'
								label='Graph View'
								outlined
								_hover={{
									color: 'white',
								}}
							/>
						</Box>
					</Link>
				</Box>
			</Box>
		);
	};

	const clearFilter = () => {
		setGlobalFilterValue('');
	};

	const onGlobalFilterChange = (e) => {
		setGlobalFilterValue(e.target.value);
		dataTable.current.filter(e.target.value, 'contains');
	};

	const loadCarsLazy = (event) => {
		if (!individualItems) return;
		const { first } = event;
		setFirst(first);
		const remainingRows = totalRecords - first;
		const loadMoreRows = Math.min(remainingRows, 20);
		setRows(loadMoreRows);
		setLazyLoading(true);
		setTimeout(() => {
			setLazyLoading(false);
		}, Math.random() * 1000 + 100);
	};

	const loadingTemplate = (options) => {
		return (
			<div
				className='flex align-items-center'
				style={{
					height: '17px',
					flexGrow: '1',
					overflow: 'hidden',
					justifyContent: 'center',
				}}>
				<Skeleton
					width={
						options.cellEven
							? options.field === 'year'
								? '30%'
								: '40%'
							: '60%'
					}
					height='1rem'
				/>
			</div>
		);
	};

	return (
		<CssWrapper>
			<Box
				className='card'
				background='var(--chakra-colors-white)'
				style={{ width: '100%', overflowX: 'auto' }}>
				<DataTable
					ref={dataTable}
					value={getFilteredCustomers()}
					first={first}
					rows={rows}
					loading={loading}
					// dataKey='id'
					header={renderHeader()}
					scrollable
					virtualScrollerOptions={{
						lazy: true,
						onLazyLoad: loadCarsLazy,
						itemSize: 100,
						delay: 200,
						showLoader: true,
						loading: lazyLoading,
						loadingTemplate,
					}}
					tableStyle={{ minWidth: '50rem' }}
					emptyMessage='No customers found.'
					globalFilter={globalFilterValue}>
					{visibleColumns.map((col) => (
						<Column
							key={col.field}
							field={col.field}
							header={col.header.toUpperCase()}
							sortable
							style={{
								minWidth: '150px',
							}}
						/>
					))}
				</DataTable>
			</Box>
		</CssWrapper>
	);
};

export default CustomTable;
