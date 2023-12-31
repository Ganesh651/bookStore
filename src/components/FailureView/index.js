import React from 'react'
import './index.css'

const FailureView = (props) => {
  const { getData, retry, getSpecificBook } = props
  const onTryAgain = () => {
    getData()
    retry()
    getSpecificBook()
  }

  return (
    <div className='failure-view-section'>
      <div className='failure-container'>
        <img src="https://res.cloudinary.com/dky69roxl/image/upload/v1687445839/Group_7522_qluwiv.png"
          alt="failure" />
        <p className='failure-description'>Something went wrong, Please try again.</p>
        <div className='try-again-button-container'>
          <button type='button' className='try-again-button' onClick={onTryAgain}>
            Try again
          </button>
        </div>
      </div>
    </div>
  )
}

export default FailureView