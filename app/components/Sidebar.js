import React, { Component } from 'react'
// import styles from './Home.css'

export const SavedQuery = ({ title, onQuerySelect }) => (
  <div className="card">
    <div className="card-body">
      <h5 className="card-title">{title}</h5>
      {/* <p class="card-text">{title}</p> */}
      <a href="#" className="card-link" onClick={onQuerySelect}>
        Add
      </a>
    </div>
  </div>
)

const savedQueries = [
  {
    title: 'All BTs in an App',
    query:
      'SELECT bt, health, art, cpm, epm FROM applications WHERE application = "MyApp"',
  },
  {
    title: 'Some BTs in an App',
    query:
      'SELECT bt, health, art, cpm, epm FROM applications WHERE application = "MyApp" AND bt REGEXP "MyBT.*"',
  },
  {
    title: 'Some BTs from different Apps',
    query:
      'SELECT bt, health, art, cpm, epm FROM applications WHERE app REGEXP "MyApp1|MyApp2|MyApp3 AND bt REGEXP "Login.*"',
  },
  {
    title: 'All Applications',
    query: 'SELECT app, health, art, cpm, epm FROM applications',
  },
  {
    title: 'One Application',
    query:
      'SELECT app, health, art, cpm, epm FROM applications WHERE app = "MyApp"',
  },
  {
    title: 'Some Applications',
    query:
      'SELECT app, health, art, cpm, epm FROM applications WHERE app REGEXP "MyApp1|MyApp2|MyApp3"',
  },
]

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
            {savedQueries &&
              savedQueries.map(({ title, query }) => (
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
