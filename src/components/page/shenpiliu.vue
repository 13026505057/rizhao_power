<template>
    <div>
        
        <div >

            <div class="block">

                <el-select clearable v-model="out_store_id" filterable placeholder="请选择调出库">
                    <el-option
                      
                      v-for="item in erjiku"
                      :key="item.store_id"
                      :label="item.store_name"
                      :value="item.store_id">
                    </el-option>
                </el-select>
                <el-select clearable v-model="in_store_id" filterable placeholder="请选择调入库">
                    <el-option
                      
                      v-for="item in erjiku"
                      :key="item.store_id"
                      :label="item.store_name"
                      :value="item.store_id">
                    </el-option>
                  </el-select>
                <el-button type="warning" style="margin-left: 30px;" @click="getDataList">查询</el-button>
            </div>

          
        </div>
        <!-- <div class="tree">
          <el-tree :data="data"    @node-click="handleNodeClick"></el-tree>
        </div> -->
        <div id="container" style="width: 100%;height: 110%;  float: right;">
          <div class="numData">
            <div class="tableTitle" style="font-size: 20px;">
              审批设置
            </div>
            <!-- <el-select v-model="item.dept_id" filterable placeholder="请选择调入库">
                    <el-option
                      v-for="item in bumenList"
                      :key="item.dept_id"
                      :label="item.dept_name"
                      :value="item.dept_id">
                    </el-option>
            </el-select>
            <el-select v-model="item.dept_id" filterable placeholder="请选择调入库">
                    <el-option
                      v-for="item in bumenList"
                      :key="item.dept_id"
                      :label="item.dept_name"
                      :value="item.dept_id">
                    </el-option>
            </el-select> -->
            <!-- <div class="tableTitle">
              已结束：{{jkjs}}人
            </div> -->
            <div class="tableTitle">
              <el-button type="primary" @click="showAddNew">新增审批</el-button>
            </div>
          </div>
            <el-dialog title="新增审批" :visible.sync="dialogFormVisible">
              <el-form :model="form">
                <el-form-item label="类型:" label-width="120px">
                  <el-select v-model="form.apply_type" filterable placeholder="请选择类型">
                    <el-option
                      v-for="item in typeList"
                      :key="item.typeId"
                      :label="item.typeName"
                      :value="item.typeId">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="调出库:" label-width="120px">
                  <el-select v-model="form.out_store_id" filterable placeholder="请选择调出库">
                    <el-option
                      v-for="item in erjiku"
                      :key="item.store_id"
                      :label="item.store_name"
                      :value="item.store_id">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item v-if="form.apply_type=='zixiao'?false:true" label="调入库:" label-width="120px">
                  <el-select v-model="form.in_store_id" filterable placeholder="请选择调入库">
                    <el-option
                      v-for="item in erjiku"
                      :key="item.store_id"
                      :label="item.store_name"
                      :value="item.store_id">
                    </el-option>
                  </el-select>
                </el-form-item>
                
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="addApply">确 定</el-button>
              </div>
            </el-dialog>
            <el-dialog title="新增审批流程" :visible.sync="dialogFormVisible2">
              <el-form :model="form1">
                <el-form-item v-for="item in addOneList"  label="参与审批部门：" label-width="150px">
                  <el-select v-model="item.dept_id" filterable placeholder="请选择审批部门">
                    <el-option
                      v-for="item in bumenList"
                      :key="item.dept_id"
                      :label="item.dept_name"
                      :value="item.dept_id">
                    </el-option>
                  </el-select>
                  <el-select style="width: 150px;" v-model="item.approve_type" filterable placeholder="请选择审批类型">
                    <el-option
                      v-for="item in approTypeList"
                      :key="item.approType_id"
                      :label="item.approType_name"
                      :value="item.approType_id">
                    </el-option>
                  </el-select>
                  <el-input v-model="item.approve_order" placeholder="审批排序" style="width: 100px;"></el-input>
                </el-form-item>
              </el-form>
              
              <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="addOne">增 加 部 门</el-button>
                <el-button type="primary" @click="upData">确 定</el-button>
                <el-button @click="dialogFormVisible2 = false">关 闭</el-button>
              </div>
            </el-dialog>
         
          <div class="tableList">
            <el-table
              :data="tableData5"
              :header-cell-style="{ 'background-color': '#deedf4','color':'#000'}"
              :row-style="rowStyle"
              class="tableClass"
              style="">
              <el-table-column
                type="index"
                align="center"
                >
              </el-table-column>
              
              <el-table-column
                label="调出库"
                align="center"
                prop="out_store_name">
              </el-table-column>
              <el-table-column
                label="调入库"
                align="center"
                prop="in_store_name">
              </el-table-column>
              <el-table-column
                label="类型"
                align="center"
                >
                <template slot-scope="props">
                    <span>{{props.row.apply_type=='zixiao'?'自销':''}}</span>
                    <span>{{props.row.apply_type=='diaobo'?'调拨':''}}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="审批流程"
                align="center"
                >
                <template slot-scope="props">
                    <span style="display: block;" v-for="(item,index) in props.row.applyApproves">{{item.approve_order}}-{{item.dept_name}}</span>
                </template>
              </el-table-column>
              <el-table-column
                align="center"
                label="操作">
                <template slot-scope="props">
                  <el-button
                  size="mini"
                  @click="handleupDate(props.row)">新增审批人员</el-button>
                  <el-button
                  size="mini"
                  type="danger"
                  @click="handleEdit(props.row)">删除</el-button>
                </template>
              </el-table-column>
            </el-table> 
                
          </div>
          <el-pagination
                small
                background
                style="text-align: center;margin-top: 20px;"
                @current-change="handleCurrentChange"
                :current-page.sync="currentPage"
                :page-size="pageSize"
                layout="prev, pager, next, jumper"
                :total="total">
          </el-pagination>
        </div>
        

    </div>
</template>

<script>
  import  TMap from '../../TMap';
   import md5 from 'js-md5';
  export default {
      data: function(){
          return {
              in_store_id:'',
              out_store_id:'',
              approTypeList:[
                {
                  approType_id:'in',
                  approType_name:'入库'
                },
                {
                  approType_id:'out',
                  approType_name:'出库'
                }
              ],
              form1:{

              },
              addOneList:[{
                dept_id:'',
                approve_order:'',
                approve_type:''
              }],
              currentPage:1,
              dialogFormVisible:false,
              dialogFormVisible2:false,
              pageSize:10,
              total:10,
              name:'',
              restaurants: [],
              value1:'',
              value2:'',
              selectedOptions: [],
              data: [],
              value:'',
              tableData5: [],
              defaultProps: {
                children: 'children',
                label: 'label'
              },
              form:{
                dept_name:'',
                org_id:''
              },
              adUserCount:'',
              djk:'',
              jkjs:'',
              jkz:'',
              userCount:'',
              org_name:'',
              applyIdCount:'',
              erjiku:[],
              bumenList:[],
              typeList:[{
                typeId:'zixiao',
                typeName:'自销'
              },
              {
                typeId:'diaobo',
                typeName:'调拨'
              }
              ]
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
          this.getBumenList();
          this.getErjiku();
          // this.getOrgsList();
          this.restaurants = this.loadAll();
      },
      methods: {
          addOne(){
            var obj = {
              dept_id:'',
              approve_order:'',
              approve_type:''
            }
            this.addOneList.push(obj)
          },
          getBumenList(){
                const self = this;
                var params = new URLSearchParams();
                var token = localStorage.getItem('auth');
                params.append('pageNum',1);   
                params.append('pageSize',10000);        
                self.$axios({
                    method: 'post',
                    url: '/store/dept/getByPage',
                    data: params,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded','kf-token':token},
                 }).then(function(data){
                    if(data.data.code==0){
                       self.bumenList = data.data.data.list;
                       self.total = data.data.data.total;
                    }else{
                      self.$response(data,self);
                    }
                 });      
          },
          addApply(){
                const self = this;
                var params = new URLSearchParams();
                var token = localStorage.getItem('auth');
                params.append('in_store_id',self.form.in_store_id); 
                params.append('out_store_id',self.form.out_store_id);
                params.append('apply_type',self.form.apply_type);  
                // params.append('pageSize',10000);        
                self.$axios({
                    method: 'post',
                    url: '/store/apply/add',
                    data: params,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded','kf-token':token},
                 }).then(function(data){
                    if(data.data.code==0){
                        self.$message({
                          type: 'success',
                          message: '新增成功!'
                        });
                        self.dialogFormVisible = false;
                    }else{
                      self.$response(data,self);
                    }
                 });    
          },
          getErjiku(){
                const self = this;
                var params = new URLSearchParams();
                var token = localStorage.getItem('auth');
                params.append('pageNum',self.currentPage);   
                params.append('pageSize',10000);        
                self.$axios({
                    method: 'post',
                    url: '/store/store/getByPage',
                    data: params,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded','kf-token':token},
                 }).then(function(data){
                    if(data.data.code==0){
                       self.erjiku = data.data.data.list;
                       self.total = data.data.data.total;
                    }else{
                      self.$response(data,self);
                    }
                 });      
          },
          showAddNew(){
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
                   
                  params.append('apply_id',data.apply_id);
              
                  self.$axios({
                      method: 'post',
                      url: '/store/apply/del',
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
                
                for(var i = 0 ; i < self.addOneList.length; i++){
                  if(self.addOneList[i].dept_id!=''){
                    var params = new URLSearchParams();
                    var token = localStorage.getItem('auth');
                    params.append('dept_id',self.addOneList[i].dept_id);    
                    params.append('approve_order',self.addOneList[i].approve_order);
                    params.append('approve_type',self.addOneList[i].approve_type);
                    params.append('apply_id',self.applyIdCount);
                    self.$axios({
                      method: 'post',
                      url: '/store/apply/approve/add',
                      data: params,
                      headers: {'Content-Type': 'application/x-www-form-urlencoded','kf-token':token},
                    }).then(function(data){
                      if(data.data.code==0){
                          self.$message({
                            type: 'success',
                            message: '添加成功'
                          });  
                          self.getDataList();
                          self.dialogFormVisible2  = false;
                      }else{
                        self.$response(data,self);
                      }
                    });      
                  }
                }
                
          },
          //新增机构
          addNew(){
                const self = this;
                var params = new URLSearchParams();
                var token = localStorage.getItem('auth');
                params.append('dept_name',self.form.dept_name);          
                self.$axios({
                    method: 'post',
                    url: '/store/dept/add',
                    data: params,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded','kf-token':token},
                 }).then(function(data){
                    if(data.data.code==0){
                        self.$message({
                          type: 'success',
                          message: '创建成功'
                        });  
                        self.getDataList();
                        self.dialogFormVisible  = false;
                    }else{
                      self.$response(data,self);
                    }
                 });      
          },
          //修改机构信息
          handleupDate(data){
            console.log(data)
            this.applyIdCount = data.apply_id;
            this.addOneList = [{
                dept_id:'',
                approve_order:'',
                approve_type:''
              }]
            
            this.dialogFormVisible2 = true;
            // this.form = data
          },
          handleNodeClick(data) {
            console.log(data);
          },
          handleCurrentChange(){
            // console.log(this.currentPage)
            //页码发生变化请求新数据
            this.getDataList();
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

              self.$axios({
                  method: 'post',
                  url: 'http://www.kofanchina.com/main.php/Home/Request/post2',
                  data: {
                      requireUrl:'https://www.srwghb.com/jdfw/lhfw.aspx',
                      wmsdata: aaa,
                      dbname:'wmsdata',
                      wmskey:bbb
                  },
                  headers: {'Content-Type': 'application/json'},
              }).then(function(data){
                  console.log(data)
                  if(data.data.errNum==0){
                  
                  }else{
                     
                                    
                  }
               });
          },
          //请求分组信息
          request(){
            
          },
          //人员搜索提示列表
          request2(){

          },
          //默认获取部门信息
          getDataList(){
                const self = this;
                var params = new URLSearchParams();
                var token = localStorage.getItem('auth');
                params.append('pageNum',self.currentPage);   
                params.append('pageSize',self.pageSize);  
                params.append('in_store_id',self.in_store_id);
                params.append('out_store_id',self.out_store_id);      
                self.$axios({
                    method: 'post',
                    url: '/store/apply/getByPage',
                    data: params,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded','kf-token':token},
                 }).then(function(data){
                    if(data.data.code==0){
                       self.tableData5 = data.data.data.list;
                       self.total = data.data.data.total;
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
      height: 500px!important;
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
    
</style>