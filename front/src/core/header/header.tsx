import { NavLink} from "./navlink";
import { useNavigate, useLocation } from "react-router";
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { UserProfile } from "./profile";

import {
    Button,
    useColorMode,
    HStack,
    Text,
    StackDivider,
  } from '@chakra-ui/react'

import logo from '../../assets/tree.svg'
import { useState } from "react";
import { navLinks } from "src/structs/routes";
import { RouteNames} from "../../structs/routes";


const HeaderBlocks = () => {
    const {pathname}= useLocation()
    const [headerLinks] = useState<RouteNames>(navLinks)

    return (
        <HStack 
            spacing={4}
            display={{ base: 'none', md: 'flex' }}
            justifyContent='space-evenly'
        >
            {Object.entries(headerLinks).map(([title,params]) => (
                <NavLink 
                    route={title} 
                    key = {title} 
                    name={params.name} 
                    items={params.items}
                    image={params.image}
                />
            ))}
        </HStack>
    )
}

const Logo = () => {
    const navigate = useNavigate()
    return (
        <HStack 
            onClick={() => navigate('/')}
        >
            <img width="40" height="40" src={logo}/>
            <Text fontSize='3xl'>Mathema</Text>
        </HStack>
    )
}


export const Header = () => {

    return (
        <HStack
            className="header"
            justifyContent='space-evenly'
            divider={<StackDivider borderWidth='2px' borderColor='gray.200' />}
        >
            <Logo/> 
            <HeaderBlocks/>
            <UserProfile/>
        </HStack>        
    )
}
