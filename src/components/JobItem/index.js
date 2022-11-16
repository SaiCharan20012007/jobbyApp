import './index.css'
import {Link} from 'react-router-dom'
import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'

const JobItem = props => {
  const {jobData} = props
  const {
    id,
    companyLogoUrl,
    title,
    rating,
    location,
    employmentType,
    packagePerAnnum,
    jobDescription,
  } = jobData
  return (
    <Link to={`/jobs/${id}`} className="link-style">
      <li className="job-item-container">
        <div className="job-item-top-section">
          <img
            src={companyLogoUrl}
            alt="company logo"
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
          <h1 className="package">{packagePerAnnum}</h1>
        </div>
        <hr className="horizontal-line" />
        <h1 className="job-item-des-title">Description</h1>
        <p className="job-item-des">{jobDescription}</p>
      </li>
    </Link>
  )
}

export default JobItem
