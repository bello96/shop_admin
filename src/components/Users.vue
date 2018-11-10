<template>
    <div class="users">
        <!-- 面包屑导航 -->
        <!-- 搜索框 -->
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
                    inactive-color="#ff4949">
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
       
    </div>
</template>

<script>
// 导入axios
import axios from 'axios'
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
  created() {
    // 获取用户的列表信息
    // 发送ajax请求
    axios({
      method: 'get',
      url: 'http://localhost:8888/api/private/v1/users',
      params: {
        query: this.query,
        pagenum: this.currentPage,
        pagesize: this.pageSize
      },
      headers: {
        Authorization: localStorage.getItem('token')
      }
    }).then(res => {
      //   console.log(res.data)
      if (res.data.meta.status === 200) {
        this.userList = res.data.data.users
        this.total = res.data.data.total
      }
    })
  }
}
</script>

<style>
</style>
