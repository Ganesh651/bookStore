/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { CiSearch } from "react-icons/ci";
import Header from '../Header'
import BooksCategory from '../BooksCategory'
import './index.css'
import { useState, useEffect } from 'react'
import Cookies from 'js-cookie'
import { ThreeDots } from 'react-loader-spinner'
import Footer from '../Footer';
import BooksList from '../BooksList';
import FailureView from '../FailureView';

const bookshelvesList = [
  {
    id: '22526c8e-680e-4419-a041-b05cc239ece4',
    labelValue: 'ALL',
    label: 'All',
  },
  {
    id: '37e09397-fab2-46f4-9b9a-66b2324b2e22',
    labelValue: 'READ',
    label: 'Read',
  },
  {
    id: '2ab42512-3d05-4fba-8191-5122175b154e',
    labelValue: 'CURRENTLY_READING',
    label: 'Currently Reading',
  },
  {
    id: '361d5fd4-9ea1-4e0c-bd47-da2682a5b7c8',
    labelValue: 'WANT_TO_READ',
    label: 'Want to Read',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}


const BookShelves = () => {
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial)
  const [fetchedData, setFetchedData] = useState([])
  const [activeTab, setActiveTab] = useState(bookshelvesList[0].labelValue)
  const [activeLabel, setActiveLabel] = useState(bookshelvesList[0].label)
  const [activeId, setActiveId] = useState(bookshelvesList[0].id)
  const [searchInput, setSearchInput] = useState("")
  console.log(fetchedData)
  const token = Cookies.get("jwt_token")
  const options = {
    method: "GET",
    headers: {
      authorization: `Bearer ${token}`
    }
  }
  const url = `https://apis.ccbp.in/book-hub/books?shelf=${activeTab}&search=${searchInput}`

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

  const handdlerSearch = () => {
    getData()
    setSearchInput("")
  }

  useEffect(() => {
    getData()
  }, [url, activeTab])

  const searchHanddler = (e) => {
    setSearchInput(e.target.value)
  }

  const changeActiveTab = (id, labelValue, label) => {
    setActiveId(id)
    setActiveTab(labelValue)
    setActiveLabel(label)
  }

  const renderSidebar = () => (
    <div className='sidebar-container'>
      <h2>Bookshelves</h2>
      <div>
        {bookshelvesList.map(shelf => (
          <BooksCategory
            shelf={shelf}
            key={shelf.id}
            isActive={shelf.id === activeId}
            changeActiveTab={changeActiveTab}
          />
        ))}
      </div>
    </div>
  )

  const renderLoaderView = () => (
    <div className='loader-container'>
      <ThreeDots color='green' height={50} width={50} />
    </div>
  )

  const renderSuccesView = () => (
    <div className='list-container'>
      {fetchedData.books.map(eachBook => (
        <BooksList eachBook={eachBook} key={eachBook.id} />
      ))}
    </div>
  )

  const renderFailureView = () => <FailureView getData={getData} />

  const renderBooksView = () => {
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return renderLoaderView()
      case apiStatusConstants.success:
        return renderSuccesView()
      case apiStatusConstants.failure:
        return renderFailureView()
      default:
        return null
    }
  }

  const renderBookList = () => (
    <div className="books-list-container">
      <div className='books-list-header'>
        <h3>{activeLabel} Books</h3>
        <div className='search-container'>
          <input type='search'
            className='search-input'
            placeholder='Search'
            onChange={searchHanddler}
            value={searchInput}
          />
          <div className='search-icon-container' onClick={handdlerSearch}>
            <CiSearch />
          </div>
        </div>
      </div>
      {renderBooksView()}
      <Footer />
    </div>
  )




  return (
    <>
      <Header />
      <div className='books-shelf-container'>
        {renderSidebar()}
        {renderBookList()}
      </div>
    </>
  )
}

export default BookShelves
