import { request } from './config'

export const getHitsList = (params: any = {}) => request({ url: '/v1/search?query=foo&tags=story', method: 'GET', hideLoading: false }, params)
