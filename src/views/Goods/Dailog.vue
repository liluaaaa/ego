<template>
  <div>
    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      width="70%"
      :before-close="clearFrom"
    >
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="类目选择">
          <el-button type="primary" @click="showInnerVisible"
            >类目选择</el-button
          >
          {{ ruleForm.category }}
        </el-form-item>
        <el-form-item label="商品名称" prop="title">
          <el-input v-model="ruleForm.title"></el-input>
        </el-form-item>
        <el-form-item label="商品价格" prop="price">
          <el-input v-model="ruleForm.price"></el-input>
        </el-form-item>
        <el-form-item label="商品数量" prop="num">
          <el-input v-model="ruleForm.num"></el-input>
        </el-form-item>
        <el-form-item label="商品卖点" prop="sellPoint">
          <el-input v-model="ruleForm.sellPoint"></el-input>
        </el-form-item>
        <el-form-item label="商品图片" prop="image">
          <el-button type="primary" @click="innerImageVisible = true"
            >上传图片</el-button
          >
          <img
            :src="ruleForm.image"
            alt=""
            style="width: 140px; vertical-align: middle; margin-left: 20px"
          />
        </el-form-item>
        <el-form-item label="商品描述" prop="desc">
          <Wangeditor @getEditor="getEditor" ref="Fueditor" />
        </el-form-item>

        <el-form-item label="规格参数配置" v-show="rulesShow">
          <el-form
            ref="dynamicForm"
            label-width="100px"
            class="demo-dynamic"
          >
            <!-- 第一层遍历数据结构  -->
            <el-form-item
              v-for="(item, index) in paramData"
              :label="item.title"
              :key="index"
            >
              <div class="list">
                <el-input v-model="item.value"></el-input>
              </div>
              <!-- 第二层 -->
              <el-form-item
                v-for="(ele, n) in item.children"
                :label="ele.title"
                :key="n"
              >
                <div class="list">
                  <el-input v-model="ele.value"></el-input>
                </div>
              </el-form-item>
            </el-form-item>
          </el-form>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="clearFrom">取 消</el-button>
        <el-button type="primary" @click="subimtForm">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 1.内弹框--类目选择 -->
    <el-dialog
      width="40%"
      title="类目选择"
      :visible.sync="innerVisible"
      append-to-body
    >
      <GoodsTree @getTreeData="getTreeData" />
      <span slot="footer" class="dialog-footer">
        <el-button @click="innerVisible = false">取 消</el-button>
        <el-button type="primary" @click="showTreeData">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 2.内弹框---图片上传 -->
    <el-dialog
      width="40%"
      title="图片上传"
      :visible.sync="innerImageVisible"
      append-to-body
    >
      <Upload @getImage="getImage" />
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="innerImageVisible = false"
          >确定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import GoodsTree from "./GoodsTree.vue";
import Upload from "./Upload.vue";
import Wangeditor from "./Wangeditor.vue";
export default {
  components: {
    GoodsTree,
    Upload,
    Wangeditor,
  },
  props: {
    title: {
      type: String,
      default: "添加商品",
    },
    rowData: {
      type: Object,
      default: function () {
        return {};
      },
    },
    currentPage: {
      type: [Number, String],
      default: "1",
    },
  },
  watch: {
    rowData(val) {
      //延迟加载  this.$nextTick()
      this.$nextTick(() => {
        console.log("监听数据修改了", val);
        this.ruleForm = val;
        //获取规格配置参数  判断规格参数是否存在 
        if(val.paramsInfo){
          this.paramData=JSON.parse(val.paramsInfo)
          this.rulesShow=true;
        }
        //清空富文本编译器
        // console.log(this.$refs.wangEditor);
        this.$refs.Fueditor.editor.txt.html(val.descs);
      });
    },
  },
  data() {
    return {
      dialogVisible: false, //外弹框
      innerVisible: false, //内弹框
      innerImageVisible: false, //内弹框图片上传
      treeData: {}, //tree传来的数据
      rulesShow: false,
      paramData:[],//规格配置数据
      ruleForm: {
        id: "",
        category: "", //类目名称
        cid: "", //类目标识
        title: "",
        price: "",
        num: "",
        sellPoint: "",
        image: "",
        desc: "",
      },
      rules: {
        title: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 1, max: 5, message: "长度在 1 到 5 个字符", trigger: "blur" },
        ],
        price: [{ required: true, message: "请输入商品价格", trigger: "blur" }],
        num: [
          { required: true, message: "请输入商品数量", trigger: "blur" },
          { min: 1, message: "至少一件商品", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    showInnerVisible() {
      this.innerVisible = true;
    },
    /**
     * 点击tree返回对应的类目数据
     */
    getTreeData(val) {
      // console.log(val);
      this.treeData = val;
    },
    /**
     * 显示tree数据
     */
    showTreeData() {
      //显示类目
      this.ruleForm.category = this.treeData.name;
      this.ruleForm.cid = this.treeData.cid;
      this.innerVisible = false; //关闭内弹框
      this.$api
        .getParamscategory({
          cid: this.ruleForm.cid,
        })
        .then((res) => {
          console.log("规格------", res);
          if (res.status === 200) {
            //paramData  渲染规格配置
            this.paramData = JSON.parse(res.result[0].paramData);
            console.log(this.paramData);
            this.rulesShow=true;
          }else{
            this.rulesShow=false;
          }
        });
    },
    /**
     * 回显图片
     */
    getImage(img) {
      console.log(img);
      this.ruleForm.image = img;
      // 弹框隐藏
      this.innerImageVisible = false;
    },
    /**
     * 富文本编辑器
     */
    getEditor(msg) {
      console.log(msg);
      this.ruleForm.desc = msg;
    },
    /**
     * 添加商品
     * 参数： title cid  category sellPoint price num desc paramsInfo image
     */
    subimtForm() {
      let { title, cid, category, sellPoint, price, num, desc, image, id } =
        this.ruleForm;
        let paramsInfo=JSON.stringify(this.paramData)
      //判断按钮功能 是添加商品还是编辑商品
      if (this.title == "添加商品") {
        this.$api
          .addShops({
            title,
            cid,
            category,
            sellPoint,
            price,
            num,
            desc,
            image,
            paramsInfo
          })
          .then((res) => {
            console.log("添加商品：", res);
            if (res.status === 200) {
              this.$message({
                message: "恭喜你，添加商品成功",
                type: "success",
              });
              //清空表单
              this.clearFrom();
              //刷新视图
              this.$parent.http(this.currentPage);
              console.log("当前页码：", this.currentPage);
            }
          });
      } else {
        console.log("编辑商品");
        this.$api
          .setEditor({
            title,
            cid,
            category,
            sellPoint,
            price,
            num,
            desc,
            image,
            id,
            paramsInfo
          })
          .then((res) => {
            console.log("编辑：", res);
            if (res.status === 200) {
              this.$message({
                message: "恭喜你，编辑商品成功",
                type: "success",
              });
              //清空表单
              this.clearFrom();
              //刷新视图
              this.$parent.http(this.currentPage);
            }
          });
      }
    },
    /**
     * 清空表单
     */
    clearFrom() {
      //隐藏弹框
      this.dialogVisible = false;
      //清空添加的信息
      this.ruleForm = {
        name: "", //类目名称
        cid: "", //类目标识
        title: "",
        price: "",
        num: "",
        sellPoint: "",
        image: "",
        desc: "",
      };
      //清空富文本编辑器内容  官网给的 editor.txt.clear()
      this.$refs.Fueditor.editor.txt.clear();
      //清空规格配置
      this.paramData=[];
      this.rulesShow=false;
    },
  },
};
</script>

<style>
</style>