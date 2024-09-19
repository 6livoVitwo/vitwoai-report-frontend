// import { Badge, Box, Text } from '@chakra-ui/react';
// import React, { useState } from 'react'
// import { Cursor, useTypewriter } from 'react-simple-typewriter'

// const TypewriterHook = ({ text }) => {
//     const [text1, setText] = useState('Lorem ipsum dolor minus sit obcaecati a. Illum.')
//     const [text, flags] = useTypewriter({
//         words: [text1, "ABCD", "EMPTY", "lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo totam, perspiciatis nisi facere possimus voluptatibus minus sit obcaecati a. Illum."],
//         loop: 0,
//         typeSpeed: 20,
//         deleteSpeed: 8,
//         delaySpeed: 1000,
//         onLoopDone: () => console.log("done from typewriter hook")
//     });

//     const { isDelete, isType, isDelay, isDone } = flags;
//     return (
//         <Box>
//             <span style={{height:'50px', width:'50px'}}>&nbsp;{isType && <Badge ml={0} colorScheme='green'>Typing..</Badge>}</span>
//             <Text>
//                 {text}
//                 <Cursor
//                     cursorColor='grey'
//                     blink={true}
//                     cursorBlinkingSpeed={1000}
//                     cursorBlinkingStyle='solid'
//                     cursorBlinking={true}
//                     cursorStyle={<span style={{ fontWeight: 'bolder'}}>{!isDone?'|':'✅'}</span>}
//                 />
//             </Text>
//         </Box>
//     );
// };

// const TypingMaster = () => {

//     return (
//         <>
//             <TypewriterHook />
//         </>
//     )
// }

// export default TypingMaster



import { Badge, Box, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Cursor, useTypewriter } from "react-simple-typewriter";

const TypewriterHook = ({
  text,
  typeSpeed = 20,
  deleteSpeed = 8,
  delaySpeed = 1000,
}) => {
  const [typedText, flags] = useTypewriter({
    words: [text],
    loop: 0,
    typeSpeed,
    deleteSpeed,
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
