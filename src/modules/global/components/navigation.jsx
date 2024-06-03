/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';
import NavInner from './navInner';

const Navigation = ({ menuCollapse, setmenuCollapse }) => {
	const [navigations] = useState([
		{
			name: 'Dashboard',
			link: '/',
			disabled: false,
			available: true,
			parent: '',
		},
		{
			name: 'All Reports',
			link: '/all-reports',
			disabled: false,
			available: true,
			parent: '',
		},
		// {
		// 	name: 'Demo Two',
		// 	link: '/demo-two',
		// 	disabled: false,
		// 	available: true,
		// 	parent: '',
		// },
		// {
		// 	name: 'Demo Three',
		// 	link: '/demo-three',
		// 	disabled: false,
		// 	available: true,
		// 	parent: '',
		// },
		// {
		// 	name: 'Utilities',
		// 	link: ' ',
		// 	disabled: false,
		// 	available: true,
		// 	parent: '',
		// 	sub: [
		// 		{
		// 			name: 'Test One',
		// 			link: '/test-one',
		// 			disabled: false,
		// 			available: true,
		// 			parent: 'Utilities',
		// 		},
		// 		{
		// 			name: 'Test Two',
		// 			link: '/test-two',
		// 			disabled: false,
		// 			available: true,
		// 			parent: 'Utilities',
		// 		},
		// 		{
		// 			name: 'Test Three',
		// 			link: '/test-three',
		// 			disabled: false,
		// 			available: true,
		// 			parent: 'Utilities',
		// 		},
		// 		{
		// 			name: 'Test Four',
		// 			link: '/test-four',
		// 			disabled: false,
		// 			available: true,
		// 			parent: 'Utilities',
		// 		},
		// 		{
		// 			name: 'Test Five',
		// 			link: '/Test Five',
		// 			disabled: false,
		// 			available: true,
		// 			parent: 'Utilities',
		// 			// sub: [
		// 			//     {
		// 			//         name: 'Generate All Invoices',
		// 			//         link: '/Generate-all-invoices',
		// 			//         disabled: false,
		// 			//         available: true,
		// 			//         parent: 'Invoicing'
		// 			//     },
		// 			//     {
		// 			//         name: 'Download Invoices',
		// 			//         link: '/download-invoices',
		// 			//         disabled: false,
		// 			//         available: true,
		// 			//         parent: 'Invoicing'
		// 			//     }
		// 			// ]
		// 		},
		// 	],
		// },
		{
			name: 'Help',
			link: '/help',
			disabled: false,
			available: true,
		},
	]);

	return (
		<>
			{navigations.map(
				({ name, link, disabled, available, parent, sub }) => (
					<NavInner
						name={name}
						link={link}
						disabled={disabled}
						available={available}
						parent={parent}
						menuCollapse={menuCollapse}
						setmenuCollapse={setmenuCollapse}
						sub={sub}
						key={name.replace(/\s/g, '-')}
					/>
				)
			)}
		</>
	);
};
export default Navigation;
