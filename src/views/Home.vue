<template>
  <div class="home">
    <el-container>
      <el-header>
        <div class="headtitle">后台管理系统</div>
      </el-header>
      <el-container>
        <el-aside width="18rem">
          <el-menu default-active="2"
                   class="aside"
                   @open="handleOpen"
                   @close="handleClose"
                   background-color="#545c64"
                   text-color="#fff"
                   active-text-color="#ffd04b">
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>我的工作台</span>
              </template>
              <!-- <el-menu-item-group>
                <template slot="title">分组一</template>
                <el-menu-item index="1-1">选项1</el-menu-item>
                <el-menu-item index="1-2">选项2</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group title="分组2">
                <el-menu-item index="1-3">选项3</el-menu-item>
              </el-menu-item-group>
              <el-submenu index="1-4">
                <template slot="title">选项4</template>
                <el-menu-item index="1-4-1">选项1</el-menu-item>
              </el-submenu> -->
            </el-submenu>
            <!-- <el-menu-item index="2">
              <i class="el-icon-menu"></i>
              <span slot="title">导航二</span>
            </el-menu-item>
            <el-menu-item index="3"
                          disabled>
              <i class="el-icon-document"></i>
              <span slot="title">导航三</span>
            </el-menu-item>
            <el-menu-item index="4">
              <i class="el-icon-setting"></i>
              <span slot="title">导航四</span>
            </el-menu-item> -->
          </el-menu>
        </el-aside>
        <el-main>
          <div>
            <el-input v-model="input"
                      placeholder="请输入登录码或手机号"
                      class="searchInput"></el-input>
            <el-button type="primary"
                       @click="search">搜索</el-button>
            <el-table :data="tableData"
                      style="width: 100%"
                      height="700">
              <!-- :row-class-name="tableRowClassName" -->
              <el-table-column label="登录时间"
                               width="180">
                <template slot-scope="scope">
                  <span style="margin-left: 10px">{{ timetrans(scope.row.login_time) }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="mobile"
                               label="手机"
                               width="180">
              </el-table-column>
              <el-table-column prop="login_code"
                               label="登录码">
              </el-table-column>
              <el-table-column label="登录状态">
                <template slot-scope="scope">
                  <span style="margin-left: 10px">{{ loginStatus(scope.row.login_status) }}</span>
                </template>
              </el-table-column>
              <el-table-column label="修改登录状态">
                <template slot-scope="scope">
                  <el-button @click="editStatus(scope.row.mobile,scope.row.id,scope.row.login_status)">修改</el-button>
                </template>

              </el-table-column>
            </el-table>
            <el-pagination background
                           @current-change="handleCurrentChange"
                           :current-page.sync="pageParams.pageStartCount"
                           :page-size="pageParams.pageSize"
                           layout="prev, pager, next"
                           :total="tableData.total">
            </el-pagination>
          </div>
        </el-main>
      </el-container>
    </el-container>
    <!-- <HelloWorld /> -->
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  components: {
    // HelloWorld
  },
  data () {
    return {
      pageParams: {
        pageStartCount: 0,
        pageSize: 1
      },
      input: '',
      tableData: []
    }
  },
  methods: {
    loginStatus (code) {
      if (code === 0) {
        return '未登录'
      } else {
        return '已登录'
      }
    },
    async editStatus (mobile, id, status) {
      await this.$http.post('user/setLoginStatus', { login_status: status === 0 ? 1 : 0, id: id })
      this.$msgbox({
        title: '消息',
        message: '是否为' + mobile + '用户更改登录状态',
        showCancelButton: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.getList()
        this.$message({
          type: 'success',
          message: '修改成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消修改'
        })
      })
    },
    async  search () {
      let data = await this.$http.post('user/index', { or_login_time: 1, q: this.input })
      this.tableData = data.data.list
    },
    timetrans (a) {
      var date = new Date(a * 1000)
      var Y = date.getFullYear() + '-'
      var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
      var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' '
      return Y + M + D
    },
    async getList () {
      let json = JSON.parse(JSON.stringify(this.pageParams))
      json.pageStartCount = json.pageStartCount * json.pageSize
      json.or_login_time = 1
      let data = await this.$http.post('user/index', { or_login_time: 1 })
      this.tableData = data.data.list
    },
    handleCurrentChange () {
      this.getList()
    },
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }
    // tableRowClassName ({ row, rowIndex }) {
    //   if (rowIndex === 1) {
    //     return 'warning-row'
    //   } else if (rowIndex === 3) {
    //     return 'success-row'
    //   }
    //   return ''
    // }
  },
  mounted () {
    this.getList()
  }
}
</script>
<style scoped>
.el-table >>> .warning-row {
  background: oldlace;
}

.el-table >>> .success-row {
  background: #f0f9eb;
}
.aside {
  height: 50rem;
}
.el-pagination {
  margin-top: 1rem;
}
.searchInput {
  width: 30%;
}
.el-button {
  margin-left: 0.5rem;
}
</style>
