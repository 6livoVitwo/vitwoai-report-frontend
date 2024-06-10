/* eslint-disable no-nested-ternary */
import React from 'react';
import {
	Box,
	Link,
	Wrap,
	WrapItem,
	Text,
	Tooltip,
	useMediaQuery,
	Accordion,
	AccordionItem,
	AccordionButton,
	AccordionPanel,
	AccordionIcon,
} from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';

const Tooltipped = ({ menuCollapse, name, children }) => {
	const [isLessThan1023px] = useMediaQuery('(max-width: 1023px)');

	return !isLessThan1023px ? (
		<Tooltip
			isDisabled={!menuCollapse}
			label={name}
			placement='right'
			hasArrow
			arrowSize={8}
			fontSize='1.1rem'
			borderRadius='3px'
			display={{ base: 'none', lg: 'block' }}>
			{children}
		</Tooltip>
	) : (
		children
	);
};

const VeryBasicNavAtom = ({
	name,
	link,
	disabled,
	menuCollapse,
	setmenuCollapse,
	parent,
}) => {
	const navigate = useNavigate();
	const [isLessThan1023px] = useMediaQuery('(max-width: 1023px)');

	return (
		<Tooltipped menuCollapse={!!menuCollapse} name={name}>
			{!!link && !!link.trim().length ? (
				<Link
					className={disabled ? 'disabledLink' : ''}
					as={NavLink}
					to={link}
					_activeLink={{
						'& > i > svg': {
							color: 'var(--chakra-colors-gray-600)',
						},
					}}
					position='relative'
					display='flex'
					alignItems='center'
					w='100%'
					p='7px 15px'
					userSelect='none'
					textAlign='left'
					sx={{
						'&.disabledLink': {
							pointerEvents: 'none',
							color: 'var(--chakra-colors-gray-600)',
							background: 'var(--chakra-colors-gray-300)',
						},
					}}
					borderRadius='8px'
					onClick={(e) => {
						e.preventDefault();
						if (setmenuCollapse && isLessThan1023px) {
							setmenuCollapse.toggle();
						}
						navigate(link, { state: parent });
					}}>
					<Text
						as='i'
						display='inline-block'
						width='20px'
						height='25px'
						className={name.toLocaleLowerCase().replace(/ /g, '-')}
						lineHeight='2.5rem'
						verticalAlign='middle'>
						<svg className='icon' width='20px' height='24px'>
							<use
								xlinkHref={`/icon/icons.svg#icon-${name
									.toLocaleLowerCase()
									.replace(/ /g, '-')}`}
							/>
						</svg>
					</Text>
					<Text
						as='span'
						fontSize='1.4rem'
						fontWeight='500'
						display='inline-block'
						verticalAlign='middle'
						pl='20px'
						lineHeight='1.8rem'
						textAlign='start'
						w='170px'>
						{name}
					</Text>
				</Link>
			) : (
				<Box
					position='relative'
					display='flex'
					alignItems='center'
					padding='7px 15px'>
					<Text
						as='i'
						display='block'
						width='20px'
						height='25px'
						className={name.toLocaleLowerCase().replace(/ /g, '-')}
						lineHeight='2.5rem'
						verticalAlign='middle'>
						<svg className='icon' width='20px' height='24px'>
							<use
								xlinkHref={`/icon/icons.svg#icon-${name
									.toLocaleLowerCase()
									.replace(/ /g, '-')}`}
							/>
						</svg>
					</Text>
					<Text
						as='span'
						fontSize='1.4rem'
						fontWeight='500'
						visibility='visible'
						display='inline-block'
						verticalAlign='middle'
						lineHeight='1.8rem'
						pl='20px'
						textAlign='start'
						w='170px'>
						{name}
					</Text>
				</Box>
			)}
		</Tooltipped>
	);
};

const BasicNavAtom = ({
	name,
	link,
	disabled,
	available,
	menuCollapse,
	parent,
	sub,
	setmenuCollapse,
}) => {
	const { state: locState } = useLocation();

	return available ? (
		sub ? (
			<WrapItem>
				<Accordion allowToggle width='100%'>
					<AccordionItem>
						<Box
							display='flex'
							alignItems='center'
							justifyContent='space-between'
							position='relative'
							className={locState === name ? 'activeParent' : ''}>
							<AccordionButton p='0'>
								<VeryBasicNavAtom
									name={name}
									link={link}
									disabled={disabled}
									available={available}
									parent={parent}
									menuCollapse={menuCollapse}
									setmenuCollapse={setmenuCollapse}
								/>
								<AccordionIcon />
							</AccordionButton>
						</Box>

						<AccordionPanel>
							<Wrap
								bg='var(--chakra-colors-navDropdownBgColor)'
								p='10px 0px'
								borderRadius='0px 0px 10px 10px'>
								{sub.map(
									({
										name: subName,
										link: subLink,
										disabled: subDisabledLink,
										available: subAvailable,
										parent: subParent,
										menuCollapse: subMenuCollapse,
										sub: subSub,
									}) =>
										subSub ? (
											<Tooltipped
												menuCollapse={!!menuCollapse}
												name={subName}
												key={`${subName.replace(
													/\s/g,
													'-'
												)}-${subLink}`}>
												<WrapItem>
													<Accordion
														allowToggle
														width='100%'>
														<AccordionItem>
															<Box
																display='flex'
																alignItems='center'
																justifyContent='space-between'
																position='relative'>
																<AccordionButton p='0'>
																	<BasicNavAtom
																		name={
																			subName
																		}
																		link={
																			subLink
																		}
																		disabled={
																			subDisabledLink
																		}
																		available={
																			subAvailable
																		}
																		parent={
																			subParent
																		}
																		menuCollapse={
																			subMenuCollapse
																		}
																	/>
																	<AccordionIcon
																		position='absolute'
																		right='10px'
																	/>
																</AccordionButton>
															</Box>

															<AccordionPanel>
																<Wrap
																	bg='var(--chakra-colors-navDropdownBgColor)'
																	p='10px 0px'
																	borderRadius='0px 0px 10px 10px'>
																	{subSub.map(
																		({
																			name: subSubName,
																			link: subSubLink,
																			disabled:
																				subSubDisabled,
																			available:
																				subSubAvailable,
																			parent: subSubParent,
																			menuCollapse:
																				subSubMenuCollapse,
																		}) => (
																			<VeryBasicNavAtom
																				key={`${subSubName.replace(
																					/\s/g,
																					'-'
																				)}-${link}`}
																				name={
																					subSubName
																				}
																				link={
																					subSubLink
																				}
																				disabled={
																					subSubDisabled
																				}
																				available={
																					subSubAvailable
																				}
																				parent={
																					subSubParent
																				}
																				menuCollapse={
																					subSubMenuCollapse
																				}
																				setmenuCollapse={
																					setmenuCollapse
																				}
																			/>
																		)
																	)}
																</Wrap>
															</AccordionPanel>
														</AccordionItem>
													</Accordion>
												</WrapItem>
											</Tooltipped>
										) : (
											<Tooltipped
												menuCollapse={!!menuCollapse}
												name={subName}
												key={`${subName.replace(
													/\s/g,
													'-'
												)}-${subLink}`}>
												<WrapItem>
													<VeryBasicNavAtom
														name={subName}
														link={subLink}
														disabled={
															subDisabledLink
														}
														available={subAvailable}
														parent={subParent}
														menuCollapse={
															subMenuCollapse
														}
														setmenuCollapse={
															setmenuCollapse
														}
													/>
												</WrapItem>
											</Tooltipped>
										)
								)}
							</Wrap>
						</AccordionPanel>
					</AccordionItem>
				</Accordion>
			</WrapItem>
		) : (
			<WrapItem>
				<VeryBasicNavAtom
					name={name}
					link={link}
					disabled={disabled}
					available={available}
					parent={parent}
					menuCollapse={menuCollapse}
					setmenuCollapse={setmenuCollapse}
				/>
			</WrapItem>
		)
	) : null;
};

const NavInner = ({
	name,
	link,
	disabled,
	available,
	menuCollapse,
	parent,
	sub,
	setmenuCollapse,
}) => (
	<BasicNavAtom
		name={name}
		link={link}
		disabled={disabled}
		available={available}
		parent={parent}
		menuCollapse={menuCollapse}
		sub={sub}
		setmenuCollapse={setmenuCollapse}
	/>
);

export default NavInner;
