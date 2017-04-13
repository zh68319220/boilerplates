import $ from 'webpack-zepto'
import Promise from 'promise'

let handler = (resolve, reject, data, status, xhr) => {
  switch (status) {
    case 'success':
      resolve(data || {})
      break
    default:
      reject({})
      break
  }
}

export const getGitUser = (username) => {
  return new Promise((resolve, reject) => {
    $.getJSON('https://api.github.com/users/' + username, (data, status, xhr) => {
      handler(resolve, reject, data, status, xhr)
    })
  })
}
