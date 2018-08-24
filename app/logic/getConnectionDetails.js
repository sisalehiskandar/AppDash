export default ({ config }) => {
  const {
    host,
    username,
    password,
    account = 'customer1',
    port = 80,
    https = false,
  } = config

  const filteredAccount = account === '' ? 'customer1' : account

  if (!host || !username || !password) {
    return {
      msg: 'Please add your controller info to Config first',
      type: 'warning',
    }
  }
  const baseURL = `${https ? 'https' : 'http'}://${host}${
    port !== 80 ? `:${port}` : ''
  }/controller`
  console.log(`baseURL - ${baseURL}`)

  const options = {
    url: `${baseURL}`,
    port,
    auth: {
      user: `${username}@${filteredAccount}`,
      pass: password,
      sendImmediately: true,
    },
  }
  return { options, baseURL }
}
