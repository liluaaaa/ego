<template>
  <div>
    <el-dialog
      title="规格参数类目选择"
      :visible.sync="dialogVisible"
      width="60%"
      :before-close="handleClose"
    >
      <div v-if="dialogVisible">
          <GoodsTree @getTreeData="getTreeData" />
      </div>
      <!-- 内弹框 -->
      <el-dialog
        width="45%"
        title="商品规格参数配置"
        :visible.sync="innerVisible"
        append-to-body
      >
        <p>当前选中的商品：{{ paramsInfo.name }}</p>
        <el-button @click="addDomain">新增规格列表</el-button>
        <hr />
        <el-form
          :model="dynamicValidateForm"
          ref="dynamicValidateForm"
          label-width="100px"
          class="demo-dynamic"
        >
          <!-- 第一层遍历的数据 -->
          <el-form-item
            v-for="(item, index) in dynamicValidateForm.groups"
            :label="item.title"
            :key="index"
          >
            <div class="list">
              <el-input v-model="item.title"></el-input>
              <el-button @click.prevent="addChildDomain(index)"
                >添加子组</el-button
              >
              <el-button @click.prevent="removeDomain(index)">删除组</el-button>
            </div>
            <!-- 第二层遍历的数据 -->
            <el-form-item
              v-for="(ele, n) in item.children"
              :label="ele.title"
              :key="n"
            >
              <div class="list">
                <el-input v-model="ele.title"></el-input>
                <el-button @click.prevent="removeCurrentDomain(index, n)"
                  >删除</el-button
                >
              </div>
            </el-form-item>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="subimtDynamicForm">提交</el-button>
          <el-button @click="dialogVisible = false">重置</el-button>
        </span>
      </el-dialog>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="innerVisible = true"
          :disabled="isShow"
          >确定并添加分组</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import GoodsTree from "../Goods/GoodsTree.vue";
export default {
  data() {
    return {
      dialogVisible: false,
      isShow: true,
      innerVisible: false,
      paramsInfo: "", //tree选中的
      dynamicValidateForm: {
        //动态表单数据
        groups: [
          //       {
          //         value: "",//规格的值
          //         title:'基本信息',//规格的名称
          //         children:[
          //             {
          //                 value:'',
          //                 title:'',
          //             }
          //         ]
          //       },
          //       {
          //           value:'',
          //           title:'主体',
          //           children:[]
          //       }
        ],
      },
    };
  },
  methods: {
    //关闭按钮
    handleClose() {
      this.dialogVisible = false;
    },
    //tree
    getTreeData(val) {
      this.isShow = false;
      this.paramsInfo = val;
    },
    //动态表单事件-----------------------------------------------
    removeDomain(index) {
      this.dynamicValidateForm.groups.splice(index, 1);
    },
    //增加子组件
    addChildDomain(index) {
      this.dynamicValidateForm.groups[index].children.push({
        value: "",
        title: "",
      });
    },
    //删除子组件
    removeCurrentDomain(index, n) {
      this.dynamicValidateForm.groups[index].children.splice(n, 1);
    },
    //增加大组件
    addDomain() {
      this.dynamicValidateForm.groups.push({
        value: "",
        title: "",
        children: [],
      });
    },
    //提交事件 ---
    subimtDynamicForm() {
      console.log("规格参数：", this.dynamicValidateForm.groups);
      let itemCatId = this.paramsInfo.cid;
      let specsName = this.paramsInfo.name;
      console.log("规格id", "类目名：", itemCatId, specsName);
      //判断规格数据有无   itemCatId  content  specsName
      if (this.dynamicValidateForm.groups.length > 0) {
        this.$api
          .insertItemParam({
            itemCatId,
            specsName,
            content: JSON.stringify(this.dynamicValidateForm.groups),
          })
          .then((res) => {
            console.log("-----", res);
            if (res.status == 200) {
              this.$message({
                message: "恭喜你，添加成功",
                type: "success",
              });
              //关闭弹框
                this.innerVisible=false,
                this.dialogVisible=false,
                //更新视图
                this.$parent.http(1)
                //清空表单
                this.dynamicValidateForm.groups=[]
                //按钮关闭
                this.isShow=true;
            }else{
                 this.$message.error('错了哦，这是一条错误消息');
            }
          });
      } else {
        alert("规格参数不能为空");
      }
    },
  },
  components: {
    GoodsTree,
  },
};
</script>

<style lang="scss" scoped>
.list {
  display: flex;
  button {
    margin-left: 10px;
  }
}
</style>