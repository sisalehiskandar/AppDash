import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import logo from '../logo_white.png'
// import styles from './Home.css'

export default class Header extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
        <Link className="navbar-brand" to="/">
          <img src={logo} alt="logo" className="header-logo" /> AppDash
        </Link>

        <Link to="/">
          <button className="btn btn-primary my-2 my-sm-0">
            Create Dashboard
          </button>
        </Link>
        <Link className="nav-link" to="/config">
          Config
        </Link>
        <a
          className="nav-link"
          href="https://github.com/Appdynamics/AppDash/blob/master/docs/help.md"
          target="_blank"
          rel="noopener noreferrer"
        >
          Help
        </a>
        <Link className="nav-link" to="/about">
          About
        </Link>
      </nav>
    )
  }
}
