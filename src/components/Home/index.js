import Slider from "react-slick";
import Header from "../Header";
import Cookies from 'js-cookie'
import Footer from "../Footer";
import { useNavigate } from 'react-router-dom'
import { ThreeDots } from 'react-loader-spinner'
import useFetch from "../useFetch";
import FailureView from "../FailureView";
import './index.css'




const Home = () => {
  const navigate = useNavigate()
  const token = Cookies.get("jwt_token")
  const url = `https://apis.ccbp.in/book-hub/top-rated-books`
  const options = {
    method: "GET",
    headers: {
      authorization: `Bearer ${token}`
    }
  }
  const topRated = useFetch(url, options)
  const { fetchedData, apiStatus } = topRated
  const { books } = fetchedData

  const handdlerBooks = () => {
    navigate("/shelf")
  }

  const renderLoadingView = () => (
    <div className="loader-container">
      <ThreeDots color='#000' height={50} width={50} />
    </div>
  )

  const renderSuccessView = () => {
    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 2,
      adaptiveHeight: true,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 2,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2,
            dots: true,
            arrows: false,
            swipeToSlide: true,
            swipe: true
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            dots: true,
            arrows: false,
            className: "inner-div",
            swipeToSlide: true,
            swipe: true
          }
        }
      ]
    };

    return (
      <>
        {
          <div className='slider-container'>
            <Slider {...settings}>
              {books.map(offer => (
                <div key={offer.id} className="slick-image-container">
                  <img className='slide-image' src={offer.cover_pic} alt={offer.title} />
                  <span className="title">{offer.title}</span>
                  <span className="author-name">{offer.author_name}</span>
                </div>
              ))}
            </Slider >
          </div >
        }
      </>
    )
  }

  const retry = () => { }

  const renderFailureView = () => <FailureView retry={retry} />



  const renderTopRatedBooks = () => {
    switch (apiStatus) {
      case "IN_PROGRESS":
        return renderLoadingView()
      case "SUCCESS":
        return renderSuccessView()
      case "FAILURE":
        return renderFailureView()
      default:
        return null
    }
  }

  return (
    <>
      <Header />
      <div className="home-container">
        <div className="home-heading-container">
          <h2 className="home-heading ">Find Your Next Favorite Books?</h2>
          <p className="description">You are in the right place.
            Tell us what titles or genres you have enjoyed in the past,
            and we will give you surprisingly insightful
            recommendations.
          </p>
          <button type="button" className="find-books-button-mobile" onClick={handdlerBooks}>
            Find Books
          </button>
        </div>
        <div className="top-rated-books-container">
          <div className="top-rated-books-heading-container">
            <h2 className="top-rating-heading">Top Rated Books</h2>
            <button type="button" className="find-books-button" onClick={handdlerBooks}>
              Find Books
            </button>
          </div>
          {renderTopRatedBooks()}
        </div>
      </div>
      <Footer />
    </>
  )
}






export default Home