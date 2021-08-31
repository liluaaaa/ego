//方法
import base from "./config";
import axios,{get,post} from '../uilts/request'


const api={
    /**
     * 登录
     */
    getLogin(params){
        // return axios.post(base.login,params)
        return post(base.login,params)
    },
    /**
     * 商品列表
     */
    getProjectList(params){
        return get(base.projectList,params)
    },
    /**
     * 搜索
     */
    getSearch(params){
        return axios.get(base.search,{
            params
        })
    },
    /**
     * 类目
     */
     selectCategory(params){
        return get(base.selectCategory,params)
     },
     /**
      * 注册
      */
     getRegister(params){
         return axios.post(base.register,params)
     },
     /**
      * 添加商品
      *  参数： title cid  category sellPoint price num desc paramsInfo image
      */
     addShops(params){
         return get(base.addShops,params)
     },
     /**
      * 删除商品
      */
     deleteShops(params){//{id:xxx}
         return get(base.deleteShops,params)
     },
     /**
      * 批量删除
      */
     deleteAll(params){//[]
         return get(base.deleteAll,params)
     },
     /**
      * 编辑修改
      */
     setEditor(params){
         return get(base.setEditor,params)
     },
     /**
      * 规格参数列表
      */
      selectItemParamAll(params){
          return get(base.selectItemParamAll,params)
      },
      /**
       * 规格参数配置  itemCatId  content  specsName
       */
       insertItemParam(params){
           return get(base.insertItemParam,params)
       },
    /**
     * 规格参数搜索
     */
    paramsSearch(params){
        return get(base.paramsSearch,params)
    },
    /**
     * 删除  id
     */
    paramsDelete(params){
        return get(base.paramsDelete,params)
    },
    /**
     * 规格参数类目结构数据获取 cid
     */
    getParamscategory(params){
        return get(base.category,params)
    },
    /**
            * 广告分类 id
            */
     getAdvertlist(params){
        return get(base.getAdvertlist,params)
    },
     /**
             * 增加子广告分类pid name
             */
      addvertChild(params){
        return get(base.addvertChild,params) 
     },
     /**
      * 增加广告内容
      * pid
      */
      addAdvertContent(params){
        return get(base.addAdvertContent,params) 
      }
}

export default api