import { Box, Image } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineHeart } from "react-icons/ai";

const ReportsCards = ({ cards, setFavoriteCard }) => {
  const handleLike = (cardName) => {
    console.log(`Liked card: ${cardName}`);
    // Update favorite card in the sidebar
    setFavoriteCard(cardName);
  };

  return (
    <>
      {cards.map((card) => {
        return (
          <Box
            key={card.id}
            width={{ base: "100%", md: "48%", lg: "23.45%" }}
            sx={{
              "& .card_link": { width: { base: "100%", md: "48%", lg: "32%" } },
            }}
            position="relative">
            <Link to={card.link} className="card_link">
              <Box
                borderRadius="10px"
                backgroundColor="white"
                borderLeft="1px solid #003060"
                height="118px"
                display="flex"
                backgroundSize="cover"
                flexDirection="column"
                padding="27px 0px"
                role="group"
                boxShadow="rgba(0, 0, 0, 0.1) 0px 4px 12px;"
                transition="0.5s ease"
                _hover={{ transform: "scale(1.05)" }}>
                <Box padding="0px 2px 16px">
                  <Box paddingLeft="25px">
                    <Box borderRadius="50px" display="flex" color="white">
                      <Image
                        src={card.imgsrc}
                        alt="Transactional Day book"
                        width="30px"
                        height="30px"
                      />
                      <Box
                        fontWeight="700"
                        padding="0px 15px"
                        textAlign="center"
                        color="textBlack"
                        _groupHover={{ color: "#003060" }}>
                        {card.name}
                      </Box>
                    </Box>
                  </Box>
                  <Box
                    fontWeight="500"
                    paddingLeft="25px"
                    paddingTop="10px"
                    color="#6f6f6f"
                    _groupHover={{ color: "#003060" }}
                    fontSize="13px"
                    lineHeight="1.5">
                    Lorem ipsum dolor sit
                  </Box>
                </Box>
                <Box
                  position="absolute"
                  bottom="10px"
                  right="10px"
                  display="none"
                  _groupHover={{ display: "block" }}
                  cursor="pointer"
                  padding="5px"
                  backgroundColor="white"
                  borderRadius="50%"
                  boxShadow="rgba(0, 0, 0, 0.1) 0px 2px 4px">
                  <AiOutlineHeart
                    size={20}
                    color="#000"
                    onClick={() => handleLike(card.name)}
                  />
                </Box>
              </Box>
            </Link>
          </Box>
        );
      })}
    </>
  );
};

export default ReportsCards;
