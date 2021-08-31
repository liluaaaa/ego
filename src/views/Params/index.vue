<template>
  <div>
    <!-- 搜索框 -->
    <div class="header">
      <el-input
        v-model="search"
        placeholder="请输入内容"
        @change="searchParams"
      ></el-input>
      <el-button type="primary">查询</el-button>
      <el-button type="primary" @click="add">添加</el-button>
    </div>
    <!-- table 表格 -->
    <el-table :data="tableData">
      <el-table-column prop="itemCatId" label="规格参数ID" width="120">
      </el-table-column>
      <el-table-column prop="id" label="类目ID" width="120"> </el-table-column>
      <el-table-column prop="specsName" label="规格名称" width="120">
      </el-table-column>
      <el-table-column prop="paramData" label="规格参数" show-overflow-tooltip>
      </el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <Pagination
      :pageSize="pageSize"
      :total="total"
      @changeCurrent="changeCurrent"
    />
    <!-- 弹框 -->
    <ParamsDialog ref="myDialog" />
  </div>
</template>

<script>
import Pagination from "../../components/Pagination.vue";
import ParamsDialog from "./ParamsDialog.vue";
export default {
  data() {
    return {
      tableData: [],
      //分页
      pageSize: 10,
      total: 100,
      search: "",
      currentPage:'1',
    };
  },
  methods: {
    //添加按钮显示弹框
    add() {
      this.$refs.myDialog.dialogVisible = true;
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    //删除表格
    handleDelete(index, row) {
      console.log(index, row);
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          //请求后台
          this.$api
            .paramsDelete({
              id: row.id,
            })
            .then((res) => {
              console.log("删除：", res);
              if (res.status === 200) {
                this.$message({
                  type: "success",
                  message: "删除成功!",
                });
                //更新视图
                this.http(this.currentPage);
              }else{
                this.$message.error('错了哦，删除失败');
              }
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    //分页
    changeCurrent(val) {
      this.http(val);
      this.currentPage=val
    },
    /**
     * 搜索框事件
     */
    searchParams() {
      //console.log('params搜索框：',this.search);
      if (this.search) {
        this.$api
          .paramsSearch({
            search: this.search,
          })
          .then((res) => {
            //console.log('规格参数搜索框：',res);
            if (res.status === 200) {
              this.tableData = res.result;
            } else {
              console.log("查无数据");
              this.tableData = [];
            }
          });
      } else {
        this.http(1);
      }
    },
    //网络请求
    http(page) {
      this.$api
        .selectItemParamAll({
          page,
        })
        .then((res) => {
          // console.log('规格参数：',res);
          if (res.status === 200) {
            this.tableData = res.data;
            (this.pageSize = res.pageSize), (this.total = res.total);
          }
        });
    },
  },
  created() {
    this.http(1);
  },
  components: {
    Pagination,
    ParamsDialog,
  },
};
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  margin-bottom: 10px;
  button {
    margin-left: 10px;
  }
}
</style>