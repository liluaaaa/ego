<template>
  <div id="main"></div>
</template>

<script>
import E from "wangeditor";
export default {
  data() {
    return {
      editor: "",
    };
  },
  mounted() {
    this.editor = new E("#main");
    // 配置 onchange 回调函数
    this.editor.config.onchange = (newHtml)=> {
      //console.log("change 之后最新的 html", newHtml);
      this.$emit('getEditor',newHtml)
    };
    // 配置触发 onchange 的时间频率，默认为 200ms
    this.editor.config.onchangeTimeout = 500; // 修改为 500ms

    this.editor.create();
  },
};
</script>

<style>
</style>