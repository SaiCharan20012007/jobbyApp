import './index.css'
import {Component} from 'react'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

class FiltersGroup extends Component {
  state = {
    fulltime: false,
    partTime: false,
    freelance: false,
    intern: false,
    finalList: [],
  }

  fulltimeTrigger = event => {
    const {fulltime} = this.state
    console.log(event.target.value)
    this.setState({fulltime: !fulltime})
  }

  partTimeTrigger = event => {
    const {partTime} = this.state
    console.log(event.target.value)
    this.setState({partTime: !partTime})
  }

  freelanceTrigger = event => {
    const {freelance} = this.state
    console.log(event.target.value)
    this.setState({freelance: !freelance})
  }

  internTrigger = event => {
    const {intern} = this.state
    console.log(event.target.value)
    this.setState({intern: !intern})
  }

  render() {
    const {fulltime} = this.state
    console.log(fulltime)
    return (
      <div className="filters-container">
        <h1 className="filters-title">Type of Employment</h1>

        <ul className="checkbox-container">
          <li className="check-box-sub">
            <input
              type="checkbox"
              id={employmentTypesList[0].employmentTypeId}
              className="check-box-el"
              value={employmentTypesList[0].label}
              onClick={this.fulltimeTrigger}
            />
            <label
              htmlFor={employmentTypesList[0].employmentTypeId}
              className="label-filter"
            >
              {employmentTypesList[0].label}
            </label>
          </li>
          <li className="check-box-sub">
            <input
              type="checkbox"
              id={employmentTypesList[1].employmentTypeId}
              className="check-box-el"
              value={employmentTypesList[1].label}
              onClick={this.partTimeTrigger}
            />
            <label
              htmlFor={employmentTypesList[1].employmentTypeId}
              className="label-filter"
            >
              {employmentTypesList[1].label}
            </label>
          </li>
          <li className="check-box-sub">
            <input
              type="checkbox"
              id={employmentTypesList[2].employmentTypeId}
              className="check-box-el"
              value={employmentTypesList[2].label}
              onClick={this.freelanceTrigger}
            />
            <label
              htmlFor={employmentTypesList[2].employmentTypeId}
              className="label-filter"
            >
              {employmentTypesList[2].label}
            </label>
          </li>
          <li className="check-box-sub">
            <input
              type="checkbox"
              id={employmentTypesList[3].employmentTypeId}
              className="check-box-el"
              value={employmentTypesList[3].label}
              onClick={this.internTrigger}
            />
            <label
              htmlFor={employmentTypesList[3].employmentTypeId}
              className="label-filter"
            >
              {employmentTypesList[3].label}
            </label>
          </li>
        </ul>
        <h1 className="filters-title">Salary Range</h1>
      </div>
    )
  }
}
export default FiltersGroup
