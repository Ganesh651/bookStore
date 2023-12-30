/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const useFetch = (url, options) => {
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial)
  const [fetchedData, setFetchedData] = useState([])

  useEffect(() => {
    const getData = async () => {
      setApiStatus(apiStatusConstants.inProgress)
      const response = await fetch(url, options)
      const data = await response.json()
      if (response.ok === true) {
        setApiStatus(apiStatusConstants.success)
        setFetchedData(data)
      } else {
        setApiStatus(apiStatusConstants.failure)
      }

    }
    getData()
  }, [])


  return { fetchedData, apiStatus }
}

export default useFetch