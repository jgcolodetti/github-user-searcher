import React from 'react'
import { Button, Flex, Text, Alert, AlertIcon, AlertTitle, Stack, InputGroup, InputLeftElement, Input, Heading, Divider } from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons'
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import UserCard from '../components/UserCard';
import { GlobalContext } from '../components/global/GlobalContext';

export default function Home() {
    const { user, searchInput, setSearchInput, setSearchError, setSearchResponse, searchResponse, searchError, getUser, userNotFound, repositories, errorRepositories, setOnHome, setOnHistory } = useContext(GlobalContext)

    const onChangeHandler = (e) => {
        setSearchInput(e)
        setSearchError(false)
        if (e.length > 3) {
            axios.get(`https://api.github.com/search/users?q=${e}&per_page=10`)
                .then((res) => {
                    const temp = res.data.items
                    setSearchResponse(temp)
                })
                .catch((err) => {
                    setSearchError(true)
                })

        }
    }

    useEffect(() => {
        setOnHome(true)
        setOnHistory(false)
    }, [])


    return (
        <Flex flexDir={'column'} w={{ base: '100%', lg: '50%' }} minH={'101vh'} align={'center'} marginX={'auto'}>
            <Heading marginY={'80px'}>Search Github users</Heading>
            <Flex justify={'center'} w={'100%'} gap={'20px'}>
                <Flex flexDir={'column'}>
                    <InputGroup w={{base: '55vw', lg: '20vw'}}>
                        <InputLeftElement
                            pointerEvents='none'
                            children={<SearchIcon color='gray.300' />}
                        />
                        <Input type='username' placeholder='Username' onChange={(e) => onChangeHandler(e.target.value)} value={searchInput} />
                    </InputGroup>
                    {(searchResponse.length > 0) && <Flex flexDir={'column'} justify={'flex-start'} align={'flex-start'} w={'100%'} paddingX={'10px'} borderX={'1px solid gray'} borderBottom={'1px solid gray'} background={'#F5F5F5'}>
                        {(searchResponse.length > 0 && !searchError) && searchResponse.map((item) => {
                            return <>
                                <Text margin={'5px'} w={'100%'} onClick={() => getUser(item.login)} _hover={{ cursor: 'pointer' }}>{item.login}</Text>
                                <Divider />
                            </>
                        })
                        }
                        {searchError && <Text margin={'5px'} w={{base: '45vw', lg: '15vw'}}>Too many requests, wait a few seconds...</Text>}
                    </Flex>
                    }
                </Flex>
                <Button onClick={() => getUser(searchInput)}>Search</Button>
            </Flex>
            <Flex flexDir={'column'} justify={'center'} align={'center'} marginY={'40px'}>
                {(user && !userNotFound) && <UserCard response={user} repositories={repositories} />}
                {userNotFound &&
                    <Alert status='error' marginTop={'40px'}>
                        <AlertIcon />
                        <AlertTitle>User not found.</AlertTitle>
                    </Alert>
                }
            </Flex>
        </Flex>
    )
}
