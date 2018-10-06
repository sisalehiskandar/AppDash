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
  const selectsWithParams = selectsWithAs.map(select => {
    const argsRegex = /health\((.*)\)/
    const argsResults = argsRegex.exec(select.value)
    if (argsResults) {
      return { ...select, value: 'health', args: argsResults[1] }
    }
    return select
  })
  return selectsWithParams
}

const getFrom = ({ query }) => {
  const fromRegex = /.*from (.*?)($| where)/i
  const from = fromRegex.exec(query)[1].trim()
  const isValid = fromStructure.includes(from)
  if (!isValid) {
    throw new Error()
  } else {
    return from
  }
}

const getWhere = ({ query }) => {
  const whereRegex = /where(.*)/i
  const allWhere = whereRegex.exec(query)
  if (!allWhere) {
    return []
  } else {
    const wheres = allWhere[1].split('AND').map(s => s.trim())
    const tokenizedWheres = wheres.map(where => {
      const delimeterRegex = /(.*?) ?(=|REGEXP) ?"(.*)"$/
      const [, field, operator, value] = delimeterRegex.exec(where)
      return { field, operator: getOperator({ operator }), value }
    })
    return tokenizedWheres
  }
}

export const getOperator = ({ operator }) => {
  if (operator === '=') {
    return 'EQUALS'
  } else if (operator.toLowerCase() === 'regexp') {
    return 'REGEXP'
  }
}

export default ({ query }) => {
  let selects
  let from
  let wheres

  try {
    selects = getSelects({ query })
  } catch (error) {
    return { queryErrMsg: 'Error in SELECT' }
  }

  try {
    from = getFrom({ query })
  } catch (error) {
    return { queryErrMsg: 'Error in FROM' }
  }

  try {
    wheres = getWhere({ query })
  } catch (error) {
    return { queryErrMsg: `Error in WHERE` }
  }

  return { selects, from, wheres }
}
