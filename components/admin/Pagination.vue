<template>
  <el-pagination
    background
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page.sync="page"
    :page-sizes="[10, 20, 50]"
    :page-size="count"
    layout="total, sizes, prev, pager, next"
    :total="total"
  >
  </el-pagination>
</template>
<script>
export default {
  name: 'Pagination',
  props: {
    page: {
      Type: Number
    },
    count: {
      Type: Number
    },
    total: {
      Type: Number
    }
  },
  methods: {
    handleSizeChange(val) {
      console.log(`${val} items per page`)
    },
    handleCurrentChange(val) {
      console.log(`current page: ${val}`)
    }
  }
}
</script>
