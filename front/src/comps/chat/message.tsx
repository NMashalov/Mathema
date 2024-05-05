import {Spacer, StackDivider, VStack,Text, Box, HStack} from "@chakra-ui/react";
import { useState } from "react";
import Avatar, { genConfig } from 'react-nice-avatar';

export function StartPrompts({children}){
    return <HStack>
        {children}
    </HStack>
}




function ContextMenu(){
    return (
        <VStack
            className="message menu" 
            divider={<StackDivider borderColor='gray.200' />}
        >
            <Text>Delete</Text>
            <Text>Reaction</Text>
        </VStack>
    )
}

export interface MessageProps{
    content: string,
    role: string
}

export function Message(props: MessageProps){
    const [avatarCfg] = useState(genConfig())
    const [msg]= useState(props.content)
    const [role] = useState(props.role)
    const [showMenu,setShowMenu] = useState(false)
    return (
        <div className='messageRow'>
            { role ==='assistant' ?  <Spacer/> : null}  
            
            <Avatar style={{ width: '3rem', height: '3rem' }} {...config}/>
            <div className='message' onContextMenu={() => setShowMenu(true)}>
                <Text>{msg}</Text>
                {showMenu && <ContextMenu/>}
            </div>
            { role ==='user' ?  <Spacer/> : null}
        </div>
    )
}