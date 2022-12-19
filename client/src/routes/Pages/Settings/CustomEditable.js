import React, { useState } from "react";
import { 
    Button,
    Input, 
    HStack,
    Text,
    FormControl,
    FormLabel,
    ButtonGroup,
    IconButton,
    Icon
} from "@chakra-ui/react";

import { 
    CheckIcon, 
    CloseIcon, 
    EditIcon, 
} from '@chakra-ui/icons';

const CustomEditable = ({ label, type, value, onChange, onSubmit, onCancel }) => {
    const [ isEditing, setIsEditing ] = useState(false)

    const startEditing = (event) => {
        event.preventDefault()
        setIsEditing(true)
    }

    const cancelEditing = (event) => {
        event.preventDefault()
        setIsEditing(false)
        onCancel()
    }

    return (
        <form onSubmit={(event) => {
                onSubmit(event)
                setIsEditing(false)
            }
        }>
            <FormControl>
                <HStack spacing={4}>
                    <FormLabel mt={isEditing ? 0 : 2} id={`${label}-label`} htmlFor={label}>{label}</FormLabel>
                    {
                        isEditing ?
                        (
                            <>
                                <Input 
                                    id={label} 
                                    type={type} 
                                    value={value} 
                                    onChange={onChange}  
                                    color='gray.600'
                                />  
                                <ButtonGroup>
                                    <IconButton icon={<CheckIcon />} type='submit' />
                                    <IconButton icon={<CloseIcon />} type='button' onClick={cancelEditing} />
                                </ButtonGroup>                              
                            </>
                            
                        )
                        :
                        (
                            <>
                                {
                                    typeof(value) === 'string' &&
                                    <Text>{value.trim() ? value.trim() : 'Please fill this out'}</Text>    
                                }
                                {
                                    typeof(value) === 'number' &&
                                    <Text>{value ? value : 'Please fill this out unless it actually is 0...'}</Text>
                                }
                                <IconButton icon={<EditIcon />} type='button' onClick={startEditing}/>
                            </>

                        )
                    }
                </HStack>
            </FormControl>
        </form>
        
    )
}

export default CustomEditable;