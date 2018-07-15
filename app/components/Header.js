import React, { Component } from 'react'
import { Link } from 'react-router-dom'
// import styles from './Home.css'

export default class Header extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
        <Link className="navbar-brand" to="/">
          dash-ql
        </Link>

        <Link to="/">
          <button className="btn btn-primary my-2 my-sm-0">
            Create Dashboard
          </button>
        </Link>
        <Link className="nav-link" to="/config">
          Config
        </Link>
        <Link className="nav-link" to="/about">
          About
        </Link>
      </nav>
    )
  }
}
