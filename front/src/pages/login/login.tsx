import { useState, useEffect } from 'react';
import { useAtom } from 'jotai';
import axios from 'axios';
import { isLogged } from 'src/store';
import { AnimatedShapes } from 'src/anim/landing/source';
import { Input, Button, VStack,Text, HStack, ChakraProvider, Divider } from '@chakra-ui/react';
import './login.css'


export function LoginPage() {
    const [isLoggedIn,setIsLoggedIn] = useAtom(isLogged) //useAtom(isLogged)
    const [formUsername, setFormUsername] = useState('')
    const [formPassword, setFormPassword] = useState('')

   const submitHandler = e => {
    e.preventDefault();

    axios.defaults.xsrfCookieName = 'csrftoken'
    axios.defaults.xsrfHeaderName = 'X-CSRFToken'

    axios.post(    
        '/api/login',
        {
            username: formUsername,
            password: formPassword,
        },

    )
       .then(() => {
            setIsLoggedIn(true)
       })
       .catch(error => {
            console.log(error)
      })
    }
   return (
    <>
        <AnimatedShapes>
            <ChakraProvider>
                <VStack  className="loginForm" >
                    <Text fontSize={'large'}>Авторизация</Text>
                    <Divider/>
                    <Input type="text" name="username" value={formUsername} onChange={e => setFormUsername(e.target.value)} placeholder="Имя"/>
                    <Input type="password" name="password" value={formPassword} onChange={e => setFormPassword(e.target.value)} placeholder="Пароль"/>
                    <HStack>
                        <Button type="submit" name="submit" onClick={submitHandler}>Войти</Button>
                        <Button type="submit" name="submit" >Регистрация</Button>
                    </HStack>
                </VStack>
            </ChakraProvider>
        </AnimatedShapes>
    </>
    )
}