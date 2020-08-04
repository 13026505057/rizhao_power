<template>
    <div class="sidebar">
        <div class="slidebarTitle"><i class="el-icon-warning" style="margin-right:10px;color:yellow;"></i>系统导航</div>
        <el-menu :default-active="onRoutes" class="el-menu-vertical-demo"   unique-opened router>
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index">
                        <template slot="title"><i :class="item.icon"></i>{{ item.title }}</template>
                        <el-menu-item v-for="(subItem,i) in item.subs" :key="i" :index="subItem.index">{{ subItem.title }}
                        </el-menu-item>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index">
                        <i :class="item.icon"></i>{{ item.title }}
                    </el-menu-item>
                </template>
            </template>
            <el-button @click="open3()" type="primary" style="width:100%;margin-top:50px;">修改密码</el-button>
        </el-menu>

    </div>
</template>

<script>
    import md5 from 'js-md5';
    export default {
        data() {
            return {
                items: [
                    {
                        icon: 'el-icon-setting',
                        index: '103',
                        title: '数据统计',
                        subs:[
                            {   
                                index: 'oneGoodsInfo',
                                title: '> 单物品出入库统计'
                            },
                            
                            
                        ]
                    },
                    {
                        icon: 'el-icon-setting',
                        index: 'orgShow',
                        title: '物资领用'
                    },
                    {
                        icon: 'el-icon-setting',
                        index: 'goodsUse',
                        title: '物资入库'
                    },
                    {
                        icon: 'el-icon-setting',
                        index: 'myApplyList',
                        title: '申请历史'
                    },
                    {
                        icon: 'el-icon-setting',
                        index: 'churukuHistory',
                        title: '出/入库历史'
                    },
                    {
                        icon: 'el-icon-setting',
                        index: 'planContrast',
                        title: '计划对比'
                    },
                    
                    // {
                    //     icon: 'el-icon-setting',
                    //     index: '101',
                    //     title: '申请审批',
                    //     subs:[
                    //         {   
                    //             index: 'goodsApprove',
                    //             title: '> 入库申请'
                    //         },
                    //         {   
                    //             index: 'goodsApproveOut',
                    //             title: '> 出库申请'
                    //         },
                    //     ]
                    // },
                    // {
                    //     icon: 'el-icon-setting',
                    //     index: '102',
                    //     title: '出库/入库',
                    //     subs:[
                    //         {   
                    //             index: 'ruku',
                    //             title: '> 物品入库'
                    //         },
                    //         {   
                    //             index: 'chuku',
                    //             title: '> 物品出库'
                    //         },
                    //     ]
                    // },
                    
                    
                    {
                        icon: 'el-icon-setting',
                        index: '1',
                        title: '通用设置',
                        subs:[
                            // {   
                            //     index: 'addGoods',
                            //     title: '> 物品管理'
                            // },
                            // {   
                            //     index: 'addUsers',
                            //     title: '> 人员管理'
                            // },
                            // {   
                            //     index: 'position',
                            //     title: '> 职位管理'
                            // },
                            // {   
                            //     index: 'bumenAdmin',
                            //     title: '> 部门管理'
                            // },
                            // {   
                            //     index: 'storeAdmin',
                            //     title: '> 二级库管理'
                            // },
                        ]
                    },
                    
                    
                ]
            }
        },
        computed:{
            onRoutes(){
                return this.$route.path.replace('/','');
            }
        },
        mounted(){
            var userGroups = localStorage.getItem('userGroups');
            var countGroups = userGroups.split(",")
            
            for(var i = 0; i < countGroups.length;i++){
                if(countGroups[i]=='1'){
                    var obj = {
                        icon: 'el-icon-setting',
                        index: '101',
                        title: '申请审批',
                        subs:[
                            {   
                                index: 'goodsApprove',
                                title: '> 入库申请'
                            },
                            {   
                                index: 'goodsApproveOut',
                                title: '> 出库申请'
                            },
                        ]
                    }
                    this.items.splice(6, 0,obj)
                    
                }else if(countGroups[i]=='2'){
                    
                }else if(countGroups[i]=='3'){
                    var obj = {
                        icon: 'el-icon-setting',
                        index: '102',
                        title: '操作出库/入库',
                        subs:[
                            {   
                                index: 'ruku',
                                title: '> 物品入库'
                            },
                            {   
                                index: 'chuku',
                                title: '> 物品出库'
                            },
                        ]
                    }
                    var objobj = {   
                                index: 'storeCount',
                                title: '> 库存盘点'
                            }
                    this.items[0].subs.push(objobj)
                    this.items.splice(7, 0,obj)
                }else if(countGroups[i]=='4'){
                    var length = this.items.length - 1 ;
                    var obj = {   
                                index: 'addUsers',
                                title: '> 人员管理'
                            }
                    this.items[length].subs.push(obj);
                }else if(countGroups[i]=='5'){
                    var length = this.items.length - 1 ;
                    var obj = {   
                                index: 'addGoods',
                                title: '> 物品管理'
                            }
                    this.items[length].subs.push(obj);
                }else if(countGroups[i]=='6'){
                    var length = this.items.length - 1 ;
                    var obj = {   
                                index: 'bumenAdmin',
                                title: '> 部门管理'
                            }
                    this.items[length].subs.push(obj);
                }else if(countGroups[i]=='7'){
                    var length = this.items.length - 1 ;
                    var obj = {   
                                index: 'storeAdmin',
                                title: '> 零值库管理'
                            }
                    this.items[length].subs.push(obj);
                }else if(countGroups[i]=='8'){
                    var length = this.items.length - 1 ;
                    var obj = {   
                                index: 'position',
                                title: '> 职位管理'
                            }
                    
                    this.items[length].subs.push(obj);

                }else if(countGroups[i]=='10'){
                    var obj1 = {   
                                index: 'shenpiliu',
                                title: '> 审批设置'
                            }
                    this.items[length].subs.push(obj1);

                }else if(countGroups[i]=='14'){
                    var obj = {
                        icon: 'el-icon-setting',
                        index: '3',
                        title: '劳保物品',
                        subs:[
                            {   
                                index: 'laobaofafang',
                                title: '> 劳保物品发放历史'
                            },
                            {   
                                index: 'laobaoguanli',
                                title: '> 劳保物品管理'
                            },{   
                                index: 'quanchang',
                                title: '> 全厂周期发放'
                            },
                            {   
                                index: 'bumenzhouqi',
                                title: '> 部门周期发放'
                            },
                            {   
                                index: 'gerenzhouqi',
                                title: '> 个人周期发放'
                            },
                            {   
                                index: 'benyuefafang',
                                title: '> 本月发放'
                            },
                            
                        ]
                    }
                    this.items.splice(8, 0,obj)
                }else{

                }
            }
        },
        methods:{
           
            open3() {
                var self = this;
                self.$prompt('请输入新密码(10位以上，需要包含大小写字母，数字，字符)', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  inputPattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[1-9])(?=.*[\W]).{10,}$/,
                  inputErrorMessage: '密码格式不正确'
                }).then(({ value }) => {
                        var passwordmd5 = md5.hex(value);
                        var params = new URLSearchParams();
                        var token = localStorage.getItem('auth');
                        params.append('password',passwordmd5);         
                        self.$axios({
                            method: 'post',
                            url: '/store/user/updateMyself',
                            data: params,
                            headers: {'Content-Type': 'application/x-www-form-urlencoded','kf-token':token},
                         }).then(function(data){
                            if(data.data.code==0){
                                self.$message({
                                  type: 'success',
                                  message: '修改成功'
                                });  
                            }else{
                              self.$response(data,self);
                            }
                         });      
                  
                }).catch(() => {
                  self.$message({
                    type: 'info',
                    message: '取消输入'
                  });       
                });
             }

        }
    }
</script>

<style scoped>
    .sidebar{
        display: block;
        position: absolute;
        width: 250px;
        left: 0;
        top: 80px;
        bottom:0;
        background: #fff;
       /* overflow-y: scroll;*/
    }
    .slidebarTitle{
        text-align: center;
        color: #fff;
        height: 30px;
        line-height: 30px;
        font-family:'KaiTi';
        font-size: 18px;
        color: #fff;
        background-color: #489ccb;
    }
    .sidebar > ul {
        height:100%;
           overflow-y: scroll;
    }

    .sidebar > ul::-webkit-scrollbar {/*滚动条整体样式*/
            width: 4px;     /*高宽分别对应横竖滚动条的尺寸*/
            height: 4px;
    }
    .sidebar > ul::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
            border-radius: 5px;
            -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
            background: rgba(0,0,0,0.2);
    }
    .sidebar > ul::-webkit-scrollbar-track {/*滚动条里面轨道*/
            -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
            border-radius: 0;
            background: rgba(0,0,0,0.1);
    }
    .el-menu-item{
        background: -webkit-linear-gradient(#b3f2ff, #96e9f9); /* Safari 5.1 - 6.0 */
        background: -o-linear-gradient(#b3f2ff, #96e9f9); /* Opera 11.1 - 12.0 */
        background: -moz-linear-gradient(#b3f2ff, #96e9f9); /* Firefox 3.6 - 15 */
        background: linear-gradient(#b3f2ff, #96e9f9); /* 标准的语法（必须放在最后） */
        border-bottom:1px solid #b9cad3;
        height: 40px;
        line-height: 40px;
    }
    .el-submenu__title{
        background: -webkit-linear-gradient(#b3f2ff, #96e9f9); /* Safari 5.1 - 6.0 */
        background: -o-linear-gradient(#b3f2ff, #96e9f9); /* Opera 11.1 - 12.0 */
        background: -moz-linear-gradient(#b3f2ff, #96e9f9); /* Firefox 3.6 - 15 */
        background: linear-gradient(#b3f2ff, #96e9f9); /* 标准的语法（必须放在最后） */
        height: 40px;
        line-height: 40px;
    }
    .el-menu-item.is-active{
        color: #fff!important;
        background: #3fafe1!important;
    }
    .el-submenu .el-menu-item{
        background: #fff;
        border-bottom:none;
    }

</style>
