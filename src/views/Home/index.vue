/* eslint-disable vue/multi-word-component-names */
/* eslint-disable vue/multi-word-component-names */
<template>
  <div class="index-container">
    <el-row>
      <el-col :span="8">
        <el-card shadow="hover" class="login">
          <div class="header">
            <img :src="userImg" alt="" />
            <div class="userInfo">
              <h1 class="name">{{ userInfo.name }}</h1>
              <p class="admin">号码：{{ userInfo.phone }}</p>
            </div>
          </div>
          <div class="loginInfo">
            <p>
              本次次登录时间：<span>{{ forDate }}</span>
            </p>
            <p>本次登录地点：<span>广东</span></p>
          </div>
        </el-card>
        <el-card class="userTable" shadow="hover">
          <el-table :data="tableData" style="width: 100%; height: 350px">
            <el-table-column v-for="(val, key) in labelData" :key="key" :prop="key" :label="val"> </el-table-column>
          </el-table>
        </el-card>
      </el-col>
      <!-- 右边区域 -->
      <!-- 右上方区域 -->
      <el-col :span="16">
        <div class="titleData" style="width: 100%">
          <el-card class="counter" v-for="item in countData" :key="item.name" body-style="display:flex;padding:0">
            <i class="icon" :class="`el-icon-${item.icon}`" :style="`background-color: ${item.color}`"></i>
            <div class="content">
              <p class="content-num">￥ {{ item.value }}</p>
              <p class="content-name">{{ item.name }}</p>
            </div>
          </el-card>
        </div>
        <!-- 折线图 -->
        <el-card style="height: 250px; margin: 10px; overflow: visible">
          <div id="main" style="width: 600px; height: 200px"></div>
        </el-card>
        <!-- 柱状图 -->
        <div class="graph">
          <el-card style="height: 230px; margin-right: 50px">
            <div id="zhuBar" style="width: 100%; height: 250px;font-size=14px"></div>
          </el-card>
          <!-- 饼图 -->
          <el-card style="height: 230px">
            <div id="bingBar" style="width: 300px; height: 200px"></div>
          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getData } from '@/api/api.js'
import * as echarts from 'echarts'
import moment from 'moment'
export default {
  name: 'Home',
  data() {
    return {
      userInfo: {},
      userImg: require('@/assets/images/user.png'),
      tableData: [],
      labelData: { name: '品牌', todayBuy: '日销量', monthBuy: '月销量', totalBuy: '总销量' },
      countData: [
        {
          name: '今日支付订单',
          value: 1234,
          icon: 'success',
          color: '#2ec7c9'
        },
        {
          name: '今日收藏订单',
          value: 210,
          icon: 'star-on',
          color: '#ffb980'
        },
        {
          name: '今日未支付订单',
          value: 1234,
          icon: 's-goods',
          color: '#5ab1ef'
        },
        {
          name: '本月支付订单',
          value: 1234,
          icon: 'success',
          color: '#2ec7c9'
        },
        {
          name: '本月收藏订单',
          value: 210,
          icon: 'star-on',
          color: '#ffb980'
        },
        {
          name: '本月未支付订单',
          value: 1234,
          icon: 's-goods',
          color: '#5ab1ef'
        }
      ],
      orderData: {},
      echartsSeries: [],
      brandArr: [],
      userData: [],
      videoData: []
    }
  },
  computed: {
    forDate() {
      // let str = new Date()
      return moment().format('yyyy-MM-DD HH:MM')
    }
  },
  mounted() {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))
    this.userInfo = userInfo
    getData().then(res => {
      // console.log(moment().format())
      // console.log(res.data.data)
      let data = res.data.data
      this.tableData = data.tableData
      this.orderData = data.orderData
      const brandArr = Object.keys(this.orderData.data[0])
      brandArr.forEach(value => {
        this.echartsSeries.push({
          name: value,
          data: data.orderData.data.map(item => item[value]), // 这个跟据每个品牌名map方法筛选出来对应的每个数组
          type: 'line'
        })
      })
      // 品牌数组
      this.brandArr = brandArr
      // 播放用户
      data.userData.forEach(item => {
        this.userData.push([item.date, item.new, item.active])
      })
      let arr1 = ['', '新增用户', '活跃用户']
      this.userData = [arr1].concat(this.userData)
      // 视频用户饼图
      this.videoData = data.videoData

      this.getEcharts()
    })
  },
  methods: {
    getEcharts() {
      // echarts
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById('main'))
      let zhuBar = echarts.init(document.getElementById('zhuBar'))
      let bingBar = echarts.init(document.getElementById('bingBar'))
      // 指定图表的配置项和数据
      let option1 = {
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: this.brandArr
        },
        grid: {
          left: '3%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: this.orderData.date
        },
        yAxis: {
          type: 'value'
        },
        series: this.echartsSeries
      }
      // 柱状图配置
      let option2 = {
        legend: {},
        color: ['green', 'purple'],
        tooltip: {},
        dataset: {
          source: this.userData
        },
        xAxis: {
          type: 'category',
          axisLabel: { rotate: 40 }
        },
        yAxis: {},
        // Declare several bar series, each will be mapped
        // to a column of dataset.source by default.
        series: [{ type: 'bar' }, { type: 'bar' }]
      }
      // 饼图配置
      let option3 = {
        tooltip: {
          trigger: 'item',
          confine: true
          // formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        series: [
          {
            name: '视频播放',
            type: 'pie',
            radius: '55%',
            center: ['45%', '50%'],
            data: this.videoData,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option1)
      zhuBar.setOption(option2)
      bingBar.setOption(option3)
    }
  }
}
</script>

<style lang="less" scoped>
.index-container {
  // 用户信息
  .login {
    display: flex;
    flex-direction: column;
    margin-top: 10px;
    border-radius: 10px;
    .header {
      display: flex;
      padding-bottom: 20px;
      border-bottom: 1px solid #ccc;
      img {
        width: 100px;
        height: 100px;
        border-radius: 50%;
      }
      .userInfo {
        padding-top: 20px;
        padding-left: 30px;
        .name {
          font-weight: 700;
          font-size: 24px;
          margin-bottom: 10px;
        }
        .admin {
          font-size: 16px;
          text-align: left;
        }
      }
    }
    .loginInfo {
      margin-top: 20px;
      p {
        margin-bottom: 10px;
      }
    }
  }
  // 表格区域
  .userTable {
    margin-top: 20px;
    border-radius: 10px;
  }
  // 右侧区域
  .titleData {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    box-sizing: border-box;
    .el-card {
      width: 200px;
      margin: 10px;
    }
    .icon {
      width: 50px;
      height: 50px;
      text-align: center;
      line-height: 50px;
      font-size: 30px;
      color: #fff;
    }
    .content {
      display: flex;
      flex-direction: column;
      width: 150px;
      .content-num {
        font-size: 26px;
      }
      .content-name {
        font-size: 12px;
        color: #999;
        text-align: center;
      }
      p {
        line-height: 25px;
      }
    }
  }
  .graph {
    display: flex;
    justify-content: space-around;
    padding: 10px;
    .el-card {
      width: 48%;
    }
  }
}
</style>