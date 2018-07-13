import React, { Component } from 'react'
// import { Link } from 'react-router-dom'
import styles from './Home.css'
import main from '../logic/main'

export default class Home extends Component {
  constructor() {
    super()
    this.state = { query: '', dashboardName: '', msg: '' }
  }
  deploy = () => {
    console.log('deploy')
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
        <div className={styles.container} data-tid="container">
          <div>
            Dashboard Name
            <input
              type="text"
              onChange={this.setDashboardName}
              value={this.state.dashboardName}
            />
          </div>
          <div>
            Query
            <input
              type="text"
              onChange={this.setQuery}
              value={this.state.query}
            />
          </div>
          <button onClick={this.deploy}>Deploy</button>
          <span>{this.state.msg}</span>
        </div>
      </div>
    )
  }
}
