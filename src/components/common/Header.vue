<template>
    <div v-loading.fullscreen.lock="loadingAll" class="header" style="position:reactive">
        <div class="top">
           <!--  <div class="logo"><img style="float:left;margin-left:10px;" src="../../../static/img/logo1.png"><span>{{org_name}}</span></div> -->
            <!-- <div class="logo1"><img src="../../../static/img/logo.png"></div> -->
            <div class="user-info">
                <el-dropdown trigger="click" @command="handleCommand">
                    <span class="el-dropdown-link" style="font-size:20px;">
                        <!-- <img class="user-logo" src="../../../static/img/img.jpg"> -->
                        {{username}}
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="loginout">退出</el-dropdown-item>
                        <el-dropdown-item command="open3">修改密码</el-dropdown-item>
                        <!-- <el-dropdown-item command="adminShow">机构资料</el-dropdown-item> -->
                    </el-dropdown-menu>
                </el-dropdown>
        <el-dialog
            title="待处理消息"
            :visible.sync="tixing"
            width="40%"
            style="text-align:center;"
            >
            <el-table
              :data="daicliList"
              :header-cell-style="{ 'background-color': '#deedf4','color':'#000'}"
              :row-style="rowStyle"
              row-key="user_card_id"
              class="tableClass"
              style="">
              <el-table-column
                type="index"
                align="center"
                >
              </el-table-column>
              <el-table-column
                label="类型"
                align="center"
                prop="type">
              </el-table-column>
              <el-table-column
                label="待处理数量"
                align="center"
                prop="num">
              </el-table-column>
              <el-table-column
                label="操作"
                align="center">
                <template slot-scope="props">
                  <el-button
                  size="mini"
                  @click="updataClick(props.row)">去处理</el-button>
                </template>
              </el-table-column>
            </el-table> 
            <span slot="footer" class="dialog-footer">
              <!-- <el-button @click="tixing = false">取 消</el-button> -->
              <el-button type="primary" @click="tixing = false">关 闭</el-button>
            </span>
        </el-dialog>
            </div>

        </div>
        
        <!-- <div class="siderbar">
            <el-menu
              :default-active="onRoutes"
              unique-opened router
              class="el-menu-demo"
              mode="horizontal"
              menu-trigger="click"
              text-color="#fff"
              open="open(index,indexPath)"
              active-text-color="#ffd04b">
             <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index" >
                        <template slot="title"><i :class="item.icon" ></i>{{ item.title }}</template>
                        <el-menu-item v-for="(subItem,i) in item.subs" :key="i" :index="subItem.index"><i :class="subItem.icon"></i>{{ subItem.title }}
                        </el-menu-item>
                    </el-submenu>
                    <div> <img class="user-logo" src="../../../static/img/borit.png"></div>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index">
                       <i :class="item.icon"></i>{{ item.title }}
                    </el-menu-item>
                    <div> <img class="user-logo" src="../../../static/img/borit.png"></div>
                </template>
            </template>
            <div></div>
            </el-menu>
        </div> -->
    </div>
</template>
<script>
import {MessageBox} from 'element-ui'
import md5 from 'js-md5';

    export default {
       
        data() {
            return {
                loadingAll:false,
                daicliList:[],
                tixing:false,
                name: 'linxin',
                org_name:'',
                items: [
                    {
                        icon: 'el-icon-setting',
                        index: 'readme',
                        title: '位置分布监控'
                    },
                    
                    {
                        icon: 'el-icon-menu',
                        index: '7',
                        title: '查询功能',
                        subs: [
                            {   icon:  'el-icon-document',
                                index: 'jiedurenliebiao',
                                title: '管控人列表'
                            },
                            {
                                icon:  'el-icon-document',
                                index: 'jiedurendangan',
                                title: '管控人档案'
                            },
                            {
                                icon:  'el-icon-document',
                                index: 'jiedurenqiandao',
                                title: '管控人签到'
                            },
                            {
                                icon:  'el-icon-document',
                                index: 'jiedurenweizhi',
                                title: '管控人位置'
                            },
                            {
                                icon:  'el-icon-document',
                                index: 'allReport',
                                title: '管控人报告'
                            },
                            {
                                icon:  'el-icon-document',
                                index: 'qiuzhuxinxi',
                                title: '求助信息页'
                            },
                        ]
                    },
                    {
                        icon: 'el-icon-menu',
                        index: '5',
                        title: '报表导出',
                        subs: [
                            {
                                icon:  'el-icon-document',
                                index: 'baogaoguanli',
                                title: '报表管理'
                            },
                            {
                                icon:  'el-icon-document',
                                index: 'qiandaodaochu',
                                title: '签到报表导出'
                            },
                            {
                                icon:  'el-icon-document',
                                index: 'niaojiandaochu',
                                title: '尿检报表导出'
                            },
                            {
                                icon:  'el-icon-document',
                                index: 'xuejiandaochu',
                                title: '血检报表导出'
                            },
                            {
                                icon:  'el-icon-document',
                                index: 'zhengtidaochu',
                                title: '整体情况导出'
                            },
                        ]
                    },
                    {
                        icon: 'el-icon-date',
                        index: '4',
                        title: '温馨指南',
                        subs: [
                            // {
                            //     index: 'baseform',
                            //     title: '基本表单'
                            // },
                            {
                                icon:  'el-icon-document',
                                index: 'vueeditor',
                                title: '文章编辑'
                            },
                            {
                                icon:  'el-icon-document',
                                index: 'articleHistory',
                                title: '文章历史'
                            }
                            // {
                            //     index: 'markdown',
                            //     title: 'markdown'
                            // },
                            // {
                            //     index: 'upload',
                            //     title: '文件上传'
                            // }
                        ]
                    },
                    
                    {
                        icon: 'el-icon-menu',
                        index: '2',
                        title: '通用设置',
                        subs: [
                            {
                                icon:  'el-icon-document',
                                index: 'basetable',
                                title: '添加'
                            },
                            // {
                            //     index: 'tongyongxiugai',
                            //     title: '修改'
                            // },
                            // {
                            //     index: 'vuetable',
                            //     title: 'Vue表格组件'
                            // },
                            {
                                icon:  'el-icon-document',
                                index: 'shengjishezhi',
                                title: '省级设置'
                            },
                            {
                                icon:  'el-icon-document',
                                index: 'shijishezhi',
                                title: '市级设置'
                            },
                            {
                                icon:  'el-icon-document',
                                index: 'quxianshezhi',
                                title: '区县设置'
                            },
                            {
                                icon:  'el-icon-document',
                                index: 'bangongshishezhi',
                                title: '办公室设置'
                            },
                            {
                                icon:  'el-icon-document',
                                index: 'fenzushezhi',
                                title: '分组设置'
                            },
                            
                            // {
                            //     index: 'zhiwu',
                            //     title: '职务设置'
                            // },
                            // {
                            //     index: 'bumen',
                            //     title: '区县设置'
                            // },
                            // {
                            //     index: 'fenzu',
                            //     title: '管控办公室设置'
                            // },
                            // {
                            //     icon:  'el-icon-document',
                            //     index: 'ziliao',
                            //     title: '资料设置'
                            // },
                            // {
                            //     icon:  'el-icon-document',
                            //     index: 'timesetting',
                            //     title: '上传资料设置'
                            // },
                            // {
                            //     index: 'changePassword',
                            //     title: '修改密码'
                            // }
                        ]
                    },
                    {
                        icon: 'el-icon-star-on',
                        index: 'basecharts',
                        title: '管控数据统计'
                    },
                    {
                        icon: 'el-icon-menu',
                        index: 'jingyuanliebiao',
                        title: '警员设置',
                        // subs: [
                        //     {
                        //         index: 'jingyuantianjia',
                        //         title: '警员添加'
                        //     },
                        //     // {
                        //     //     index: 'jingyuanxiugai',
                        //     //     title: '警员修改'
                        //     // },
                        //     {
                        //         index: 'jingyuanliebiao',
                        //         title: '警员管理'
                        //     },
                        // ]
                    },
                    

                   
                    // {
                    //     icon: 'el-icon-upload2',
                    //     index: 'drag',
                    //     title: '拖拽'
                    // }
                ]
            }
        },
        computed:{
            username(){
                let username = localStorage.getItem('username')+localStorage.getItem('user_true_name');
                return username ? username : this.name;
            },
            onRoutes(){
                
                return this.$route.path.replace('/','');
            },
            // handleSelect(){
            //    this.$route.path.replace('/','');
            // }
        },
        methods:{
            updataClick(val){
                this.$router.push(val.path);
            },
            open(index,indexPath){
                console.log(index)
            },
            handleCommand(command) {
                var self = this;
                if(command == 'loginout'){
                   
                    localStorage.removeItem('auth');
                  
                    
                    this.$router.push('/login');
                }else if(command == 'open3'){
                    self.$prompt('请输入新密码(10位以上，需要包含大小写字母，数字，字符)', '提示', {
                      confirmButtonText: '确定',
                      cancelButtonText: '取消',
                      // inputPattern: /[a-zA-Z]\w{5,17}$/,
                      inputPattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[1-9])(?=.*[\W]).{10,}$/,
                      inputErrorMessage: '密码格式不正确'
                    }).then(({ value }) => {
                        const self = this;
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
                }else if(command == 'adminShow'){
                    this.$router.push('/adminSetting');
                }else{
                    return
                }
            },
            rowStyle({ row, rowIndex}){
                if(rowIndex%2 ==0){
                  return 'background:#eee;color:#000;'
                }else{
                 return 'background:#e5e7e8;color:#000;'
                }
            },   
            onload(){
                const self = this;
                self.loadingAll = true;
                var xuyaoRuKuTotal = 0;
                var xuyaoChuKuTotal = 0;
                var rukuTotal = 0;
                var chukuTotal = 0;
                //入库
                var params = new URLSearchParams();
                var token = localStorage.getItem('auth');
                params.append('pageNum','1'); 
                params.append('pageSize','9');
                params.append('approve_type','in');
                params.append('apply_approve_status','2');
                  
                self.$axios({
                    method: 'post',
                    url: '/store/apply/getNeedDealApply',
                    data: params,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded','kf-token':token},
                 }).then(function(data){
                    if(data.data.code==0){
                      rukuTotal = data.data.data.total;
                      var obj = {
                        type:'入库审批',
                        path:'/goodsApprove',
                        num:rukuTotal
                      }
                      self.daicliList.push(obj)
                    }else{
                      self.$response(data,self);
                    }
                 });
                //出库
                var params1 = new URLSearchParams();
               
                params1.append('pageNum','1'); 
                params1.append('pageSize','9');
                params1.append('approve_type','out');
                params1.append('apply_approve_status','2'); 
                
                    
                self.$axios({
                    method: 'post',
                    url: '/store/apply/getNeedDealApply',
                    data: params1,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded','kf-token':token},
                 }).then(function(data){
                    if(data.data.code==0){
                      
                      chukuTotal = data.data.data.total;
                      var obj1 = {
                        type:'出库审批',
                        path:'/goodsApproveOut',
                        num:chukuTotal
                      }
                      self.daicliList.push(obj1)
                    }else{
                      self.$response(data,self);
                    }
                 });


                var params2 = new URLSearchParams();
                
                params2.append('pageNum','1'); 
                params2.append('pageSize','9');  
                params2.append('good_out_id',self.good_number);   
                
                self.$axios({
                    method: 'post',
                    url: '/store/stock/getNeedOut',
                    data: params2,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded','kf-token':token},
                 }).then(function(data){
                    if(data.data.code==0){
                      xuyaoChuKuTotal = data.data.data.total;
                      var obj2 = {
                        type:'待操作出库',
                        path:'/chuku',
                        num:xuyaoChuKuTotal
                      }
                      self.daicliList.push(obj2)
                    }else{
                      self.$response(data,self);
                    }
                });


                var params3 = new URLSearchParams();
                // var token = localStorage.getItem('auth');
                params3.append('pageNum','1'); 
                params3.append('pageSize','9');
                // params.append('good_out_id',self.good_number);
                
                self.$axios({
                    method: 'post',
                    url: '/store/stock/getNeedIn',
                    data: params3,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded','kf-token':token},
                 }).then(function(data){
                    if(data.data.code==0){
                      
                      xuyaoRuKuTotal = data.data.data.total;
                      var obj3 = {
                        type:'待操作入库',
                        path:'/ruku',
                        num:xuyaoRuKuTotal
                      }
                      self.daicliList.push(obj3)
                    }else{
                      self.$response(data,self);
                    }
                 });
                 setTimeout(function(){
                    self.loadingAll = false;
                    if(xuyaoRuKuTotal>0||xuyaoChuKuTotal>0||rukuTotal>0||chukuTotal>0){

                        self.tixing = true;
                    }else{

                    }
                 },4000)
            }

        },
        mounted(){
            var self = this;
            self.onload();
            setInterval(function(){
                if(self.tixing){
                    self.tixing = false;
                    self.onload();
                    
                }else{
                    self.onload();
                    // self.tixing = true;
                }
            },300000)
        }
    }
</script>
<style scoped>
    .el-dropdown-menu__item--divided:before, .el-menu, .el-menu--horizontal>.el-menu-item:not(.is-disabled):focus, .el-menu--horizontal>.el-menu-item:not(.is-disabled):hover, .el-menu--horizontal>.el-submenu .el-submenu__title:hover{
         background-color:rgba(255,255,255,0.1);
    }
    .logo1{
        position: absolute;
        top: 50%;
        left: 50%;
        margin-top: -20px;
        margin-left: -106px;
    }
    .top{
        width: 100%;
        height:80px;
        background-image: url(../../../static/img/top.jpg);
        background-size:100%100%;  
    }
    .el-menu--horizontal{
        border-bottom: none;
        height: 70px;
        line-height: 70px;
    }
    .header {
        position: relative;
        box-sizing: border-box;
        width: 100%;
        height: 70px;
        font-size: 22px;
        line-height: 70px;
        color: #fff;
    }
    .header .logo{
        float: left;
        height: 70px;
        width:15%;
        text-align: center;
    }
    .header .siderbar{
        float: left;
        font-size: 40px;
        width:100%;
        height:70px;
        text-align: center;
       
       
    }
    .user-info {
        float: right;
        width:15%;
        height:70px;
        padding-right: 20px;
        font-size: 16px;
        color: #fff;
    }
    .user-info .el-dropdown-link{
        position: relative;
        display: inline-block;
        padding-left: 50px;
        color: #fff;
        cursor: pointer;
        vertical-align: middle;
    }
    .user-info .user-logo{
        position: absolute;
        left:0;
        top:15px;
        width:40px;
        height:40px;
        border-radius: 50%;
    }

</style>
