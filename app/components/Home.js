import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Store from 'electron-store'
// import styles from './Home.css'
import Sidebar from './Sidebar'
import buildDashboard from '../logic/buildDashboard'

export default class Home extends Component {
  constructor() {
    super()
    this.state = { query: '', dashboardName: '', msg: '' }
  }
  onSubmit = async event => {
    event.preventDefault()

    const { query, dashboardName } = this.state
    const dashboardNameWithDefault =
      dashboardName === '' ? 'AppDash Dashboard' : dashboardName

    const store = new Store()
    const config = store.store
    buildDashboard({
      query,
      dashboardName: dashboardNameWithDefault,
      config,
    }).then(({ msg, type }) => {
      this.setState({ msg, type, dashboardName: dashboardNameWithDefault })
    })
  }
  setDashboardName = event => {
    this.setState({ dashboardName: event.target.value })
  }
  setQuery = event => {
    this.setState({ query: event.target.value })
  }
  selectQuery = ({ title, query }) => {
    this.setState({
      dashboardName: title,
      query,
    })
  }
  render() {
    return (
      <div className="home">
        <div className="saved-queries">
          <Sidebar selectQuery={this.selectQuery} />
        </div>
        <div className="container" data-tid="container">
          <div className="my-3">
            <h1 className="display-4">AppDash</h1>
            <p className="lead">Create AppD dashboards at lightning speed</p>
            <hr className="my-2" />
          </div>
          <div>
            <p>
              First, add your controller details in{' '}
              <Link to="/config">Config</Link>
            </p>
          </div>

          <form>
            <div className="form-group">
              <label htmlFor="dashboardNameInput">
                Dashboard Name (optional)
              </label>
              <input
                type="text"
                className="form-control"
                id="dashboardNameInput"
                aria-describedby="dashboardNameInput"
                placeholder="Enter dashboard name"
                onChange={this.setDashboardName}
                value={this.state.dashboardName}
              />
            </div>

            <div className="form-group">
              <label htmlFor="queryInput">Query</label>
              <textarea
                className="form-control"
                id="queryInput"
                placeholder="Type in query here"
                onChange={this.setQuery}
                value={this.state.query}
                rows={3}
              />
            </div>
            <div className={`my-2 text-${this.state.type}`}>
              {this.state.msg}
            </div>
            <button
              type="button"
              className="btn btn-primary"
              onClick={this.onSubmit}
            >
              Deploy Dashboard
            </button>
          </form>
        </div>
      </div>
    )
  }
}
