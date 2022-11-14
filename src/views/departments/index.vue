<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card class="tree-card">
        <tree-tools :tree-node="company" :is-root="true" />
        <!-- <el-row type="flex" justify="space-between" align="middle" style="height: 40px">
          <el-col>
            <span>传智教育</span>
          </el-col>
          <el-col :span="4">
            <el-row type="flex" justify="end">
              <el-col>负责人</el-col>
              <el-col>
                <el-dropdown>
                  <span class="el-dropdown-link">
                    操作<i class="el-icon-arrow-down el-icon--right" />
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>添加子部门</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </el-col>
            </el-row>
          </el-col>
        </el-row> -->
        <el-tree :data="departs" :props="defaultProps" :default-expand-all="false">
          <tree-tools slot-scope="{data}" :tree-node="data" />
          <!-- <el-row slot-scope="{data}" type="flex" justify="space-between" align="middle" style="height: 40px;width:100%">
            <el-col>
              <span>{{ data.name }}</span>
            </el-col>
            <el-col :span="4">
              <el-row type="flex" justify="end">
                <el-col>{{ data.manager }}</el-col>
                <el-col>
                  <el-dropdown>
                    <span class="el-dropdown-link">
                      操作<i class="el-icon-arrow-down el-icon--right" />
                    </span>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item>添加子部门</el-dropdown-item>
                      <el-dropdown-item>编辑子部门</el-dropdown-item>
                      <el-dropdown-item>删除子部门</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </el-col>
              </el-row>
            </el-col>
          </el-row> -->
        </el-tree>
      </el-card>
    </div>
  </div>
</template>

<script>
import TreeTools from './components/tree-tools.vue'
import { getDepartments, list2Tree } from '@/api/departments'
export default {
  components: {
    TreeTools
  },
  data() {
    return {
      departs: [],
      defaultProps: {
        label: 'name' // 表示 从这个属性显示内容
      },
      company: {
        name: '传智公司',
        manager: '负责人'
      }
    }
  },
  mounted() {
    this.getDepartments()
  },
  methods: {
    async getDepartments() {
      const res = await getDepartments()
      console.log(res)
      this.company.name = res.companyName
      this.departs = list2Tree(res.depts, '')
    }
  }
}

</script>

<style lang=scss scoped>
.tree-card {
  padding: 30px  140px;
  font-size:14px;
}
</style>
