import './index.css'
import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'

const SimilarJob = props => {
  const {details} = props
  console.log(details)
  const {
    companyLogoUrl,
    title,
    rating,
    jobDescription,
    location,
    employmentType,
  } = details
  return (
    <li className="similar-job-card">
      <div className="job-item-top-section">
        <img
          src={companyLogoUrl}
          alt="similar job company logo"
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
      <h1 className="job-item-des-title">Description</h1>
      <p className="job-item-des">{jobDescription}</p>
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
      </div>
    </li>
  )
}

export default SimilarJob
