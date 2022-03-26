import { Box, Container, Flex, Text } from '@chakra-ui/core';
import React from 'react';
import AddNewPost from './add-new-post';

function Navbar() {
    return (
        <Box position='sticky' top={0} p={4} bg='blue.100' zIndex={1}>
            <Container maxW='md' centerContent>
                <Flex justifyContent='space-between' alignItems='center' w='100%' position='sticky' top={0}>
                    <Text fontSize='4xl' color='gray.500' fontWeight='bold'>Welcome to PostHub</Text>
                    <AddNewPost />
                </Flex>
            </Container>
        </Box>
    );
};

export default Navbar;