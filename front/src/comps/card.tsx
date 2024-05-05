import { Tooltip,Button, Image, VStack, HStack, Tag, Text,StackDivider } from "@chakra-ui/react";
import { useNavigate } from "react-router";
import { IGameDescription } from "../structs/games";
const Hint = ({hint} : {hint:string}) => (
    <Tooltip id="button-tooltip">
      {hint}
    </Tooltip>
);


interface IHintButton{
    hintText: string;
    buttonText: string;
    navigateLink: string;
}



function HintButton(buttonProps :IHintButton) {

    const navigate = useNavigate()

    return (
        <Tooltip label={<Hint hint={buttonProps.hintText}/>}>
            <Button onClick={()=> navigate(buttonProps.navigateLink)}variant="success">
                {buttonProps.buttonText}
            </Button>
        </Tooltip>
    );
}


function TagGroup({tags}:{tags: Array<string>}){

    return(
        <HStack align={'center'}>
            {tags.map((tag) => (
                <Tag key={tag}>{tag}</Tag>
            ))}
        </HStack>
    )

}

interface GameCardProps extends  IGameDescription{
    title: string;
}



export const GameCard = (cardProps : GameCardProps) => { 

    return (
            <VStack
                className="card"
                divider={<StackDivider borderColor='gray.200' />}
                spacing={4}
            >
                <Text fontSize='2xl' textAlign='center'>
                    {cardProps.name}
                </Text>
                <Image
                    src={cardProps.image} 
                    borderRadius='lg'
                />
                <TagGroup tags={[cardProps.difficulty, ...cardProps.media]}/>
                <Text  textAlign='center'>
                    {cardProps.description}
                </Text>         
                <HStack align={'center'}>
                    <HintButton
                        navigateLink={cardProps.url}
                        hintText='Узнать про правила игры'
                        buttonText='Правила'
                    />
                    <HintButton
                        navigateLink={cardProps.url}
                        hintText='Переход к описанию игры'
                        buttonText='Играть'
                    />
                </HStack>
            </VStack>
    )
}