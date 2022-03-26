import { IconButton, Text, VStack } from "@chakra-ui/core";
import React, { useEffect, useState } from 'react';
import { FiThumbsUp, FiThumbsDown } from 'react-icons/fi';
import db from '../lib/firebase-config';
import { doc, setDoc } from 'firebase/firestore'; 

function VoteButtons({ post }) {
    const [votedPosts, setVotedPosts] = useState([]);
    const [isVoting, setIsVoting] = useState(false);

    useEffect(() => {
        const votesFromLocalStorage = localStorage.getItem('votes');
        let previousVotes = [];

        try {
            if (votesFromLocalStorage === null) {
                previousVotes = [];
            } else {
                previousVotes = JSON.parse(votesFromLocalStorage);
            }
        } catch (error) {
            console.error(error);
        }

        setVotedPosts(previousVotes);
    }, []);

    const handleDisablingOfVoting = (postId) => {
        const previousVotes = votedPosts;
        previousVotes.push(postId);

        setVotedPosts(previousVotes);

        localStorage.setItem('votes', JSON.stringify(votedPosts));
    };


    const handleClick = async (type) => {
        
        let upVotesCount = post.upVotesCount;
        let downVotesCount = post.downVotesCount;

        const date = new Date();

        if (type === 'upvote') {
            upVotesCount += 1;
        } else {
            downVotesCount += 1;
        }

        const postRef = doc(db, 'posts', post.id);
        await setDoc(postRef, {
            title: post.title,
            upVotesCount,
            downVotesCount,
            createdAt: post.createdAt,
            updatedAt: date.toUTCString(),
        });

        handleDisablingOfVoting(post.id);

        if (!isVoting){
            setIsVoting(true);
        }
        
    };

    const checkIfPostIsAlreadyVoted = () => {
        if (votedPosts.indexOf(post.id) > -1) {
            return true;
        } else {
            return false;
        }
    }

    return (
        <>
            <VStack>
                <IconButton 
                    size='lg'
                    colorScheme="teal"
                    aria-label="Upvote"
                    icon={<FiThumbsUp />}
                    onClick={() => handleClick('upvote')}                   
                    isDisabled={checkIfPostIsAlreadyVoted()}
                />
                <Text bg='teal.50' rounded='md' w='100%' p={1}>
                    {post.upVotesCount}
                </Text>
            </VStack>
            <VStack>
                <IconButton 
                    size='lg'
                    colorScheme="pink"
                    aria-label="Downvote"
                    icon={<FiThumbsDown />}
                    onClick={() => handleClick('downvote')}
                    isDisabled={checkIfPostIsAlreadyVoted()}
                />
                <Text bg='pink.50' rounded='md' w='100%' p={1}>
                    {post.downVotesCount}
                </Text>
            </VStack>
        </>
    );
};

export default VoteButtons;