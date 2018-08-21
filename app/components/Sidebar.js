import React, { Component } from 'react'
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

const savedQueries = [
  {
    title: 'All Applications',
    query: 'SELECT application, health, art, cpm, epm FROM applications',
  },
  {
    title: 'One Application',
    query:
      'SELECT application, health, art, cpm, epm FROM applications WHERE application = "MyApp"',
  },
  {
    title: 'Some Applications',
    query:
      'SELECT application, health, art, cpm, epm FROM applications WHERE application REGEXP "MyApp1|MyApp2|MyApp3"',
  },
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
      'SELECT bt, health, art, cpm, epm FROM applications WHERE application REGEXP "MyApp1|MyApp2|MyApp3 AND bt REGEXP "Login.*"',
  },
  {
    title: 'All Tiers in an App',
    query:
      'SELECT tier, health, art, cpm, epm FROM applications WHERE application = "MyApp"',
  },
  {
    title: 'All Nodes in an App',
    query:
      'SELECT node, health, art, cpm, epm FROM applications WHERE application = "MyApp"',
  },
  {
    title: 'All SEs in an App',
    query:
      'SELECT se, art, cpm, epm FROM applications WHERE application = "MyApp"',
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
