<template>
    <div>
        
<!--         <div >

            <div class="block">
               
                <el-cascader
                  class="demonstration"
                  :options="options"
                  v-model="selectedOptions"
                  placeholder="请选择机构"
                  @change="handleChange">
                </el-cascader>
                <el-button type="warning" style="margin-left: 30px;" @click="search">查询</el-button>

               <el-autocomplete
                  class="inline-input"
                  v-model="name"
                  style="margin-left: 60px;"
                  :fetch-suggestions="querySearch"
                  placeholder="姓名查询"
                  @select="handleSelect"
                ></el-autocomplete>
                <el-button type="warning" style="margin-left: 30px;" @click="nameSearch">查询</el-button>
                <el-input
                    placeholder="身份证号查询"
                    style="width: 200px;margin-left: 60px;"
                    v-model="number"
                    clearable>
                </el-input>
                <el-button type="warning" style="margin-left: 30px;" @click="numberSearch">查询</el-button>
            </div>

          
        </div> -->
        <!-- <div class="tree">
          <el-tree :data="data"    @node-click="handleNodeClick"></el-tree>
        </div> -->
        <div id="container" style="width: 100%;height: 110%;  float: right;">
          <div class="numData">
            <div class="tableTitle" style="font-size: 20px;">
              管理策略列表
            </div>
            <div class="tableTitle">
              当前机构：{{org_name}}
            </div>
            <div class="tableTitle">
              管控人总计：{{userCount}}人
            </div>
            <div class="tableTitle">
              监控中：{{jkz}}人
            </div>
            <div class="tableTitle">
              <el-button type="warning" @click="showAddNew">新增策略</el-button>
            </div>
          </div>
            <el-dialog title="新增策略" :visible.sync="dialogFormVisible">
              <el-form :model="form">
                <el-form-item label="策略名称:" label-width="120px">
                  <el-input v-model="planName" placeholder="请输入策略名称" autocomplete="off" style="width:400px;float:left;"></el-input>
                </el-form-item>
                <el-form-item v-for="item in reportList" :label="item.report_name" label-width="120px">
                  <el-input v-model="item.day" placeholder="请输入间隔天数" autocomplete="off" style="width:200px;float:left;"></el-input>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="addNew">确 定</el-button>
              </div>
            </el-dialog>
            <el-dialog title="策 略 详 情" :visible.sync="dialogFormVisible2">
                <el-table
                  border
                  empty-text="暂无数据"
                  stripe
                  :data="planList"
                  style="width: 80%;margin:0 auto;">
                  <el-table-column
                    prop="report_name"
                    label="报告名称"
                    align="center">
                  </el-table-column>
                  <el-table-column
                    align="center"
                    prop="interval_day"
                    label="间隔日期">
                  </el-table-column>
                  <el-table-column
                    align="center"
                    label="操作">
                    <template slot-scope="props">
                      <el-button
                      size="mini"
                      type="primary"
                      @click="updataReportForPlan(props.row)">修改</el-button>
                      <el-button
                      size="mini"
                      type="danger"
                      @click="delReportForPlan(props.row)">删除</el-button>
                    </template>
                  </el-table-column>
                </el-table>
                 <el-dialog
                  width="40%"
                  title="修 改 策 略"
                  :visible.sync="innerVisible"
                  append-to-body>
                  <el-form ref="form" :model="form" label-width="120px">
                    <el-form-item label="策略名称">
                      <el-input v-model="form.plan_name" style="width:320px;"></el-input>
                    </el-form-item>
                    <el-form-item label="选择报告">
                    <el-select v-model="form.report_id" placeholder="请选择">
                      <el-option
                        v-for="item in reportList"
                        :key="item.report_id"
                        :label="item.report_name"
                        :value="item.report_id">
                      </el-option>
                    </el-select>
                    </el-form-item>
                    <el-form-item label="间隔天数">
                      <el-input v-model="form.day" style="width:320px;"></el-input>
                    </el-form-item>
                    <el-form-item>
                      <el-button type="primary" @click="addReportForPlan">确定添加</el-button>
                      <el-button @click="innerVisible = false">关闭</el-button>
                    </el-form-item>
                  </el-form>

                </el-dialog>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible2 = false">取 消</el-button>
                <el-button type="primary" @click="innerVisible = true">添加报告</el-button>
              </div>
            </el-dialog>
          
          <div class="tableList">
            <el-table
              :data="tableData5"
              :header-cell-style="{ 'background-color': '#deedf4','color':'#000'}"
              :row-style="rowStyle"
              empty-text="暂无数据"
              class="tableClass"
              style="">
              
              <el-table-column
                label="策略名称"
                align="center"
                prop="plan_name">
              </el-table-column>
              <el-table-column
                label="创建时间"
                align="center"
                >
                <template slot-scope="props">
                  <span>系统默认</span>
                </template>
              </el-table-column>
              <el-table-column
                label="创建人"
                align="center"
                >
                <template slot-scope="props">
                  <span>系统默认</span>
                </template>
              </el-table-column>
              <el-table-column
                label="策略状态"
                align="center"
                prop="plan_status">
                <template slot-scope="props">
                  <span>{{props.row.plan_status==1?'使用中':'停用'}}</span>
                </template>
              </el-table-column>
              <!-- <el-table-column
                label="归属省"
                prop="provincial_name">
              </el-table-column> -->
              <!-- <el-table-column
                label="当前状态"
                >
                <template slot-scope="props">
                    <span>{{props.row.job_status==1?'使用中':'停用'}}</span>
                </template>
              </el-table-column> -->
              <el-table-column
                label="操作"
                align="center">
                <template slot-scope="props">
                  <el-button
                  size="mini"
                  @click="handleupDate(props.row)">详情</el-button>
                  <el-button
                  size="mini"
                  type="danger"
                  @click="handleEdit(props.row)">删除</el-button>
                </template>
              </el-table-column>
            </el-table> 
                
          </div>
          <!-- <el-pagination
                small
                background
                style="text-align: center;margin-top: 20px;"
                @current-change="handleCurrentChange"
                :current-page.sync="currentPage"
                :page-size="9"
                layout="prev, pager, next, jumper"
                :total="total">
          </el-pagination> -->
        </div>
        

    </div>
</template>

<script>
  import  TMap from '../../TMap';
   import md5 from 'js-md5';
  export default {
      data: function(){
          return {
              innerVisible:false,
              currentPage:1,
              dialogFormVisible:false,
              dialogFormVisible2:false,
              total:'',
              adUserCount:'',
              djk:'',
              jkjs:'',
              jkz:'',
              userCount:'',
              org_name:'',
              name:'',
              restaurants: [],
              value1:'',
              value2:'',
              selectedOptions: [],
              data: [],
              planName:'',
              value:'',
              tableData5: [],
              defaultProps: {
                children: 'children',
                label: 'label'
              },
              form:{
               report_id:'',
               day:null,
               plan_name:'',
               plan_id:''
              },
              reportList:[],
              planList:[]
            }
              
      },
      mounted() {
          var adUserCount =  localStorage.getItem('adUserCount');
          var djk =  localStorage.getItem('djk');
          var jkjs =  localStorage.getItem('jkjs');
          var jkz =  localStorage.getItem('jkz');
          var userCount =  localStorage.getItem('userCount');
          var org_name =  localStorage.getItem('org_name');
          this.adUserCount = adUserCount;
          this.djk = djk;
          this.jkjs = jkjs;
          this.jkz = jkz;
          this.userCount = userCount;
          this.org_name = org_name;
          this.request(); 
          this.getDataList(); 
          this.getOrgsList();
          this.getReportList();
          this.restaurants = this.loadAll();
      },
      methods: {
          //给策略新增报告
          addReportForPlan(){
                const self = this;
                var params = new URLSearchParams();
                var token = localStorage.getItem('auth');
                params.append('plan_name',self.form.plan_name);
                params.append('plan_id',self.form.plan_id);    
                params.append('report_id',self.form.report_id);
                params.append('interval_day',self.form.day);
               
                self.$axios({
                    method: 'post',
                    url: '/stop/addReportPlanDetail',
                    data: params,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded','kf-token':token},
                 }).then(function(data){
                    if(data.data.code==0){
                        self.$message({
                          type: 'success',
                          message: '添加成功'
                        });  
                        self.innerVisible  = false;
                        self.dialogFormVisible2  = false;
                        self.getDataList();
                    }else{
                      self.$response(data,self);
                    }
                 }); 
          },
          //删除策略中的报告
          delReportForPlan(data){
            const self = this;
              self.$confirm('此操作将删除该报告, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                  var params = new URLSearchParams();
                  var token = localStorage.getItem('auth');
                  params.append('plan_detail_id',data.plan_detail_id);    
                  self.$axios({
                      method: 'post',
                      url: '/stop/delReportPlanDetail',
                      data: params,
                      headers: {'Content-Type': 'application/x-www-form-urlencoded','kf-token':token},
                   }).then(function(data){
                      if(data.data.code==0){
                        self.$message({
                          type: 'success',
                          message: '删除成功!'
                        });
                        self.dialogFormVisible2  = false;
                        self.getDataList();
                      }else{
                        self.$response(data,self);
                      }
                   });
                
              }).catch(() => {
                self.$message({
                  type: 'info',
                  message: '已取消删除'
                });          
              });
          },
          //更新策略中的报告
          updataReportForPlan(data){
              this.$prompt('请输入间隔天数', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                inputPattern: /^[1-9]\d*$/,
                inputErrorMessage: '天数只能大于0'
              }).then(({ value }) => {
                const self = this;
                var params = new URLSearchParams();
                var token = localStorage.getItem('auth');
                params.append('plan_id',self.form.plan_id);    
                params.append('report_id',data.report_id);
                params.append('interval_day',value);
               
                self.$axios({
                    method: 'post',
                    url: '/stop/updataReportPlanDetail',
                    data: params,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded','kf-token':token},
                 }).then(function(data){
                    if(data.data.code==0){
                        self.$message({
                          type: 'success',
                          message: '修改成功'
                        });  
                        self.dialogFormVisible2  = false;
                        self.getDataList();
                    }else{
                      self.$response(data,self);
                    }
                 });      
                
              }).catch(() => {
                this.$message({
                  type: 'info',
                  message: '取消输入'
                });       
              });
          },
          showAddNew(){
            this.getReportList();
            this.dialogFormVisible = true;
          },
          //删除机构
          handleEdit(data){
              const self = this;
              self.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                  var params = new URLSearchParams();
                  var token = localStorage.getItem('auth');
                  params.append('plan_id',data.plan_id);
                  params.append('plan_name',data.plan_name);
                  params.append('plan_status','0');    
                  self.$axios({
                      method: 'post',
                      url: '/stop/updateReportPlan',
                      data: params,
                      headers: {'Content-Type': 'application/x-www-form-urlencoded','kf-token':token},
                   }).then(function(data){
                      if(data.data.code==0){
                        self.$message({
                          type: 'success',
                          message: '删除成功!'
                        });
                        self.getDataList();
                      }else{
                        self.$response(data,self);
                      }
                   });
                
              }).catch(() => {
                self.$message({
                  type: 'info',
                  message: '已取消删除'
                });          
              });
          },
          //修改资料
          upData(data){
                const self = this;
                var params = new URLSearchParams();
                var token = localStorage.getItem('auth');
                params.append('imac_id',self.form.imac_id);    
                params.append('imac_name',self.form.imac_name);
                params.append('longitude',self.form.longitude);
                params.append('latitude',self.form.latitude);
                self.$axios({
                    method: 'post',
                    url: '/stop/updateImac',
                    data: params,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded','kf-token':token},
                 }).then(function(data){
                    if(data.data.code==0){
                        self.$message({
                          type: 'success',
                          message: '修改成功'
                        });  
                        self.dialogFormVisible2  = false;
                        self.getDataList();
                    }else{
                      self.$response(data,self);
                    }
                 });      
          },
          //新增机构
          addNew(){
                const self = this;
                var params = new URLSearchParams();
                var token = localStorage.getItem('auth');
                params.append('plan_name',self.planName);
                var planContent = [];
                for(var i = 0; i < self.reportList.length; i++){
                  var obj = {};
                  obj.report_id = self.reportList[i].report_id;
                  obj.interval_day = self.reportList[i].day;
                  var objStr = JSON.stringify(obj);
                  if(obj.interval_day!=''){
                    planContent.push(objStr);
                  }
                  
                }
                var a = planContent.join(',');
                var sendData = '['+a+']'
                // console.log(a)
                params.append('plan_content',sendData);       
                self.$axios({
                    method: 'post',
                    url: '/stop/addReportPlan',
                    data: params,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded','kf-token':token},
                 }).then(function(data){
                    if(data.data.code==0){
                        self.$message({
                          type: 'success',
                          message: '创建成功'
                        });  
                        self.dialogFormVisible  = false;
                        self.getDataList();
                    }else{
                      self.$response(data,self);
                    }
                 });      
          },
          //修改机构信息
          handleupDate(data){
            console.log(data)
            this.planList = data.reportPlanDetail;
            this.dialogFormVisible2 = true;
            this.form.plan_name = data.plan_name;
            this.form.plan_id = data.plan_id;
          },
          handleNodeClick(data) {
            console.log(data);
          },
          handleCurrentChange(){
            console.log(this.currentPage)
            //页码发生变化请求新数据
          },
          //修改单元行颜色
          rowStyle({ row, rowIndex}){
            if(rowIndex%2 ==0){
              return 'background:#eee;color:#000;'
            }else{
             return 'background:#e5e7e8;color:#000;'
            }
          },          
          handleChange(value) {
              console.log(value);
          },
          querySearch(queryString, cb) {
              var restaurants = this.restaurants;
              var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
              // 调用 callback 返回建议列表的数据
              cb(results);
          },
          createFilter(queryString) {
              return (restaurant) => {
                return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
              };
          },
          loadAll() {
              return [
                { "value": "三全鲜食（北新泾店）", "address": "长宁区新渔路144号" },
              ];
          },
          handleSelect(item) {
              console.log(item);
          },
          //姓名查询
          nameSearch(){

          },
          //身份证号查询
          numberSearch(){

          },
          //分组查询
          search(){

             
          },
          //请求分组信息
          request(){
            
          },
          //获取报告列表
          getReportList(){
                const self = this;
                var params = new URLSearchParams();
                var token = localStorage.getItem('auth');
                params.append('currentPage',self.currentPage);
                params.append('pageSize',100);        
                self.$axios({
                    method: 'post',
                    url: '/stop/getReports',
                    data: params,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded','kf-token':token},
                 }).then(function(data){
                    if(data.data.code==0){
                       self.reportList = data.data.data;
                       for(var i = 0; i < self.reportList.length;i++){
                        self.reportList[i].day = '';
                       }
                    }else{
                      self.$response(data,self);
                    }
                 });      
          },
          //默认获取策略信息
          getDataList(){
                const self = this;
                var params = new URLSearchParams();
                var token = localStorage.getItem('auth');
                // params.append('currentPage',self.currentPage);
                // params.append('pageSize',100);        
                self.$axios({
                    method: 'post',
                    url: '/stop/getReportPlans',
                    data: params,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded','kf-token':token},
                 }).then(function(data){
                    if(data.data.code==0){
                       self.tableData5 = data.data.data;
                       
                    }else{
                      self.$response(data,self);
                    }
                 });      
          },
          //递归处理树形结构最后一项为空
          digui(data){
            for(var i = 0; i<data.length;i++){
              if(data[i].children.length==0){
                var obj = {};
                obj.label = data[i].label;
                obj.org_id = data[i].org_id;
                obj.org_type = data[i].org_type;
                obj.value = data[i].value;
                data[i] = obj;
              }else{
                this.digui(data[i].children)
              }
            }
            this.data = data;
            return data
          },
          //获取分组信息
          getOrgsList(){
                const self = this;
                var params = new URLSearchParams();
                var token = localStorage.getItem('auth');
                // params.append('currentPage',self.currentPage);        
                self.$axios({
                    method: 'post',
                    url: '/stop/getOrgTree',
                    data: params,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded','kf-token':token},
                 }).then(function(data){
                    if(data.data.code==0){
                       self.options = self.digui(data.data.data);

                    }else{
                      self.$response(data,self);
                    }
                 });
          },
      }
     
  }
</script>

<style scoped>
    .tree{
      float: left;
      width: 20%;
      height: 600px;
      
    }
    .el-tree{
      background: rgba(255,215,0,0.3);
      color: #fff;
    }

    .tableClass{
      width: 100%;
      height: auto;
      background-color: #231a75;
    }
    .tableList{
      width: 99%;
      height: 560px!important;
      overflow-y: scroll;
      border:1px solid #231a75;
     /* border-radius: 20px;*/
      margin-top: 20px;
      background-color: #231a75;
    }
    .tableList::-webkit-scrollbar {/*滚动条整体样式*/
            width: 4px;     /*高宽分别对应横竖滚动条的尺寸*/
            height: 4px;
    }
    .tableList::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
            border-radius: 5px;
            -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
            background: rgba(0,0,0,0.2);
    }
    .tableList::-webkit-scrollbar-track {/*滚动条里面轨道*/
            -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
            border-radius: 0;
            background: rgba(0,0,0,0.1);
    }
    
    .tableTitle{
      width: 200px;
      height: 60px;
      float: left;
      margin-left: 30px;
    }
    .numData{
      width: 99%;
      height: 60px;
      line-height: 60px;
      color: #fefefe;
      background-color: #231a75;
      background-image: url(../../../static/img/tableBanner.png);
    }

    /*#container {
        min-width:900px;
        min-height:607px;
        
        overflow-y: hidden;
    }*/
    .ms-doc{
        width:100%;
        max-width: 980px;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
    }
    .ms-doc h3{
        padding: 9px 10px 10px;
        margin: 0;
        font-size: 14px;
        line-height: 17px;
        background-color: #f5f5f5;
        border: 1px solid #d8d8d8;
        border-bottom: 0;
        border-radius: 3px 3px 0 0;
    }
    .ms-doc article{
        padding: 45px;
        word-wrap: break-word;
        background-color: #fff;
        border: 1px solid #ddd;
        border-bottom-right-radius: 3px;
        border-bottom-left-radius: 3px;
    }
    .ms-doc article h1{
        font-size:32px;
        padding-bottom: 10px;
        margin-bottom: 15px;
        border-bottom: 1px solid #ddd;
    }
    .ms-doc article h2 {
        margin: 24px 0 16px;
        font-weight: 600;
        line-height: 1.25;
        padding-bottom: 7px;
        font-size: 24px;
        border-bottom: 1px solid #eee;
    }
    .ms-doc article p{
        margin-bottom: 15px;
        line-height: 1.5;
    }
    .ms-doc article .el-checkbox{
        margin-bottom: 5px;
    }
    .demonstration{
        width: 300px;
    }
    .demo-table-expand {
      font-size: 0;
    }
    .demo-table-expand label {
      width: 90px;
      color: #99a9bf;
    }
    .demo-table-expand .el-form-item {
      margin-right: 0;
      margin-bottom: 0;
      width: 50%;
    }
    .el-table--border, .el-table--group{
      border:1px solid #231a75!important;
    }
    .el-table--border td, .el-table--border th, .el-table__body-wrapper .el-table--border.is-scrolling-left~.el-table__fixed{
      border-right:1px solid #231a75!important;
    }
</style>