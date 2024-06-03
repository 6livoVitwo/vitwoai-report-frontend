import { Box, Image, Text } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineHeart } from "react-icons/ai";

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
                border="1px solid #b5b2b28a"
                height="auto"
                display="flex"
                flexDirection="column"
                padding="20px"
                transition="0.5s ease"
                _hover={{ transform: "scale(1.05)" }}>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  width="100%">
                  <Text
                    fontWeight="500"
                    color="textBlack"
                    fontSize="16px"
                    _groupHover={{ color: "#003060" }}>
                    {card.name}
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
                    <AiOutlineHeart size={20} color="#000" />
                  </Box>
                </Box>

                <Box
                  justifyContent="center"
                  alignContent="center"
                  display="flex">
                  <Image
                    src={card.imgsrc}
                    alt={card.name}
                    width="62%"
                    marginTop="10px"
                    marginBottom="10px"
                  />
                </Box>

                <Text
                  fontWeight="500"
                  color="#6f6f6f"
                  fontSize="13px"
                  lineHeight="1.5"
                  marginTop="10px">
                  In publishing and graphic design, Lorem ipsum is
                </Text>
              </Box>
            </Link>
          </Box>
        );
      })}
    </>
  );
};

export default ReportsCards;
