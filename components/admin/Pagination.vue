<template>
  <el-pagination
    background
    layout="total, sizes, prev, pager, next"
    :current-page.sync="page"
    :page-sizes="[10, 20, 50]"
    :page-size="count"
    :total="total"
    @current-change="handleCurrentChange"
    @size-change="handleSizeChange"
  >
  </el-pagination>
</template>
<script>
export default {
  name: 'Pagination',
  props: {
    page: {
      type: Number,
      required: true
    },
    count: {
      type: Number,
      required: true
    },
    total: {
      type: Number,
      required: true
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
