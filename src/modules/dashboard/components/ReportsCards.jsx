import { Box, Button, Divider, Image, Text } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
// import { AiOutlineHeart } from "react-icons/ai";
// import { FaArrowRightLong } from "react-icons/fa6";
import { FaRegBookmark } from "react-icons/fa";

const ReportsCards = ({ cards, setFavoriteCard }) => {
  const handleLike = (cardName) => {
    console.log(`Liked card: ${cardName}`);
    setFavoriteCard(cardName);
  };

  return (
    <>
      {cards.map((card) => {
        return (
          <Box
            key={card.id}
            width={{ base: "100%", md: "48%", lg: "22%" }}
            sx={{
              "& .card_link": { width: { base: "100%", md: "48%", lg: "32%" } },
            }}
            position="relative">
            <Link to={card.link} className="card_link">
              <Box
                borderRadius="10px"
                height="auto"
                display="flex"
                flexDirection="column"
                padding="20px"
                // transition="0.5s ease"
                _hover={{
                  // transform: "scale(1.05)",
                  border: "1px solid #b5b2b28a",
                }}>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  width="100%">
                  <Text
                    fontWeight="500"
                    color="textBlack"
                    fontSize="14px"
                    _groupHover={{ color: "#003060" }}>
                    {card.name.length > 27
                      ? card.name.slice(0, 18) + "..."
                      : card.name}
                  </Text>
                  <Box
                    cursor="pointer"
                    padding="5px"
                    backgroundColor="white"
                    borderRadius="50%"
                    boxShadow="rgba(0, 0, 0, 0.1) 0px 2px 4px"
                    onClick={(e) => {
                      e.preventDefault();
                      handleLike(card.name);
                    }}>
                    <FaRegBookmark size={10} color="#b4b4b4" />
                  </Box>
                </Box>

                <Box
                  justifyContent="center"
                  alignContent="center"
                  display="flex">
                  <Image
                    src="https://i.pinimg.com/originals/65/c4/f4/65c4f452571be1261e9c623f7da488ac.gif"
                    width="45%"
                    marginTop="10px"
                    marginBottom="10px"
                  />
                </Box>

                <Text
                  color="#b4b4b4"
                  fontSize="11px"
                  lineHeight="1.9"
                  marginTop="10px"
                  textAlign="center">
                  A content graph organizes digital content like articles,
                  images, and videos into a network of connected nodes and
                  links.
                </Text>
              </Box>
            </Link>
          </Box>

          // updated design
          // <Box
          //   key={card.id}
          //   width={{ base: "100%", md: "48%", lg: "22%" }}
          //   sx={{
          //     "& .card_link": { width: { base: "100%", md: "48%", lg: "32%" } },
          //   }}
          //   position="relative">
          //   <Link to={card.link} className="card_link">
          //     <Box
          //       borderRadius="5px"
          //       backgroundColor="#fbfbfb"
          //       boxShadow="0px 2px 8px rgba(99, 99, 99, 0.2)"
          //       borderLeft="2px solid #003060"
          //       height="auto"
          //       display="flex"
          //       flexDirection="column"
          //       padding="20px"
          //       position="relative"
          //       marginRight={{ base: "10px", md: "10px", lg: "5px" }}
          //       transition="0.5s ease"
          //       _hover={{ transform: "scale(1.05)" }}>
          //       <Box
          //         position="absolute"
          //         top="10px"
          //         right="10px"
          //         cursor="pointer"
          //         padding="5px"
          //         backgroundColor="white"
          //         borderRadius="50%"
          //         boxShadow="rgba(0, 0, 0, 0.1) 0px 2px 4px"
          //         onClick={(e) => {
          //           e.preventDefault();
          //           handleLike(card.name);
          //         }}>
          //         <AiOutlineHeart size={20} color="#000" />
          //       </Box>
          //       <Box
          //         display="flex"
          //         justifyContent="space-between"
          //         alignItems="center">
          //         <Image
          //           src={card.imgsrc}
          //           alt={card.name}
          //           width="12%"
          //           marginTop="2px"
          //           marginBottom="10px"
          //         />
          //       </Box>
          //       <Box
          //         width="100%"
          //         overflow="hidden"
          //         whiteSpace="nowrap"
          //         textOverflow="ellipsis">
          //         <Text
          //           fontWeight="500"
          //           color="textBlack"
          //           fontSize="16px"
          //           _groupHover={{ color: "#003060" }}>
          //           {card.name.length > 18
          //             ? card.name.slice(0, 18) + "..."
          //             : card.name}
          //         </Text>
          //       </Box>
          //       <Box>
          //         <Text
          //           fontWeight="3000"
          //           color="#6f6f6f"
          //           fontSize="11px"
          //           lineHeight="1.5"
          //           marginTop="10px"
          //         textAlign="left"
          //         >
          //           Graphs are used to represent between objects.
          //           They are widely used in various.
          //         </Text>
          //       </Box>
          //       <Divider my="10px" bgColor="#bfbfbf" />
          //       <Box position="absolute" bottom="5px" right="20px">
          //         <Button style={{ color: "#003060", position: "relative" }}>
          //           View More
          //           <FaArrowRightLong style={{ paddingLeft: "2px" }} />
          //         </Button>
          //       </Box>
          //     </Box>
          //   </Link>
          // </Box>
        );
      })}
    </>
  );
};

export default ReportsCards;
