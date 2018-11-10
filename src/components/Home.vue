<template>
    <el-container class="home">
    <el-header>
        <div class="logo"></div>
        <div class="logout">
            欢迎光临
            <a href="javascript:;" @click="logout">退出</a>
        </div>
        <div class="title">
            <h1>电商后台管理系统</h1>
        </div>
    </el-header>
    <el-container>
        <el-aside width="200px">
        <!-- 我是侧边栏 -->
        <!-- el-menu: 菜单组件 -->
        <!-- default-active：默认选中的菜单 -->
        <!-- el-submenu: 子菜单 -->
        <!-- template：表示子菜单的内容 -->
        <!-- el-menu-item-group： 子菜单的分组 -->
        <!-- el-menu-item：菜单项  -->
        <!-- unique-opened：最多只能打开一个子菜单 -->
        <!-- router:开启了路由模式， 当我们点击导航的时候，会发生路由的跳转, 跳转到index对应的路径 -->
            <el-menu
            default-active="1"
            background-color="#545c64"
            text-color="#fff"
            class="el-menu-vertical-demo"
            active-text-color="#ffd04b"
            unique-opened
            router>
            <el-submenu index="1">
                <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>用户管理</span>
                </template>
                <!-- 菜单项 -->
                <el-menu-item index="/users">
                    <i class="el-icon-menu"></i>
                    <span slot="title">用户列表</span>
                </el-menu-item>
            </el-submenu>
            <el-submenu index="2">
                <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>权限管理</span>
                </template>
                <!-- 菜单项 -->
                <el-menu-item index="2-1">
                    <i class="el-icon-menu"></i>
                    <span slot="title">角色列表</span>
                </el-menu-item>
                <el-menu-item index="2-2">
                    <i class="el-icon-menu"></i>
                    <span slot="title">权限列表</span>
                </el-menu-item>
            </el-submenu>
            </el-menu>
        </el-aside>
        <!-- 用户列表 -->
        <el-main>
            <!-- 配置子路由的出口 -->
            <router-view/>
        </el-main>
    </el-container>
    </el-container>
</template>

<script>
export default {
  methods: {
    logout() {
      this.$confirm('您确定要退出吗？', '提示', {
        distinguishCancelAndClose: true,
        confirmButtonText: '退出',
        cancelButtonText: '取消'
      })
        .then(() => {
          // 清除token
          localStorage.removeItem('token')
          this.$message({
            type: 'info',
            message: '退出成功'
          })
          // 跳转到login
          this.$router.push('/login')
        })
        .catch(action => {
          this.$message({
            type: 'info',
            message: action === 'cancel' ? '放弃退出' : '放弃退出'
          })
        })
    }
  }
}
</script>

<style lang="less" scoped>
// 如果给style加上scoped这个属性,样式只会在当前的组件生效
// 实现原理:如果给当前的组件的style添加这个属性会把当前的额组件的所有的div随机添加一个属性
.home {
  height: 100%;
}
.el-header {
  background-color: #b3c1cd;
  .logo {
    width: 180px;
    float: left;
    height: 60px;
    background-image: url('../assets/logo.png');
    background-repeat: no-repeat;
    background-position: center center;
    background-size: contain;
  }
  .logout {
    float: right;
    line-height: 60px;
    margin-right: 50px;
    text-align: right;
    font-weight: 700;
    a {
      color: #b07a17;
      text-decoration: none;
    }
  }
  .title {
    line-height: 60px;
    overflow: hidden;
    font-size: 18px;
    color: #fff;
    text-align: center;
  }
}
.el-aside {
  background-color: #545c64;
}
.el-main {
  background-color: #d4dfe4;
}

// 侧边栏
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
