import React, { Component } from 'react'
// import { Link } from 'react-router-dom'
// import styles from './Home.css'
import main from '../logic/main'

export default class Home extends Component {
  constructor() {
    super()
    this.state = { query: '', dashboardName: '', msg: '' }
  }
  onSubmit = () => {
    const { query, dashboardName } = this.state
    const { msg } = main({ query, dashboardName })
    this.setState({ msg })
  }
  setDashboardName = event => {
    this.setState({ dashboardName: event.target.value })
  }
  setQuery = event => {
    this.setState({ query: event.target.value })
  }
  render() {
    return (
      <div>
        <div className="container" data-tid="container">
          <div className="jumbotron">
            <h1 className="display-4">dash-ql</h1>
            <p className="lead">Create AppD dashboards at lightning speed</p>
            <hr className="my-4" />
            <p>
              dash-ql uses a SQL-like query language to create table dashboards.
              Check out the GitHub{' '}
              <a href="https://github.com/appdynamics/dash-ql">here</a>.
            </p>
          </div>
          <span>{this.state.msg}</span>

          <form>
            <div className="form-group">
              <label htmlFor="dashboardNameInput">Dashboard Name</label>
              <input
                type="text"
                className="form-control"
                id="dashboardNameInput"
                aria-describedby="emailHelp"
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
            <button
              type="submit"
              className="btn btn-primary"
              onSubmit={this.onSubmit}
            >
              Deploy Dashboard
            </button>
          </form>
        </div>
      </div>
    )
  }
}
