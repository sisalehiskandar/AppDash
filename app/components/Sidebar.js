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
  selectQuery = (title, template, query) => {
    this.props.selectQuery({ title, template, query })
  }
  render() {
    return (
      <div className="my-3">
        <h4 className="saved-queries-title">Sample Queries</h4>
        <div className="queries-list">
          <div>
            {defaultQueries
              .filter(({ type }) => type === this.props.mode)
              .map(({ title, template, query }) => (
                <SavedQuery
                  key={title}
                  title={title}
                  template={template}
                  onQuerySelect={this.selectQuery.bind(
                    null,
                    title,
                    template,
                    query,
                  )}
                />
              ))}
          </div>
        </div>
      </div>
    )
  }
}
