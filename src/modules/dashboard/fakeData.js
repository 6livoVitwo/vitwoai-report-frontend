export const dashboardView = {
	title: 'My Charts',
	charts: [
		{
			id: '3',
			title: 'Bar Chart',
			type: 'bar',
			pinned: true,
			description: 'This is Bar Chart',
			data: [
				{
					country: 'AD',
					'hot dog': 99,
					'hot dogColor': 'hsl(313, 70%, 50%)',
					burger: 150,
					burgerColor: 'hsl(222, 70%, 50%)',
					sandwich: 65,
					sandwichColor: 'hsl(100, 70%, 50%)',
					kebab: 131,
					kebabColor: 'hsl(297, 70%, 50%)',
					fries: 148,
					friesColor: 'hsl(11, 70%, 50%)',
					donut: 39,
					donutColor: 'hsl(312, 70%, 50%)',
				},
				{
					country: 'AE',
					'hot dog': 50,
					'hot dogColor': 'hsl(231, 70%, 50%)',
					burger: 142,
					burgerColor: 'hsl(231, 70%, 50%)',
					sandwich: 175,
					sandwichColor: 'hsl(150, 70%, 50%)',
					kebab: 121,
					kebabColor: 'hsl(220, 70%, 50%)',
					fries: 183,
					friesColor: 'hsl(251, 70%, 50%)',
					donut: 160,
					donutColor: 'hsl(243, 70%, 50%)',
				},
				{
					country: 'AF',
					'hot dog': 119,
					'hot dogColor': 'hsl(21, 70%, 50%)',
					burger: 160,
					burgerColor: 'hsl(306, 70%, 50%)',
					sandwich: 113,
					sandwichColor: 'hsl(338, 70%, 50%)',
					kebab: 184,
					kebabColor: 'hsl(5, 70%, 50%)',
					fries: 68,
					friesColor: 'hsl(158, 70%, 50%)',
					donut: 5,
					donutColor: 'hsl(271, 70%, 50%)',
				},
				{
					country: 'AG',
					'hot dog': 115,
					'hot dogColor': 'hsl(4, 70%, 50%)',
					burger: 153,
					burgerColor: 'hsl(301, 70%, 50%)',
					sandwich: 193,
					sandwichColor: 'hsl(169, 70%, 50%)',
					kebab: 131,
					kebabColor: 'hsl(114, 70%, 50%)',
					fries: 151,
					friesColor: 'hsl(132, 70%, 50%)',
					donut: 26,
					donutColor: 'hsl(97, 70%, 50%)',
				},
				{
					country: 'AI',
					'hot dog': 160,
					'hot dogColor': 'hsl(307, 70%, 50%)',
					burger: 54,
					burgerColor: 'hsl(339, 70%, 50%)',
					sandwich: 144,
					sandwichColor: 'hsl(106, 70%, 50%)',
					kebab: 146,
					kebabColor: 'hsl(125, 70%, 50%)',
					fries: 111,
					friesColor: 'hsl(219, 70%, 50%)',
					donut: 62,
					donutColor: 'hsl(269, 70%, 50%)',
				},
				{
					country: 'AL',
					'hot dog': 192,
					'hot dogColor': 'hsl(288, 70%, 50%)',
					burger: 13,
					burgerColor: 'hsl(140, 70%, 50%)',
					sandwich: 134,
					sandwichColor: 'hsl(356, 70%, 50%)',
					kebab: 169,
					kebabColor: 'hsl(190, 70%, 50%)',
					fries: 150,
					friesColor: 'hsl(291, 70%, 50%)',
					donut: 111,
					donutColor: 'hsl(265, 70%, 50%)',
				},
				{
					country: 'AM',
					'hot dog': 158,
					'hot dogColor': 'hsl(260, 70%, 50%)',
					burger: 165,
					burgerColor: 'hsl(217, 70%, 50%)',
					sandwich: 5,
					sandwichColor: 'hsl(70, 70%, 50%)',
					kebab: 179,
					kebabColor: 'hsl(215, 70%, 50%)',
					fries: 64,
					friesColor: 'hsl(19, 70%, 50%)',
					donut: 28,
					donutColor: 'hsl(246, 70%, 50%)',
				},
			],
		},
		{
			id: '1',
			title: 'Funnel Chart',
			type: 'funnel',
			pinned: false,
			description: 'This is Funnel Chart',
			data: [
				{
					id: 'step_sent',
					value: 88469,
					label: 'Sent',
				},
				{
					id: 'step_viewed',
					value: 53171,
					label: 'Viewed',
				},
				{
					id: 'step_clicked',
					value: 34204,
					label: 'Clicked',
				},
				{
					id: 'step_add_to_card',
					value: 28992,
					label: 'Add To Card',
				},
				{
					id: 'step_purchased',
					value: 21172,
					label: 'Purchased',
				},
			],
		},
		{
			id: '2',
			title: 'Pie Chart',
			type: 'pie',
			pinned: true,
			description: 'This is Pie Chart',
			data: [
				{
					id: 'make',
					label: 'make',
					value: 471,
					color: 'hsl(90, 70%, 50%)',
				},
				{
					id: 'go',
					label: 'go',
					value: 435,
					color: 'hsl(184, 70%, 50%)',
				},
				{
					id: 'ruby',
					label: 'ruby',
					value: 309,
					color: 'hsl(181, 70%, 50%)',
				},
				{
					id: 'css',
					label: 'css',
					value: 88,
					color: 'hsl(194, 70%, 50%)',
				},
				{
					id: 'java',
					label: 'java',
					value: 7,
					color: 'hsl(54, 70%, 50%)',
				},
			],
		},
		{
			id: '4',
			title: 'Line Chart',
			type: 'line',
			pinned: false,
			description: 'This is Line Chart',
			data: [
				{
					id: 'japan',
					color: 'hsl(93, 70%, 50%)',
					data: [
						{
							x: 'plane',
							y: 215,
						},
						{
							x: 'helicopter',
							y: 32,
						},
						{
							x: 'boat',
							y: 68,
						},
						{
							x: 'train',
							y: 152,
						},
						{
							x: 'subway',
							y: 210,
						},
						{
							x: 'bus',
							y: 72,
						},
						{
							x: 'car',
							y: 147,
						},
						{
							x: 'moto',
							y: 98,
						},
						{
							x: 'bicycle',
							y: 212,
						},
						{
							x: 'horse',
							y: 275,
						},
						{
							x: 'skateboard',
							y: 76,
						},
						{
							x: 'others',
							y: 284,
						},
					],
				},
				{
					id: 'france',
					color: 'hsl(47, 70%, 50%)',
					data: [
						{
							x: 'plane',
							y: 144,
						},
						{
							x: 'helicopter',
							y: 155,
						},
						{
							x: 'boat',
							y: 229,
						},
						{
							x: 'train',
							y: 218,
						},
						{
							x: 'subway',
							y: 245,
						},
						{
							x: 'bus',
							y: 226,
						},
						{
							x: 'car',
							y: 159,
						},
						{
							x: 'moto',
							y: 169,
						},
						{
							x: 'bicycle',
							y: 185,
						},
						{
							x: 'horse',
							y: 42,
						},
						{
							x: 'skateboard',
							y: 266,
						},
						{
							x: 'others',
							y: 130,
						},
					],
				},
				{
					id: 'us',
					color: 'hsl(228, 70%, 50%)',
					data: [
						{
							x: 'plane',
							y: 249,
						},
						{
							x: 'helicopter',
							y: 274,
						},
						{
							x: 'boat',
							y: 151,
						},
						{
							x: 'train',
							y: 156,
						},
						{
							x: 'subway',
							y: 219,
						},
						{
							x: 'bus',
							y: 132,
						},
						{
							x: 'car',
							y: 289,
						},
						{
							x: 'moto',
							y: 266,
						},
						{
							x: 'bicycle',
							y: 189,
						},
						{
							x: 'horse',
							y: 148,
						},
						{
							x: 'skateboard',
							y: 211,
						},
						{
							x: 'others',
							y: 282,
						},
					],
				},
				{
					id: 'germany',
					color: 'hsl(219, 70%, 50%)',
					data: [
						{
							x: 'plane',
							y: 272,
						},
						{
							x: 'helicopter',
							y: 290,
						},
						{
							x: 'boat',
							y: 163,
						},
						{
							x: 'train',
							y: 224,
						},
						{
							x: 'subway',
							y: 282,
						},
						{
							x: 'bus',
							y: 6,
						},
						{
							x: 'car',
							y: 41,
						},
						{
							x: 'moto',
							y: 109,
						},
						{
							x: 'bicycle',
							y: 59,
						},
						{
							x: 'horse',
							y: 149,
						},
						{
							x: 'skateboard',
							y: 213,
						},
						{
							x: 'others',
							y: 249,
						},
					],
				},
				{
					id: 'norway',
					color: 'hsl(358, 70%, 50%)',
					data: [
						{
							x: 'plane',
							y: 46,
						},
						{
							x: 'helicopter',
							y: 136,
						},
						{
							x: 'boat',
							y: 33,
						},
						{
							x: 'train',
							y: 248,
						},
						{
							x: 'subway',
							y: 54,
						},
						{
							x: 'bus',
							y: 175,
						},
						{
							x: 'car',
							y: 229,
						},
						{
							x: 'moto',
							y: 88,
						},
						{
							x: 'bicycle',
							y: 121,
						},
						{
							x: 'horse',
							y: 220,
						},
						{
							x: 'skateboard',
							y: 91,
						},
						{
							x: 'others',
							y: 86,
						},
					],
				},
			],
		},
	],
};
