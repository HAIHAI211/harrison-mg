import {get, post} from '@/api/config'

export default {
  getIndex () { return get('/harrison/index/get') },
  updateIndex (params) { return post('/harrison/index/update', params) }
}
