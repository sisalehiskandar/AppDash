import React, { Component } from 'react'
import defaultQueries from './defaultQueries'
// import styles from './Home.css'

export const SavedQuery = ({ title, onQuerySelect }) => (
  <div className="card">
    <div className="card-body">
      <h5 className="card-title">{title}</h5>
      <a href="#" className="card-link" onClick={onQuerySelect}>
        Add
      </a>
    </div>
  </div>
)

export default class Sidebar extends Component {
  selectQuery = (title, query) => {
    this.props.selectQuery({ title, query })
  }
  render() {
    return (
      <div className="my-3">
        <h4 className="saved-queries-title">Sample Queries</h4>
        <div className="queries-list">
          <div>
            {defaultQueries.map(({ title, query }) => (
              <SavedQuery
                key={title}
                title={title}
                onQuerySelect={this.selectQuery.bind(null, title, query)}
              />
            ))}
          </div>
        </div>
      </div>
    )
  }
}
