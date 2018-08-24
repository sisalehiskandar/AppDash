import React, { Component } from 'react'

export default class Home extends Component {
  render() {
    return (
      <div className="container mt-4">
        <div className="jumbotron">
          <h1 className="display-4">About AppDash - v1.8.3</h1>
          <p className="lead">Create AppD dashboards at lightning speed</p>
          <hr className="my-4" />
          <p>
            AppDash uses a SQL-like query language to create table dashboards.
            Check out the GitHub{' '}
            <a
              href="https://github.com/appdynamics/AppDash"
              target="_blank"
              rel="noopener noreferrer"
            >
              here
            </a>.
          </p>
          <p>
            For feature requests or bugs, please visit{' '}
            <a
              href="https://github.com/appdynamics/AppDash/issues"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub Issues
            </a>
          </p>
          <p>
            Created and maintained by Daniel Arrizza. You can reach me at daniel
            (dot) arrizza (at) appdynamics.com
          </p>
        </div>
      </div>
    )
  }
}
