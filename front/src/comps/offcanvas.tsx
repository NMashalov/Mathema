import { Button, Drawer, VStack, useDisclosure } from "@chakra-ui/react"
import { useRef } from "react"




function SideCar(){

  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = useRef()

  return (
    <>
      <Button ref={btnRef} colorScheme='teal' onClick={onOpen}>
        Open
      </Button>
      <Drawer
        isOpen={isOpen}
        placement='right'
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <VStack>

        </VStack>
      </Drawer>
    </>
    )
}