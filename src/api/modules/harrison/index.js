import fetch from '@/api/config'

export default {
  getIndex (config) { return fetch('/harrison/index/getInfo', 'get', config) }
}
