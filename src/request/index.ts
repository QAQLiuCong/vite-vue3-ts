import { request } from './config'

export const getHitsList = (params: any = {}) => request({ url: '/v1/search', method: 'GET', hideLoading: false }, params)
