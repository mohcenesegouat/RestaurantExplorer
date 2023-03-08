import React, { useState, createContext, useEffect } from 'react'

import { locationRequest, locationTransform } from './location.service'
export const LocationContext = createContext()

export const LocationContextProvider = ({ children }) => {

    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const [location, setLocation] = useState(null)
    const [keyword, setKeyword] = useState()

    const onSearch = (searchKeyword = "Antwerp") => {
        setKeyword(searchKeyword)
        setIsLoading(true)
        locationRequest(searchKeyword.toLowerCase())
            .then(locationTransform)
            .then((result) => {
                setLocation(result)
                setIsLoading(false)
            })
            .catch((err) => {
                setError(err)
                setIsLoading(false)
            })
    }

    useEffect(() => {
        onSearch(keyword)
    }, [])
    return (

        <LocationContext.Provider
            value={
                {
                    isLoading,
                    error,
                    location,
                    search: onSearch,
                    keyword,

                }
            }
        >
            {children}
        </LocationContext.Provider>
    )

}