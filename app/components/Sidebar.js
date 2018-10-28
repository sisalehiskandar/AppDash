import React, { Component } from 'react'
import Store from 'electron-store'
import defaultQueries from './defaultQueries'
import AddTemplateForm from './AddTemplateForm'

export const SavedQuery = ({
  title,
  onQuerySelect,
  dashboardJSON,
  handleRemove,
}) => (
  <div className="card">
    <div className="card-body">
      <h5 className="card-title">{title}</h5>
      <a href="#" className="card-link" onClick={onQuerySelect}>
        Add
      </a>
      {dashboardJSON ? (
        <a href="#" className="card-link" onClick={handleRemove}>
          Remove
        </a>
      ) : null}
    </div>
  </div>
)

export default class Sidebar extends Component {
  constructor() {
    super()
    this.state = { showAddTemplate: false }
  }
  selectQuery = (title, template, query) => {
    this.props.selectQuery({ title, template, query })
  }
  handleRemove = title => {
    const store = new Store()
    const savedTemplates = store.get('savedTemplates')
    if (savedTemplates && savedTemplates.length > 0) {
      const newSavedTemplates = savedTemplates.filter(
        ({ title: stuff }) => stuff !== title,
      )
      store.set({ savedTemplates: newSavedTemplates })
      this.forceUpdate()
    }
  }
  getSavedTemplates = () => {
    const store = new Store()
    const savedTemplates = store.get('savedTemplates')
    if (savedTemplates) {
      return savedTemplates.map(template => ({ ...template, type: 'TEMPLATE' }))
    } else {
      return []
    }
  }
  render() {
    return (
      <div className="my-3">
        <h4 className="saved-queries-title">
          {this.props.mode === 'TEMPLATE'
            ? 'Saved Templates'
            : 'Sample Queries'}
        </h4>
        {this.props.mode === 'TEMPLATE' ? (
          <React.Fragment>
            <div className="my-2">
              <a
                href="#"
                onClick={() => {
                  this.setState({
                    showAddTemplate: !this.state.showAddTemplate,
                  })
                }}
              >
                {!this.state.showAddTemplate
                  ? 'Add your own template'
                  : 'Close'}
              </a>
            </div>
            {this.state.showAddTemplate ? (
              <AddTemplateForm
                className="mb-3"
                closeTemplateForm={() =>
                  this.setState({ showAddTemplate: false })
                }
              />
            ) : null}
          </React.Fragment>
        ) : null}

        <div className="queries-list">
          <div>
            {[...this.getSavedTemplates(), ...defaultQueries]
              .filter(({ type }) => type === this.props.mode)
              .map(({ title, template = title, query, dashboardJSON }) => (
                <SavedQuery
                  key={title}
                  title={title}
                  template={template}
                  dashboardJSON={dashboardJSON}
                  onQuerySelect={this.selectQuery.bind(
                    null,
                    title,
                    template,
                    query,
                  )}
                  handleRemove={this.handleRemove.bind(
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
