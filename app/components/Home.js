// @flow
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styles from './Home.css'
import main from '../logic/main'

type Props = {};

export default class Home extends Component<Props> {
  props: Props
  deploy = () => {
    console.log('deploy')
    main()
  }
  render() {
    return (
      <div>
        <div className={styles.container} data-tid="container">
          <h2>Home</h2>
          <Link to="/counter">to Counter</Link>
          <button onClick={this.deploy}>Deploy</button>
        </div>
      </div>
    )
  }
}
