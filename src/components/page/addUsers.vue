<template>
    <div>
        
        <div >

            <div class="block">
               
                <el-select v-model="dept_id" filterable placeholder="请选择部门">
                  <el-option
                    v-for="item in bumenList"
                    :key="item.dept_id"
                    :label="item.dept_name"
                    :value="item.dept_id">
                  </el-option>
                </el-select>
                

              <el-select 
                clearable 
                v-model="user_true_name" 
                style="height:40px;" 
                remote 
                reserve-keyword 
                :remote-method="remoteMethod" 
                :loading="loading" 
                filterable 
                placeholder="姓名">
                  <el-option
                    style="height:40px;"
                    v-for="item,index in userNameList"
                    :key="index"
                    :label="item.label"
                    :value="item.label">
                  </el-option>
              </el-select>
                
                <el-input
                    clearable
                    placeholder="工号查询"
                    style="width: 200px;margin-left: 60px;"
                    v-model="number"
                    clearable>
                </el-input>
                <el-button type="warning" style="margin-left: 30px;" @click="searchClick">查询</el-button>
                <el-button type="primary" style="margin-left: 80px;" @click="importUsers = true">批量导入</el-button>
                <!-- <el-button type="primary" style="margin-left: 60px;" @click="downLoadFile">导入模板下载</el-button> -->
                <el-button type="primary" style="margin-left: 60px;" @click="addUser = true">单人新增</el-button>
                
            </div>

          
        </div>
        <div id="container" style="width: 100%;height: 110%; margin-top: 20px;">
          <el-dialog
            title="人员批量导入"
            :visible.sync="importUsers"
            width="40%"
            style="text-align:center;"
            >
            <el-upload
              class="upload-demo"
              drag
              :headers="myHeaders"
              :action="addManyUserUploadUrl"
              :on-success="uploadSuccess"
              multiple>
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
              <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
            <span slot="footer" class="dialog-footer">
              <el-button @click="importUsers = false">取 消</el-button>
              <el-button type="primary" @click="importUsers = false">确 定</el-button>
            </span>
          </el-dialog>
          <el-dialog
            title="新增单个人员"
            :visible.sync="addUser"
            
            >
                  <el-form ref="form" :model="form" label-width="120px" label-position="left" style="margin-left:20px;">
                      <el-form-item label="工号" style="display: inline-block;">
                        <el-input v-model="form.username" style="width: 200px;float: left;"></el-input>
                      </el-form-item>
                      <el-form-item label="密码" style="display: inline-block;margin-left:80px;">
                        <el-input v-model="form.password" style="width: 200px;float: left;"></el-input>
                      </el-form-item>
                      <div class="passwordStyle">密码规则：(10位以上，需要包含大小写字母，数字，字符)</div>
                      <el-form-item label="真实姓名" style="display: inline-block;">
                        <el-input v-model="form.user_true_name" style="width: 200px;float: left;"></el-input>
                      </el-form-item>
                     
                      
                      <el-form-item label="部门" style="display: block;">
                        <el-select multiple filterable v-model="form.dept_id" placeholder="请选择" style="width:208px;">
                          <el-option
                            v-for="item in bumenList"
                            :key="item.dept_id"
                            :label="item.dept_total_name"
                            :value="item.dept_id">
                          </el-option>
                        </el-select>
                      </el-form-item>
                      <el-form-item label="职位" style="display: block;">
                        <el-select multiple filterable v-model="form.position_id" placeholder="请选择" style="width:208px;">
                          <el-option
                            v-for="item in zhiweiList"
                            :key="item.position_id"
                            :label="item.position_name"
                            :value="item.position_id">
                          </el-option>
                        </el-select>
                      </el-form-item>
                      <el-form-item label="权限组" style="display: block;">
                        <el-select multiple  v-model="form.group_id" placeholder="请选择" style="width:208px;">
                          <el-option
                            v-for="item in powerList"
                            :key="item.group_id"
                            :label="item.group_name"
                            :value="item.group_id">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-form>            
            <span slot="footer" class="dialog-footer">
              <el-button @click="addUser = false">取 消</el-button>
              <el-button type="primary" @click="addUserClick">确 定</el-button>
            </span>
          </el-dialog>
          <el-dialog  title="修改用户资料" :visible.sync="dialogFormVisible">
                <el-tabs type="border-card">
                  <el-tab-pane label="用户资料">
                    <el-form ref="form" :model="changeform" label-width="120px" label-position="left" style="margin-left:20px;">
                      <el-form-item label="工号" style="display: inline-block;">
                        <el-input v-model="changeform.username" style="width: 200px;float: left;"></el-input>
                      </el-form-item>
                      <el-form-item label="密码" style="display: inline-block;margin-left:80px;">
                        <el-input placeholder="重置密码" v-model="form.password" style="width: 200px;float: left;"></el-input>
                      </el-form-item>
                      <div class="passwordStyle">密码规则：(10位以上，需要包含大小写字母，数字，字符)</div>
                      <el-form-item label="真实姓名" style="display: block;">
                        <el-input v-model="changeform.user_true_name" style="width: 200px;float: left;"></el-input>
                      </el-form-item>
                      
                      
                      <el-form-item label="部门" style="display: block;">
                        <el-select multiple filterable v-model="changeform.dept_id" placeholder="请选择" style="width:208px;">
                          <el-option
                            v-for="item in bumenList"
                            :key="item.dept_id"
                            :label="item.dept_total_name"
                            :value="item.dept_id">
                          </el-option>
                        </el-select>
                      </el-form-item>
                      <el-form-item label="职位" style="display: block;">
                        <el-select multiple filterable v-model="changeform.position_id" placeholder="请选择" style="width:208px;">
                          <el-option
                            v-for="item in zhiweiList"
                            :key="item.position_id"
                            :label="item.position_name"
                            :value="item.position_id">
                          </el-option>
                        </el-select>
                      </el-form-item>
                      <el-form-item label="权限组" style="display: block;">
                        <el-select multiple v-model="changeform.group_id" placeholder="请选择" style="width:208px;">
                          <el-option
                            v-for="item in powerList"
                            :key="item.group_id"
                            :label="item.group_name"
                            :value="item.group_id">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-form>
                  </el-tab-pane>
                  
                </el-tabs>

              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="sureToChange">确定修改</el-button>
              </div>
          </el-dialog>
          <div class="tableList">
            <el-table
              :data="tableData5"
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
                label="工号"
                align="center"
                prop="username">
              </el-table-column>
              <el-table-column
                label="姓名"
                align="center"
                prop="user_true_name">
              </el-table-column>
              <el-table-column
                label="部门"
                align="center"
                >
                <template slot-scope="props">
                  <span v-for="item in props.row.userDepts">{{item.dept_name}}、</span>
                </template>
              </el-table-column>
              <el-table-column
                label="职位"
                align="center"
                >
                <template slot-scope="props">
                  <span v-for="item in props.row.userPositions">{{item.position_name}}、</span>
                </template>
              </el-table-column>
              <el-table-column
                label="创建时间"
                align="center"
                prop="create_time">
              </el-table-column>
              <el-table-column
                label="操作"
                align="center">
                <template slot-scope="props">
                  <el-button
                  size="mini"
                  @click="updataClick(props.row)">修改</el-button>
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
  import vBreadcrumb from '../common/breadcrumb.vue';
  export default {
      components:{
            vBreadcrumb
      },
      data: function(){
          return {
             
              user_true_name:'',
              addManyUserUploadUrl:'',
              dept_id:'',
              myHeaders:null,
              bumenList:[],
              importUsers:false,
              addUser:false,
              show_btn:true,
              dialogFormVisible:false,
              currentPage:1,
              total:4,
              pageSize:10,
              name:'',
              number:'',
              userNameList:[],
              powerList:[],
              restaurants: [],
              value1:'',
              value2:'',
              selectedOptions: [],
              options: [],
              options1:[],
              value:'',
              tableData5: [],
              expands: [],
              org_idList:[],
              zhiyeList:[],
              changeform:{
                dept_id:[],
                group_id:[],
                position_id:[],
                username:'',
                user_true_name:'',
                password:'',
                user_id:'',
                user_status:''
              },
              form:{
                password:'',
                dept_id:[],
                group_id:[],
                position_id:[],
              },
              zhiweiList:[],
              bumenList: [],
              loading:false,
            }
              
      },
      mounted() {
         
          var addManyUserUploadUrl = this.$axios.defaults.baseURL+'/store/user/addByExcel';
          this.addManyUserUploadUrl = addManyUserUploadUrl;
          var myHeaders = localStorage.getItem('auth');
          var token = {'kf-token':myHeaders}
          this.myHeaders = token;
          this.getDeptList();
          this.getPowerList();
          this.getDataList();
          this.getZhiweiList();
          this.getNameSearchList('')
      },
      methods: {
          uploadSuccess(response){
            if(response.code==0){
              this.$message({
                          type: 'success',
                          message: '上传成功'
                        }); 
            }else{
              this.$response(response,self);
            }
                        
          },
          //人员删除
          handleEdit(res){
                const self = this;
                var params = new URLSearchParams();
                var token = localStorage.getItem('auth');
                
                
                params.append('user_id',res.user_id);
                self.$axios({
                    method: 'post',
                    url: '/store/user/del',
                    data: params,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded','kf-token':token},
                 }).then(function(data){
                    if(data.data.code==0){
                        self.$message({
                          type: 'success',
                          message: '删除成功'
                        }); 
                        self.getDataList();
                    }else{
                      self.$response(data,self);
                    }
                 });
          },
          //下载文件
          downLoadFile(){
            var url = this.$axios.defaults.baseURL+'/ejk/file/物料批量导入模板.xls';
            try{ 
                var elemIF = document.createElement("iframe");   
                elemIF.src = url;   
                elemIF.style.display = "none";   
                document.body.appendChild(elemIF);   
            }catch(e){ 
     
            } 
          },
          handleChange1(value) {
              // console.log(value)
          },
          
          //跳转档案页面
          danganClick(data){
            localStorage.setItem('user_true_name',data.user_true_name);
            this.$router.push('/jiedurendangan');
          },
          //打开修改弹窗
          updataClick(data){
            // localStorage.setItem('xiugai_card_id',data.user_card_id);
            // this.$router.push('/justXiugai');
            this.dialogFormVisible = true;
            this.changeform.user_id = data.user_id;
            this.changeform.user_status = data.user_status;
            this.changeform.username = data.username;
            this.changeform.user_true_name = data.user_true_name;
            this.changeform.password = '';
            this.changeform.dept_id = [];
            this.changeform.group_id = [];
            this.changeform.position_id = [];
            for(var i = 0; i < data.userDepts.length;i++){
              this.changeform.dept_id.push(data.userDepts[i].dept_id)
            }
            for(var k = 0; k < data.userGroups.length;k++){
              this.changeform.group_id.push(data.userGroups[k].group_id)
            }
            for(var l= 0; l < data.userPositions.length;l++){
              this.changeform.position_id.push(data.userPositions[l].position_id)
            }
            console.log(this.changeform )
            
            // alert(11)
            // console.log(this.changeform)
          },
          //新增单个用户
          addUserClick(){
                const self = this;
                var params = new URLSearchParams();
                var token = localStorage.getItem('auth');
                console.log(self.form)
                var pass =/^(?=.*[a-z])(?=.*[A-Z])(?=.*[1-9])(?=.*[\W]).{10,}$/;
                if(!pass.test(self.form.password)){
                  var passwordmd5 = '';
                  this.$message({
                    message: '密码规则不正确',
                    type: 'error'
                  });
                  return false
                }else{
                  var passwordmd5 = md5.hex(self.form.password);
                }
                // if(self.form.password==''||self.form.password==null){
                //   var passwordmd5 = '';
                // }else{
                //   var passwordmd5 = md5.hex(self.form.password);
                // }
                
                params.append('password',passwordmd5);
                params.append('username',self.form.username);
                params.append('user_true_name',self.form.user_true_name);
                params.append('group_ids',self.form.group_id.join(","));
                params.append('position_ids',self.form.position_id.join(','));
                params.append('dept_ids',self.form.dept_id.join(','));
                
                self.$axios({
                    method: 'post',
                    url: '/store/user/add',
                    data: params,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded','kf-token':token},
                 }).then(function(data){
                    if(data.data.code==0){
                        self.$message({
                          type: 'success',
                          message: '添加成功'
                        }); 
                        self.getDataList();
                    }else{
                      self.$response(data,self);
                    }
                 });
          },
          //确定修改资料
          sureToChange(){
                const self = this;
                var params = new URLSearchParams();
                var token = localStorage.getItem('auth');
                console.log(self.changeform.password)
                var pass =/^(?=.*[a-z])(?=.*[A-Z])(?=.*[1-9])(?=.*[\W]).{10,}$/;
                if(!pass.test(self.form.password)){
                  var passwordmd5 = '';
                  this.$message({
                    message: '密码规则不正确',
                    type: 'error'
                  });
                  return false
                }else{
                  var passwordmd5 = md5.hex(self.form.password);
                }
                // if(self.form.password==''||self.form.password==null){
                //   var passwordmd5 = '';
                // }else{
                //   var passwordmd5 = md5.hex(self.form.password);
                // }
                
                params.append('password',passwordmd5);
                params.append('user_id',self.changeform.user_id); 
                params.append('username',self.changeform.username);
                params.append('user_true_name',self.changeform.user_true_name);
                params.append('user_status',self.changeform.user_status);
                params.append('group_ids',self.changeform.group_id.join(","));
                params.append('position_ids',self.changeform.position_id.join(','));
                params.append('dept_ids',self.changeform.dept_id.join(','));
                
                
                self.$axios({
                    method: 'post',
                    url: '/store/user/update',
                    data: params,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded','kf-token':token},
                 }).then(function(data){
                    if(data.data.code==0){
                        self.$message({
                          type: 'success',
                          message: '修改成功'
                        }); 
                        self.getDataList();
                    }else{
                      self.$response(data,self);
                    }
                 });
          },
          //点击展开表格展示处置
          rowClick(row, event, column) {
                Array.prototype.remove = function (val) {
                    let index = this.indexOf(val);
                    if (index > -1) {
                        this.splice(index, 1);
                    }
                };
 
                if (this.expands.indexOf(row.user_card_id) < 0) {
                    this.expands = []
                    this.expands.push(row.user_card_id);
                } else {
                    this.expands.remove(row.user_card_id);
                }
                // console.log(this.expands)
 
          },
          //单元格双击跳转档案页
          rowDbclick(row, event){
            console.log(row)
          },
          handleCurrentChange(){
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
              var newArr = [];
              newArr.push(value[value.length-1]) 
              this.org_idList = newArr;
          },
          querySearch(queryString, cb) {
              this.getNameList();
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
          handleSelect(item) {
            this.getDataList();
          },
          //搜索点击事件
          searchClick(){
            this.getDataList();
          },
          //默认获取用户列表页面
          getDataList(){
                const self = this;
                var params = new URLSearchParams();
                var token = localStorage.getItem('auth');
                params.append('pageNum',self.currentPage); 
                params.append('pageSize',self.pageSize); 
                params.append('user_true_name',self.user_true_name); 
                params.append('user_gonghao',self.number);
                params.append('dept_id',self.dept_id);
                
                self.$axios({
                    method: 'post',
                    url: '/store/user/getByPage',
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
          
         
          //获取职业信息
          getZhiweiList(){
                const self = this;
                var params = new URLSearchParams();
                var token = localStorage.getItem('auth'); 
                params.append('pageNum',1); 
                params.append('pageSize',10000);        
                self.$axios({
                    method: 'post',
                    url: '/store/position/getByPage',
                    data: params,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded','kf-token':token},
                 }).then(function(data){
                    if(data.data.code==0){
                       self.zhiweiList = data.data.data.list;
                       
                    }else{
                      self.$response(data,self);
                    }
                 });
          },
          // //姓名模糊查询提示
          
          remoteMethod(query){
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
                self.user_true_name = query;
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
                        return { value: item.user_true_name, label: item.user_true_name };
                      });
                      self.userNameList = self.list;
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
          //获取权限组列表
          getPowerList(){
                const self = this;
                var params = new URLSearchParams();
                var token = localStorage.getItem('auth');         
                self.$axios({
                    method: 'post',
                    url: '/store/group/get',
                    data: params,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded','kf-token':token},
                 }).then(function(data){
                    if(data.data.code==0){
                       self.powerList = data.data.data;
                    }else{
                      self.$response(data,self);
                    }
                 });
          }
      }
     
  }
</script>

<style scoped>
    .tableClass{
      width: 100%;
      height: auto;
      /*background-color: #231a75;*/
    }
    .tableList{
      width: 99%;
      height: 550px!important;
      overflow-y: scroll;
      border:1px solid #231a75;
     /* border-radius: 20px;*/
      margin-top: 20px;
      /*background-color: #231a75;*/
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
      /*background-color: #231a75;*/
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
    .passwordStyle{
      width: 50%;
      float: right;
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

   
    .row-expand-cover td:last-child .el-icon-arrow-right{
      visibility: hidden;
    }
    .demo-table-expand{
      
      padding: 20px;
    }
</style>