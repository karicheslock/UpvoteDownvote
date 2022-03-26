import { Container, VStack } from '@chakra-ui/core';
import React, { useEffect, useState } from 'react';
import Post from './components/post';
import db from './lib/firebase-config';
import { query, getDocs, collection, orderBy, onSnapshot } from 'firebase/firestore';
import Navbar from './components/navbar';

function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'));
      await getDocs(q).then((querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPosts(data);
      })
    }
    
  }, []);

  useEffect(() => {
    const q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'));
    onSnapshot(q, (querySnapshot) => {
      const _posts = [];

      querySnapshot.forEach((doc) => {
        _posts.push({
          id: doc.id,
          ...doc.data(),
        });
      });

      setPosts(_posts);
    });
  }, []);

  return (
    <>
      <Navbar />
      <Container maxW='lg' centerContent p={8}>
        <VStack spacing={8} w='100%'>
          {posts.map((post) => (
            <Post post={post} key={post.id} />
          ))}
        </VStack>
      </Container>
    </>
  );
}

export default App;
