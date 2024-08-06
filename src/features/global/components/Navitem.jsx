import React from 'react';
import { Flex, Text, Icon, Menu, MenuButton, Link as ChakraLink } from "@chakra-ui/react";
import { NavLink } from 'react-router-dom';

const NavItem = ({ icon, title, description, navSize, linkTo }) => {
  return (
    <Flex
      mt={30}
      flexDir="column"
      w="100%"
      alignItems={navSize === "small" ? "center" : "flex-start"}
    >
      <Menu placement="right">
        {/* Use NavLink instead of ChakraLink */}
        <NavLink
          to={linkTo}
          style={{ textDecoration: 'none' }}
          activeStyle={{ backgroundColor: '#AEC8CA', textDecoration: 'none' }}
          isActive={(match, location) => {
            if (!match) return false;
            // Check if the current path exactly matches the linkTo prop
            return location.pathname === linkTo;
          }}
        >
          <MenuButton w="100%">
            <Flex>
              <Icon as={icon} fontSize="xl" color="gray.500" />
              <Text ml={5} display={navSize === "small" ? "none" : "flex"}>
                {title}
              </Text>
            </Flex>
          </MenuButton>
        </NavLink>
      </Menu>
    </Flex>
  );
};

export default NavItem;
