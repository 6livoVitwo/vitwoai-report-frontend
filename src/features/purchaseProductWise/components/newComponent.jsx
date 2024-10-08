import React, {
	useState,
	useEffect,
	useMemo,
	useCallback,
	useRef,
} from 'react';
import {
	Box,
	Button,
	useDisclosure,
	Table,
	Thead,
	Tbody,
	Tr,
	Th,
	Td,
	TableCaption,
	TableContainer,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	Checkbox,
	Input,
	Text,
	Tooltip,
	Spinner,
} from '@chakra-ui/react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { DragHandleIcon } from '@chakra-ui/icons';
import debounce from 'lodash/debounce';

const CustomTable = ({ setFirst, individualItems }) => {
	const [data, setData] = useState([]);
	const [page, setPage] = useState(1);
	const [loading, setLoading] = useState(false);
	const [defaultColumns, setDefaultColumns] = useState([]);
	const [selectedColumns, setSelectedColumns] = useState([]);
	const [searchQuery, setSearchQuery] = useState('');
	const { isOpen, onOpen, onClose } = useDisclosure();
	const observer = useRef();

	// Mock data fetching function
	const fetchMockData = async (page) => {
		setFirst(page);
		// Simulate an API call
		return new Promise((resolve) => {
			setTimeout(() => {
				const data = Array.from({ length: 20 }, (_, i) => ({
					id: i + (page - 1) * 20,
					name: `Item ${(page - 1) * 20 + i + 1}`,
					description: `Description ${(page - 1) * 20 + i + 1}`,
				}));
				resolve(data);
			}, 1000);
		});
	};

	const loadMoreData = async () => {
		setLoading(true);
		const newData = await fetchMockData(page);
		setData((prevData) => [...prevData, ...newData]);
		setPage((prevPage) => prevPage + 1);
		setLoading(false);
	};

	useEffect(() => {
		loadMoreData();
	}, []);

	useEffect(() => {
		const initialColumns = getColumns(data)
			.slice(0, 8)
			.map((column) => column.field);
		setDefaultColumns(initialColumns);
		setSelectedColumns(initialColumns);
	}, [data]);

	const getColumns = useCallback((data) => {
		if (!data || data.length === 0) {
			return [];
		}
		const sampleItem = data[0];
		return Object.keys(sampleItem).map((key) => ({
			field: key,
			header: key,
		}));
	}, []);

	const handleDragEnd = (result) => {
		if (!result.destination) {
			return;
		}
		const newColumnsOrder = Array.from(selectedColumns);
		const [removed] = newColumnsOrder.splice(result.source.index, 1);
		newColumnsOrder.splice(result.destination.index, 0, removed);
		setSelectedColumns(newColumnsOrder);
	};

	const toggleColumn = (columnName) => {
		setSelectedColumns((prevSelectedColumns) =>
			prevSelectedColumns.includes(columnName)
				? prevSelectedColumns.filter((col) => col !== columnName)
				: [...prevSelectedColumns, columnName]
		);
	};

	const handleModalClose = () => {
		setSelectedColumns(defaultColumns);
		onClose();
	};

	const handleApplyChanges = () => {
		onClose();
	};

	const debouncedSearchQuery = useMemo(
		() => debounce(setSearchQuery, 300),
		[]
	);

	useEffect(() => {
		return () => {
			debouncedSearchQuery.cancel();
		};
	}, [debouncedSearchQuery]);

	const handleSearchChange = (e) => {
		debouncedSearchQuery(e.target.value);
	};

	const filteredItems = useMemo(() => {
		return data.filter((item) => {
			const values = Object.values(item);
			return values.some((value) =>
				String(value).toLowerCase().includes(searchQuery.toLowerCase())
			);
		});
	}, [data, searchQuery]);

	const formatHeader = (header) => {
		return header
			.split('_')
			.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
			.join(' ')
			.replace(/([a-z])([A-Z])/g, '$1 $2');
	};

	const lastItemRef = useCallback(
		(node) => {
			if (loading) return;
			if (observer.current) observer.current.disconnect();
			observer.current = new IntersectionObserver((entries) => {
				if (entries[0].isIntersecting) {
					loadMoreData();
				}
			});
			if (node) observer.current.observe(node);
		},
		[loading]
	);

	return (
		<>
			<Box
				display='flex'
				alignItems='center'
				justifyContent='space-between'
				bg='var(--chakra-colors-mainBlue)'
				padding='7px'>
				<Input
					width='25%'
					bg='white'
					padding='15px'
					placeholder='Search...'
					onChange={handleSearchChange}
				/>
				<Button
					onClick={onOpen}
					bg='transparent'
					_hover={{
						bg: 'transparent',
					}}>
					<DragHandleIcon w={8} h={8} color='white' />
				</Button>
			</Box>

			<Box
				padding='10px'
				background='var(--chakra-colors-white)'
				style={{ width: '100%', overflowX: 'auto' }}
				height='calc(100vh - 160px)'>
				<DragDropContext onDragEnd={handleDragEnd}>
					<Droppable droppableId='columns' direction='horizontal'>
						{(provided) => (
							<TableContainer ref={provided.innerRef}>
								<Table variant='simple' width='100%'>
									<TableCaption>
										Imperial to metric conversion factors
									</TableCaption>
									<Thead>
										<Tr>
											{selectedColumns.map(
												(columnName, index) => {
													const column = getColumns(
														data
													).find(
														(col) =>
															col.field ===
															columnName
													);
													const formattedHeader =
														formatHeader(
															column.header
														);
													return (
														<Draggable
															key={columnName}
															draggableId={
																columnName
															}
															index={index}>
															{(provided) => (
																<Th
																	{...provided.draggableProps}
																	{...provided.dragHandleProps}
																	ref={
																		provided.innerRef
																	}
																	padding='15px'
																	fontSize='13px'>
																	{
																		formattedHeader
																	}
																</Th>
															)}
														</Draggable>
													);
												}
											)}
										</Tr>
									</Thead>
									<Tbody>
										{filteredItems.map((item, rowIndex) => (
											<Tr
												key={rowIndex}
												alignItems='flex-start'>
												{selectedColumns.map(
													(columnName, colIndex) => (
														<Td
															key={columnName}
															padding='15px'
															ref={
																rowIndex ===
																	filteredItems.length -
																		1 &&
																colIndex ===
																	selectedColumns.length -
																		1
																	? lastItemRef
																	: null
															}>
															<Tooltip
																hasArrow
																label={
																	item[
																		columnName
																	]
																}>
																<Text
																	fontSize='13px'
																	whiteSpace='nowrap'
																	width={
																		columnName ===
																		'description'
																			? '300px'
																			: columnName ===
																			  'name'
																			? '200px'
																			: '100px'
																	}
																	overflow='hidden'
																	textOverflow='ellipsis'>
																	{
																		item[
																			columnName
																		]
																	}
																</Text>
															</Tooltip>
														</Td>
													)
												)}
											</Tr>
										))}
									</Tbody>
								</Table>
								{provided.placeholder}
							</TableContainer>
						)}
					</Droppable>
				</DragDropContext>

				{loading && (
					<Box
						display='flex'
						alignItems='center'
						justifyContent='center'
						py={4}>
						<Spinner color='blue.500' />
					</Box>
				)}

				<Modal
					isOpen={isOpen}
					onClose={handleModalClose}
					size='xl'
					isCentered>
					<ModalOverlay />
					<ModalContent>
						<ModalHeader fontSize='20px' fontWeight='600'>
							Select Columns to Show
						</ModalHeader>
						<ModalCloseButton />
						<ModalBody>
							<Box
								height='60vh'
								overflowY='scroll'
								overflowX='hidden'>
								{getColumns(data).map((column) => (
									<Checkbox
										size='lg'
										display='flex'
										padding='5px'
										key={column.field}
										defaultChecked={selectedColumns.includes(
											column.field
										)}
										onChange={() =>
											toggleColumn(column.field)
										}>
										<Text
											fontWeight='500'
											ml='10px'
											fontSize='14px'>
											{column.header}
										</Text>
									</Checkbox>
								))}
							</Box>
						</ModalBody>
						<ModalFooter>
							<Button
								colorScheme='blue'
								mr={3}
								onClick={handleApplyChanges}>
								Apply Changes
							</Button>
							<Button onClick={handleModalClose}>Cancel</Button>
						</ModalFooter>
					</ModalContent>
				</Modal>
			</Box>
		</>
	);
};

export default CustomTable;
