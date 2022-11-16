import './index.css'
import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

const Header = props => {
  const logoutNav = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <div className="header-container">
      <Link to="/">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
          className="header-logo"
        />
      </Link>
      <ul className="unordered-list">
        <Link to="/" className="list-item">
          <li>Home</li>
        </Link>
        <Link to="/jobs" className="list-item">
          <li>Jobs</li>
        </Link>
        <li> </li>
      </ul>
      <button type="button" className="logout-btn" onClick={logoutNav}>
        Logout
      </button>
    </div>
  )
}

export default withRouter(Header)
