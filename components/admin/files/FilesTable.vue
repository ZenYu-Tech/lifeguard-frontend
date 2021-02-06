<template>
  <el-table :data="tableData" stripe style="width: 100%">
    <el-table-column prop="title" label="檔案標題"> </el-table-column>
    <el-table-column prop="createdAt" label="建立時間" width="150">
      <template slot-scope="{ row }">
        {{ $formatDate(row.updatedAt, true) }}
      </template>
    </el-table-column>
    <el-table-column align="right" width="50">
      <template slot-scope="{ row }">
        <el-button type="text" size="small" @click="handleDelete(row)">刪除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
export default {
  name: 'FilesTable',
  props: {
    tableData: {
      type: Array,
      required: true
    }
  },
  methods: {
    handleDelete(rowData) {
      this.$emit('handleDeleteFile', rowData)
    }
  }
}
</script>
