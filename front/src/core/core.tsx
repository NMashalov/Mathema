import {VStack,StackDivider, ChakraProvider, ColorModeScript, Spacer} from '@chakra-ui/react';
import { Outlet } from 'react-router';
import { Footer } from './footer';
import { Header } from './header/header';
import { Box } from '@chakra-ui/react'
import {theme} from './theme'
import './core.css'
import { Chat } from 'src/comps/chat/chat';


function CoreLayout(){
    return(
    <VStack
        divider={<StackDivider borderColor='gray.200' />}
    >
        <Header/>
        <Box className='content'>
            <Chat/>
            <Outlet />
        </Box>
        <Footer/>
    </VStack> 
    )
}


export const Core = () => {


    return (
        <ChakraProvider theme={theme}>
            <CoreLayout/>
            <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        </ChakraProvider>
    )
}