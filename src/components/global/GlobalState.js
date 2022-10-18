import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { GlobalContext } from './GlobalContext'



export default function GlobalState(props) {
    const [searchHistory, setSearchHistory] = useState([])
    const [searchError, setSearchError] = useState(false)
    const [user, setUser] = useState('')
    const [searchInput, setSearchInput] = useState('')
    const [searchResponse, setSearchResponse] = useState([])
    const [userNotFound, setUserNotFound] = useState(false)
    const [repositories, setRepositories] = useState([])
    const [errorRepositories, setErrorRepositories] = useState(false)
    const [onHome, setOnHome] = useState(true)
    const [onHistory, setOnHistory] = useState(false)


    const getUser = (username) => {
        if (username !== '') {
            const timeNow = new Date().getTime()
            const historyItem = { name: username, time: timeNow }
            const tempSearchHistory = [...searchHistory, historyItem]
            setSearchHistory(tempSearchHistory.reverse())
            localStorage.setItem('search-history', JSON.stringify(tempSearchHistory.reverse()))
        }

        setSearchError(false)
        setSearchInput('')
        setSearchResponse([])
        axios.get(`https://api.github.com/users/${username}`)
            .then((response) => {
                setUser(response.data)
                setSearchInput('')
                setUserNotFound(false)
            })
            .catch((err) => {
                setUserNotFound(true)
            })

        setErrorRepositories(false)
        axios.get(`https://api.github.com/users/${username}/repos`)
            .then((res) => {
                if (res.data.length > 10) {
                    const repos = res.data.slice(0, 10)
                    setRepositories(repos)
                } else if (res.data.length === 0) {
                    setErrorRepositories(true)
                    setRepositories(res.data)
                } else {
                    setRepositories(res.data)
                }
            })
            .catch((err) => {
                setErrorRepositories(true)
            })
    }


    const values = {
        getUser,
        searchHistory,
        searchError,
        searchInput,
        user,
        searchResponse,
        userNotFound,
        repositories,
        errorRepositories,
        setSearchInput,
        setSearchError,
        setSearchResponse,
        onHome,
        onHistory,
        setOnHome,
        setOnHistory,
        setSearchHistory,
        setErrorRepositories
    }

    const Provider = GlobalContext.Provider;
    return (<Provider value={values}>{props.children}</Provider>)
}