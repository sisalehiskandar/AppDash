import React, { Component } from 'react'

export default class Home extends Component {
  render() {
    return (
      <div className="container mt-4">
        <h1>About</h1>
        <div>
          <p>
            dash-ql uses a SQL-like query language to create table dashboards.
            Check out the GitHub{' '}
            <a href="https://github.com/appdynamics/dash-ql">here</a>.
          </p>
          <p>
            For feature requests or bugs, please visit{' '}
            <a href="https://github.com/appdynamics/dash-ql/issues">
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
