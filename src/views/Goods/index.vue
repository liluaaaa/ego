<template>
  <div>
    <!-- 搜索框 -->
    <div class="header">
      <el-input
        v-model="search"
        placeholder="请输入内容"
        @change="goSearch"
      ></el-input>
      <el-button type="primary">查询</el-button>
      <el-button type="primary" @click="showDialog">添加</el-button>
    </div>
    <!-- 表格数据 -->
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column prop="id" label="商品ID" width="100"></el-table-column>
      <el-table-column
        prop="title"
        label="商品名称"
        show-overflow-tooltip
        width="100"
      ></el-table-column>
      <el-table-column
        prop="price"
        label="商品价格"
        width="100"
      ></el-table-column>
      <el-table-column
        prop="num"
        label="商品数量"
        width="100"
      ></el-table-column>
      <el-table-column
        prop="category"
        label="规格类目"
        show-overflow-tooltip
        width="100"
      ></el-table-column>
      <el-table-column
        prop="image"
        label="商品图片"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        prop="sellPoint"
        label="商品卖点"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        prop="descs"
        label="商品描述"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column label="操作">
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
    <div style="margin-top: 20px">
      <el-button @click="deleteAll">批量删除</el-button>
      <el-button @click="toggleSelection()">取消选择</el-button>
      <el-button @click="toggleSelection([tableData[1], tableData[2]])"
        >切换第二、第三行的选中状态</el-button
      >
    </div>
    <!-- 分页器 -->
    <div class="pagination">
      <Pagination
        :pageSize="pageSize"
        :total="total"
        @changeCurrent="changeCurrent"
      />
    </div>

    <!-- 弹框 -->
    <Dailog ref="dialog" :title='title' :rowData='rowData' :currentPage="currentPage"/>
  </div>
</template>

<script>
import Pagination from "../../components/Pagination.vue";
import Dailog from "./Dailog.vue";
export default {
  components: {
    Pagination,
    Dailog,
  },
  data() {
    return {
      tableData: [],
      pageSize: 10,
      total: 100,
      search: "",
      title:'添加商品',
      rowData:{},
      idArr:[],//批量获取的id
      currentPage:'1',//当前的页码
    };
  },
  methods: {
    //编辑
    handleEdit(index, row) {
      console.log("编辑商品",row);
       this.$refs.dialog.dialogVisible = true;
       this.title='编辑商品';//新地址：1. {...}  2. Object.assgin({},row) 
       this.rowData={...row};//row={}

    },
    //删除表格内容
    handleDelete(index, row) {
      console.log(index, row);
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$api
            .deleteShops({
              id: row.id,
            })
            .then((res) => {
              console.log("删除：", res);
              if (res.status === 200) {
                //视图更新
                this.http(this.currentPage);

                this.$message({
                  type: "success",
                  message: "删除成功!",
                });
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
    //删除
    deleteHandle(){
      this.$api.deleteAll({
        idArr:this.idArr
      }).then(res=>{
        console.log('shanchu:',res);
        if(res.status===200){
          //刷新页面视图
          this.http(this.currentPage);
        }
      })
    },
    //批量删除
    deleteAll(){
       this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          //删除
          this.deleteHandle();
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
    //下边按钮的事件
    toggleSelection(rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    //批量删除获取的id
    handleSelectionChange(selection) {
      //console.log('点击的是哪几个：',selection);
      let arr=[];
      selection.forEach(ele=>{
        arr.push(ele.id)
      })
      // console.log(arr);
      this.idArr=arr
    },
    //传的页数据 分页器中点击的是那个
    changeCurrent(val1) {
      console.log(val1);
      this.currentPage=val1;
      //从新网络请求
      this.http(val1);
    },
    /**
     * 点击显示添加弹框
     */
    showDialog() {
      console.log("显示弹框");
      this.$refs.dialog.dialogVisible = true;
      this.title = '添加商品'
    },
    /**
     * 搜索框事件
     */
    goSearch() {
      console.log("搜索数据", this.search);
      if (this.search) {
        this.$api
          .getSearch({
            search: this.search,
          })
          .then((res) => {
            console.log(res.data);
            if (res.data.status === 200) {
              this.tableData = res.data.result;
              this.pageSize = 8;
              this.total = res.data.result.length;
            } else {
              console.log("查无数据");
              this.tableData = [];
              this.pageSize = 1;
              this.total = 0;
            }
          });
      } else {
        this.http(1);
      }
    },
    /**
     * 网络请求
     */
    http(page) {
      this.$api
        .getProjectList({
          page,
        })
        .then((res) => {
          console.log(res.data);
          if (res.status === 200) {
            this.tableData = res.data;
            this.pageSize = res.pageSize;
            this.total = res.total;
          }
        });
    },
  },
  //网络请求
  created() {
    this.http(1);
  },
};
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  margin-bottom: 30px;
  button {
    margin-left: 20px;
  }
}
.pagination {
  text-align: center;
  margin-top: 20px;
}
</style>