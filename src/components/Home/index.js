import Slider from "react-slick";
import Header from "../Header";
import Cookies from 'js-cookie'
import Footer from "../Footer";
import { useNavigate } from 'react-router-dom'
import { ThreeDots } from 'react-loader-spinner'
import useFetch from "../useFetch";
import FailureView from "../FailureView";
import './index.css'
// import { useState } from "react";
// import { Input, Button, Typography } from '@mui/material'



const Home = () => {
  // const [blogImage, setBlogImage] = useState("")
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
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 2,
            infinite: true,
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2,
            arrows: false,
            swipeToSlide: true,
            // swipe: true
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            arrows: false,
            swipeToSlide: true,
            // swipe: true
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
                  <img className='slide-image' style={{ display: "inline" }} src={offer.cover_pic} alt={offer.title} />
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

  // const handleFileUpload = async (e) => {
  //   console.log(e.target.files[1]);
  //   const file = e.target.files[0];
  //   const base64 = await convertToBase64(file);
  //   setBlogImage(base64);
  // };

  // function convertToBase64(file) {
  //   return new Promise((resolve, reject) => {
  //     const fileReader = new FileReader();
  //     fileReader.readAsDataURL(file);
  //     fileReader.onload = () => {
  //       resolve(fileReader.result);
  //     };
  //     fileReader.onerror = (error) => {
  //       reject(error);
  //     }
  //   })
  // }

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
          {/* <img style={{ height: "150px", width: "150px" }} src={blogImage} alt="icon" /> */}
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
            {/* <Input
              accept="image/*"
              multiple
              type="file"
              onChange={handleFileUpload}
              // value={blogImage}
              id="imageFile"
              sx={{ display: "none" }}
            />
            <Button
              sx={{
                // width: "200px",
                color: "black",
                height: "45px",
                background: "#f7f8ff",
                borderRadius: "8px",
                borderWidth: "dotted",
              }}
              onClick={handleFileUpload}
              component={"label"}
              htmlFor={"imageFile"}
              variant="outlined"
            >
              <Typography variant="body"> Upload Image </Typography>
            </Button> */}
          </div>
          {renderTopRatedBooks()}
        </div>
      </div>
      <Footer />
    </>
  )
}






export default Home