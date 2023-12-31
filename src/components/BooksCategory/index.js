import React from 'react'
import './index.css'

const BooksCategory = (props) => {
  const { shelf, isActive, changeActiveTab } = props
  const { id, label, labelValue } = shelf


  const className = isActive ? "active" : "pending"

  const mobileClassName = isActive ? "active-mobile" : "pending-mobile"

  const onActiveTab = () => {
    changeActiveTab(id, labelValue, label)
  }

  return (
    <>
      <button
        type="button"
        className={className}
        onClick={onActiveTab}
      >
        {label}
      </button>
      <button
        type="button"
        className={mobileClassName}
        onClick={onActiveTab}
      >
        {label}
      </button>
    </>
  )
}

export default BooksCategory