//基础的接口地址
const base={
    baseUrl:'http://localhost:8888',
    login:'/api/login',//登录接口
    register:'/api/register',//注册接口
    projectList:'/api/projectList',//商品列表
    search:'/api/search',//搜索接口
    selectCategory:'/api/backend/itemCategory/selectItemCategoryByParentId',//类目
    upload:'/upload',//图片
    addShops:'/api/backend/item/insertTbItem',//添加商品
    deleteShops:'/api//backend/item/deleteItemById',//删除商品
    deleteAll:'/api/batchDelete',//批量删除
    setEditor:'/api/backend/item/updateTbItem',//编辑修改
    selectItemParamAll:'/api/backend/itemParam/selectItemParamAll',//规格参数列表
    insertItemParam:"/api/backend/itemParam/insertItemParam",//规格参数配置
    paramsSearch:'/api/params/search',//规格参数的搜索框
    paramsDelete:'/api/params/delete',//表格删除
    category:'/api/category/data',// 规格参数类目结构数据获取 cid
    getAdvertlist:"/api/content/selectContentCategoryByParentId",//广告分类内容
    addvertChild:"/api/content/insertContentCategory",//增加子广告分类
    addAdvertContent:"/api/content/selectTbContentAllByCategoryId",//增加广告内容

}
export default base