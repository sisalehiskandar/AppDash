export default ({ hostname, username, password, account, port, https }) => {
  // Build base options for each rest call
  const baseURL = `${https ? 'https' : 'http'}://${hostname}/controller`
  const options = {
    url: `${baseURL}`,
    port,
    auth: {
      user: `${username}@${account}`,
      pass: password,
      sendImmediately: true,
    },
  }
  return { options, baseURL }
}
