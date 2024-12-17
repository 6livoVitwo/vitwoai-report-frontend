import { Box, Text } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
// import { AiOutlineHeart } from "react-icons/ai";
// import { FaArrowRightLong } from "react-icons/fa6";
import { FaRegBookmark } from "react-icons/fa";
import Lottie from "lottie-react";

const ReportsCards = ({ cards, setFavoriteCard }) => {
  const handleLike = (cardName) => {
    setFavoriteCard(cardName);
  };



  return (
    <>
      {cards.map((card) => {
        const isLottieAnimation =
          typeof card.imgsrc === "object" && card.imgsrc !== null;

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
                height="100%"
                display="flex"
                flexDirection="column"
                padding="20px"
                border="1px solid #b5b2b245"
                _hover={{
                  // border: "1px solid #b5b2b28a",
                  shadow: "0px 2px 7px -2px"
                }}>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  width="100%">
                  <Text
                    fontWeight="500"
                    color="#202124"
                    fontSize="13px"
                    _groupHover={{ color: "#003060" }}>
                    {card.name.length > 27
                      ? card.name.slice(0, 18) + "..."
                      : card.name}
                  </Text>
                  {/* <Box
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
                  </Box> */}
                </Box>

                <Box
                  justifyContent="center"
                  alignContent="center"
                  display="flex"
                >
                  {isLottieAnimation ? (
                    <Lottie
                      animationData={card.imgsrc}
                      loop
                      style={{
                        width: "45%",
                        height: "100px",
                        marginTop: "10px",
                        marginBottom: "10px",
                      }}
                    />
                  ) : (
                    <Text>No animation available</Text>
                  )}
                </Box>

                <Box
                  color="#434242"
                  fontSize="11px"
                  lineHeight="1.9"
                  marginTop="10px"
                  marginBottom="10px"
                  textAlign="center"
                >
                  <span>{card.description}</span>
                </Box>
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
