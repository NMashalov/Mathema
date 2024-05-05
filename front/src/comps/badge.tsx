import {Card, CardBody, Image,Stack } from "@chakra-ui/react"

export interface BadgeProps {
    title: string,
    image: string,
}

export function Badge(props:BadgeProps) {
    return (
        <Card>
            <CardBody>
                <Image src={props.image} alt={props.title}/>
                <Stack mt='6' spacing='3'>   
                </Stack>
            </CardBody>
        </Card>
    )
}


