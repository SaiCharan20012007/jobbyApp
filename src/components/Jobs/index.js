import {Component} from 'react'
import {BsSearch} from 'react-icons/bs'
import Loader from 'react-loader-spinner'

import Cookies from 'js-cookie'
import JobItem from '../JobItem'
import FiltersGroup from '../FiltersGroup'

import Header from '../Header'
import Profile from '../Profile'

import './index.css'

class Jobs extends Component {
  state = {
    searchInput: '',
    empType: '',
    minPackage: '',
    jobsListU: [],
    isLoading: true,
    apiStatus: true,
  }

  componentDidMount() {
    this.getJobsList()
  }

  retryBtn = () => {
    this.getJobsList()
  }

  getJobsList = async () => {
    const JWT = Cookies.get('jwt_token')
    const {empType, minPackage, searchInput} = this.state
    const url = `https://apis.ccbp.in/jobs?employment_type=${empType}&minimum_package=${minPackage}&search=${searchInput}`

    const options = {
      headers: {
        Authorization: `Bearer ${JWT}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedJobList = data.jobs.map(eachJob => ({
        companyLogoUrl: eachJob.company_logo_url,
        employmentType: eachJob.employment_type,
        id: eachJob.id,
        jobDescription: eachJob.job_description,
        location: eachJob.location,
        packagePerAnnum: eachJob.package_per_annum,
        rating: eachJob.rating,
        title: eachJob.title,
      }))

      this.setState({
        jobsListU: updatedJobList,
        isLoading: false,
        apiStatus: true,
      })
    } else {
      this.setState({apiStatus: false, isLoading: false})
    }
  }

  onChangeSearch = event => {
    this.setState({searchInput: event.target.value})
  }

  jobsFailureView = () => (
    <>
      <Header />
      <div className="job-item-details-failure-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
          alt="failure view"
        />
        <h1>Oops! Something Went Wrong</h1>
        <p>We cannot seem to find the page you are looking for</p>
        <button type="button" className="retry-btn" onClick={this.retryBtn}>
          Retry
        </button>
      </div>
    </>
  )

  jobsLoadingView = () => (
    <>
      <div className="loader-container" testid="loader">
        <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
      </div>
    </>
  )

  getSearchResults = () => {
    const {searchInput, jobsListU} = this.state
    const updatedList = jobsListU.filter(each =>
      each.title.toLowerCase().includes(searchInput.toLowerCase()),
    )
    this.setState({jobsListU: updatedList})
  }

  jobsSuccessView = () => {
    const {jobsListU} = this.state
    if (jobsListU.length !== 0) {
      return jobsListU.map(job => <JobItem jobData={job} key={job.id} />)
    }
    return (
      <div className="noproducts-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          alt="no jobs"
        />
        <h1>No Jobs Found</h1>
        <p>We could not find any jobs. Try other filters</p>
      </div>
    )
  }

  jobsResultView = () => {
    const {apiStatus, isLoading} = this.state
    if (apiStatus === true) {
      if (isLoading) {
        return this.jobsLoadingView()
      }
      return this.jobsSuccessView()
    }
    return this.jobsFailureView()
  }

  render() {
    return (
      <div className="jobs-container">
        <Header />
        <div className="jobs-major-container">
          <div className="profile-filter-container">
            <Profile />
            <hr className="horizontal-line" />
            <FiltersGroup />
          </div>
          <div className="jobs-list-container">
            <div className="search-bar-container">
              <input
                type="search"
                placeholder="Search"
                className="searchEl"
                onChange={this.onChangeSearch}
              />
              <button
                type="button"
                onClick={this.getSearchResults}
                className="search-icon"
                testid="searchButton"
              >
                <BsSearch className="icon-s" />
              </button>
            </div>
            <div className="jobs-ul">
              <ul className="products-list">{this.jobsResultView()}</ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default Jobs
