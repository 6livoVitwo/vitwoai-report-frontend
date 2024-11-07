import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  Flex,
  Wrap,
  Box,
  Image,
  Heading,
  useBoolean,
  Text,
  keyframes,
  useMediaQuery,
  Link as Anchor,
  BreadcrumbItem,
  BreadcrumbLink,
  Breadcrumb,
} from "@chakra-ui/react";

import Navigation from './navigation';
import { setDarkMode } from '../slice';
import logoDark from '../../../asset/images/vitwo-logo-dark.png';
const CssWrapper = styled.div`
	.nav-collapse .sidebar nav {
		padding: 20px 13px 20px 8px;
	}

	.nav-collapse li.nav-item svg {
		margin: 0 auto;
		display: inline-block;
	}
	.nav-collapse li.nav-item:hover > a {
		background: var(--chakra-colors-mainBlue);
	}

	.nav-collapse li.nav-item:hover span {
		visibility: visible;
		opacity: 1;
	}
	.nav-collapse .logo-img {
		clip: rect(0px, 32px, 45px, 0px);
	}

	.nav-collapse li.nav-item a[aria-current='page'] {
		border-radius: 8px;
	}

	.nav-collapse li.nav-item button[aria-expanded='false'] {
		width: 48px;
		border-radius: 8px;
		position: relative;
	}

	.nav-collapse li.nav-item button strong {
		text-align: center;
	}
	.chakra-accordion__panel {
		padding: 0px;
	}
	.nav-collapse li.nav-item .chakra-accordion__panel {
		padding: 5px 0px;
	}
	.nav-collapse .chakra-wrap__list .chakra-wrap__listitem > a > span {
		display: none;
	}
	.nav-collapse .chakra-accordion__button {
		width: 100%;
		flex-direction: column;
		align-items: start;
	}
	.nav-collapse .chakra-accordion__button > div {
		padding: 10px 15px 0px;
	}
	.nav-collapse .chakra-accordion__button > a {
		padding: 10px 15px 0px;
		border-right: none !important;
		border-bottom: 1px solid;
		border-color: #f1f7fd;
	}
	.nav-collapse .chakra-accordion__button span {
		display: none;
		transition: all 0.4s ease-in-out;
		opacity: 0;
	}

	.nav-collapse .chakra-wrap__listitem .chakra-accordion button + svg {
		position: absolute;
		right: 15px;
		top: 28px;
		// transition: opacity 0.4s ease 0s;
	}
	.nav-collapse
		.chakra-collapse
		.chakra-accordion__panel
		.chakra-wrap__listitem {
		width: 100%;
	}
	.nav-collapse .chakra-collapse .chakra-accordion__panel {
		padding: 0px;
	}
	.nav-collapse
		.chakra-collapse
		.chakra-accordion__panel
		.chakra-wrap__listitem
		> a
		> span {
		display: none;
	}
	.nav-collapse .chakra-accordion__button[aria-expanded='true'] {
		width: 100%;
	}
	.nav-collapse .navHolder .chakra-wrap__list .chakra-wrap__listitem {
		width: 190px;
	}
	.chakra-collapse
		.chakra-wrap__listitem
		.chakra-collapse
		.chakra-accordion__panel
		.chakra-wrap__list
		> a
		> span {
		display: none;
	}
	.navigation .sidebar .chakra-button .bottom-menu {
		display: block;
		transition: 0.4s ease all;
	}
	.nav-collapse .navigation .sidebar .chakra-button .bottom-menu {
		display: none;
		transition: 0.4s ease all;
	}
	.chakra-wrap__listitem
		.chakra-accordion__button
		.chakra-icon.chakra-accordion__icon {
		width: 19px;
		height: 19px;
		margin: 0px 0px 0px -55px;
	}
	.chakra-wrap__listitem .chakra-accordion__button a + svg {
		width: 22px !important;
		height: 19px !important;
	}

	@media only screen and (max-width: 1023px) {
		.navigation {
			z-index: 111;
		}
		.logo-img {
			transition: 0.4s ease all;
		}

		.nav-collapse li.nav-item button[aria-expanded='true'] {
			width: 100%;
		}
		.nav-collapse li.nav-item button[aria-expanded='false'] {
			width: 100%;
		}
		.nav-collapse li.nav-item a {
			width: 100%;
		}
		.nav-collapse li.nav-item span {
			opacity: 1;
		}
		.nav-collapse li.nav-item button strong > svg.on-expanded {
			opacity: 1;
			visibility: visible;
		}
		.nav-collapse li.nav-item button strong > svg.on-collapse {
			opacity: 0;
			visibility: hidden;
			bottom: 0px;
		}
		.nav-collapse .bottom-menu {
			opacity: 1;
		}
		.nav-collapse .logo-img {
			clip: unset;
		}

		.nav-collapse .chakra-wrap__list .chakra-wrap__listitem > a > span {
			display: block;
		}
		.nav-collapse .chakra-accordion__button {
			width: 100%;
			display: flex;
			flex-direction: row;
			align-items: center;
		}
		.nav-collapse .chakra-accordion__button span {
			display: block;
			transition: all 0.4s ease-in-out;
			opacity: 1;
		}
		.nav-collapse
			.chakra-collapse
			.chakra-accordion__panel
			.chakra-wrap__listitem
			> a
			> span {
			display: block;
		}
		.nav-collapse .chakra-wrap__listitem .chakra-accordion button + svg {
			position: absolute;
			right: 15px;
			top: 15px;
		}
		.chakra-collapse
			.chakra-wrap__listitem
			.chakra-collapse
			.chakra-accordion__panel
			.chakra-wrap__list
			> a
			> span {
			display: block;
		}
		.nav-collapse .chakra-accordion__button > div {
			padding: 10px 15px;
		}
		button.chakra-button.responsive_Btn {
			height: 30px;
			width: 30px;
			padding: 0;
		}
	}

	@media (min-width: 768px) and (max-width: 1023px) {
	}
	@media (min-width: 980px) and (max-width: 1023px) {
	}
`;

const Layout = ({ portalId }) => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const [menuCollapse, setmenuCollapse] = useBoolean(true);
  const [isLessThan1023px] = useMediaQuery("(max-width: 1023px)");

  const bellshake = keyframes`
        0% { transform: rotate(0); }
        25% { transform: rotate(8deg); }
        50% { transform: rotate(-8deg); }
        45% { transform: rotate(6deg); }
        60% { transform: rotate(-6deg); }
        75% { transform: rotate(4deg); }
        85% { transform: rotate(-4deg); }
        92% { transform: rotate(2deg); }
        100% { transform: rotate(0); }
    `;

  const animation = `${bellshake} .5s cubic-bezier(.36,.07,.19,.97) both`;

  useEffect(() => {
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      dispatch(setDarkMode(true));
    }

    const darkModeListener = window.matchMedia("(prefers-color-scheme: dark)");
    const handleDarkModeChange = (event) => {
      dispatch(setDarkMode(event.matches));
    };

    darkModeListener.addEventListener("change", handleDarkModeChange);

    return () => {
      darkModeListener.removeEventListener("change", handleDarkModeChange);
    };
  }, []);

  const breadcrumbItems = pathname
    .split("/")
    .filter(Boolean)
    .map((part, index, array) => {
    //   const href = `/${array.slice(0, index + 1).join("/")}`;
      return {
        label: part.replace(/-/g, " "),
        // href: href,
        isCurrentPage: index === array.length - 1,
      };
    });

  return (
    <CssWrapper>
      <Flex
        flexDirection="row"
        w="100vw"
        minH="100vh"
        h="100vh"
        justify="left"
        align="top"
        className={`commonContainer ${menuCollapse ? "nav-collapse" : ""}`}
        alignSelf="flex-start"
        position="relative"
        bg="mainLightModeBackgroundColor">
        <Box
          position="fixed"
          bg="rgba(0,0,0,0.5)"
          height="100vh"
          width="100vw"
          opacity={menuCollapse ? "1" : "0"}
          display={{
            base: `${menuCollapse ? "block" : "none"}`,
            lg: "none",
          }}
          onClick={setmenuCollapse.toggle}
          // transition={{ base: '0.5s ease', lg: 'unset' }}
          zIndex="111">
          Overlay
        </Box>

        <Box
          className="navigation"
          w={{
            base: `${menuCollapse ? "210px" : "0px"}`,
            lg: `${menuCollapse ? "70px" : "210px"}`,
          }}
          h="100vh"
          pos="fixed"
          left="0"
          zIndex={6}
          background="lfgLightBlue"
          overflow={menuCollapse ? "visible" : "hidden"}
          transition="0.5s ease all"
          borderRight="1px solid var(--chakra-colors-veryLightBlueColor)">
          <Box
            pos="relative"
            as="aside"
            className="sidebar"
            w={["100%", "100%", "100%"]}
            h="100%"
            display="flex"
            flexDirection="column"
            boxShadow={
              isLessThan1023px ? "rgb(0 0 0 / 15%) 7.4px 7.4px 7.2px" : ""
            }
            bg="#003060">
            <Box
              h={{ base: "55px", lg: "60px" }}
              boxShadow="-3px 3px 16px var(--chakra-colors-boxShadowLightBlackColor)"
              bg="white"
              borderBottom="1px solid var(--chakra-colors-veryLightBlueColor)">
              <Box
                className="logo"
                p={{
                  base: "42px 12px 12px 15px",
                  lg: "57px 12px 0px 15px",
                }}
                transition="all 0.4s ease-in-out"
                pos="relative">
                <Image
                  srcSet={logoDark}
                  alt="logo"
                  alignSelf="center"
                  pos="absolute"
                  w="auto"
                  h={{ base: "34px", lg: "35px" }}
                  className="logo-img"
                  maxWidth="unset"
                  top="12px"
                />
              </Box>
            </Box>
            <Wrap
              display="block"
              flexDirection="row"
              fontWeight="500"
              fontSize={{ base: "1.4rem", lg: "1.6rem" }}
              color="white"
              p="20px 10px"
              h={{
                base: "calc(100vh - 100px)",
                lg: "calc(100vh - 100px)",
              }}
              className="navHolder"
              transition="all 0.4s ease-in-out"
              sx={{
                "&.navHolder": {
                  overflow: "hidden",
                },
                "&.navHolder:hover": {
                  paddingRight: "9px",
                  overflowY: "scroll",
                },
                "&:hover::-webkit-scrollbar": {
                  width: "4px",
                  background: "var(--chakra-colors-gray-200)",
                },

                "&:hover::-webkit-scrollbar-thumb": {
                  background: "var(--chakra-colors-gray-300)",
                  borderRadius: "4px",
                  transition: "all 0.3s ease-in-out",
                },
                "& .chakra-wrap__list .chakra-wrap__listitem": {
                  width: "190px",
                },
                "& .chakra-collapse .chakra-wrap__list .chakra-wrap__listitem":
                  {
                    width: "100%",
                  },

                ".chakra-wrap__listitem": {
                  borderRadius: "8px",
                  transition: "width 0.3s ease",
                },
                ".chakra-wrap__listitem > a": {
                  textDecoration: "none",
                },
                ".chakra-wrap__listitem > a:hover": {
                  bg: "var(--chakra-colors-mainBlue)",
                  color: "var(--chakra-colors-white)",
                },
                ".chakra-wrap__listitem > a.active": {
                  bg: "#cfd8e1",
                  color: "#003060",
                },
                ".chakra-wrap__listitem > a > i > svg:hover": {
                  color: "var(--chakra-colors-white)",
                },
                ".chakra-wrap__listitem > a[aria-current=page]>i>svg": {
                  color: "#003060",
                },
                ".chakra-accordion__button": {
                  width: "190px",
                  borderRadius: "8px",
                },
                ".chakra-accordion__button:hover": {
                  background: "rgb(215, 229, 244)",
                  color: "mainBlue",
                },
                ".chakra-accordion__button:hover > a ": {
                  borderRight: "1px solid",
                  borderColor: "#f1f7fd",
                  transition: "0.5s ease all",
                },
                ".chakra-collapse .chakra-wrap__listitem .chakra-accordion__button":
                  {
                    width: "100%",
                    borderRadius: "8px",
                  },
                ".chakra-collapse .chakra-wrap__listitem .chakra-accordion__button:hover":
                  {
                    background: "rgb(215, 229, 244)",
                  },
                ".chakra-accordion__button > a": {
                  textDecoration: "none",
                },
                ".chakra-collapse .chakra-wrap__listitem .chakra-collapse .chakra-accordion__panel .chakra-wrap__list > a":
                  {
                    textDecoration: "none",
                  },
                ".chakra-collapse .chakra-wrap__listitem .chakra-collapse .chakra-accordion__panel .chakra-wrap__list > a >span":
                  {
                    textDecoration: "none",
                    fontSize: "1.4rem",
                  },
                ".chakra-collapse .chakra-wrap__listitem .chakra-collapse .chakra-accordion__panel .chakra-wrap__list > a:hover ":
                  {
                    background: "var(--chakra-colors-mainBlue)",
                    color: "white !important",
                  },
                '.chakra-accordion__button[aria-expanded="true"]': {
                  width: "190px",
                  bg: "#D7E5F4",
                  borderRadius: "10px 10px 0px 0px",
                  color: "mainBlue",
                },
                ".chakra-accordion__item": {
                  border: "none",
                },
                ".chakra-wrap__listitem .chakra-accordion button + svg": {
                  position: "absolute",
                  right: "10px",
                  transition: "opacity 0.4s ease 0s",
                  opacity: "0.5",
                },
                "& .chakra-accordion .chakra-accordion__item .chakra-collapse .chakra-accordion__panel .chakra-wrap .chakra-wrap__list .chakra-wrap__listitem":
                  {
                    width: "90%",
                    margin: "0 auto",
                  },
                "& .chakra-accordion .chakra-accordion__item .chakra-collapse .chakra-accordion__panel .chakra-wrap .chakra-wrap__list .chakra-wrap__listitem > a":
                  {
                    mb: "5px",
                    color: "mainBlue",
                  },
                "& .chakra-accordion .chakra-accordion__item .chakra-collapse .chakra-accordion__panel .chakra-wrap .chakra-wrap__list .chakra-wrap__listitem > a:hover":
                  {
                    color: "white",
                  },
                "& .chakra-accordion .chakra-accordion__item .chakra-collapse .chakra-accordion__panel .chakra-wrap .chakra-wrap__list .chakra-wrap__listitem > a.active":
                  {
                    color: "white",
                  },
                "@media screen and (max-width: 1023px)": {
                  "&.navHolder": {
                    overflowY: "auto",
                    overflowX: "hidden",
                  },
                },
              }}>
              <Navigation
                menuCollapse={menuCollapse}
                setmenuCollapse={setmenuCollapse}
              />
            </Wrap>
          </Box>
        </Box>
        <Box
          ml={{
            base: `${menuCollapse ? "0px" : "0px"}`,
            lg: `${menuCollapse ? "70px" : "210px"}`,
          }}
          width="100%"
          transition="margin 0.5s ease"
          overflow={{ base: "scroll", lg: "unset" }}>
          <Box
            className="header"
            h={{ base: "55px", lg: "60px" }}
            bg="white"
            pos="fixed"
            top="0"
            borderBottom="1px solid var(--chakra-colors-veryLightBlueColor)"
            zIndex="99"
            left={{
              base: `${menuCollapse ? "0px" : "0px"}`,
              lg: `${menuCollapse ? "70px" : "210px"}`,
            }}
            transition="all 0.5s ease"
            width={{
              base: `${menuCollapse ? "100%" : "100%"}`,
              lg: `${
                menuCollapse ? "calc(100% - 60px)" : "calc(100% - 210px)"
              }`,
            }}>
            <Box
              pos="relative"
              h={{ base: "55px", lg: "60px" }}
              bg="white"
              p={{ base: "7px 20px", lg: "15px 20px" }}
              borderBottom="1px solid var(--chakra-colors-veryLightBlueColor)"
              boxShadow="0px 0px 20px var(--chakra-colors-gray-200)"
              display="flex"
              justifyContent="space-between"
              sx={{
                "& > .progressBar": {
                  bg: "var(--chakra-colors-gray-100)",
                },
              }}>
              <Box
                pos="absolute"
                left="20px"
                top={{ base: "17px", lg: "22px" }}
                cursor="pointer"
                w="38px"
                h="38px"
                textAlign="center"
                color="mainBlue"
                onClick={setmenuCollapse.toggle}>
                <svg
                  className="icon"
                  width="20px"
                  height="21px"
                  display="inline-block">
                  <use xlinkHref="/icon/icons.svg#icon-navmenu-collapse" />
                </svg>
              </Box>

              <Box
                p="0 0 0 38px"
                display={{ base: "none", lg: "flex" }}
                alignItems="center">
                <Heading
                  as="h1"
                  fontSize="2rem"
                  fontWeight="600"
                  color="mainBlue"
                  textTransform="capitalize">
                  {/* {pathname.split("/")[1].split("-").join(" ").trim()} */}
                  <Breadcrumb fontSize="lg" spacing="8px">
                    {breadcrumbItems.map((item, index) => (
                      <BreadcrumbItem
                        key={index}
                        isCurrentPage={item.isCurrentPage}>
                        <BreadcrumbLink
                        >
                          {item.label}
                        </BreadcrumbLink>
                      </BreadcrumbItem>
                    ))}
                  </Breadcrumb>
                </Heading>
              </Box>

              <Box display={{ base: "block", lg: "none" }}></Box>

              <Box
                className="icon_notification"
                pos="absolute"
                color="mainBlue"
                right={{ base: "135px", lg: "20px" }}
                bottom={{ base: "15px", lg: "22px" }}
                cursor="pointer"
                _hover={{
                  animation: `${animation}`,
                  transformOrigin: "top",
                }}>
                <svg className="icon" width="20px" height="21px">
                  <use xlinkHref="/icon/icons.svg#icon-notification" />
                </svg>
              </Box>
            </Box>
          </Box>
          <Box
            ref={portalId}
            w="100%"
            p={{
              base: "0",
              lg: "0",
            }}
            height="calc(100vh - 55px)"
            overflow="auto"
            pos={{ base: "", lg: "sticky" }}
            top="60px"
            bg="white"
            zIndex="111"
          />
          <Flex
            display={{ base: "none", lg: "flex" }}
            left={{
              base: `${menuCollapse ? "0px" : "0px"}`,
              lg: `${menuCollapse ? "70px" : "210px"}`,
            }}
            transition="all 0.5s ease"
            width={{
              base: `${menuCollapse ? "100%" : "100%"}`,
              lg: `${
                menuCollapse ? "calc(100% - 60px)" : "calc(100% - 210px)"
              }`,
            }}
            bg="mainLightModeBackgroundColor"
            pos="fixed"
            bottom="0"
            height="33px"
            lineHeight="3.3rem"
            justifyContent="space-between"
            p="0 20px"
            zIndex="99">
            <Box
              color="mainBlue"
              fontSize="1.3rem"
              fontWeight="400"
              flex="0 0 50%">
              &copy; Copyright {new Date().getFullYear()}{" "}
              <Text as="strong" color="mainBlue" fontWeight="500">
                6 livo Technology Pvt Ltd.
              </Text>
              All Rights Reserved.
            </Box>
            {/* <Box
              flex="0 0 50%"
              textAlign="right"
              color="bodyFontColor"
              fontSize="1rem"
              sx={{
                "& span": {
                  color: "mainBlue",
                  fontWeight: "500",
                  fontSize: "1.1rem",
                },
              }}>
              Powered by
              <Anchor
                isExternal
                textDecoration="none"
                color="mainBlue"
                fontWeight="500">
                Vitwo
              </Anchor>
            </Box> */}
          </Flex>
        </Box>
      </Flex>
    </CssWrapper>
  );
};

export default Layout;
