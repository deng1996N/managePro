// 在这个文件统一发送axios请求
import axios from './axios'

export const getData = () => {
  return axios.get('/home/getHomeData')
}

export const getUserList = (params) => {
  return axios.request({
    url: '/user/getUserList',
    method: 'get',
    params
  })
}

export const createUser = (params) => {
  return axios({
    url: '/user/createUser',
    method: 'POST',
    data: params
  })
}

// 删除用户
export const deleteUser = (params) => {
  return axios({
    url: '/user/deleteUser',
    method: 'GET',
    params:{id: params}
  })
}

export const updateUser = (params) => {
  return axios({
    url: '/user/updateUser',
    method: 'POST',
    data: params
  })
}