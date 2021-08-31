import Vue from 'vue'
import Element from 'element-ui'
import VueI18n from 'vue-i18n'

//引入element里面的语言包
import enLocale from 'element-ui/lib/locale/lang/en'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'

//引入自定义语言环境
import zhyuyan from './zhyuyan'
import enyuyan from './enyuyan'

Vue.use(VueI18n)

// 准备翻译的语言环境信息
const messages = {
    en: {
       
         ...enyuyan,
         ...enLocale,//element的国际化
    },
    zh: {
       
         ...zhyuyan,
         ...zhLocale,//element的国际化
       
    }
}

// 通过选项创建 VueI18n 实例
const i18n = new VueI18n({
    locale: 'zh', // 设置地区
    messages, // 设置地区信息
})
//配置element支持vuei18n 
Element.i18n((key, value) => i18n.t(key, value))
export default i18n;
