import fetch from '../../config'

export default {
  getRules (config) { return fetch('/service-system/setting/rules/get', 'get', config) },
  updateRule (data) { return fetch('/service-system/setting/rules/update', 'post', {data}) }
}
