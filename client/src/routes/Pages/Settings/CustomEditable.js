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

    const onSubmitWrapper = async (event) => {
        try {
            onSubmit(event)
            setIsEditing(false)
        } catch (e) {
            alert(e)
        }
    }


    return (
        <form onSubmit={onSubmitWrapper}>
            <FormControl>
                <HStack spacing={4}>
                    <FormLabel mt={isEditing ? 0 : 2} id={`${label}-label`} htmlFor={label}>{label}</FormLabel>
                    {
                        isEditing ?
                        (
                            <>
                                <Input id={label} type={type} value={value} onChange={onChange}/>  
                                <ButtonGroup>
                                    <IconButton icon={<CheckIcon />} type='submit' onSubmit={onSubmitWrapper} />
                                    <IconButton icon={<CloseIcon />} type='button' onClick={cancelEditing} />
                                </ButtonGroup>                              
                            </>
                            
                        )
                        :
                        (
                            <>
                                <Text color='gray.500'>{value}</Text>
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