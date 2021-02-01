<template>
  <el-pagination
    background
    layout="total, sizes, prev, pager, next"
    :current-page="page"
    :page-sizes="[10, 20, 50]"
    :page-size="count"
    :total="total"
    @current-change="$emit('jump', $event)"
    @size-change="$emit('change-size', $event)"
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
  }
}
</script>
