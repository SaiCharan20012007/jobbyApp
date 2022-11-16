import {Link} from 'react-router-dom'

import Header from '../Header'
import './index.css'

const Home = props => {
  const navToJob = () => {
    const {history} = props
    history.replace('/jobs')
  }
  return (
    <>
      <div className="home-container">
        <Header />
        <div className="home-content">
          <h1 className="home-title">
            Find The Job That <br />
            Fits Your Life
          </h1>
          <p className="home-des">
            Millions of people are searching for jobs, salary,
            <br /> information, company reviews. Find the job that fits your
            <br />
            abilities and potential.
          </p>
          <Link to="/jobs">
            <button type="button" className="find-jobs-btn" onClick={navToJob}>
              Find Jobs
            </button>
          </Link>
        </div>
      </div>
    </>
  )
}

export default Home
