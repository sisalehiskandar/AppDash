import React, { Component } from 'react'
import Store from 'electron-store'

export default class AddTemplateForm extends Component {
  constructor() {
    super()
    this.state = { dashboardName: '', dashboardJSON: '' }
  }
  handleInputChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    })
  }
  onSubmit = async event => {
    event.preventDefault()
    const { dashboardName, dashboardJSON } = this.state

    const store = new Store()
    const savedTemplates = store.get('savedTemplates') || []

    store.set({
      savedTemplates: [
        ...savedTemplates,
        {
          title: dashboardName,
          dashboardJSON,
          query:
            'SELECT application FROM applications WHERE application REGEXP "MyApp1|MyApp2"',
        },
      ],
    })
    this.props.closeTemplateForm()
  }
  render() {
    return (
      <div className={this.props.className}>
        <form>
          <div className="form-group">
            <label htmlFor="dashboardNameInput">Dashboard Name</label>
            <input
              type="text"
              className="form-control"
              id="dashboardNameInput"
              name="dashboardName"
              required
              aria-describedby="dashboardNameInput"
              placeholder="Enter dashboard name"
              onChange={this.handleInputChange}
              value={this.state.dashboardName}
            />
          </div>
          <div className="form-group">
            <label htmlFor="queryInput">Dashboard JSON</label>
            <textarea
              className="form-control"
              id="dashboardJSONInput"
              name="dashboardJSON"
              required
              placeholder="Dashboard JSON"
              onChange={this.handleInputChange}
              value={this.state.dashboardJSON}
              rows={3}
            />
          </div>
          <button
            type="button"
            className="btn btn-primary"
            disabled={
              !(
                this.state.dashboardName !== '' &&
                this.state.dashboardJSON !== ''
              )
            }
            onClick={this.onSubmit}
          >
            Add Dashboard Template
          </button>
        </form>
      </div>
    )
  }
}
