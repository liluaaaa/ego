<template>
  <div class="content">
    <el-button @click="addContent">{{ treeData.name }}广告</el-button>
    <!-- 表格 -->
    <el-table :data="tableData" style="width: 100%" border>
      <el-table-column prop="pid" label="PID" width="180"> </el-table-column>
      <el-table-column prop="name" label="名称" width="180"> </el-table-column>
      <el-table-column
        prop="url"
        label="访问地址"
        min-width="240"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        prop="image"
        label="图片地址"
        min-width="240"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <!-- 弹框 -->

    <el-dialog title="收货地址" :visible.sync="dialogFormVisible" v-show="advertShow">
      <el-form :model="form">
        <el-form-item label="活动名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="活动区域" :label-width="formLabelWidth">
          <el-select v-model="form.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    treeData: {
      type: Object,
      default: function () {
        return { name: "按钮" };
      },
    },
  },
  data() {
    return {
      advertShow:false,
      tableData: [],
       dialogFormVisible: false,
       formLabelWidth: '120px',
       form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        }, 
    };
  },
  watch: {
    treeData: function (val) {
      //清空数据
      this.tableData = [];
      this.$api
        .addAdvertContent({
          pid: val.pid,
        })
        .then((res) => {
          console.log("监听修改", res);
          if (res.status === 200) {
            this.tableData = res.result;
          } else {
            //没有数据
          }
        });
    },
  },
  methods: {
    handleDelete() {},
    //增加广告内容--弹框
    addContent() {
      this.advertShow=true
    },
  },
};
</script>

<style scoped lang='scss'>
.content {
  text-align: center;
  > button {
    margin-bottom: 20px;
  }
}
</style>