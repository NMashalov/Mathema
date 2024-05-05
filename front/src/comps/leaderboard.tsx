import { TableContainer, Table, Tbody, Tr, Th, Thead, Td} from '@chakra-ui/react'

export interface ILeaderBoard{
    title: string,
}


function LeadboardHead(){
    return (
        <Thead>
            <Tr>
                <Th>To convert</Th>
                <Th>into</Th>
                <Th isNumeric>multiply by</Th>
            </Tr>
        </Thead>
    )
}

function LeadboardRow(){
    return (
        <Tr>
            <Td>inches</Td>
            <Td>millimetres (mm)</Td>
            <Td isNumeric>25.4</Td>
        </Tr>
    )
}



export function LeaderBoard() {


    return (
        <TableContainer>
            <Table variant='striped' colorScheme='teal'>
            <LeadboardHead/>
            <Tbody>
                <LeadboardRow/>
            </Tbody>
            </Table>
    </TableContainer>
    )
}