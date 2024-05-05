import {Menu,MenuButton, MenuList, MenuItem, Text, Button, Center, VStack, HStack } from '@chakra-ui/react'
// import { useColorMode } from '@chakra-ui/react'
import { useNavigate } from 'react-router'
import { INavLink,} from '../../structs/routes'
import { useEffect, useState } from 'react'
import { ChevronDownIcon } from '@chakra-ui/icons'

  
interface NavLinkProps extends INavLink{
  route: string,
  image: string
}


export const NavLink = (props: NavLinkProps ) => {
    const navigate = useNavigate()
    const [dropdownList,setDrowdownList]= useState(props.items)

    useEffect(
        () => {
          setDrowdownList(props.items)
          console.log(props.items)
        },
        [props]
    )

    return (
      <Menu>
        <MenuButton
          as={Button}
          bg='white.100'
          _hover={{
              background: "white",
              color: "teal.500",
            }}
          rightIcon={<ChevronDownIcon />}
        >
          <HStack>
            <img src={props.image} height='50px' width='50px'/>
            <Text fontSize='2xl'>{props.name}</Text>
          </HStack>
        </MenuButton>
        <MenuList>
          <VStack>
          {dropdownList.map(
              (elem) => 
                <MenuItem 
                  key={`${props.name}-${elem}`} 
                  onClick={()=>navigate(`/${props.route}/${elem}`)}
                >
                  <Center>
                    <Text fontSize='1xl'>{elem}</Text>
                  </Center>
                </MenuItem> 
          )}
          </VStack>
        </MenuList>
      </Menu>
    )
}
      


