import React, { useContext, useEffect } from 'react'
import {
    Divider,
    Flex,
    Heading,
    Image,
    Link,
    Text,
    Button
} from '@chakra-ui/react';
import { GlobalContext } from './global/GlobalContext';

export default function UserCard({ response, repositories }) {
    const { errorRepositories } = useContext(GlobalContext)

    return (
        <>
            <Flex flexDir={'column'} justify={'center'} borderRadius={'32px'} padding={'2rem'} boxShadow={'2xl'} marginY={'40px'} bg={'gray.100'} w={{base: '90%'}}>
                <Flex gap={{base: '1rem', lg: '2rem'}} textAlign={'center'} justify={'center'}>
                    <Image src={response.avatar_url} w={{base: '180px', lg: '300px'}} h={{base: '220px', lg:'300px'}}borderRadius={'50%'} />
                    <Flex flexDir={'column'} gap={{base: '0.8rem', lg: '1.5rem'}} justify={'center'} align={'center'}>
                        <Heading fontSize={{base: '1.2rem', lg: '2rem'}}>{response.name}</Heading>
                        <Text fontWeight={600} color={'gray.500'} fontSize={{base: '0.8rem', lg: '1rem'}}>{response.login}</Text>
                        {response.email !== null && <Text fontSize={{base: '0.8rem', lg: '1rem'}}>{response.email}</Text>}
                        {response.bio !== null && <Text fontWeight={600} fontSize={{base: '0.8rem', lg: '1rem'}}>{response.bio}</Text>}
                        <Flex justify={'center'} gap={{base: '0.5rem', lg: '2rem'}} fontSize={{base: '0.8rem', lg: '1rem'}}>
                            <Text>Followers <Text fontWeight={700}>{response.followers}</Text></Text>
                            <Text>Following <Text fontWeight={700}>{response.following}</Text></Text>
                        </Flex>
                        <Text fontWeight={700} color={'gray.600'} fontSize={{base: '0.8rem', lg: '1rem'}}>{response.location}</Text>
                        <Button bg={'gray.200'} _hover={{ bg: 'gray.300' }} size={{base: 'sm', lg: 'lg'}}><Link style={{ textDecoration: 'none' }} href={response.html_url} target='_blank'>Profile</Link></Button>
                    </Flex>
                </Flex>
                <Flex marginTop={'3rem'} flexDir={'column'} >
                    <Heading fontSize={{base: '1.1rem', lg: '3xl'}} padding={'1rem'}>Repositories</Heading>
                    <Divider />
                    <Flex flexWrap={'wrap'} gap={'1rem'} marginTop={'20px'}>
                        {repositories.length > 0 && repositories.map((item) => {
                            return <Flex flexDir={'column'} w={{base: '47%', lg: '48.5%'}} gap={'10px'} padding={'1rem'}>
                                <Link href={item.html_url} target="_blank">
                                    <Text fontWeight={700} fontSize={'1.1rem'} _hover={{ cursor: 'pointer' }} color={'blue.700'}>{item.name}</Text>
                                </Link>
                                <Text fontSize={'0.9rem'}>{item.description}</Text>
                            </Flex>
                        })}
                        {errorRepositories === true && <Text padding={'1rem'}>No repositories found.</Text>}
                    </Flex>
                </Flex>
            </Flex>
        </>
    )
}

