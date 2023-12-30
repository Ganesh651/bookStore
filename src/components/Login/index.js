import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import { ThreeDots } from 'react-loader-spinner'
import './index.css'

const Login = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showErrorMessage, setShowErrorMessage] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const navigate = useNavigate()
  console.log(isLoading)

  const renderLoginSuccessView = jwtToken => {
    Cookies.set("jwt_token", jwtToken, { expires: 30 })
    navigate("/")
  }

  const renderLoginFailureView = errorMsg => {
    setErrorMessage(errorMsg)
  }


  const handdleLogin = async e => {
    e.preventDefault()
    const userDetails = { username, password }
    // console.log(userDetails)
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: "POST",
      body: JSON.stringify(userDetails)
    }
    setIsLoading(true)
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)

    if (response.ok === true) {
      setIsLoading(false)
      renderLoginSuccessView(data.jwt_token)
    } else {
      setIsLoading(false)
      renderLoginFailureView(data.error_msg)
      setShowErrorMessage(true)
    }
  }

  const onChangeUsername = (e) => {
    setUsername(e.target.value)
  }

  const onChangePassword = (e) => {
    setPassword(e.target.value)
  }

  return (
    <div className='login-container'>
      <img src="https://res.cloudinary.com/dovk61e0h/image/upload/v1662988550/Bookhub/Rectangle_1467_wzhge6_ykftzx.png"
        alt="icon"
        className='login-image'
      />
      <img src='https://res.cloudinary.com/dky69roxl/image/upload/v1703760127/Ellipse_99_ylfgpp.png'
        alt="book store"
        className='login-image-mobile' />
      <div className='login-right-section'>
        <div className='login-logo-container'>
          <img src="https://res.cloudinary.com/dovk61e0h/image/upload/v1662988538/Bookhub/bookhub_logo_hjkrwl.png"
            alt="book store"
            className='book-store-image'
          />
        </div>
        <form onSubmit={handdleLogin}>
          <div className='login-input-container'>
            <label htmlFor='username'>Username*</label><br />
            <input
              type='text'
              id="username"
              placeholder='Username'
              onChange={onChangeUsername}
              value={username}
            />
          </div>
          <div className='login-input-container'>
            <label htmlFor='password'>Password*</label><br />
            <input
              style={{ marginBottom: "3px" }}
              type='password'
              id="password"
              placeholder='Password'
              onChange={onChangePassword}
              value={password}
            />
            {showErrorMessage && <span className='error-message'>{errorMessage}</span>}
          </div>
          <button className='login-button-container' type="submit">
            {isLoading ? <ThreeDots color='#fff' height={30} width={30} /> : "Login"}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login