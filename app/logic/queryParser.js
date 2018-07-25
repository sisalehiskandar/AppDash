const fromStructure = ['applications', 'apps']

const getSelects = ({ query }) => {
  const selectRegex = /select(.*)from/i
  const allSelect = selectRegex.exec(query)
  const selects = allSelect[1].split(',').map(s => s.trim())
  const selectsWithAs = selects.map(select => {
    const asRegex = /(.*) as (.*)/i
    const asResults = asRegex.exec(select)
    if (asResults) {
      return {
        value: asResults[1],
        as: asResults[2].substr(1, asResults[2].length - 2),
      }
    }
    return { value: select }
  })
  return selectsWithAs
}

const getFrom = ({ query }) => {
  const fromRegex = /from(.*)where/i
  const from = fromRegex.exec(query)[1].trim()
  const isValid = fromStructure.includes(from)
  return { from, isValid }
}

const getWhere = ({ query }) => {
  const whereRegex = /where(.*)/i
  const allWhere = whereRegex.exec(query)
  const wheres = allWhere[1].split('AND').map(s => s.trim())
  const tokenizedWheres = wheres.map(where => {
    const delimeterRegex = /(.*?) ?(=|REGEXP) ?"(.*)"$/
    const [, field, operator, value] = delimeterRegex.exec(where)
    return { field, operator: getOperator({ operator }), value }
  })
  return tokenizedWheres
}

export const getOperator = ({ operator }) => {
  if (operator === '=') {
    return 'EQUALS'
  } else if (operator.toLowerCase() === 'regexp') {
    return 'REGEXP'
  }
}

export const getApplicationsFromWheres = ({ wheres, allApplications }) => {
  let applicationNames = []
  wheres.forEach(({ field, operator, value }) => {
    if (field === 'application' || field === 'app') {
      if (operator === 'EQUALS') {
        applicationNames[0] = value
      } else if (operator === 'REGEXP') {
        const regex = new RegExp(value)
        applicationNames = allApplications
          .map(({ name }) => name)
          .filter(name => {
            const match = regex.exec(name)
            return !!match
          })
      }
    }
  })
  if (applicationNames.length > 0) {
    return { applicationNames }
  }
  return {
    msg:
      'No application. Specify ...FROM application WHERE application = "YOUR_APP_NAME"',
    type: 'warning',
  }
}

export default ({ query }) => {
  const selects = getSelects({ query })
  const { from } = getFrom({ query })
  const wheres = getWhere({ query })
  console.log({ selects, from, wheres })
  return { selects, from, wheres }
}
