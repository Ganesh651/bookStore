/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import Header from '../Header'
import Footer from '../Footer'
import { useParams } from 'react-router-dom'
import { ThreeDots } from 'react-loader-spinner'
import FailureView from '../FailureView'
import { FaStar } from 'react-icons/fa'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const BookDetails = () => {
  const [specificBookData, setSpecificBookData] = useState({})
  const [status, setStatus] = useState(apiStatusConstants.initial)
  const { id } = useParams()
  console.log(specificBookData)

  const getSpecificBook = async () => {
    const token = Cookies.get("jwt_token")
    const url = `https://apis.ccbp.in/book-hub/books/${id}`
    const options = {
      method: "GET",
      headers: {
        authorization: `Bearer ${token}`
      }
    }

    setStatus(apiStatusConstants.inProgress)
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      setStatus(apiStatusConstants.success)
      setSpecificBookData(data)
    } else {
      setStatus(apiStatusConstants.failure)
    }
  }

  useEffect(() => {
    getSpecificBook()
  }, [id])


  const renderLoadingView = () => (
    <div className='loader-container'>
      <ThreeDots color='green' height={50} width={50} />
    </div>
  )

  const renderSuccessView = () => (
    <div className='specific-book'>
      <div className='specific-book-top-section'>
        <img src={specificBookData.book_details.cover_pic}
          alt={specificBookData.book_details.author_name}
          className='specific-book-image'
        />
        <div className='specific-book-info-container'>
          <h3 className='each-book-title'>{specificBookData.book_details.title}</h3>
          <p className='each-book-author'>{specificBookData.book_details.author_name}</p>
          <div className='rating-container'>
            <p className='avg-rating'>Avg Rating </p>
            <FaStar style={{ color: "#FBBF24" }} />
            <p className='rating'>
              {specificBookData.book_details.rating}
            </p>
          </div>
          <p className='status'>Status:
            <span className='status-span'>  {specificBookData.book_details.read_status}</span>
          </p>
        </div>
      </div>
      <hr />
      <div style={{ margin: "20px 0" }}>
        <h4 className='each-book-title'>About Author</h4>
        <p className='each-book-author'>{specificBookData.book_details.about_author}</p>
      </div>
      <div style={{ marginBottom: "20px" }}>
        <h4 className='each-book-title'>About Book</h4>
        <p className='each-book-author'>{specificBookData.book_details.about_book}</p>
      </div>
    </div>
  )


  const renderFailureView = () => <FailureView getSpecificBook={getSpecificBook} />



  const renderSpecificBook = () => {
    switch (status) {
      case apiStatusConstants.inProgress:
        return renderLoadingView()
      case apiStatusConstants.success:
        return renderSuccessView()
      case apiStatusConstants.failure:
        return renderFailureView()
      default:
        return null
    }
  }

  return (
    <>
      <Header />
      <div className='specific-book-details-container'>
        <div className='specific-details-container'>
          {renderSpecificBook()}
        </div>
      </div>
      <Footer />
    </>
  )
}

export default BookDetails
