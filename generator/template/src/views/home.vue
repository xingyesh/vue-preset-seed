<template>
  <div class='about'>
    <h1>user name is {{username}}</h1>
    <el-table :data='tableData' style='width: 100%' id='tableId'>
      <el-table-column prop='date' label='日期' width='180'></el-table-column>
      <el-table-column prop='name' label='姓名' width='180'></el-table-column>
      <el-table-column prop='address' label='地址'></el-table-column>
    </el-table>
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'

export default {
  data() {
    return {
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }
      ]
    }
  },
  computed: {
    ...mapState({
      username: state => state.user.username
    })
  },
  methods: {
    ...mapActions(['getUserInfo'])
  },
  mounted() {
    this.getUserInfo({ user: 222, name: 'xx' }).then(() => {
    }, (error) => {
      console.log('mounted error is -------->', error)
    }).catch((error) => {
      console.log('catch error is -------->', error)
    })
  }
}
</script>
