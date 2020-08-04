<template>
    <div>
        
<!--         <div >

            <div class="block">
               
                <el-cascader
                  class="demonstration"
                  :options="options"
                  v-model="selectedOptions"
                  placeholder="请选择职位"
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
              职位列表
            </div>
            
            <!-- <div class="tableTitle">
              已结束：{{jkjs}}人
            </div> -->
            <div class="tableTitle">
              <el-button type="primary" @click="showAddNew">新增职位</el-button>
            </div>
          </div>
            <el-dialog title="新增职位" :visible.sync="dialogFormVisible">
              <el-form :model="form">
                <el-form-item label="职位名称:" label-width="120px">
                  <el-input v-model="form.position_name" autocomplete="off" style="width:400px;"></el-input>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="addNew">确 定</el-button>
              </div>
            </el-dialog>
            <el-dialog title="修改资料" :visible.sync="dialogFormVisible2">
              <el-form :model="form">
                <el-form-item label="职位名称:" label-width="120px">
                  <el-input v-model="form.position_name" autocomplete="off" style="width:400px;"></el-input>
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
                label="职位名称"
                align="center"
                prop="position_name">
              </el-table-column>
              <el-table-column
                label="创建者"
                align="center"
                prop="position_create_user_name">
              </el-table-column>
              <el-table-column
                label="创建时间"
                align="center"
                prop="position_create_time">
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
              value:'',
              tableData5: [],
              defaultProps: {
                children: 'children',
                label: 'label'
              },
              form:{
                position_name:'',
                position_id:''
              },
              adUserCount:'',
              djk:'',
              jkjs:'',
              jkz:'',
              userCount:'',
              org_name:''
            }
              
      },
      mounted() {
          
          this.getDataList(); 
          
          this.restaurants = this.loadAll();
      },
      methods: {
          showAddNew(){
            this.dialogFormVisible = true;
          },
          //删除职位
          handleEdit(data){
              const self = this;
              self.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                  var params = new URLSearchParams();
                  var token = localStorage.getItem('auth');
                   
                  params.append('position_id',data.position_id);
              
                  self.$axios({
                      method: 'post',
                      url: '/store/position/del',
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
                params.append('position_name',self.form.position_name);    
                params.append('position_id',self.form.position_id);
                
                self.$axios({
                    method: 'post',
                    url: '/store/position/update',
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
          //新增职位
          addNew(){
                const self = this;
                var params = new URLSearchParams();
                var token = localStorage.getItem('auth');
                params.append('position_name',self.form.position_name);          
                self.$axios({
                    method: 'post',
                    url: '/store/position/add',
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
          //修改职位信息
          handleupDate(data){
            console.log(data)
            this.dialogFormVisible2 = true;
            this.form = data
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
         
          
          //请求分组信息
          request(){
            
          },
          //人员搜索提示列表
          request2(){

          },
          //默认获取职位信息
          getDataList(){
                const self = this;
                var params = new URLSearchParams();
                var token = localStorage.getItem('auth');
                params.append('pageNum',self.currentPage);   
                params.append('pageSize',self.pageSize);        
                self.$axios({
                    method: 'post',
                    url: '/store/position/getByPage',
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