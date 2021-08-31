<template>
  <div>
    <el-upload
      class="upload-demo"
      ref="upload"
      :action="url"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :on-success="handleSuccess"
      :file-list="fileList"
      :auto-upload="false"
    >
      <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
      <el-button
        style="margin-left: 10px"
        size="small"
        type="success"
        @click="submitUpload"
        >上传到服务器</el-button
      >
      <div slot="tip" class="el-upload__tip">
        只能上传jpg/png文件，且不超过500kb
      </div>
    </el-upload>
  </div>
</template>

<script>
import base from '../../api/config'
export default {
  data() {
    return {
      fileList: [],
      url:base.baseUrl+base.upload,
    };
  },
  methods: {
    submitUpload() {
      this.$refs.upload.submit();
    },
    //文件上传成功时的钩子  element插件中upload上传中有该事件
    handleSuccess(response, file, fileList){
        console.log(response);
        //传递图片路由--回显图片  配置静态文件托管
        // console.log(base.baseUrl+'/'+response.url.slice(7));
        let imageUrl=base.baseUrl+'/'+response.url.slice(7)
        this.$emit('getImage',imageUrl)

    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
  },
};
</script>

<style>
</style>