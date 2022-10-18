import { RepeatClockIcon } from '@chakra-ui/icons'
import { Button, Flex, IconButton } from '@chakra-ui/react'
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router'
import { goToHistory, goToHome } from '../routes/coordinator'
import { GlobalContext } from './global/GlobalContext'

export default function () {
    const navigate = useNavigate()
    const { onHome, onHistory, setSearchHistory } = useContext(GlobalContext)

    const onClickHandler = (page) => {
        if (page === 'home') {
            goToHome(navigate)
        } else if (page === 'history') {
            goToHistory(navigate)
        }
    }

    const clearHistory = () => {
        localStorage.setItem('search-history', JSON.stringify([]))
        setSearchHistory([])
    }

    return (
        <Flex align={'center'} paddingTop={'5rem'} flexDir={'column'} gap={'10px'} justify={'center'}>
            <Flex gap={'20px'} justify={'center'}>
                {onHome ? <Button onClick={() => onClickHandler('home')} w={'100px'}>Home</Button> : <Button bg={'white'} onClick={() => onClickHandler('home')} w={'100px'}>Home</Button>}
                {onHistory ? <Button onClick={() => onClickHandler('history')} w={'100px'}>History</Button> : <Button bg={'white'} onClick={() => onClickHandler('history')} w={'100px'}>History</Button>}
            </Flex>
            {onHistory && <IconButton icon={<RepeatClockIcon />} bg={'white'} onClick={() => clearHistory()}/>}
        </Flex>
    )
}
