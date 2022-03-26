import { Box, HStack, Text } from '@chakra-ui/core';
import React from 'react';
import VoteButtons from './vote-buttons';

function Post({ post }) {
    return (
        <HStack key={post.id} w='100%' alignItems='flex-start'>
            <VoteButtons post={post} />
            <Box bg='blue.50' p={4} rounded='md' w='100%'>
                <Text color='gray.600'>{post.title}</Text>
            </Box>
        </HStack>
    )
}

export default Post;