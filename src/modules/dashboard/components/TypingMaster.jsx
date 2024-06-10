import { Badge, Box, Divider, Text } from '@chakra-ui/react';
import React, { useState } from 'react'
import { Cursor, Typewriter, useTypewriter } from 'react-simple-typewriter'
import deletingIcon from '../../../asset/images/animated-icons/icons8-delete (3).gif'
import { DeleteIcon } from '@chakra-ui/icons';
import { MdFormatLineSpacing } from 'react-icons/md';

const TypewriterHook = () => {
    const [text1, setText] = useState('Lorem ipsum dolor minus sit obcaecati a. Illum.')
    const [text, flags] = useTypewriter({
        words: [text1, "lorem ipsum dolor sit", "lorem ipsum dolor sit amet consectetur", "lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo totam, perspiciatis nisi facere possimus voluptatibus minus sit obcaecati a. Illum."],
        loop: 0,
        typeSpeed: 20,
        deleteSpeed: 8,
        delaySpeed: 1000,
        onLoopDone: () => console.log("done from typewriter hook")
    });

    const { isDelete, isType, isDelay, isDone } = flags;
    return (
        <Box>
            {/* {isType && <Badge colorScheme='green'>Typing..</Badge>} */}
            {/* {isDelay && <Badge>Waiting...⌛</Badge>}
            {isDelete && <Badge colorScheme='red'>Deleting..❌</Badge>}
            {isDone && <Badge colorScheme='purple'>Done!✅</Badge>} */}
            <span style={{height:'50px', width:'50px'}}>&nbsp;{isType && <Badge ml={0} colorScheme='green'>Typing..</Badge>}</span>
            <Text>
                {text}
                <Cursor
                    cursorColor='grey'
                    blink={true}
                    cursorBlinkingSpeed={1000}
                    cursorBlinkingStyle='solid'
                    cursorBlinking={true}
                    cursorStyle={<span style={{ fontWeight: 'bolder'}}>{!isDone?'|':'✅'}</span>}
                />
            </Text>
        </Box>
    );
};

const TypingMaster = () => {

    return (
        <>
            <TypewriterHook />
        </>
    )
}

export default TypingMaster