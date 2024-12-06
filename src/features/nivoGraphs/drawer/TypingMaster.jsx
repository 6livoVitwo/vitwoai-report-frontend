import { Badge, Box, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Cursor, useTypewriter } from "react-simple-typewriter";

const TypewriterHook = ({
  text,
  typeSpeed = 20,
  delaySpeed = 1000,
}) => {
  const [typedText, flags] = useTypewriter({
    words: [text],
    // loop: 0,
    typeSpeed,
    // deleteSpeed,
    delaySpeed,
  });

  const { isType, isDone } = flags;

  return (
    <Box aria-live="polite">
      <span style={{ height: "50px", width: "50px" }}>
        {isType && (
          <Badge ml={0} colorScheme="green">
            Typing..
          </Badge>
        )}
      </span>
      <Text>
        {typedText}
        <Cursor
          cursorColor="grey"
          blink={true}
          cursorBlinkingSpeed={1000}
          cursorStyle={
            <span style={{ fontWeight: "bolder", fontSize: "1.5em" }}>
              {!isDone ? "|" : "✅"}
            </span>
          }
        />
      </Text>
    </Box>
  );
};

const TypingMaster = ({ text }) => {
  const [displayText, setDisplayText] = useState(text);

  useEffect(() => {
    if (text) {
      setDisplayText(text);
    }
  }, [text]);

  return <TypewriterHook text={displayText} />;
};

export default TypingMaster;
