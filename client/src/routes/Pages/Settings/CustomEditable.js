import React from "react";
import { 
    useEditableControls, 
    Editable, 
    EditableInput, 
    EditablePreview, 
    ButtonGroup, 
    IconButton, 
    
    Flex, 
    Input, 
    HStack,
    Text
} from "@chakra-ui/react";

import { 
    CheckIcon, 
    CloseIcon, 
    EditIcon, 
} from '@chakra-ui/icons';

const CustomEditable = ({ label, value, onChange, onSubmit, onCancel }) => {

    const EditableControls = () => {
        const {
            isEditing,
            getSubmitButtonProps,
            getCancelButtonProps,
            getEditButtonProps,
        } = useEditableControls()

        return isEditing ? (
            <ButtonGroup justifyContent='center' size='sm'>
                <IconButton icon={<CheckIcon />} {...getSubmitButtonProps()} />
                <IconButton icon={<CloseIcon />} {...getCancelButtonProps()} />
            </ButtonGroup>
            ) : (
            <Flex justifyContent='center'>
                <IconButton size='sm' icon={<EditIcon />} {...getEditButtonProps()} />
            </Flex>
        )
    }

    return (
        <HStack spacing={4}>
            <Text fontSize='xl' color='gray.500'>
                {label}
            </Text>
            <Editable
                textAlign='center'
                value={value}
                onChange={onChange}
                onSubmit={onSubmit}
                onCancel={onCancel}
                >
                <EditablePreview />
                <Input as={EditableInput} />
                <EditableControls />
            </Editable>
        </HStack>
    )
}

export default CustomEditable;