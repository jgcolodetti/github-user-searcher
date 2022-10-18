import { Divider, Flex, Text, Button } from '@chakra-ui/react'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { GlobalContext } from '../components/global/GlobalContext'
import { goToHome } from '../routes/coordinator'

export default function History() {
  const { searchHistory, getUser, setOnHistory, setOnHome, setSearchHistory } = useContext(GlobalContext)
  const [timeNow, setTimeNow] = useState(Date)
  const navigate = useNavigate()

  useEffect(() => {
    setTimeNow(new Date().getTime())
    setOnHistory(true)
    setOnHome(false)
    if (localStorage.getItem('search-history') && localStorage.getItem('search-history').length > 0) {
      setSearchHistory(JSON.parse(localStorage.getItem('search-history')))
    }
  }, [])

  const onClickHandler = (username) => {
    getUser(username)
    goToHome(navigate)
  }

  return (
    <Flex justify={'center'} minH={'101vh'}>
      {searchHistory.length > 0 && <Flex flexDir={'column'} gap={'20px'} borderRadius={'32px'} padding={{ base: '1.5rem', lg: '3rem' }} boxShadow={'lg'} marginY={'40px'} bg={'gray.100'} h={'5%'}>
        {searchHistory.length > 0 && searchHistory.map((item) => {
          return <Flex w={{ base: '75vw', lg: '25vw' }} flexDir={'column'} gap={'15px'} onClick={() => onClickHandler(item.name)} _hover={{ cursor: 'pointer' }}>
            <Flex justify={'space-between'}>
              <Text textOverflow={'ellipsis'} overflow={'hidden'} maxW={'50%'} whiteSpace={'nowrap'} fontWeight={'700'}>{item.name}</Text>
              <Text textOverflow={'ellipsis'} overflow={'hidden'}>{((timeNow - item.time) / 60000).toFixed() > 1 ? ((timeNow - item.time) / 60000).toFixed() + ' minutes ago' : ' few seconds ago'}</Text>
            </Flex>
            <Divider />
          </Flex>
        })}
      </Flex>}
    </Flex>
  )
}
