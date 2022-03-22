import Mock from 'mockjs'
import homeApi from './mockData/homeApi.js'
import userApi from '@/api/mockData/user.js'

Mock.mock('/home/getHomeData', homeApi.getStatisticalData)
Mock.mock('/user/createUser', 'post',userApi.createUser)
Mock.mock(/user\/deleteUser/, 'get', userApi.deleteUser)
Mock.mock('/user/updateUser', 'post',userApi.updateUser)
Mock.mock(/user\/getUserList/, 'get', userApi.getUserList)