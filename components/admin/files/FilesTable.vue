<template>
  <el-table :data="tableData" stripe style="width: 100%">
    <el-table-column prop="title" label="檔案標題"> </el-table-column>
    <el-table-column prop="url" label="檔案連結"> </el-table-column>
    <el-table-column prop="created_time" label="建立時間" width="100"> </el-table-column>
    <el-table-column align="right" width="50">
      <template slot-scope="{ row }">
        <el-button @click="handleDelete(row)" type="text" size="small">刪除</el-button>
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
      console.log('handleDelete', rowData)
    }
  }
}
</script>