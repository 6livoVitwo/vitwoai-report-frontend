import React from 'react';
import {
	Box,
	Button,
	Drawer,
	Input,
	DrawerBody,
	DrawerFooter,
	DrawerHeader,
	DrawerOverlay,
	DrawerContent,
	DrawerCloseButton,
	useDisclosure,
} from '@chakra-ui/react';
import { HamburgerIcon, SettingsIcon } from '@chakra-ui/icons';
import StockLogChart from "./stockLogChart";

const StockLogGraphView = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        padding="7px"
        gap="15px"
        mt="5px"
        bg="mainBlueLight"
        borderRadius="5px"
        color="mainBlue">
        <Box as="h3" fontSize="15px" fontWeight="600">
          Report Graph view
        </Box>
        <Box display="flex" gap="15px">
          <Box>
            <Button
              fontSize="14px"
              fontWeight="600"
              padding="15px 12px"
              borderRadius="5px"
              backgroundColor="white"
              boxShadow="rgba(0, 0, 0, 0.24) 0px 1px 8px"
              onClick={onOpen}>
              Filter <SettingsIcon ml="8px" />
            </Button>
            <Drawer
              isOpen={isOpen}
              placement="right"
              onClose={onClose}
              size="xl">
              <DrawerOverlay />
              <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader>Create your account</DrawerHeader>

                <DrawerBody>
                  <Input placeholder="Type here..." />
                </DrawerBody>

                <DrawerFooter>
                  <Button variant="outline" mr={3} onClick={onClose}>
                    Cancel
                  </Button>
                  <Button colorScheme="blue">Save</Button>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          </Box>
          <Box>
            <Button
              fontSize="14px"
              fontWeight="600"
              padding="15px 12px"
              borderRadius="5px"
              backgroundColor="white"
              boxShadow="rgba(0, 0, 0, 0.24) 0px 1px 8px"
              onClick={onOpen}>
              Menu
              <HamburgerIcon ml="8px" />
            </Button>
            <Drawer
              isOpen={isOpen}
              placement="right"
              onClose={onClose}
              size="xl">
              <DrawerOverlay />
              <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader>Create your account</DrawerHeader>

                <DrawerBody>
                  <Input placeholder="Type here..." />
                </DrawerBody>

                <DrawerFooter>
                  <Button variant="outline" mr={3} onClick={onClose}>
                    Cancel
                  </Button>
                  <Button colorScheme="blue">Save</Button>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          </Box>
        </Box>
      </Box>
      <StockLogChart />
    </Box>
  );
};

export default StockLogGraphView;
