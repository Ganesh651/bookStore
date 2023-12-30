import React from 'react'
import { FaStar } from "react-icons/fa";
import './index.css'

const BooksList = (props) => {
  const { eachBook } = props
  return (
    <div className='book-info-container'>
      <img src={eachBook.cover_pic}
        alt={eachBook.title}
        className='book-cover-image'
      />
      <div className='book-info'>
        <h4 className='each-book-title'>{eachBook.title}</h4>
        <p className='each-book-author'>{eachBook.author_name}</p>
        <div className='rating-container'>
          <p className='avg-rating'>Avg Rating </p>
          <FaStar style={{ color: "#FBBF24" }} />
          <p className='rating'>
            {eachBook.rating}
          </p>
        </div>
        <p className='status'>Status:
          <span className='status-span'>  {eachBook.read_status}</span>
        </p>
      </div>
    </div>
  )
}

export default BooksList