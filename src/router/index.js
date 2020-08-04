import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    // mode: 'history',
    routes: [
        {
            path: '/',
            redirect: '/login'
        },
        {
            path: '/readme',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            children:[
                {
                    name:'管控人分布',
                    path: '/',
                    component: resolve => require(['../components/page/Readme.vue'], resolve)
                },
                {
                    name:'审批流设置',
                    path: '/shenpiliu',
                    component: resolve => require(['../components/page/shenpiliu.vue'], resolve)
                },
                {
                    name:'劳保管理',
                    path: '/laobaoguanli',
                    component: resolve => require(['../components/page/laobaoguanli.vue'], resolve)
                },{
                    name:'全厂周期发放',
                    path: '/quanchang',
                    component: resolve => require(['../components/page/quanchang.vue'], resolve)
                },{
                    name:'部门周期发放',
                    path: '/bumenzhouqi',
                    component: resolve => require(['../components/page/bumenzhouqi.vue'], resolve)
                },
                {
                    name:'个人周期发放',
                    path: '/gerenzhouqi',
                    component: resolve => require(['../components/page/gerenzhouqi.vue'], resolve)
                },
                {
                    name:'本月发放',
                    path: '/benyuefafang',
                    component: resolve => require(['../components/page/benyuefafang.vue'], resolve)
                },
                {
                    name:'劳保发放历史',
                    path: '/laobaofafang',
                    component: resolve => require(['../components/page/laobaofafang.vue'], resolve)
                },
                {
                    name:'数据展示',
                    path: '/basetable',
                    component: resolve => require(['../components/page/BaseTable.vue'], resolve)
                },
                {
                    name:'管控人导入',
                    path: '/daoru',
                    component: resolve => require(['../components/page/daoru.vue'], resolve)
                },
                {
                    name:'时间设置',
                    path: '/timesetting',
                    component: resolve => require(['../components/page/timesetting.vue'], resolve)
                },
                {
                    name:'管控人档案',
                    path: '/jiedurendangan',
                    component: resolve => require(['../components/page/jiedurendangan.vue'], resolve)
                },
                {
                    name:'vue表格',
                    path: '/vuetable',
                    component: resolve => require(['../components/page/VueTable.vue'], resolve)     // vue-datasource组件
                },
                {
                    name:'警员添加',
                    path: '/jingyuantianjia',
                    component: resolve => require(['../components/page/jingyuantianjia.vue'], resolve)     // vue-datasource组件
                },
                {
                    name:'社戒人列表',
                    path: '/jiedurenliebiao',
                    component: resolve => require(['../components/page/jiedurenliebiao.vue'], resolve)     // vue-datasource组件
                },
                {
                    name:'社康人列表',
                    path: '/jiedurenliebiaoShekang',
                    component: resolve => require(['../components/page/jiedurenliebiaoShekang.vue'], resolve)     // vue-datasource组件
                },
                {
                    name:'在册人列表',
                    path: '/jiedurenliebiaoZaice',
                    component: resolve => require(['../components/page/jiedurenliebiaoZaice.vue'], resolve)     // vue-datasource组件
                },
                {
                    name:'管控人修改',
                    path: '/jiedurenxiugai',
                    component: resolve => require(['../components/page/jiedurenxiugai.vue'], resolve)     // vue-datasource组件
                },
                {
                    name:'操作员列表',
                    path: '/caozuoyuan',
                    component: resolve => require(['../components/page/caozuoyuan.vue'], resolve)     // vue-datasource组件
                },
                {
                    name:'操作员添加',
                    path: '/caozuoyuantianjia',
                    component: resolve => require(['../components/page/caozuoyuantianjia.vue'], resolve)     // vue-datasource组件
                },
                {
                    name:'警员修改',
                    path: '/jingyuanxiugai',
                    component: resolve => require(['../components/page/jingyuanxiugai.vue'], resolve)     // vue-datasource组件
                },
                {
                    name:'警员列表',
                    path: '/jingyuanliebiao',
                    component: resolve => require(['../components/page/jingyuanliebiao.vue'], resolve)     // vue-datasource组件
                },
                {
                    name:'管控人签到',
                    path: '/jiedurenqiandao',
                    component: resolve => require(['../components/page/jiedurenqiandao.vue'], resolve)     // vue-datasource组件
                },
                {
                    name:'管控人位置',
                    path: '/jiedurenweizhi',
                    component: resolve => require(['../components/page/jiedurenweizhi.vue'], resolve)     // vue-datasource组件
                },
                {
                    name:'求助信息',
                    path: '/qiuzhuxinxi',
                    component: resolve => require(['../components/page/qiuzhuxinxi.vue'], resolve)     // vue-datasource组件
                },
                {
                    name:'部门',
                    path: '/bumen',
                    component: resolve => require(['../components/page/Bumen.vue'], resolve)     // vue-datasource组件
                },
                {
                    name:'分组',
                    path: '/fenzu',
                    component: resolve => require(['../components/page/fenzu.vue'], resolve)     // vue-datasource组件
                },
                {
                    name:'通用修改',
                    path: '/tongyongxiugai',
                    component: resolve => require(['../components/page/tongyongxiugai.vue'], resolve)     // vue-datasource组件
                },
                {
                    name:'资料',
                    path: '/ziliao',
                    component: resolve => require(['../components/page/ziliao.vue'], resolve)     // vue-datasource组件
                },
                {
                    name:'职务',
                    path: '/zhiwu',
                    component: resolve => require(['../components/page/Zhiwu.vue'], resolve)     // vue-datasource组件
                },
                {
                    name:'表格1',
                    path: '/baseform',
                    component: resolve => require(['../components/page/BaseForm.vue'], resolve)
                },
                {
                    name:'编辑器',
                    path: '/vueeditor',
                    component: resolve => require(['../components/page/VueEditor.vue'], resolve)    // Vue-Quill-Editor组件
                },
                {
                    name:'标记',
                    path: '/markdown',
                    component: resolve => require(['../components/page/Markdown.vue'], resolve)     // Vue-Quill-Editor组件
                },
                {
                    name:'上传',
                    path: '/upload',
                    component: resolve => require(['../components/page/Upload.vue'], resolve)       // Vue-Core-Image-Upload组件
                },
                {
                    name:'表格',
                    path: '/basecharts',
                    component: resolve => require(['../components/page/BaseCharts.vue'], resolve)   // vue-schart组件
                },
                {
                    name:'拖拽',
                    path: '/drag',
                    component: resolve => require(['../components/page/DragList.vue'], resolve)    // 拖拽列表组件
                },
                {
                    name:'文章历史',
                    path: '/articleHistory',
                    component: resolve => require(['../components/page/articleHistory.vue'], resolve)    // 拖拽列表组件
                },
                {
                    name:'文章修改',
                    path: '/articlexiugai',
                    component: resolve => require(['../components/page/articlexiugai.vue'], resolve)    // 拖拽列表组件
                },
                {
                    name:'管控人详细位置',
                    path: '/locationOne',
                    component: resolve => require(['../components/page/locationOne.vue'], resolve)    // 拖拽列表组件
                },
                {
                    name:'权限不足',
                    path: '/404',
                    component: resolve => require(['../components/page/404.vue'], resolve)    // 拖拽列表组件
                },
                {
                    name:'省级设置',
                    path: '/shengjishezhi',
                    component: resolve => require(['../components/page/shengjishezhi.vue'], resolve)    // 拖拽列表组件
                },
                {
                    name:'市级设置',
                    path: '/shijishezhi',
                    component: resolve => require(['../components/page/shijishezhi.vue'], resolve)    // 拖拽列表组件
                },
                {
                    name:'区县设置',
                    path: '/quxianshezhi',
                    component: resolve => require(['../components/page/quxianshezhi.vue'], resolve)    // 拖拽列表组件
                },
                {
                    name:'办公室设置',
                    path: '/bangongshishezhi',
                    component: resolve => require(['../components/page/bangongshishezhi.vue'], resolve)    // 拖拽列表组件
                },
                {
                    name:'分组设置',
                    path: '/fenzushezhi',
                    component: resolve => require(['../components/page/fenzushezhi.vue'], resolve)    // 拖拽列表组件
                },
                {
                    name:'签到报表导出',
                    path: '/qiandaodaochu',
                    component: resolve => require(['../components/page/qiandaodaochu.vue'], resolve)    // 拖拽列表组件
                },
                {
                    name:'尿检报表导出',
                    path: '/niaojiandaochu',
                    component: resolve => require(['../components/page/niaojiandaochu.vue'], resolve)    // 拖拽列表组件
                },
                {
                    name:'毛发报表导出',
                    path: '/xuejiandaochu',
                    component: resolve => require(['../components/page/xuejiandaochu.vue'], resolve)    // 拖拽列表组件
                },
                {
                    name:'整体情况报表导出',
                    path: '/zhengtidaochu',
                    component: resolve => require(['../components/page/zhengtidaochu.vue'], resolve)    // 拖拽列表组件
                },
                {
                    name:'报表管理',
                    path: '/baogaoguanli',
                    component: resolve => require(['../components/page/baogaoguanli.vue'], resolve)    // 拖拽列表组件
                },
                {
                    name:'一体机',
                    path: '/yitiji',
                    component: resolve => require(['../components/page/yitiji.vue'], resolve)    // 拖拽列表组件
                },
                {
                    name:'管理策略',
                    path: '/celue',
                    component: resolve => require(['../components/page/celue.vue'], resolve)    // 拖拽列表组件
                },
                {
                    name:'报告查询页',
                    path: '/allReport',
                    component: resolve => require(['../components/page/allReport.vue'], resolve)    // 拖拽列表组件
                },
                {
                    name:'围栏定位',
                    path: '/weilan',
                    component: resolve => require(['../components/page/weilan.vue'], resolve)    // 拖拽列表组件
                },
                {
                    name:'围栏预警',
                    path: '/weilanyujing',
                    component: resolve => require(['../components/page/weilanyujing.vue'], resolve)    // 拖拽列表组件
                },
                {
                    name:'培训资料',
                    path: '/peixunziliao',
                    component: resolve => require(['../components/page/peixunziliao.vue'], resolve)    // 拖拽列表组件
                },
                {
                    name:'考试设置',
                    path: '/kaoshishezhi',
                    component: resolve => require(['../components/page/kaoshishezhi.vue'], resolve)    // 拖拽列表组件
                },
                {
                    name:'考试题库',
                    path: '/peixuntiku',
                    component: resolve => require(['../components/page/peixuntiku.vue'], resolve)    // 拖拽列表组件
                },
                {
                    name:'考勤管理',
                    path: '/kaoqinguanli',
                    component: resolve => require(['../components/page/kaoqinguanli.vue'], resolve)    // 拖拽列表组件
                },
                {
                    name:'一体机分布',
                    path: '/yitijiMap',
                    component: resolve => require(['../components/page/yitijiMap.vue'], resolve)    // 拖拽列表组件
                },
                {
                    name:'地图下钻',
                    path: '/allMap',
                    component: resolve => require(['../components/page/allMap.vue'], resolve)    // 拖拽列表组件
                },
                {
                    name:'人员管理',
                    path: '/newClass',
                    component: resolve => require(['../components/page/newClass.vue'], resolve)    // 拖拽列表组件
                },
                {
                    name:'预警研判',
                    path: '/index',
                    component: resolve => require(['../components/page/index.vue'], resolve)    // 拖拽列表组件
                },
                {
                    name:'用户设置',
                    path: '/adminSetting',
                    component: resolve => require(['../components/page/adminSetting.vue'], resolve)    // 拖拽列表组件
                },
                {
                    name:'社戒报道',
                    path: '/shejiebaodao',
                    component: resolve => require(['../components/page/shejiebaodao.vue'], resolve)    // 拖拽列表组件
                },
                {
                    name:'社康报道',
                    path: '/shekangbaodao',
                    component: resolve => require(['../components/page/shekangbaodao.vue'], resolve)    // 拖拽列表组件
                },
                {
                    name:'社会面报道',
                    path: '/shehuimianbaodao',
                    component: resolve => require(['../components/page/shehuimianbaodao.vue'], resolve)    // 拖拽列表组件
                },
                {
                    name:'物品查询',
                    path: '/orgShow',
                    component: resolve => require(['../components/page/orgShow.vue'], resolve)    // 拖拽列表组件
                },
                {
                    name:'申请历史',
                    path: '/myApplyList',
                    component: resolve => require(['../components/page/myApplyList.vue'], resolve)    // 拖拽列表组件
                },
                {
                    name:'物品新增',
                    path: '/addGoods',
                    component: resolve => require(['../components/page/addGoods.vue'], resolve)    // 拖拽列表组件
                },
                {
                    name:'人员新增',
                    path: '/addUsers',
                    component: resolve => require(['../components/page/addUsers.vue'], resolve)    // 拖拽列表组件
                },
                {
                    name:'部门管理',
                    path: '/bumenAdmin',
                    component: resolve => require(['../components/page/bumenAdmin.vue'], resolve)    // 拖拽列表组件
                },
                {
                    name:'职位管理',
                    path: '/position',
                    component: resolve => require(['../components/page/position.vue'], resolve)    // 拖拽列表组件
                },
                {
                    name:'二级库管理',
                    path: '/storeAdmin',
                    component: resolve => require(['../components/page/storeAdmin.vue'], resolve)    // 拖拽列表组件
                },
                {
                    name:'入库申请',
                    path: '/goodsApprove',
                    component: resolve => require(['../components/page/goodsApprove.vue'], resolve)    // 拖拽列表组件
                },
                {
                    name:'出库申请',
                    path: '/goodsApproveOut',
                    component: resolve => require(['../components/page/goodsApproveOut.vue'], resolve)    // 拖拽列表组件
                },
                {
                    name:'物品出库',
                    path: '/chuku',
                    component: resolve => require(['../components/page/chuku.vue'], resolve)    // 拖拽列表组件
                },
                {
                    name:'物品入库',
                    path: '/ruku',
                    component: resolve => require(['../components/page/ruku.vue'], resolve)    // 拖拽列表组件
                },
                {
                    name:'单物品统计',
                    path: '/oneGoodsInfo',
                    component: resolve => require(['../components/page/oneGoodsInfo.vue'], resolve)    // 拖拽列表组件
                },
                {
                    name:'出/入库历史',
                    path: '/churukuHistory',
                    component: resolve => require(['../components/page/churukuHistory.vue'], resolve)    // 拖拽列表组件
                },
                {
                    name:'物品申请',
                    path: '/goodsUse',
                    component: resolve => require(['../components/page/goodsUse.vue'], resolve)    // 拖拽列表组件
                },
                {
                    name:'计划对比',
                    path: '/planContrast',
                    component: resolve => require(['../components/page/planContrast.vue'], resolve)    // 拖拽列表组件
                },
                {
                    name:'库存盘点',
                    path: '/storeCount',
                    component: resolve => require(['../components/page/storeCount.vue'], resolve)    // 拖拽列表组件
                },
                // {
                //     path: '/changePassword',
                //     component: resolve => require(['../components/page/changePassword.vue'], resolve)    // 拖拽列表组件
                // }
            ]
        },
        {
            path: '/login',
            component: resolve => require(['../components/page/Login.vue'], resolve)
        },
        {
            name:'数据展示',
            path: '/justShow',
            component: resolve => require(['../components/page/justShow.vue'], resolve)
        },
    ]
})
