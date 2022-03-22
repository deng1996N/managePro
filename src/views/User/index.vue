<template>
  <div class="user-container">
    <!-- 弹窗区域 -->
    <el-dialog :title="dialogType === 'add' ? '新增用户' : '修改信息'" :visible.sync="dialogVisible" width="30%">
      <Form ref="form" :form="form" :formLabel="formLabel" :inline="true"></Form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveUser">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 新增、搜索区域 -->
    <div class="header">
      <el-button type="primary" @click="addUser">+新增</el-button>
      <div class="serach">
        <el-input placeholder="请输入用户名字" v-model="searchForm.keywords" style="width: 200px; margin-right: 5px" @keyup.enter.native="getUser(searchForm.keywords)"></el-input>

        <el-button type="primary" @click="getUser(searchForm.keywords)">搜索</el-button>
      </div>
    </div>

    <!-- 表格区域 -->
    <el-table :data="tableData" tooltip-effect="dark" style="width: 100%; height: 580px" height="500" is-scrolling ref="myTable">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column v-for="item in tableLabel" :key="item.label" :label="item.label" :width="item.width ? item.width : 80">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row[item.prop] }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页器 -->
    <div class="block">
      <el-pagination @current-change="changePages" :current-page.sync="config.currentPage" :page-size="pages" layout="total, prev, pager, next" :total="config.totalPage"> </el-pagination>
    </div>
  </div>
</template>

<script>
// import {mapState} from 'vuex'
import { getUserList } from '../../api/api.js'
import { createUser } from '../../api/api.js'
import { deleteUser } from '../../api/api.js'
import { updateUser } from '../../api/api.js'
import Form from '@/components/Form'

export default {
  name: 'User',

  components: {
    Form
  },

  data() {
    return {
      dialogType: 'add',
      dialogVisible: false,

      // 弹窗的配置数据(给子组件)
      formLabel: [
        {
          model: 'name',
          label: '姓名',
          type: 'input'
        },
        {
          model: 'age',
          label: '年龄',
          type: 'input'
        },
        {
          model: 'sex',
          label: '性别',
          type: 'select',
          opts: [
            {
              label: '男',
              value: 1
            },
            {
              label: '女',
              value: 0
            }
          ]
        },
        {
          model: 'birth',
          label: '出生日期',
          type: 'date'
        },
        {
          model: 'addr',
          label: '地址',
          type: 'input'
        }
      ],
      form: {
        name: '',
        addr: '',
        age: '',
        birth: '',
        sex: ''
      },

      // 右侧搜索区域传入组件数据： 表单类型和双向响应的数据
      searchLabel: [
        {
          model: 'keywords',
          label: '',
          type: 'input'
        }
      ],
      searchForm: {
        keywords: ''
      },
      config: {
        currentPage: 1,
        limit: 10,
        totalPage: 0
      },

      // 表格区域数据
      tableLabel: [
        {
          prop: 'name',
          label: '姓名'
        },
        {
          prop: 'age',
          label: '年龄'
        },
        {
          prop: 'sex',
          label: '性别'
        },
        {
          prop: 'birth',
          label: '出生日期',
          width: 200
        },
        {
          prop: 'addr',
          label: '地址',
          width: 320
        }
      ],
      tableData: []
    }
  },
  computed: {
    pages() {
      return this.config.totalPage / this.config.limit
    }
  },
  methods: {
    // 获取用户信息
    getUser(name = '') {
      console.log('触发了列表数据')
      name ? (this.config.currentPage = 1) : ''

      getUserList({
        name,
        page: this.config.currentPage,
        limit: this.config.limit
      }).then(res => {
        let Data = res.data
        // console.log(Data)
        this.config.totalPage = Data.count
        let list = Data.list.map(item => {
          item.sex = item.sex === 0 ? '女' : '男'
          return item
        })
        this.tableData = list
      })
    },

    // 懒加载滚动刷新
    // tableListener() {
    //   console.log('监听表格dom对象的滚动事件')
    //   let that = this
    //   let dom = that.$refs.myTable.bodyWrapper
    //   // console.log(dom)
    //   dom.addEventListener('scroll', function () {
    //     const scrollDistance = dom.scrollHeight - dom.scrollTop - dom.clientHeight
    //     // console.log(scrollDistance)
    //     if (scrollDistance <= 0) {
    //       //等于0证明已经到底，可以请求接口
    //       if (that.config.currentPage < that.config.totalPage) {
    //         that.config.currentPage++
    //         console.log('到底了')
    //         that.getUser()
    //       }
    //     }
    //   })
    // },

    // 点击开始新增用户
    addUser() {
      this.dialogType = 'add'
      this.dialogVisible = true
      // 把form的数据置空，重新加入
      this.form = { name: '', addr: '', age: '', birth: '', sex: '' }
      this.config.currentPage = 1
    },

    // 新增和编辑功能弹窗的点击确定保存用户
    saveUser() {
      if (this.dialogType === 'add') {
        createUser(this.form).then(res => {
          this.$message({
            message: res.data.data.message,
            type: 'success'
          })
          // this.$store.commit('addUser', this.form)
          this.dialogVisible = false
          this.getUser()
          this.config.currentPage = 1
        })
      } else {
        // 编辑
        updateUser(this.form).then(res => {
          // console.log(res)
          this.$message({
            message: res.data.data.message,
            type: 'success'
          })
          this.dialogVisible = false
          this.getUser()
        })
      }
    },
    // 点击编辑按钮
    handleEdit(row) {
      this.form = { ...row }
      this.dialogType = ''
      this.dialogVisible = true
    },
    // 点击删除按钮
    handleDelete(row) {
      //  弹出确认框
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          // 点击确定触发成功之后回调
          deleteUser(row.id).then(res => {
            console.log(row.id)
            console.log(res)
            this.getUser()
            this.$message({
              message: '删除成功！',
              type: 'success'
            })
          })
        })
        .catch(() => {
          // 点击取消触发失败回调
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    changePages(page) {
      console.log(page) // 当前点击的页码
      getUserList({ name: '', page: page, limit: this.config.limit }).then(res => {
        let Data = res.data
        // console.log(Data)
        this.config.totalPage = Data.count
        let list = Data.list.map(item => {
          item.sex = item.sex === 0 ? '女' : '男'
          return item
        })
        this.tableData = list
      })
    }
  },
  created() {
    this.getUser()
  },

  mounted() {
    // this.tableListener()
  }
}
</script>

<style lang="less" scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
</style>