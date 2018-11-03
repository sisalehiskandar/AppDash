import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Store from 'electron-store'
import Octicon, { Question } from '@githubprimer/octicons-react'
import testConnection from '../logic/testConnection'

export default class Config extends Component {
  constructor() {
    super()
    const store = new Store()
    const host = store.get('host')
    const username = store.get('username')
    const password = store.get('password')
    const account = store.get('account')
    const port = store.get('port')
    const https = store.get('https')

    this.state = {
      host,
      username,
      password,
      account,
      port,
      https,
      connectionTested: false,
    }
  }
  onSubmit = () => {}
  handleInputChange = event => {
    const { target } = event
    const value = target.type === 'checkbox' ? target.checked : target.value
    const { name } = target

    const store = new Store()
    store.set({ [name]: value })
    this.setState({ [name]: value, connectionTested: false })
  }
  onTestConnection = async event => {
    event.preventDefault()

    const store = new Store()
    const config = store.store
    console.log(config)

    testConnection({ config }).then(({ succeeded }) => {
      this.setState({
        succeeded,
        connectionTested: true,
      })
    })
  }
  render() {
    return (
      <div>
        <div className="container mt-4">
          <h1>Configuration</h1>
          <a
            href="https://github.com/Appdynamics/AppDash/blob/master/docs/config.md"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Octicon icon={Question} className="mr-1" />Open Config help docs
          </a>
          <div className="my-3">
            <Link to="/">
              <button type="button" className="btn btn-default mr-2">
                Back
              </button>
            </Link>
            <button
              type="button"
              className="btn btn-primary"
              onClick={this.onTestConnection}
            >
              Test Connection
            </button>
          </div>
          <div>
            {this.state.connectionTested && this.state.succeeded ? (
              <span className="text-success">Connection succeeded!</span>
            ) : null}
            {this.state.connectionTested && !this.state.succeeded ? (
              <span className="text-danger">Connection failed</span>
            ) : null}
          </div>
          <form>
            <div className="form-group">
              <label htmlFor="hostInput">Controller Host</label>
              <input
                type="text"
                className="form-control"
                name="host"
                id="hostInput"
                placeholder="Controller hostname ex: mycompany.saas.appdynamics.com"
                onChange={this.handleInputChange}
                value={this.state.host}
              />
              <small id="emailHelp" className="form-text text-muted">
                Please don't add 'http://' or 'https://'. Example:
                mycompany.saas.appdynamics.com
              </small>
            </div>
            <div className="form-check mb-3">
              <input
                className="form-check-input"
                type="checkbox"
                onChange={this.handleInputChange}
                checked={this.state.https}
                value={this.state.https}
                name="https"
                id="httpsInput"
              />
              <label className="form-check-label" htmlFor="httpsInput">
                HTTPS
              </label>
            </div>
            <div className="form-group">
              <label htmlFor="accountInput">Account</label>
              <input
                type="text"
                className="form-control"
                name="account"
                id="accountInput"
                placeholder="Account"
                onChange={this.handleInputChange}
                value={this.state.account}
              />
              <small id="emailHelp" className="form-text text-muted">
                Default account name is customer1
              </small>
            </div>
            <div className="form-group">
              <label htmlFor="usernameInput">Username</label>
              <input
                type="text"
                className="form-control"
                name="username"
                id="usernameInput"
                placeholder="Username"
                onChange={this.handleInputChange}
                value={this.state.username}
              />
            </div>
            <div className="form-group">
              <label htmlFor="passwordInput">Password</label>
              <input
                type="password"
                className="form-control"
                name="password"
                id="passwordInput"
                placeholder="Password"
                onChange={this.handleInputChange}
                value={this.state.password}
              />
              <small id="emailHelp" className="form-text text-muted">
                Note: Password is stored in plain-text on your computer
              </small>
            </div>
            <div className="form-group">
              <label htmlFor="portInput">Port (optional)</label>
              <input
                type="text"
                className="form-control"
                name="port"
                id="portInput"
                placeholder="Port"
                onChange={this.handleInputChange}
                value={this.state.port}
              />
              <small id="emailHelp" className="form-text text-muted">
                Default is port 80. Only need to set this for on-prem
                controllers
              </small>
            </div>
          </form>
        </div>
      </div>
    )
  }
}
