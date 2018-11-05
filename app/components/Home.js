import React, { Component } from 'react'
import Octicon, { Sync, Question } from '@githubprimer/octicons-react'

import { Link } from 'react-router-dom'
import Store from 'electron-store'
// import styles from './Home.css'
import Sidebar from './Sidebar'
import buildDashboard from '../logic/buildDashboard'

export default class Home extends Component {
  constructor() {
    super()
    this.state = {
      query: '',
      dashboardName: '',
      msg: '',
      deploying: false,
      dashboardLinkList: false,
      mode: 'TEMPLATE',
      template: '',
      stacked: true,
    }
  }
  onSubmit = async event => {
    event.preventDefault()

    const { query, dashboardName, mode, template, stacked } = this.state
    const dashboardNameWithDefault =
      dashboardName === '' ? 'AppDash Dashboard' : dashboardName

    const store = new Store()
    const config = store.store

    buildDashboard({
      query,
      mode,
      template,
      stacked,
      dashboardName: dashboardNameWithDefault,
      config,
    })
      .then(buildResults => {
        if (buildResults.type === 'danger') {
          const { msg, type } = buildResults
          this.setState({ msg, type, deploying: false })
        } else {
          Promise.all(buildResults)
            .then(results => {
              console.log(results)
              if (results.length === 1) {
                const { msg, type, dashboardLink } = results[0]
                this.setState({
                  msg,
                  type,
                  dashboardName: dashboardNameWithDefault,
                  dashboardLink,
                  dashboardLinkList: false,
                  deploying: false,
                })
              } else {
                const hasError = results
                  .map(({ type }) => type)
                  .includes('danger')
                this.setState({
                  msg: hasError
                    ? results.map(({ msg }) => msg).join()
                    : `Created ${results.length} dashboards successfully!`,
                  type: results.map(({ type }) => type).includes('danger')
                    ? 'danger'
                    : 'success',
                  dashboardLink: results[0].dashboardListLink,
                  dashboardLinkList: true,
                  deploying: false,
                })
              }
            })
            .catch(() => {
              this.setState({
                msg: 'Error! Go to View > Toggle Developer Tools > Console',
                type: 'danger',
                deploying: false,
              })
            })
        }
      })
      .catch(() => {
        console.log('IN PROMISE FRONTEND CATCH')
      })

    this.setState({ deploying: true, msg: '' })
  }
  handleInputChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    })
  }
  handleStackedChange = event => {
    const {
      target: { name },
    } = event

    this.setState({
      stacked: name === 'stacked',
    })
  }
  selectQuery = ({ title, template, query }) => {
    this.setState({
      dashboardName: title,
      query,
      template,
    })
  }
  render() {
    return (
      <div className="home">
        <div className="saved-queries">
          <Sidebar selectQuery={this.selectQuery} mode={this.state.mode} />
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
          <ul className="nav nav-pills mb-2">
            <li className="nav-item">
              <a
                className={`nav-link ${
                  this.state.mode === 'TEMPLATE' ? 'active' : ''
                }`}
                href="#"
                onClick={() => this.setState({ mode: 'TEMPLATE' })}
              >
                Template Dashboards
              </a>
            </li>
            <li className="nav-item">
              <a
                className={`nav-link ${
                  this.state.mode === 'GRID' ? 'active' : ''
                }`}
                href="#"
                onClick={() => this.setState({ mode: 'GRID' })}
              >
                Grid
              </a>
            </li>
          </ul>
          <div className="my-3">
            {this.state.mode === 'GRID' ? (
              <a
                href="https://github.com/Appdynamics/AppDash/blob/master/docs/grid.md"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Octicon icon={Question} /> Open Grid Mode help docs
              </a>
            ) : (
              <a
                href="https://github.com/Appdynamics/AppDash/blob/master/docs/template.md"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Octicon icon={Question} /> Open Template Mode help docs
              </a>
            )}
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
                name="dashboardName"
                aria-describedby="dashboardNameInput"
                placeholder="Enter dashboard name"
                onChange={this.handleInputChange}
                value={this.state.dashboardName}
              />
            </div>

            {this.state.mode === 'TEMPLATE' ? (
              <React.Fragment>
                <div className="form-group">
                  <label htmlFor="templateInput">Template</label>
                  <input
                    type="text"
                    className="form-control"
                    id="templateInput"
                    name="template"
                    placeholder="Select a template"
                    onChange={this.handleInputChange}
                    value={this.state.template}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="stackedInput">How many dashboards?</label>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="stacked"
                      id="stackedInput"
                      onChange={this.handleStackedChange}
                      checked={this.state.stacked}
                    />
                    <label className="form-check-label" htmlFor="stackedInput">
                      Create one stacked dashboard
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="multiple"
                      id="stackedFalseInput"
                      onChange={this.handleStackedChange}
                      checked={!this.state.stacked}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="stackedFalseInput"
                    >
                      Create multiple dashboards
                    </label>
                  </div>
                </div>
              </React.Fragment>
            ) : null}
            <div className="form-group">
              <label htmlFor="queryInput">Query</label>
              <textarea
                className="form-control"
                id="queryInput"
                name="query"
                placeholder="Type in query here"
                onChange={this.handleInputChange}
                value={this.state.query}
                rows={3}
              />
            </div>
            <div className={`my-2 text-${this.state.type}`}>
              {this.state.msg}{' '}
              {this.state.msg && this.state.dashboardLink ? (
                <a
                  href={this.state.dashboardLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {this.state.dashboardLinkList
                    ? 'Open Dashboards List'
                    : 'Open Dashboard'}
                </a>
              ) : null}
            </div>
            <button
              type="button"
              className="btn btn-primary"
              onClick={this.onSubmit}
              disabled={
                !(
                  this.state &&
                  this.state.query &&
                  new RegExp('select', 'i').test(this.state.query) &&
                  new RegExp('from', 'i').test(this.state.query)
                )
              }
            >
              {this.state.deploying ? (
                <div>
                  <Octicon icon={Sync} className="mr-1 spinny" />
                  Deploying Dashboard
                </div>
              ) : (
                <div>Deploy Dashboard</div>
              )}
            </button>
          </form>
        </div>
      </div>
    )
  }
}
