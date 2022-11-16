import './index.css'
import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

class LoginForm extends Component {
  state = {username: '', password: '', isValid: ''}

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  matchdetails = async event => {
    event.preventDefault()
    const {username, password} = this.state

    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()

    console.log(data)
    const msg = data.error_msg

    if (username === '' || password === '') {
      this.setState({isValid: msg})
    } else if (response.ok) {
      const {history} = this.props
      Cookies.set('jwt_token', data.jwt_token, {
        expires: 30,
        path: '/',
      })

      history.replace('/')
    } else {
      this.setState({isValid: data.error_msg})
    }
  }

  render() {
    const {isValid} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-form-container" onSubmit={this.matchdetails}>
        <div className="login-card">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="logo"
          />
          <form className="form-container">
            <label htmlFor="usernameid" className="labelEl">
              USERNAME
            </label>
            <input
              type="text"
              id="usernameid"
              placeholder="Username"
              className="inputEl"
              onChange={this.onChangeUsername}
            />
            <label htmlFor="passwordid" className="labelEl">
              PASSWORD
            </label>
            <input
              type="password"
              id="passwordid"
              placeholder="Password"
              className="inputEl"
              onChange={this.onChangePassword}
            />
            <button type="submit" className="submit-btn">
              Login
            </button>
            <p className="invalid-msg">{isValid}</p>
          </form>
        </div>
      </div>
    )
  }
}

export default LoginForm
