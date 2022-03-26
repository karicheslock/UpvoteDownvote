import {
    Button,
    FormControl,
    FormLabel,
    Textarea,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    HStack,
    useDisclosure,
} from '@chakra-ui/core';
import React, { useState } from 'react';
import db from '../lib/firebase-config';
import { collection, addDoc } from 'firebase/firestore';

function AddNewPost() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [title, setTitle] = useState('');

    const handleSubmit = async () => {
        const date = new Date();
        await addDoc(collection(db, 'posts'), {
            title,
            upVotesCount: 0,
            downVotesCount: 0,
            createdAt: date.toUTCString(),
            updatedAt: date.toUTCString(),
        });

        onClose();
        setTitle('');
    };

    return (
        <>
            <Button onClick={onOpen} colorScheme='blue'>
                Add new post
            </Button>

            <Modal onClose={onClose} isOpen={isOpen} isCentered>
                <ModalOverlay>
                    <ModalContent>
                        <ModalHeader>Add new post</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <FormControl id='post-title'>
                                <FormLabel>Post</FormLabel>
                                <Textarea 
                                    type='post-title'
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </FormControl>
                        </ModalBody>
                        <ModalFooter>
                            <HStack spacing={4}>
                                <Button onClick={onClose}>Close</Button>
                                <Button
                                    onClick={handleSubmit}
                                    colorScheme='blue'
                                    disabled={!title.trim()}                                   
                                >
                                    Save
                                </Button>
                            </HStack>
                        </ModalFooter>
                    </ModalContent>
                </ModalOverlay>
            </Modal>
        </>
    );
};

export default AddNewPost;