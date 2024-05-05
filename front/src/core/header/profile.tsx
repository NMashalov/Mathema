import {Avatar, Menu,MenuButton, MenuList, MenuItem,  } from '@chakra-ui/react'
import panda from '../../assets/cards/panda.svg'
import { useAtom } from 'jotai'
import { isLogged } from 'src/store'


export const UserProfile = () => {
    const [_,setLogin]= useAtom(isLogged)
    return (
        <Menu>
            <MenuButton>
                <Avatar
                    width="50" 
                    height="50"
                    src={panda }
                />
            </MenuButton>
            <MenuList alignItems={'center'}>
                <MenuItem>
                    Настройки
                </MenuItem>
                <MenuItem onClick={()=>setLogin(false)}>
                    Выйти
                </MenuItem>
            </MenuList>
        </Menu>
)}
