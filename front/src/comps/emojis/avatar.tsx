import {MoodStates} from './emoji'
import { useState } from 'react'
import { Box, VStack, Text, StackDivider} from '@chakra-ui/react'


export function EmojiAvatar(){
    const [emotion]= useState(MoodStates.sleep)
    return (
        <VStack
                divider={<StackDivider borderColor='gray.200' />}
                bgGradient='linear(to-r, gray.300, yellow.400, pink.200)'
                borderRadius='25px'
                borderWidth='5px'
            >
                <Text 
                    fontWeight='italic'
                    fontSize="6xl"
                    bgClip="text"
                    bgGradient="linear(to-l, #7928CA,#FF0080)" 
                > Аватар</Text>
                <Box>
                    <img src={emotion}/>
                </Box>
        </VStack>     
    )
}