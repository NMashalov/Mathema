import { useState,} from "react"
import './canvas.css'
import {SandBox} from "./sandbox"
import {Editor }from '@monaco-editor/react'
import { Button, HStack,Text, Divider, Menu, MenuButton, MenuList, VStack } from "@chakra-ui/react"
import { CheckIcon, CloseIcon } from "@chakra-ui/icons"
import { Textarea } from "@chakra-ui/react";
import React from "react";


function PromptMenu(){
    return <Menu>
        <MenuButton>
            Ассистент постарается нарисовать или выберет из галереи
        </MenuButton>
        <MenuList>
            <VStack>
                <Text>Работа с текстом</Text>
            </VStack>
        </MenuList>
    </Menu>
}

function PromptBox(){ 
    return (
        <div className="PromptBox">
            <PromptMenu/>
            <Textarea
                resize="none"
                height="50%"
                width="80%"
                borderRadius='15px'
            />
        </div>
    )
}
const test = `script`


function DrawHeadder(){
    return <Text>Интерактивное рисование</Text>
}

export function Draw(){

    const [running, setRunning] = useState(false) 
    const [script, setScript] = useState(test) 

    return (
        <VStack>
            <DrawHeadder/>
        <div className='DrawSpace'>
            <HStack>
                <div className="DrawBox">
                    <VStack>
                        <PromptBox  />
                        <Divider/>
                        <Editor 
                            height="40%"
                            width="40vh"
                            defaultLanguage="javascript"
                            onChange={(value,event) => {setScript(value); console.log(script)}}
                        />
                    </VStack>
                </div>
                <div className="DrawBox">
                    <VStack>
                        <HStack>
                            <Button onClick={()=>setRunning(true)}><CheckIcon/></Button>
                            <Button onClick={()=>setRunning(false)}><CloseIcon/></Button>
                        </HStack>
                        <SandBox running={running} script={script}/>
                    </VStack>
                </div>
            </HStack>
        </div>
        </VStack>
    )

}
