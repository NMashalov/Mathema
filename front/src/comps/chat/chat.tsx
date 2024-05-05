import { useState } from "react";
import { Message, MessageProps, StartPrompts} from "./message";
import { useAtom } from "jotai";
import { chatHistory } from "./chat_store";
import { Divider, VStack,  Button, Input,Text, HStack, CloseButton, InputGroup, InputRightElement, Center} from "@chakra-ui/react";
import { test_chat } from "./test";
import './chat.css'
import { ChatIcon, EmailIcon } from "@chakra-ui/icons";


interface ChatHeaderProps{
    onClick: () => void
}

function ChatHeader(props: ChatHeaderProps){
    
    return (
        <HStack className='chatHeader'>
            <Text>Ассистент </Text>
            <CloseButton onClick={props.onClick}/>
        </HStack>
    )
}


interface ChatFooterProps{
    onClick: () => void,
    inputMsg: string,
    setInputMsg: (key:string) => void
}

function ChatFooter(props: ChatFooterProps){

    return (
    <div className='chatFooter'>
        <InputGroup size='md'>
            <Input value={props.inputMsg} onChange={(e) => props.setInputMsg(e.target.value)} placeholder='Твое сообщение'/>
            <InputRightElement width='4.5rem'>
                <Button h='1.75rem' size='sm' onClick={()=>{}}>
                    <EmailIcon/>
                </Button>
            </InputRightElement>
        </InputGroup>
    </div>
    )
}

interface ChatLayoutProps{
    chat: MessageProps[]
}


function ChatLayout(props: ChatLayoutProps){

    const [active,setActive] = useState(false)

    const [inputMsg,setInputMsg] = useState('')

    const [chat] = useState(props.chat)

    console.log(chat.length)

    return (
        <>
        {active ?
            <div className="chatLayout">
                <ChatHeader onClick={()=>setActive(false)}/>
                <div className="chatBody">
                {
                    chat.length > 0 ?
                    <VStack>
                        {chat.map((message)  => <Message {...message}/>)}
                    </VStack>
                    :
                    <StartPrompts>
                        <Button>Расскажи мне про сайт</Button>
                    </StartPrompts>
                }
                </div>
                <ChatFooter inputMsg={inputMsg} setInputMsg={setInputMsg} onClick={()=>{}}/>
            </div>
        :
            <Button onClick={() => setActive(true)}>
                <ChatIcon/>
            </Button>
        }
        </>
    )
}


export function Chat(){

    // const [chat,setChat] = useAtom(chatHistory)

    
    // const [{ data, loading, error }, refetch] = useAxios(
    //     '/ws'
    //   )
    const [messages] = useState(test_chat);

    return (
        <div className="chat">
            <ChatLayout chat={messages}/>
        </div>
    )
}