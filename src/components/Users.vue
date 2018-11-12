<template>
    <div class="users">
        <!-- 面包屑导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item to="/users">用户管理</el-breadcrumb-item>
          <el-breadcrumb-item>用户列表</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 搜索框 -->
        <div style="margin-top: 15px;">
          <el-input placeholder="请输入关键字" @keyup.enter.native="search" v-model="query" class="input-with-select">
            <el-button slot="append" icon="el-icon-search" @click='search'></el-button>
          </el-input>
          <el-button type="success" plain>添加用户</el-button>
        </div>
        <!-- 表格展示 -->
        <el-table
            :data="userList"
            style="width: 100%">
            <el-table-column
                prop="username"
                label="姓名"
                width="180"
            >
            </el-table-column>
            <el-table-column
                prop="email"
                label="邮箱"
                width="180">
            </el-table-column>
            <el-table-column
                prop="mobile"
                label="电话"
                width="180">
            </el-table-column>
            <el-table-column
                label="状态"
                width="180">
                <template slot-scope="scope">
                <el-switch
                    v-model="scope.row.mg_state"
                    active-color="#13ce66"
                    inactive-color="#ff4949"
                    @change="changeState(scope.row)">
                </el-switch>
                </template>
            </el-table-column>
            <el-table-column
                label="操作">
                <!-- 自定义这一列的内容，必须指定template -->
                <template slot-scope="scope">
                <el-button size="small" plain type="primary" icon="el-icon-edit"></el-button>
                <el-button size="small" plain type="danger" icon="el-icon-delete" @click="delUser(scope.row.id)"></el-button>
                <el-button size="small" plain type="success" icon="el-icon-check">分配角色</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页功能 -->
        <!-- current-change: 当页码发生改变的时候触发 -->
        <!-- size-change: 当每一页条数发生改变的时候触发 -->
        <!-- current-page: 当前页 -->
        <!-- page-size: 每页显示的条数 -->
        <!-- total: 总条数 -->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-size="pageSize"
          :page-sizes="[2, 4, 6, 8]"
          background
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
    </div>
</template>

<script>
// 导入axios
// import axios from 'axios'
export default {
  data() {
    return {
      // 查询关键字
      query: '',
      // 当前页
      currentPage: 1,
      // 每页的显示条数
      pageSize: 2,
      // 总条数
      total: 0,
      // 用户列表的数据
      userList: []
    }
  },
  methods: {
    // 获取用户列表信息
    getUserList() {
      this.axios({
        method: 'get',
        url: 'http://localhost:8888/api/private/v1/users',
        params: {
          query: this.query,
          pagenum: this.currentPage,
          pagesize: this.pageSize
        }
        // headers: {
        //   Authorization: localStorage.getItem('token')
        // }
      }).then(res => {
        //   console.log(res)
        let { meta: { status }, data: { users, total } } = res
        if (status === 200) {
          this.userList = users
          this.total = total
        }
      })
    },
    // 每页条数发生改变
    handleSizeChange(val) {
      // 每次改变每页显示的条数都变到第一页
      this.currentPage = 1
      // 改变每页的条数
      this.pageSize = val
      // 重新渲染
      this.getUserList()
    },
    // 每一页
    handleCurrentChange(val) {
      // val就是当前页
      this.currentPage = val
      // 重新渲染
      this.getUserList()
    },
    // 搜素功能
    search() {
      this.getUserList()
    },
    // 删除功能
    delUser(id) {
      // console.log(id)
      // 显示,模态框
      this.$confirm('你确定要删除这个用户吗?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.axios({
            method: 'delete',
            url: `http://localhost:8888/api/private/v1/users/${id}`
            // headers: {
            //   Authorization: localStorage.getItem('token')
            // }
          }).then(res => {
            if (res.meta.status === 200) {
              // 提示成功  ???有个问题,如果当前页只有一条的时候,点击删除后,页码值应该减一,渲染上一页的内容
              if (this.userList.length === 1 && this.currentPage > 1) {
                this.currentPage--
              }
              // 删除成功,重新渲染
              this.getUserList()
              this.$message.success('删除成功')
            }
          })
        })
        .catch(() => {
          this.$message.error('你取消了删除操作')
        })
    },
    // 修改用户状态
    changeState({ id, mg_state: mgState }) {
      // console.log(user)
      // 发送ajax请求,
      this.axios({
        url: `users/${id}/state/${mgState}`,
        method: 'put'
        // headers: {
        //   Authorization: localStorage.getItem('token')
        // }
      }).then(res => {
        // console.log(res)
        if (res.meta.status === 200) {
          this.$message.success('修改状态成功')
        } else {
          this.$message.error('修改状态失败')
        }
      })
    }
  },
  created() {
    // 发送ajax请求,渲染
    this.getUserList()
  }
}
</script>

<style lang="less" scoped>
.el-breadcrumb {
  height: 30px;
  line-height: 30px;
}
.el-input {
  width: 400px;
  margin-bottom: 5px;
}
</style>
