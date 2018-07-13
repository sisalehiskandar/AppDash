import {
  controllerHostName,
  isHTTPS,
  controllerPort,
  username,
  password,
  accountName,
} from '../config.json'

export const baseURL = `${
  isHTTPS ? 'https' : 'http'
}://${controllerHostName}/controller`

// Build base options for each rest call
export const options = {
  url: `${baseURL}`,
  port: controllerPort,
  auth: {
    user: `${username}@${accountName}`,
    pass: password,
    sendImmediately: true,
  },
}
