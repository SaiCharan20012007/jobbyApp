import './index.css'
import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {RiExternalLinkLine} from 'react-icons/ri'
import SimilarJob from '../SimilarJob'
import Header from '../Header'

class JobItemDetails extends Component {
  state = {
    companyLogoUrl: '',
    companyWebsiteUrl: '',
    employmentType: '',
    jobDescription: '',
    skills: [],
    lifeAtCompany: {},
    location: '',
    packagePerAnnum: '',
    rating: '',
    title: '',
    similarJobs: [],
    apiStatus: true,
    isLoading: true,
  }

  componentDidMount() {
    this.getJobDetails()
  }

  retryBtn = () => {
    this.getJobDetails()
  }

  getJobDetails = async () => {
    const {match} = this.props
    const JWT = Cookies.get('jwt_token')
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${JWT}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()

      console.log(data)

      const {skills} = data.job_details
      const skillsU = skills.map(each => ({
        name: each.name,
        imageUrl: each.image_url,
      }))
      const lifeAtCompanyU = {
        description: data.job_details.life_at_company.description,
        imageUrl: data.job_details.life_at_company.image_url,
      }
      const similarJobsU = data.similar_jobs.map(each => ({
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        jobDescription: each.job_description,
        location: each.location,
        rating: each.rating,
        title: each.title,
      }))
      this.setState({
        companyLogoUrl: data.job_details.company_logo_url,
        companyWebsiteUrl: data.job_details.company_website_url,
        employmentType: data.job_details.employment_type,
        jobDescription: data.job_details.job_description,
        skills: skillsU,
        lifeAtCompany: lifeAtCompanyU,
        location: data.job_details.location,
        packagePerAnnum: data.job_details.package_per_annum,
        rating: data.job_details.rating,
        title: data.job_details.title,
        similarJobs: similarJobsU,
        apiStatus: true,
        isLoading: false,
      })
    } else {
      this.setState({apiStatus: false, isLoading: false})
    }
  }

  jobItemDetailsFailureView = () => (
    <>
      <Header />
      <div className="job-item-details-failure-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
          alt="failure view"
        />
        <h1>Oops! Something Went Wrong</h1>
        <p>We cannot seem to find the page you are looking for.</p>
        <button type="button" className="retry-btn" onClick={this.retryBtn}>
          Retry
        </button>
      </div>
    </>
  )

  jobItemDetailsLoadingView = () => (
    <>
      <div className="loader-container" testid="loader">
        <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
      </div>
    </>
  )

  jobItemDetailsSuccessView = () => {
    const {
      companyLogoUrl,
      title,
      rating,
      location,
      employmentType,
      packagePerAnnum,
      companyWebsiteUrl,
      jobDescription,
      skills,
      lifeAtCompany,
      similarJobs,
    } = this.state
    return (
      <>
        <Header />
        <div className="job-item-details-container">
          <div className="job-full-details-card">
            <div className="job-item-top-section">
              <img
                src={companyLogoUrl}
                alt="job details company logo"
                className="company-logo"
              />
              <div className="title-section">
                <h1 className="jobitem-job-title">{title}</h1>
                <div className="rating-container">
                  <AiFillStar className="star-icon" />
                  <p className="rating">{rating}</p>
                </div>
              </div>
            </div>
            <div className="job-mid-section">
              <div className="job-mid-sub">
                <div className="location-container">
                  <MdLocationOn className="location-icon" />
                  <p className="location-des">{location}</p>
                </div>
                <div className="location-container">
                  <img
                    src="https://res.cloudinary.com/dwzaz0hvq/image/upload/v1668524451/Screenshot_750_aeuv38.png"
                    alt="suitcase"
                    className="suit-case-icon"
                  />
                  <p className="location-des">{employmentType}</p>
                </div>
              </div>
              <p className="package">{packagePerAnnum}</p>
            </div>
            <hr className="horizontal-line" />
            <div className="description-sub-container">
              <h1 className="job-item-des-title">Description</h1>
              <h1 className="job-item-des-title">
                <a href={companyWebsiteUrl} target="_blank">
                  Visit
                </a>
                <RiExternalLinkLine className="nav-to-link" />
              </h1>
            </div>
            <p className="job-item-des">{jobDescription}</p>
            <h1 className="job-item-des-title">Skills</h1>
            <ul className="skills-ul">
              {skills.map(each => (
                <li className="skill-card" key={each.name}>
                  <img
                    src={each.imageUrl}
                    alt={each.name}
                    className="skill-icon"
                  />
                  <p className="skills-name">{each.name}</p>
                </li>
              ))}
            </ul>
            <h1 className="job-item-des-title">life at company</h1>
            <div className="life-at-company-container">
              <p className="job-item-des">{lifeAtCompany.description}</p>

              <img src={lifeAtCompany.imageUrl} alt="life at company" />
            </div>
          </div>
          <h1 className="similar-jobs-title">Similar Jobs</h1>
          <ul className="similar-job-ul">
            {similarJobs.map(each => (
              <SimilarJob details={each} key={each.id} />
            ))}
          </ul>
        </div>
      </>
    )
  }

  jobItemDetailsResultView = () => {
    const {apiStatus, isLoading} = this.state
    if (apiStatus) {
      if (isLoading) {
        return this.jobItemDetailsLoadingView()
      }
      return this.jobItemDetailsSuccessView()
    }
    return this.jobItemDetailsFailureView()
  }

  render() {
    return this.jobItemDetailsResultView()
  }
}
export default JobItemDetails
