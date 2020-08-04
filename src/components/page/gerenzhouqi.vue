<template>
    <div>
        
        <div >

            <div class="block">
               
                <el-select 
                  clearable 
                  v-model="laobao_name" 
                  style="height:40px;margin-left: 20px;" 
                  remote 
                  reserve-keyword 
                  :remote-method="remoteMethod" 
                  :loading="loading" 
                  filterable 
                  placeholder="物品名称">
                    <el-option
                      style="height:40px;"
                      v-for="item,index in laobaoNameList"
                      :key="index"
                      :label="item.label"
                      :value="item.label">
                    </el-option>
                </el-select>
                <el-select 
                  clearable 
                  v-model="user_true_name" 
                  style="height:40px;" 
                  remote 
                  reserve-keyword 
                  :remote-method="remoteMethod1" 
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
                  
                <el-button type="warning" style="margin-left: 30px;" @click="searchClick">查询</el-button>
                
                
                <el-button type="primary" style="margin-left: 80px;" @click="addZhouqiClick">个人新增</el-button>
                <el-button type="primary" style="margin-left: 60px;" @click="importUsers = true">批量导入</el-button>
                <el-button type="primary" style="margin-left: 60px;" @click="downLoadFile">导入模板下载</el-button>
                
            </div>

          
        </div>
        <div id="container" style="width: 100%;height: 110%; margin-top: 20px;">
            <el-dialog
                title="批量导入"
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
                  name="file"
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
            title="新增周期"
            :visible.sync="addUser"
            >
                  <el-form ref="form" :model="form" label-width="150px" label-position="left" style="margin-left:20px;">
                      <!-- <el-form-item label="劳保名称" style="">
                        <el-input v-model="form.laobao_name" style="width: 300px;"></el-input>
                      </el-form-item> -->
                      <el-form-item label="劳保名称" >
                        <el-select v-model="form.laobao_id" clearable style="width: 400px;" placeholder="请选择">
                            <el-option
                              v-for="item in laobaoList"
                              :key="item.laobao_id"
                              :label="item.laobao_name"
                              :value="item.laobao_id">
                            </el-option>
                          </el-select>
                      </el-form-item>
                      <el-form-item label="个人名称" >
                        <el-select v-model="form.user_id" style="width: 400px;" filterable placeholder="请选择">
                            <el-option
                              v-for="item in userOptions"
                              :key="item.user_id"
                              :label="item.user_true_name"
                              :value="item.user_id">
                            </el-option>
                        </el-select>
                      </el-form-item>
                      <el-form-item label="周期" style="">
                          <el-input v-model="form.zhouqi" style="width: 400px;">
                            <span slot="suffix" class=" ">天</span>
                          </el-input>
                      </el-form-item>
                      <el-form-item label="初始发放日期" style="">
                          <el-date-picker
                            value-format="yyyy-MM-dd"
                           style="width: 400px;"
                            v-model="form.start_time"
                            type="date"
                            placeholder="选择日期">
                          </el-date-picker>
                      </el-form-item>
                      <el-form-item label="上次发放日期" style="">
                          <el-date-picker
                          value-format="yyyy-MM-dd"
                           style="width: 400px;"
                            v-model="form.now_time"
                            type="date"
                            placeholder="选择日期">
                          </el-date-picker>
                      </el-form-item>
                      
                    </el-form>            
            <span slot="footer" class="dialog-footer">
              <el-button @click="addUser = false">取 消</el-button>
              <el-button type="primary" @click="addUserClick">确 定</el-button>
            </span>
          </el-dialog>
          <el-dialog  title="修改周期" :visible.sync="dialogFormVisible">
                
              <el-form ref="form" :model="changeform" label-width="150px" label-position="left" style="margin-left:20px;">
                  <el-form-item label="劳保名称" >
                      <el-select v-model="changeform.laobao_id" clearable style="width: 400px;" placeholder="请选择">
                          <el-option
                            v-for="item in laobaoList"
                            :key="item.laobao_id"
                            :label="item.laobao_name"
                            :value="item.laobao_id">
                          </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="个人名称" >
                        <el-select v-model="changeform.user_id" style="width: 400px;" filterable placeholder="请选择">
                            <el-option
                              v-for="item in userOptions"
                              :key="item.user_id"
                              :label="item.user_true_name"
                              :value="item.user_id">
                            </el-option>
                        </el-select>
                      </el-form-item>
                    <el-form-item label="周期" style="">
                        <el-input v-model="changeform.zhouqi" style="width: 400px;">
                          <span slot="suffix" class=" ">天</span>
                        </el-input>
                    </el-form-item>
                    <el-form-item label="初始发放日期" style="">
                        <el-date-picker
                          value-format="yyyy-MM-dd"
                         style="width: 400px;"
                          v-model="changeform.start_time"
                          type="date"
                          placeholder="选择日期">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="上次发放日期" style="">
                        <el-date-picker
                        value-format="yyyy-MM-dd"
                         style="width: 400px;"
                          v-model="changeform.now_time"
                          type="date"
                          placeholder="选择日期">
                        </el-date-picker>
                    </el-form-item>
                
                <!-- <el-form-item label="劳保类型" >
                  <el-select v-model="changeform.laobao_type" clearable style="width: 300px;" placeholder="请选择">
                      <el-option
                        v-for="item in laobaoTypeList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                </el-form-item> -->
                
                
                
              </el-form>

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
                label="劳保物品"
                align="center"
                prop="laobao_name">
              </el-table-column>
              <el-table-column
                label="个人名称"
                align="center"
                prop="user_true_name">
              </el-table-column>
              <el-table-column
                label="初始发放日期"
                align="center"
                prop="start_time">
              </el-table-column>
              <el-table-column
                label="上次发放日期"
                align="center"
                prop="now_time">
              </el-table-column>
              <!-- <el-table-column
                label="劳保类型"
                align="center"
                prop="">
                <template slot-scope="props">
                  <span >{{props.row.laobao_type=="quanchang"?"全厂周期发放":""}}</span>
                  <span >{{props.row.laobao_type=="bumen"?"部门周期发放":""}}</span>
                  <span >{{props.row.laobao_type=="geren"?"个人周期发放":""}}</span>
                </template>
              </el-table-column> -->
             
              <el-table-column
                label="操作"
                align="center">
                <template slot-scope="props">
                  <el-button
                  size="mini"
                  @click="updataClick(props.row)">修改</el-button>
                  
                  <!-- <el-button
                  size="mini"
                  type="warning"
                  @click="zhouqiClick(props.row)">发放时间</el-button> -->
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
          <el-dialog
              title="发放时间"
              :visible.sync="timeDialogVisible"
              width="40%">
              <el-form ref="form" :model="timeform" label-width="180px" label-position="left" style="margin-left:20px;">
                <el-form-item v-if="deptHid" label="上传模板" style="">
                  <el-button type="primary">下载模板</el-button>
                </el-form-item>
                <el-form-item v-if="deptHid" label="上传部门发放时间清单" style="">
                  <el-upload
                    class="upload-demo"
                    drag
                    :headers="myHeaders"
                    :action="addBumenFafangUrl"
                    :on-success="uploadSuccessFile"
                    :data='goodsData'
                    name="file">
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                    <div class="el-upload__tip" slot="tip">只能上传excle文件</div>
                  </el-upload>
                </el-form-item>
                <el-form-item v-if="gerenHid" label="上传模板" style="">
                  <el-button type="primary">下载模板</el-button>
                </el-form-item>
                <el-form-item v-if="gerenHid" label="上传个人发放时间清单" style="">
                  <el-upload
                    class="upload-demo"
                    drag
                    :headers="myHeaders"
                    :action="addGerenFafangUrl"
                    :data='goodsData'
                    :on-success="uploadSuccessFile"
                    name="file">
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                    <div class="el-upload__tip" slot="tip">只能上传excle文件</div>
                  </el-upload>
                </el-form-item>
                <el-form-item label="初始发放时间" v-if="quanchangHid">
                  <el-date-picker
                    style="width: 300px;"
                    format="yyyy-MM-dd"
                    v-model="timeform.value1"
                    type="date"
                    placeholder="选择日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="周期" style="" v-if="quanchangHid">
                    <el-input v-model="timeform.zhouqi" style="width: 300px;">
                      <span slot="suffix" class=" ">天</span>
                    </el-input>
                </el-form-item>
                
              </el-form>
              <span slot="footer" class="dialog-footer">
                <el-button @click="timeDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="timeDialogVisible = false">确 定</el-button>
              </span>
          </el-dialog>

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
              laobaoNameList:[],
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
              
              
              zhiweiList:[],
              // 
              laobao_name:'',
              user_true_name:'',
              laobaoTypeList:[{
                value:"quanchang",
                label:"全厂周期发放"
              },{
                value:"bumen",
                label:"部门周期发放"
              },{
                value:"geren",
                label:"个人周期发放"
              }],
              laobao_type:'',
              loading:false,
              form:{
                laobao_id:'',
                zhouqi:'',
                start_time:'',
                now_time:'',
                user_id:'',
              },
              changeform:{
                laobao_id:'',
                zhouqi:'',
                start_time:'',
                now_time:'',
                laobao_zhouqi_id:'',
                user_id:'',
              },
              timeDialogVisible:false,
              timeform:{},
              deptHid:false,
              quanchangHid:false,
              gerenHid:false,
              addGerenFafangUrl:'',
              addBumenFafangUrl:'',

              laobaoList:[],
              states:[],
              list:[],
              states1:[],
              list1:[],
              userOptions:[],
            }
              
      },
      mounted() {
         
          // var addGerenFafangUrl = this.$axios.defaults.baseURL+'/store/user/addByExcel';
          // this.addGerenFafangUrl = addGerenFafangUrl;
          // var addBumenFafangUrl = this.$axios.defaults.baseURL+'/store/user/addByExcel';
          // this.addBumenFafangUrl = addBumenFafangUrl;

          var addManyUserUploadUrl = this.$axios.defaults.baseURL+'/store/laobao/addLaoBaoZhouQiGeRen';
          this.addManyUserUploadUrl = addManyUserUploadUrl;
          
          var myHeaders = localStorage.getItem('auth');
          var token = {'kf-token':myHeaders}
          this.myHeaders = token;
          this.getDeptList();
          this.getDataList();
          this.getDataList1();
          this.getZhiweiList();
          this.getNameSearchList('');
          this.getNameSearchList1('');
          this.getNameList();
      },
      methods: {
          // uploadSuccessFile(){
          //   if(response.code==0){
          //     this.$message({
          //                 type: 'success',
          //                 message: '上传成功'
          //               }); 
          //   }else{
          //     this.$response(response,self);
          //   }
          // },
          // 批量导入
          uploadSuccess(response){
            if(response.code==0){
              this.$message({
                  type: 'success',
                  message: '上传成功'
                }); 
              this.importUsers = false;
            }else{
              this.$response(response,self);
            }
                        
          },
          //人员删除
          handleEdit(res){
                const self = this;
                var params = new URLSearchParams();
                var token = localStorage.getItem('auth');
                
                params.append('laobao_zhouqi_id',res.laobao_zhouqi_id);
                
                self.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    self.$axios({
                        method: 'post',
                        url: '/store/laobao/delLaoBaoZhouQi',
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
                }).catch(() => {
                    self.$message({
                      type: 'info',
                      message: '已取消删除'
                    });          
                });
          },
          // 
          // zhouqiClick(res){
          //   var self = this;
          //   console.log(res)
          //   self.goodsData = {
          //     laobao_id:res.laobao_id
          //   };
          //   self.deptHid = false;
          //   self.gerenHid = false;
          //   self.quanchangHid = false;
          //   self.timeDialogVisible = true;
          //   if(res.laobao_type == 'quanchang'){
          //     self.deptHid = false;
          //     self.gerenHid = false;
          //     self.quanchangHid = true;
          //   }else if(res.laobao_type == 'bumen'){
          //     self.deptHid = true;
          //     self.gerenHid = false;
          //     self.quanchangHid = false;
          //   }else{
          //     self.deptHid = false;
          //     self.gerenHid = true;
          //     self.quanchangHid = false;
          //   }
          // },
          //下载文件
          downLoadFile(){
            var url = this.$axios.defaults.baseURL+'/file/laobao_user_model.xlsx';
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
            console.log(data)
            this.changeform.laobao_id = data.laobao_id;
            this.changeform.zhouqi = data.zhouqi;
            this.changeform.start_time = data.start_time;
            this.changeform.now_time = data.now_time;
            this.changeform.laobao_zhouqi_id = data.laobao_zhouqi_id;
            this.changeform.user_id = data.user_id;
            // this.changeform.password = '';
            // this.changeform.dept_id = [];
            // this.changeform.group_id = [];
            // this.changeform.position_id = [];
            // for(var i = 0; i < data.userDepts.length;i++){
            //   this.changeform.dept_id.push(data.userDepts[i].dept_id)
            // }
            // for(var k = 0; k < data.userGroups.length;k++){
            //   this.changeform.group_id.push(data.userGroups[k].group_id)
            // }
            // for(var l= 0; l < data.userPositions.length;l++){
            //   this.changeform.position_id.push(data.userPositions[l].position_id)
            // }
            // console.log(this.changeform )
            
            // alert(11)
            // console.log(this.changeform)
          },
          // 新增
          addZhouqiClick(){
            this.addUser = true;
            this.form = {
                laobao_id:'',
                zhouqi:'',
                start_time:'',
                now_time:'',
                user_id:'',
              };
          },
          //新增劳保物品
          addUserClick(){
                const self = this;
                var params = new URLSearchParams();
                var token = localStorage.getItem('auth');
                console.log(self.form)                
                params.append('laobao_type','geren');
                params.append('laobao_id',self.form.laobao_id);
                params.append('user_id',self.form.user_id);
                params.append('zhouqi',self.form.zhouqi);
                params.append('start_time',self.form.start_time);
                params.append('now_time',self.form.now_time);
                
                self.$axios({
                    method: 'post',
                    url: '/store/laobao/addLaoBaoZhouQi',
                    data: params,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded','kf-token':token},
                 }).then(function(data){
                    if(data.data.code==0){
                        self.$message({
                          type: 'success',
                          message: '添加成功'
                        }); 
                        self.addUser = false;
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
            
                params.append('laobao_id',self.changeform.laobao_id); 
                params.append('laobao_type','geren');
                params.append('zhouqi',self.changeform.zhouqi);
                params.append('start_time',self.changeform.start_time);
                params.append('now_time',self.changeform.now_time);
                params.append('laobao_zhouqi_id',self.changeform.laobao_zhouqi_id);
                params.append('user_id',self.changeform.user_id);
                
                // params.append('user_status',self.changeform.user_status);
                // params.append('group_ids',self.changeform.group_id.join(","));
                // params.append('position_ids',self.changeform.position_id.join(','));
                // params.append('dept_ids',self.changeform.dept_id.join(','));
                
                
                self.$axios({
                    method: 'post',
                    url: '/store/laobao/updateLaoBaoZhouQi',
                    data: params,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded','kf-token':token},
                 }).then(function(data){
                    if(data.data.code==0){
                        self.$message({
                          type: 'success',
                          message: '修改成功'
                        }); 
                        self.getDataList();
                        self.dialogFormVisible = false;
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
                // params.append('laobao_type',self.laobao_type); 
                params.append('laobao_name',self.laobao_name); 
                params.append('user_true_name',self.user_true_name); 
                params.append('laobao_type','geren');
                
                // params.append('user_gonghao',self.number);
                // params.append('user_id',self.user_id);
                
                self.$axios({
                    method: 'post',
                    url: '/store/laobao/getLaoBaoZhouQiByPage',
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
          getDataList1(){
                const self = this;
                var params = new URLSearchParams();
                var token = localStorage.getItem('auth');
                
                
                self.$axios({
                    method: 'post',
                    url: '/store/laobao/get',
                    data: params,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded','kf-token':token},
                 }).then(function(data){
                    if(data.data.code==0){
                      self.laobaoList = data.data.data;

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
                        this.laobaoNameList = this.list.filter(item => {
                          return item.label.toLowerCase()
                            .indexOf(query.toLowerCase()) > -1;
                        });
                      }, 200);
              } else {
                this.laobaoNameList = [];
              }
          },
          getNameSearchList(query){
                const self = this;
                self.laobao_name = query;
                var params = new URLSearchParams();
                var token = localStorage.getItem('auth');
                params.append('laobao_name',query); 
                // params.append('pageNum',1);
                // params.append('pageSize',10);
                self.$axios({
                    method: 'post',
                    url: '/store/laobao/get',
                    data: params,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded','kf-token':token},
                 }).then(function(data){
                    if(data.data.code==0){
                      self.states = data.data.data;
                      self.list = self.states.map(item => {
                        return { value: item.laobao_name, label: item.laobao_name };
                      });
                      self.laobaoNameList = self.list;
                    }else{
                      self.$response(data,self);
                    }
                 });
          },
          // //姓名模糊查询提示
          
          remoteMethod1(query){
              if (query !== '') {
                this.loading = true;
                this.getNameSearchList1(query);
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
          getNameSearchList1(query){
                const self = this;
                self.user_true_name = query;
                var params = new URLSearchParams();
                var token = localStorage.getItem('auth');
                params.append('user_true_name',query); 
                // params.append('pageNum',1);
                // params.append('pageSize',10000);
                self.$axios({
                    method: 'post',
                    url: '/store/user/get',
                    data: params,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded','kf-token':token},
                 }).then(function(data){
                    if(data.data.code==0){
                      self.states1 = data.data.data;
                      self.list1 = self.states1.map(item => {
                        return { value: item.user_true_name, label: item.user_true_name };
                      });
                      self.userNameList = self.list1;
                      // console.log(self.userNameList)
                    }else{
                      self.$response(data,self);
                    }
                 });
          },
          getNameList(){
                const self = this;
                // self.user_true_name = query;
                var params = new URLSearchParams();
                var token = localStorage.getItem('auth');
                // params.append('user_true_name',query); 
                // params.append('pageNum',1);
                // params.append('pageSize',10000);
                self.$axios({
                    method: 'post',
                    url: '/store/user/get',
                    data: params,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded','kf-token':token},
                 }).then(function(data){
                    if(data.data.code==0){
                      
                      self.userOptions = data.data.data;
                      
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
                params.append('dept_level','1');   
                       
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