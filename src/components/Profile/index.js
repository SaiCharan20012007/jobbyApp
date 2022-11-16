import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import './index.css'

class Profile extends Component {
  state = {
    profileImage: '',
    name: '',
    Bio: '',
    isLoading: true,
    apiStatus: true,
  }

  componentDidMount() {
    this.getProfileDetails()
  }

  getProfileDetails = async () => {
    const url = 'https://apis.ccbp.in/profile'
    const JWT = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${JWT}`,
      },
      method: 'GET',
    }

    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()

      console.log(data)
      console.log(response)
      const profileDetails = data.profile_details
      console.log(profileDetails)
      this.setState({
        profileImage: profileDetails.profile_image_url,
        name: profileDetails.name,
        Bio: profileDetails.short_bio,
        isLoading: false,
        apiStatus: true,
      })
    } else {
      this.setState({isLoading: false, apiStatus: false})
    }
  }

  retryResults = () => {
    this.getProfileDetails()
  }

  profileLoadingView = () => (
    <>
      <div className="loader-container" testid="loader">
        <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
      </div>
    </>
  )

  profileFailureView = () => (
    <div className="profile-failure-container">
      <button
        type="button"
        className="retry-button"
        onClick={this.retryResults}
      >
        Retry
      </button>
    </div>
  )

  profileSuccessView = () => {
    const {profileImage, name, Bio} = this.state
    return (
      <div className="profile-container">
        <img src={profileImage} alt="profile" />
        <h1 className="name">{name}</h1>
        <p className="bio">{Bio}</p>
      </div>
    )
  }

  render() {
    const {apiStatus, isLoading} = this.state
    if (apiStatus) {
      if (isLoading) {
        return this.profileLoadingView()
      }
      return this.profileSuccessView()
    }
    return this.profileFailureView()
  }
}

export default Profile
