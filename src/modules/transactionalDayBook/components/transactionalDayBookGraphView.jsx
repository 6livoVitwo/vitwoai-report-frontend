

import React, { useState } from 'react';
import {
	Box,
	Button,
	Heading,
	Icon,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Select,
	Text,
	useDisclosure,
} from '@chakra-ui/react';
import TransactionalDayBookChart from './transactionalDayBookChart';
import ChartDrawer from './chartDrawer';
import { useSelector } from 'react-redux';
import { jwtDecode } from 'jwt-decode';
import TransactionalDayBookChart01 from './transactionalDayBookChart01';
import { MdSettings } from 'react-icons/md';

const TransactionalDayBookGraphView = () => {
	const authData = useSelector((state) => state.auth);
	const decoded = jwtDecode(authData.authDetails);
	const [selectedKey, setSelectedKey] = useState('');
	const [selectedValue, setSelectedValue] = useState('');
	const { isOpen, onOpen, onClose } = useDisclosure();

	const data = [
		{
			id: 'graph1',
			name: 'XY Graph',
			type: 'xy',
			chartUi: 'line',
			chartData: [
				{
					shop: 'Shop 1',
					shopNo: 80,
					due: 250,
					city: 'Dhaka',
					revenue: 3000,
					profit: 2000,
					loss: 500,
					balance: 1000,
					item: 'Item 1',
					stock: 1000,
					qty: 425,
					price: 1500,
					sale: 2000,
				},
				{
					shop: 'Shop 2',
					shopNo: 100,
					due: 280,
					city: 'Chattogram',
					revenue: 4000,
					profit: 3000,
					loss: 8000,
					balance: 1500,
					item: 'Item 2',
					stock: 1500,
					qty: 825,
					price: 2000,
					sale: 3000,
				}
			],
		},
		{
			id: 'graph2',
			name: 'Circle Graph',
			type: 'circle',
			chartUi: 'bar',
			chartData: [
				{
					shop: 'Shop 1',
					shopNo: 80,
					due: 250,
					city: 'Dhaka',
					revenue: 3000,
					profit: 2000,
					loss: 500,
					balance: 1000,
					item: 'Item 1',
					stock: 1000,
					qty: 425,
					price: 1500,
					sale: 2000,
				},
				{
					shop: 'Shop 2',
					shopNo: 100,
					due: 280,
					city: 'Chattogram',
					revenue: 4000,
					profit: 3000,
					loss: 8000,
					balance: 1500,
					item: 'Item 2',
					stock: 1500,
					qty: 825,
					price: 2000,
					sale: 3000,
				}
			],
			so_invoice_id: 10,
			company_id: 1,
			branch_id: 1,
			location_id: 1,
			customer_id: 1,
			pgi_journal_id: 4,
			journal_id: 5,
			pgi_id: 0,
			so_number: null,
			delivery_no: null,
			pgi_no: null,
			invoice_no: 'INV-0000000010',
			invoice_no_serialized:
				'a:2:{s:6:"prefix";s:3:"INV";s:6:"serial";s:10:"0000000010";}',
			invoice_date: '2023-10-15',
			invoice_time: '23:45',
			conversion_rate: 1.0,
			currency_id: '2',
			currency_name: 'INR',
			inv_variant_id: null,
			varient_array: null,
			po_date: null,
			po_number: null,
			profit_center: '1',
			credit_period: '45',
			kamId: 1,
			totalItems: 2,
			igst: 2297.64,
			sgst: 0.0,
			cgst: 0.0,
			totalDiscount: 0.0,
			total_tax_amt: 2297.64,
			sub_total_amt: 19147.0,
			all_total_amt: 21444.64,
			due_amount: 0.0,
			adjusted_amount: 0.0,
			invoiceStatus: '4',
			customerDetails:
				'a:19:{s:10:"parentGlId";s:2:"88";s:12:"customer_pan";s:10:"AABCM8839K";s:14:"customer_gstin";s:15:"33AABCM8839K1Z4";s:13:"customer_name";s:16:"Mindtree Limited";s:13:"customer_code";s:8:"52300001";s:24:"constitution_of_business";s:22:"Public Limited Company";s:24:"customer_opening_balance";s:4:"0.00";s:17:"customer_currency";s:1:"2";s:16:"customer_website";N;s:22:"customer_credit_period";s:2:"45";s:16:"customer_picture";N;s:31:"customer_authorised_person_name";s:12:"Nene Agarwal";s:32:"customer_authorised_person_email";s:20:"salim.lab3@gmail.com";s:29:"customer_authorised_alt_email";s:0:"";s:32:"customer_authorised_person_phone";s:10:"9836813031";s:29:"customer_authorised_alt_phone";s:10:"9836813031";s:38:"customer_authorised_person_designation";s:7:"Manager";s:16:"customer_profile";s:10:"unverified";s:15:"customer_status";s:6:"active";}',
			customer_gstin: '33AABCM8839K1Z4',
			customer_billing_address:
				'Hardy block, 5th Floor, Rajiv Gandhi salai, 600113, Taramani, Taramani, Chennai, Tamil Nadu',
			customer_shipping_address:
				'Hardy block, 5th Floor, Rajiv Gandhi salai, 600113, Taramani, Taramani, Chennai, Tamil Nadu',
			billing_address_id: 1,
			shipping_address_id: 1,
			shipToLastInsertedId: 0,
			company_bank_details:
				'a:5:{s:9:"bank_name";s:10:"ICICI Bank";s:9:"ifsc_code";s:11:"ICIC0000006";s:10:"account_no";s:12:"356245875596";s:19:"account_holder_name";s:22:"SAREGAMA INDIA LIMITED";s:12:"bank_address";s:60:"ICICI Bank Ltd., 22, Sir R.N. Mukherjee Road, Kolkata.700001";}',
			companyDetails:
				'a:21:{s:15:"company_website";N;s:12:"company_name";s:22:"SAREGAMA INDIA LIMITED";s:11:"company_pan";s:10:"AAACT9815B";s:11:"company_cin";s:0:"";s:11:"company_tan";s:0:"";s:16:"company_currency";s:1:"2";s:12:"company_logo";s:0:"";s:9:"signature";N;s:14:"company_footer";s:0:"";s:12:"companyEmail";s:14:"salim@vitwo.in";s:12:"companyPhone";s:10:"7339005453";s:11:"branch_name";s:7:"8231001";s:12:"branch_gstin";s:15:"29AAACT9815B1ZC";s:20:"location_building_no";s:4:"No-8";s:16:"location_flat_no";s:10:"Shed No-31";s:20:"location_street_name";s:22:"18 KM, Old Madras Road";s:17:"location_pin_code";s:6:"560049";s:8:"location";s:16:"Virgo Nagar Post";s:13:"location_city";s:9:"Karnataka";s:17:"location_district";s:15:"Bengaluru Urban";s:14:"location_state";s:0:"";}',
			companyConfigId: null,
			company_gstin: '29AAACT9815B1ZC',
			mailStatus: 1,
			compInvoiceType: 'R',
			placeOfSupply: '01',
			reverseCharge: 'N',
			type: 'direct',
			compFileDate: null,
			declaration_note: 'test',
			remarks: 'test',
			customerType: null,
			created_at: '2023-10-15 23:46:50',
			created_by: '5|location',
			updated_at: '2023-10-27 22:33:55',
			updated_by: '5|location',
			status: 'active',
		},
		{
			so_invoice_id: 19,
			company_id: 1,
			branch_id: 1,
			location_id: 1,
			customer_id: 1,
			pgi_journal_id: 6,
			journal_id: 7,
			pgi_id: 0,
			so_number: null,
			delivery_no: null,
			pgi_no: null,
			invoice_no: 'INV-0000000019',
			invoice_no_serialized:
				'a:2:{s:6:"prefix";s:3:"INV";s:6:"serial";s:10:"0000000019";}',
			invoice_date: '2023-10-15',
			invoice_time: '23:47',
			conversion_rate: 1.0,
			currency_id: '2',
			currency_name: 'INR',
			inv_variant_id: null,
			varient_array: null,
			po_date: null,
			po_number: null,
			profit_center: '1',
			credit_period: '45',
			kamId: 1,
			totalItems: 2,
			igst: 2069.76,
			sgst: 0.0,
			cgst: 0.0,
			totalDiscount: 0.0,
			total_tax_amt: 2069.76,
			sub_total_amt: 17248.0,
			all_total_amt: 19317.76,
			due_amount: 19316.76,
			adjusted_amount: 0.0,
			invoiceStatus: '2',
			customerDetails:
				'a:19:{s:10:"parentGlId";s:2:"88";s:12:"customer_pan";s:10:"AABCM8839K";s:14:"customer_gstin";s:15:"33AABCM8839K1Z4";s:13:"customer_name";s:16:"Mindtree Limited";s:13:"customer_code";s:8:"52300001";s:24:"constitution_of_business";s:22:"Public Limited Company";s:24:"customer_opening_balance";s:4:"0.00";s:17:"customer_currency";s:1:"2";s:16:"customer_website";N;s:22:"customer_credit_period";s:2:"45";s:16:"customer_picture";N;s:31:"customer_authorised_person_name";s:12:"Nene Agarwal";s:32:"customer_authorised_person_email";s:20:"salim.lab3@gmail.com";s:29:"customer_authorised_alt_email";s:0:"";s:32:"customer_authorised_person_phone";s:10:"9836813031";s:29:"customer_authorised_alt_phone";s:10:"9836813031";s:38:"customer_authorised_person_designation";s:7:"Manager";s:16:"customer_profile";s:10:"unverified";s:15:"customer_status";s:6:"active";}',
			customer_gstin: '33AABCM8839K1Z4',
			customer_billing_address:
				'Hardy block, 5th Floor, Rajiv Gandhi salai, 600113, Taramani, Taramani, Chennai, Tamil Nadu',
			customer_shipping_address:
				'Hardy block, 5th Floor, Rajiv Gandhi salai, 600113, Taramani, Taramani, Chennai, Tamil Nadu',
			billing_address_id: 1,
			shipping_address_id: 1,
			shipToLastInsertedId: 0,
			company_bank_details:
				'a:5:{s:9:"bank_name";s:10:"ICICI Bank";s:9:"ifsc_code";s:11:"ICIC0000006";s:10:"account_no";s:12:"356245875596";s:19:"account_holder_name";s:22:"SAREGAMA INDIA LIMITED";s:12:"bank_address";s:60:"ICICI Bank Ltd., 22, Sir R.N. Mukherjee Road, Kolkata.700001";}',
			companyDetails:
				'a:21:{s:15:"company_website";N;s:12:"company_name";s:22:"SAREGAMA INDIA LIMITED";s:11:"company_pan";s:10:"AAACT9815B";s:11:"company_cin";s:0:"";s:11:"company_tan";s:0:"";s:16:"company_currency";s:1:"2";s:12:"company_logo";s:0:"";s:9:"signature";N;s:14:"company_footer";s:0:"";s:12:"companyEmail";s:14:"salim@vitwo.in";s:12:"companyPhone";s:10:"7339005453";s:11:"branch_name";s:7:"8231001";s:12:"branch_gstin";s:15:"29AAACT9815B1ZC";s:20:"location_building_no";s:4:"No-8";s:16:"location_flat_no";s:10:"Shed No-31";s:20:"location_street_name";s:22:"18 KM, Old Madras Road";s:17:"location_pin_code";s:6:"560049";s:8:"location";s:16:"Virgo Nagar Post";s:13:"location_city";s:9:"Karnataka";s:17:"location_district";s:15:"Bengaluru Urban";s:14:"location_state";s:0:"";}',
			companyConfigId: null,
			company_gstin: '29AAACT9815B1ZC',
			mailStatus: 1,
			compInvoiceType: 'R',
			placeOfSupply: '01',
			reverseCharge: 'N',
			type: 'direct',
			compFileDate: null,
			declaration_note: '',
			remarks: '',
			customerType: null,
			created_at: '2023-10-16 00:05:30',
			created_by: '5|location',
			updated_at: '2024-01-23 16:46:28',
			updated_by: '5|location',
			status: 'active',
		},
		{
			so_invoice_id: 20,
			company_id: 1,
			branch_id: 1,
			location_id: 1,
			customer_id: 4,
			pgi_journal_id: 8,
			journal_id: 9,
			pgi_id: 0,
			so_number: null,
			delivery_no: null,
			pgi_no: null,
			invoice_no: 'INV-0000000020',
			invoice_no_serialized:
				'a:2:{s:6:"prefix";s:3:"INV";s:6:"serial";s:10:"0000000020";}',
			invoice_date: '2023-10-16',
			invoice_time: '12:26',
			conversion_rate: 1.797053,
			currency_id: '40',
			currency_name: 'JPY',
			inv_variant_id: null,
			varient_array: null,
			po_date: null,
			po_number: null,
			profit_center: '1',
			credit_period: '10',
			kamId: 3,
			totalItems: 2,
			igst: 466.62,
			sgst: 0.0,
			cgst: 0.0,
			totalDiscount: 0.0,
			total_tax_amt: 466.62,
			sub_total_amt: 3489.0,
			all_total_amt: 3955.62,
			due_amount: 3955.62,
			adjusted_amount: 0.0,
			invoiceStatus: '1',
			customerDetails:
				'a:19:{s:10:"parentGlId";s:2:"88";s:12:"customer_pan";s:10:"AAACL0140P";s:14:"customer_gstin";s:0:"";s:13:"customer_name";s:12:"Emran Hashmi";s:13:"customer_code";s:8:"52300004";s:24:"constitution_of_business";s:12:"Emran Hashmi";s:24:"customer_opening_balance";s:4:"0.00";s:17:"customer_currency";s:1:"2";s:16:"customer_website";N;s:22:"customer_credit_period";s:2:"10";s:16:"customer_picture";N;s:31:"customer_authorised_person_name";s:13:"Emraan Hashmi";s:32:"customer_authorised_person_email";s:14:"imran@vitwo.in";s:29:"customer_authorised_alt_email";s:0:"";s:32:"customer_authorised_person_phone";s:10:"7059746613";s:29:"customer_authorised_alt_phone";s:0:"";s:38:"customer_authorised_person_designation";s:21:"Application Developer";s:16:"customer_profile";s:10:"unverified";s:15:"customer_status";s:6:"active";}',
			customer_gstin: '',
			customer_billing_address:
				'12, Floor-1, Raja rath , 700156, Kolkata, new town, KOLKATA, Andaman and Nicobar Islands',
			customer_shipping_address:
				'12, Floor-1, Raja rath , 700156, Kolkata, new town, KOLKATA, Andaman and Nicobar Islands',
			billing_address_id: 4,
			shipping_address_id: 4,
			shipToLastInsertedId: 0,
			company_bank_details:
				'a:5:{s:9:"bank_name";s:10:"ICICI Bank";s:9:"ifsc_code";s:11:"ICIC0000006";s:10:"account_no";s:12:"356245875596";s:19:"account_holder_name";s:22:"SAREGAMA INDIA LIMITED";s:12:"bank_address";s:60:"ICICI Bank Ltd., 22, Sir R.N. Mukherjee Road, Kolkata.700001";}',
			companyDetails:
				'a:21:{s:15:"company_website";N;s:12:"company_name";s:22:"SAREGAMA INDIA LIMITED";s:11:"company_pan";s:10:"AAACT9815B";s:11:"company_cin";s:0:"";s:11:"company_tan";s:0:"";s:16:"company_currency";s:1:"2";s:12:"company_logo";s:0:"";s:9:"signature";N;s:14:"company_footer";s:0:"";s:12:"companyEmail";s:14:"salim@vitwo.in";s:12:"companyPhone";s:10:"7339005453";s:11:"branch_name";s:7:"8231001";s:12:"branch_gstin";s:15:"29AAACT9815B1ZC";s:20:"location_building_no";s:4:"No-8";s:16:"location_flat_no";s:10:"Shed No-31";s:20:"location_street_name";s:22:"18 KM, Old Madras Road";s:17:"location_pin_code";s:6:"560049";s:8:"location";s:16:"Virgo Nagar Post";s:13:"location_city";s:9:"Karnataka";s:17:"location_district";s:15:"Bengaluru Urban";s:14:"location_state";s:0:"";}',
			companyConfigId: null,
			company_gstin: '29AAACT9815B1ZC',
			mailStatus: 1,
			compInvoiceType: 'R',
			placeOfSupply: '19',
			reverseCharge: 'N',
			type: 'direct',
			compFileDate: null,
			declaration_note: 'This is declaration note',
			remarks: 'This is remark',
			customerType: null,
			created_at: '2023-10-16 12:34:36',
			created_by: '9|location',
			updated_at: '2023-10-16 12:34:38',
			updated_by: '9|location',
			status: 'active',
		},
		{
			so_invoice_id: 21,
			company_id: 1,
			branch_id: 1,
			location_id: 1,
			customer_id: 1,
			pgi_journal_id: 10,
			journal_id: 11,
			pgi_id: 0,
			so_number: null,
			delivery_no: null,
			pgi_no: null,
			invoice_no: 'INV-0000000021',
			invoice_no_serialized:
				'a:2:{s:6:"prefix";s:3:"INV";s:6:"serial";s:10:"0000000021";}',
			invoice_date: '2023-10-16',
			invoice_time: '14:18',
			conversion_rate: 1.0,
			currency_id: '2',
			currency_name: 'INR',
			inv_variant_id: null,
			varient_array: null,
			po_date: null,
			po_number: null,
			profit_center: '4',
			credit_period: '45',
			kamId: 1,
			totalItems: 1,
			igst: 719.1,
			sgst: 0.0,
			cgst: 0.0,
			totalDiscount: 0.0,
			total_tax_amt: 719.1,
			sub_total_amt: 3995.0,
			all_total_amt: 4714.1,
			due_amount: 0.0,
			adjusted_amount: 0.0,
			invoiceStatus: '4',
			customerDetails:
				'a:19:{s:10:"parentGlId";s:2:"88";s:12:"customer_pan";s:10:"AABCM8839K";s:14:"customer_gstin";s:15:"33AABCM8839K1Z4";s:13:"customer_name";s:16:"Mindtree Limited";s:13:"customer_code";s:8:"52300001";s:24:"constitution_of_business";s:22:"Public Limited Company";s:24:"customer_opening_balance";s:4:"0.00";s:17:"customer_currency";s:1:"2";s:16:"customer_website";N;s:22:"customer_credit_period";s:2:"45";s:16:"customer_picture";N;s:31:"customer_authorised_person_name";s:12:"Nene Agarwal";s:32:"customer_authorised_person_email";s:20:"salim.lab3@gmail.com";s:29:"customer_authorised_alt_email";s:0:"";s:32:"customer_authorised_person_phone";s:10:"9836813031";s:29:"customer_authorised_alt_phone";s:10:"9836813031";s:38:"customer_authorised_person_designation";s:7:"Manager";s:16:"customer_profile";s:10:"unverified";s:15:"customer_status";s:6:"active";}',
			customer_gstin: '33AABCM8839K1Z4',
			customer_billing_address:
				'Hardy block, 5th Floor, Rajiv Gandhi salai, 600113, Taramani, Taramani, Chennai, Tamil Nadu',
			customer_shipping_address:
				'Hardy block, 5th Floor, Rajiv Gandhi salai, 600113, Taramani, Taramani, Chennai, Tamil Nadu',
			billing_address_id: 1,
			shipping_address_id: 1,
			shipToLastInsertedId: 0,
			company_bank_details:
				'a:5:{s:9:"bank_name";s:10:"ICICI Bank";s:9:"ifsc_code";s:11:"ICIC0000006";s:10:"account_no";s:12:"356245875596";s:19:"account_holder_name";s:22:"SAREGAMA INDIA LIMITED";s:12:"bank_address";s:60:"ICICI Bank Ltd., 22, Sir R.N. Mukherjee Road, Kolkata.700001";}',
			companyDetails:
				'a:21:{s:15:"company_website";N;s:12:"company_name";s:22:"SAREGAMA INDIA LIMITED";s:11:"company_pan";s:10:"AAACT9815B";s:11:"company_cin";s:0:"";s:11:"company_tan";s:0:"";s:16:"company_currency";s:1:"2";s:12:"company_logo";s:0:"";s:9:"signature";N;s:14:"company_footer";s:0:"";s:12:"companyEmail";s:14:"salim@vitwo.in";s:12:"companyPhone";s:10:"7339005453";s:11:"branch_name";s:7:"8231001";s:12:"branch_gstin";s:15:"29AAACT9815B1ZC";s:20:"location_building_no";s:4:"No-8";s:16:"location_flat_no";s:10:"Shed No-31";s:20:"location_street_name";s:22:"18 KM, Old Madras Road";s:17:"location_pin_code";s:6:"560049";s:8:"location";s:16:"Virgo Nagar Post";s:13:"location_city";s:9:"Karnataka";s:17:"location_district";s:15:"Bengaluru Urban";s:14:"location_state";s:0:"";}',
			companyConfigId: null,
			company_gstin: '29AAACT9815B1ZC',
			mailStatus: 2,
			compInvoiceType: 'R',
			placeOfSupply: '01',
			reverseCharge: 'N',
			type: 'direct',
			compFileDate: null,
			declaration_note: '',
			remarks: '',
			customerType: null,
			created_at: '2023-10-16 14:22:07',
			created_by: '5|location',
			updated_at: '2023-10-17 19:23:33',
			updated_by: '5|location',
			status: 'active',
		},
		{
			so_invoice_id: 22,
			company_id: 1,
			branch_id: 1,
			location_id: 1,
			customer_id: 2,
			pgi_journal_id: 0,
			journal_id: 0,
			pgi_id: 0,
			so_number: null,
			delivery_no: null,
			pgi_no: null,
			invoice_no: 'INV-0000000022',
			invoice_no_serialized:
				'a:2:{s:6:"prefix";s:3:"INV";s:6:"serial";s:10:"0000000022";}',
			invoice_date: '2023-06-07',
			invoice_time: '17:23',
			conversion_rate: 1.0,
			currency_id: '2',
			currency_name: 'INR',
			inv_variant_id: null,
			varient_array: null,
			po_date: null,
			po_number: null,
			profit_center: '3',
			credit_period: '15',
			kamId: 2,
			totalItems: 2,
			igst: 1329.24,
			sgst: 0.0,
			cgst: 0.0,
			totalDiscount: 0.0,
			total_tax_amt: 1329.24,
			sub_total_amt: 11077.0,
			all_total_amt: 12406.0,
			due_amount: 0.0,
			adjusted_amount: -0.24,
			invoiceStatus: '4',
			customerDetails:
				'a:19:{s:10:"parentGlId";s:2:"88";s:12:"customer_pan";s:10:"AMHPM1728N";s:14:"customer_gstin";s:15:"18AMHPM1728N1ZM";s:13:"customer_name";s:16:"M/S WYSE SYSTEMS";s:13:"customer_code";s:8:"52300002";s:24:"constitution_of_business";s:14:"Proprietorship";s:24:"customer_opening_balance";s:4:"0.00";s:17:"customer_currency";s:1:"2";s:16:"customer_website";N;s:22:"customer_credit_period";s:2:"15";s:16:"customer_picture";N;s:31:"customer_authorised_person_name";s:14:"Rachhel Sheikh";s:32:"customer_authorised_person_email";s:27:"developer.rachhel@gmail.com";s:29:"customer_authorised_alt_email";s:0:"";s:32:"customer_authorised_person_phone";s:10:"9641356296";s:29:"customer_authorised_alt_phone";s:0:"";s:38:"customer_authorised_person_designation";s:7:"Manager";s:16:"customer_profile";s:10:"unverified";s:15:"customer_status";s:6:"active";}',
			customer_gstin: '18AMHPM1728N1ZM',
			customer_billing_address:
				'331, 1st Floor, Gar Ali, 785001, Jorhat, Jorhat, Jorhat, Assam',
			customer_shipping_address:
				'331, 1st Floor, Gar Ali, 785001, Jorhat, Jorhat, Jorhat, Assam',
			billing_address_id: 2,
			shipping_address_id: 2,
			shipToLastInsertedId: 0,
			company_bank_details:
				'a:5:{s:9:"bank_name";s:10:"ICICI Bank";s:9:"ifsc_code";s:11:"ICIC0000006";s:10:"account_no";s:12:"356245875596";s:19:"account_holder_name";s:22:"SAREGAMA INDIA LIMITED";s:12:"bank_address";s:60:"ICICI Bank Ltd., 22, Sir R.N. Mukherjee Road, Kolkata.700001";}',
			companyDetails:
				'a:21:{s:15:"company_website";N;s:12:"company_name";s:22:"SAREGAMA INDIA LIMITED";s:11:"company_pan";s:10:"AAACT9815B";s:11:"company_cin";s:0:"";s:11:"company_tan";s:0:"";s:16:"company_currency";s:1:"2";s:12:"company_logo";s:0:"";s:9:"signature";N;s:14:"company_footer";s:0:"";s:12:"companyEmail";s:14:"salim@vitwo.in";s:12:"companyPhone";s:10:"7339005453";s:11:"branch_name";s:7:"8231001";s:12:"branch_gstin";s:15:"29AAACT9815B1ZC";s:20:"location_building_no";s:4:"No-8";s:16:"location_flat_no";s:10:"Shed No-31";s:20:"location_street_name";s:22:"18 KM, Old Madras Road";s:17:"location_pin_code";s:6:"560049";s:8:"location";s:16:"Virgo Nagar Post";s:13:"location_city";s:9:"Karnataka";s:17:"location_district";s:15:"Bengaluru Urban";s:14:"location_state";s:0:"";}',
			companyConfigId: null,
			company_gstin: '29AAACT9815B1ZC',
			mailStatus: 2,
			compInvoiceType: 'R',
			placeOfSupply: '18',
			reverseCharge: 'N',
			type: 'direct',
			compFileDate: null,
			declaration_note: 'Dec',
			remarks: 'Rem',
			customerType: null,
			created_at: '2023-10-16 17:27:50',
			created_by: '2|location',
			updated_at: '2024-01-25 18:50:34',
			updated_by: '2|location',
			status: 'active',
		},
		{
			id: 'graph3',
			name: 'Radar Graph',
			type: 'radar',
			chartUi: 'radar',
			chartData: [
				{
					shop: 'Shop 1',
					shopNo: 80,
					due: 250,
					city: 'Dhaka',
					revenue: 3000,
					profit: 2000,
					loss: 500,
					balance: 1000,
					item: 'Item 1',
					stock: 1000,
					qty: 425,
					price: 1500,
					sale: 2000,
				}
			],
		}
	];

	const handleChartView = (chartView) => {
		// setSelectedGraph(chartView);
		onClose();}
	const handleKeyChange = (event) => {
		setSelectedKey(event.target.value);
	};

	const handleValueChange = (event) => {
		setSelectedValue(event.target.value);
	};

	const handleLogSelectedData = () => {
		console.log('Selected Key:', selectedKey);
		console.log('Selected Value:', selectedValue);
	};

	return (
		<Box>
			<Box mb='15px' textAlign='center'>
				<Heading
					textTransform='capitalize'
					color='mainBlue'
					pb='5px'
					fontWeight='700'
					fontSize='22px'>
					{decoded.data.companyName}
				</Heading>
				<Text fontWeight='600' fontSize='13px'>
					Location - {decoded.data.locationName}
				</Text>
			</Box>
			{/* <ChartDrawer graphData={graphData} handleChartView={handleChartView} isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
			<TransactionalDayBookChart chartView={selectedGraph} /> */}
			{/* <Divider my='15px' />
			<TransactionalDayBookChart01 chartView={selectedGraph} />
			<Divider my='15px' /> */}
			<ChartDrawer />
			<Box
				position='relative'
				display='flex'
				justifyContent='center'
				alignItems='center'
				height='calc(100vh - 190px)'>
				<Button
					onClick={onOpen}
					position='absolute'
					top='15px'
					right='0px'
					bg='var(--chakra-colors-mainBlue)'
					color='white'
					fontSize='16px'
					height='30px'>
					<Icon as={MdSettings} />
				</Button>

				<Modal onClose={onClose} isOpen={isOpen} size='xl' isCentered>
					<ModalOverlay />
					<ModalContent>
						<ModalHeader>Modal Title</ModalHeader>
						<ModalCloseButton />
						<ModalBody>
							<Box
								display='flex'
								justifyContent='space-between'
								gap='15px'>
								<Select
									placeholder='Select key'
									value={selectedKey}
									onChange={handleKeyChange}>
									{Object.keys(data[0]).map((key, index) => (
										<option key={index} value={key}>
											{key}
										</option>
									))}
								</Select>
								<Select
									placeholder='Select value'
									value={selectedValue}
									onChange={handleValueChange}>
									{Object.keys(data[0]).map((key, index) => (
										<option key={index} value={key}>
											{key}
										</option>
									))}
								</Select>
							</Box>
						</ModalBody>
						<ModalFooter>
							<Button onClick={handleLogSelectedData}>
								Log Selected Data
							</Button>
							<Button onClick={onClose}>Close</Button>
						</ModalFooter>
					</ModalContent>
				</Modal>

				<TransactionalDayBookChart
					data={data}
					selectedKey={selectedKey}
					selectedValue={selectedValue}
				/>
			</Box>
		</Box>
	);
};

export default TransactionalDayBookGraphView;
