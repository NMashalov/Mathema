import { HStack } from "@chakra-ui/react";
import { BlockNote } from "../../comps/note";
import { EmojiAvatar } from "src/comps/emojis/avatar";


export function StoryGame(){
    return (
        <HStack>
            <BlockNote/>
            <EmojiAvatar/>
        </HStack>
        
    )
}