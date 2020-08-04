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
              部门列表
            </div>
            
            <!-- <div class="tableTitle">
              已结束：{{jkjs}}人
            </div> -->
            <div class="tableTitle">
              <el-button type="primary" @click="showAddNew">新增部门</el-button>
            </div>
          </div>
            <el-dialog title="新增部门" :visible.sync="dialogFormVisible">
              <el-form :model="form">
                <el-form-item label="部门名称:" label-width="120px">
                  <el-input v-model="form.dept_name" autocomplete="off" style="width:400px;"></el-input>
                </el-form-item>
                <el-form-item label="上级部门:" label-width="120px">
                  <el-select v-model="form.dept_up_id" filterable placeholder="请选择部门">
                    <el-option 
                      v-for="item in bumenList"
                      :key="item.dept_id"
                      :label="item.dept_name"
                      :value="item.dept_id">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="本部门主管/专工:" label-width="120px">
                  <el-select 
                    clearable 
                    v-model="form.user_true_name1" 
                    style="height:40px;" 
                    remote 
                    reserve-keyword 
                    :remote-method="remoteMethod" 
                    :loading="loading" 
                    filterable 
                    placeholder="姓名">
                      <el-option
                        style="height:40px;"
                        v-for="item in userNameList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="生产部门主管/专工:" label-width="120px">
                  <el-select 
                    clearable 
                    v-model="form.user_true_name2" 
                    style="height:40px;" 
                    remote 
                    reserve-keyword 
                    :remote-method="remoteMethod2" 
                    :loading="loading2" 
                    filterable 
                    placeholder="姓名">
                      <el-option
                        style="height:40px;"
                        v-for="item in userNameList2"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                  </el-select>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="addNew">确 定</el-button>
              </div>
            </el-dialog>
            <el-dialog title="修改资料" :visible.sync="dialogFormVisible2">
              <el-form :model="form">
                <el-form-item label="部门名称:" label-width="120px">
                  <el-input v-model="form.dept_name" autocomplete="off" style="width:400px;"></el-input>
                </el-form-item>
                              <el-form-item label="上级部门:" label-width="120px">
                  <el-select v-model="form.dept_up_id" filterable placeholder="请选择部门">
                    <el-option
                      v-for="item in bumenList"
                      :key="item.dept_id"
                      :label="item.dept_name"
                      :value="item.dept_id">
                    </el-option>
                  </el-select>
              </el-form-item>
              <el-form-item label="本部门主管/专工:" label-width="120px">
                  <el-select 
                    clearable 
                    v-model="form.user_true_name1" 
                    style="height:40px;" 
                    remote 
                    reserve-keyword 
                    :remote-method="remoteMethod" 
                    :loading="loading" 
                    filterable 
                    placeholder="姓名">
                      <el-option
                        style="height:40px;"
                        v-for="item in userNameList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                  </el-select>
              </el-form-item>
              <el-form-item label="生产部门主管/专工:" label-width="120px">
                  <el-select 
                    clearable 
                    v-model="form.user_true_name2" 
                    style="height:40px;" 
                    remote 
                    reserve-keyword 
                    :remote-method="remoteMethod2" 
                    :loading="loading2" 
                    filterable 
                    placeholder="姓名">
                      <el-option
                        style="height:40px;"
                        v-for="item in userNameList2"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                  </el-select>
              </el-form-item>
              </el-form>

              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible2 = false">取 消</el-button>
                <el-button type="primary" @click="upData">确 定</el-button>
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
                label="部门名称"
                align="center"
                prop="dept_name">
              </el-table-column>
              <el-table-column
                label="创建者"
                align="center"
                prop="dept_create_user_name">
              </el-table-column>
              <el-table-column
                label="创建时间"
                align="center"
                prop="dept_create_time">
              </el-table-column>
              <el-table-column
                label="所属部门"
                align="center"
                >
                <template slot-scope="props">
                    <span>{{props.row.dept_total_name}}</span>
                </template>
              </el-table-column>
              <el-table-column
                align="center"
                label="操作">
                <template slot-scope="props">
                  <el-button
                  size="mini"
                  @click="handleupDate(props.row)">修改</el-button>
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
              loading:false,
              loading2:false,
              userNameList:[],
              userNameList2:[],
              bumenList:[],
              value:'',
              tableData5: [],
              defaultProps: {
                children: 'children',
                label: 'label'
              },
              form:{
                dept_up_id:'',
                dept_name:'',
                org_id:'',
                user_true_name2:'',
                user_true_name1:'',
                dept_id:''
              },
              list:[],
              states:[],
              list2:[],
              states2:[],
              adUserCount:'',
              djk:'',
              jkjs:'',
              jkz:'',
              userCount:'',
              org_name:''
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
          this.getDeptList(); 
          // this.getOrgsList();
          this.restaurants = this.loadAll();
      },
      methods: {
          remoteMethod(query){
            console.log(query)
              if (query !== '') {
                this.loading = true;
                this.getNameSearchList(query);
                      setTimeout(() => {
                        this.loading = false;
                        this.userNameList = this.list.filter(item => {
                          return item.label.toLowerCase()
                            .indexOf(query.toLowerCase()) > -1;
                        });
                      }, 200);
              } else {
                this.userNameList = [];
              }
          },
          getNameSearchList(query){
                const self = this;
                // self.form.user_true_name1 = query;
                var params = new URLSearchParams();
                var token = localStorage.getItem('auth');
                params.append('user_true_name',query); 
                params.append('pageNum',1);
                params.append('pageSize',10);
                self.$axios({
                    method: 'post',
                    url: '/store/user/getByPage',
                    data: params,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded','kf-token':token},
                 }).then(function(data){
                    if(data.data.code==0){
                      self.states = data.data.data.list;
                      self.list = self.states.map(item => {
                        return { value: item.user_id, label: item.user_true_name };
                      });
                      // console.log(self.list)
                      self.userNameList = self.list;
                    }else{
                      self.$response(data,self);
                    }
                 });
          },
          remoteMethod2(query){
              if (query !== '') {
                this.loading2 = true;
                this.getNameSearchList2(query);
                      setTimeout(() => {
                        this.loading2 = false;
                        this.userNameList2 = this.list2.filter(item => {
                          return item.label.toLowerCase()
                            .indexOf(query.toLowerCase()) > -1;
                        });
                      }, 200);
              } else {
                this.userNameList2 = [];
              }
          },
          getNameSearchList2(query){
                const self = this;
                // self.form.user_true_name2 = query;
                var params = new URLSearchParams();
                var token = localStorage.getItem('auth');
                params.append('user_true_name',query); 
                params.append('pageNum',1);
                params.append('pageSize',10);
                self.$axios({
                    method: 'post',
                    url: '/store/user/getByPage',
                    data: params,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded','kf-token':token},
                 }).then(function(data){
                    if(data.data.code==0){
                      self.states2 = data.data.data.list;
                      self.list2 = self.states2.map(item => {
                        return { value: item.user_id, label: item.user_true_name };
                      });
                      self.userNameList2 = self.list;
                    }else{
                      self.$response(data,self);
                    }
                 });
          },
          //获取部门信息
          getDeptList(){
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

                    }else{
                      self.$response(data,self);
                    }
                 });
          },
          showAddNew(){
            this.form.dept_name = "";
            this.form.dept_up_id = "";
            this.form.user_true_name1 = "";
            this.form.user_true_name2 = "";
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
                   
                  params.append('dept_id',data.dept_id);
              
                  self.$axios({
                      method: 'post',
                      url: '/store/dept/del',
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
                params.append('dept_name',self.form.dept_name);    
                params.append('dept_id',self.form.dept_id);
                params.append('dept_up_id',self.form.dept_up_id);
                params.append('my_dept_zg_user_id',self.form.user_true_name1);
                params.append('scb_dept_zg_user_id',self.form.user_true_name2);
                self.$axios({
                    method: 'post',
                    url: '/store/dept/update',
                    data: params,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded','kf-token':token},
                 }).then(function(data){
                    if(data.data.code==0){
                        self.$message({
                          type: 'success',
                          message: '修改成功'
                        });  
                        self.getDataList();
                        self.dialogFormVisible2  = false;
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
                params.append('dept_name',self.form.dept_name); 
                params.append('dept_up_id ',self.form.dept_up_id ); 
                params.append('my_dept_zg_user_id ',self.form.user_true_name1 );
                params.append('scb_dept_zg_user_id ',self.form.user_true_name2 );          
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
            // this.form = data;
            this.form.dept_id = data.dept_id;
            this.form.dept_up_id = data.dept_up_id;
            this.form.dept_name = data.dept_name;
            this.form.user_true_name1 = data.my_dept_zg_user_id;
            this.form.user_true_name2 = data.scb_dept_zg_user_id;
            this.remoteMethod(data.my_dept_zg_user_name)
            this.remoteMethod2(data.scb_dept_zg_user_name)
            this.dialogFormVisible2 = true;
            
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
                self.$axios({
                    method: 'post',
                    url: '/store/dept/getByPage',
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
      height: 580px!important;
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