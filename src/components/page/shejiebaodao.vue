<template>
    <div>
        
        <div >

            <div class="block">
               
                <el-date-picker
                  style="margin-left: 20px;width:320px;"
                  v-model="date"
                  type="daterange"
                  range-separator="至"
                  format="yyyy 年 MM 月 dd 日"
                  value-format="yyyy-MM-dd"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期">
                </el-date-picker>
                <el-button type="warning" style="margin-left: 30px;" @click="fenzuSearch">查询</el-button>
                <el-button type="warning" style="margin-left: 360px;" @click="addFile =true">添加文件</el-button>
                <el-button type="warning" style="margin-left: 30px;" @click="downLoadFile = true">下载文件</el-button>
               <!-- <el-autocomplete
                  clearable
                  class="inline-input"
                  v-model="name"
                  style="margin-left: 60px;"
                  :fetch-suggestions="querySearch"
                  placeholder="姓名查询"
                  @select="handleSelect"
                ></el-autocomplete>
                <el-button type="warning" style="margin-left: 30px;" @click="nameSearch">查询</el-button>
                <el-input
                    clearable
                    placeholder="身份证号查询"
                    style="width: 200px;margin-left: 60px;"
                    v-model="number"
                    clearable>
                </el-input>
                <el-button type="warning" style="margin-left: 30px;" @click="numberSearch">查询</el-button> -->
                <!-- <el-select v-model="shejie_status" placeholder="管控状态" clearable style="margin-left: 20px;">
                  <el-option
                    v-for="item in schoolHistory"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
                <el-button type="warning" style="margin-left: 20px;" @click="numberSearch">查询</el-button> -->
            </div>

          
        </div>
        <div id="container" style="width: 100%;height: 110%; margin-top: 20px;">
          <!-- <div class="numData">
            <div class="tableTitle" style="font-size: 20px;">
              管控人列表
            </div>
            <div class="tableTitle">
              总计：{{total}}人
            </div>
            <div class="tableTitle">
              待监控：{{djk}}人
            </div>
            <div class="tableTitle">
              监控中：{{jkz}}人
            </div>
            <div class="tableTitle">
              已结束：{{jkjs}}人
            </div>
          </div> -->
          <el-dialog  title="添加文件" :visible.sync="addFile" style="text-align: center;">
              <el-upload
              class="upload-demo"
              drag
              name="file"
              multiple
              :headers="myHeaders"
              :action="uploadUrl"
              :limit="30"
              :file-list="fileList">
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            </el-upload>
              <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="addFile = false">取 消</el-button>
                
              </div>
          </el-dialog>
          <el-dialog  title="下载文件" :visible.sync="downLoadFile">
              <el-table
                :data="tableDataFile"
                :header-cell-style="{ 'background-color': '#deedf4','color':'#000'}"
                :row-style="rowStyle"
                class="tableClass"
                style="">
                
                <el-table-column
                  label="文件名"
                  align="center"
                  prop="org_file_name">
                </el-table-column>
                <el-table-column
                  label="上传时间"
                  align="center"
                  prop="org_file_time">
                </el-table-column>
                <el-table-column
                  label="上传人"
                  align="center"
                  prop="ad_user_true_name">
                </el-table-column>
                
                <el-table-column
                  label="操作"
                  align='center'
                  >
                  <template slot-scope="props">
                    <el-button type="warning" style="margin-left: 30px;" @click="downLoadFileClick(props.row)">下载</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <el-pagination
                small
                background
                style="text-align: center;margin-top: 20px;"
                @current-change="handleCurrentChange1"
                :current-page.sync="currentPage1"
                :page-size="9"
                layout="prev, pager, next, jumper"
                :total="total1">
              </el-pagination> 
              <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="downLoadFile = false">取 消</el-button>
                
              </div>
          </el-dialog>
          <el-dialog  title="修改管控人资料" :visible.sync="dialogFormVisible">
                <el-tabs type="border-card">
                  <el-tab-pane label="管控人资料">
                    <el-form ref="form" :model="changeform" label-width="120px" label-position="left" style="margin-left:20px;">
                      <el-form-item label="用户名" style="display: inline-block;">
                        <el-input v-model="changeform.username" style="width: 200px;float: left;"></el-input>
                      </el-form-item>
                      <el-form-item label="密码" style="display: inline-block;margin-left:80px;">
                        <el-input v-model="changeform.password" style="width: 200px;float: left;"></el-input>
                      </el-form-item>
                      <el-form-item label="真实姓名" style="display: inline-block;">
                        <el-input v-model="changeform.user_true_name" style="width: 200px;float: left;"></el-input>
                      </el-form-item>
                      <el-form-item label="性别" style="display: inline-block;margin-left:80px;">
                        <el-input v-model="changeform.user_sex" style="width: 200px;float: left;"></el-input>
                      </el-form-item>
                      <el-form-item label="身份证号" style="display: inline-block;float: left;">
                        <el-input v-model="changeform.user_card_id" style="width: 200px;"></el-input>
                      </el-form-item>
                      <el-form-item label="身份证地址" style="display: inline-block;float: left;margin-left:80px;">
                        <el-input v-model="changeform.user_card_address" style="width: 200px;"></el-input>
                      </el-form-item>
                      <el-form-item label="现住址" style="display: inline-block;float: left;">
                        <el-input v-model="changeform.user_now_address" style="width: 200px;"></el-input>
                      </el-form-item>
                      <el-form-item label="描述信息" style="display: inline-block;float: left;margin-left:80px;">
                        <el-input v-model="changeform.user_desc" style="width: 200px;"></el-input>
                      </el-form-item>
                      <el-form-item label="管控等级" style="display: inline-block;margin-left: 80px;">
                        <el-select v-model="changeform.gk_id" placeholder="请选择">
                          <el-option
                            v-for="item in schoolHistory"
                            :key="item.gk_id"
                            :label="item.gk_name"
                            :value="item.gk_id">
                          </el-option>
                        </el-select>
                      </el-form-item>
                      <el-form-item label="联系电话" style="display: inline-block;float: left;">
                        <el-input v-model="changeform.user_tel" style="width: 200px;"></el-input>
                      </el-form-item>
                      <!-- <el-form-item label="部门" style="display: inline-block;margin-left: 0px;">
                        <el-select v-model="changeform.dept_id" placeholder="请选择">
                          <el-option
                            v-for="item in deptList"
                            :key="item.dept_id"
                            :label="item.dept_name"
                            :value="item.dept_id">
                          </el-option>
                        </el-select>
                      </el-form-item> -->
                      <el-form-item label="管控开始时间" style="display: inline-block;float: left;">
                        <div class="block1" style="width: 200px;height:20px;">
                          
                          <el-date-picker
                            v-model="changeform.shejie_begin_time"
                            style="width: 200px;"
                            type="date"
                            format="yyyy 年 MM 月 dd 日"
                            value-format="yyyy-MM-dd"
                            placeholder="选择日期">
                          </el-date-picker>
                        </div>
                      </el-form-item>
                      <el-form-item label="管控结束时间" style="display: inline-block;float: left;margin-left:80px;">
                        <div class="block1" style="width: 200px;height:20px;">
                          
                          <el-date-picker
                            v-model="changeform.shejie_end_time"
                            type="date"
                            format="yyyy 年 MM 月 dd 日"
                            value-format="yyyy-MM-dd"
                            placeholder="选择日期">
                          </el-date-picker>
                        </div>
                      </el-form-item>
                      <el-form-item label="分组" style="display: inline-block;">
                        <el-select v-model="changeform.group_id" placeholder="请选择" style="width: 200px;">
                          <el-option
                            v-for="item in fenzuList"
                            :key="item.org_id"
                            :label="item.org_name"
                            :value="item.org_id">
                          </el-option>
                        </el-select>
                      </el-form-item>
                      <el-form-item label="策略" style="display: inline-block;margin-left: 80px;">
                        <el-select v-model="changeform.userPlan.plan_id" placeholder="请选择">
                          <el-option
                            v-for="item in celueList"
                            :key="item.plan_id"
                            :label="item.plan_name"
                            :value="item.plan_id">
                          </el-option>
                        </el-select>
                      </el-form-item>
                      <el-form-item label="入所原因" style="display: inline-block;float: left;">
                        <el-input v-model="changeform.shejie_reason" style="width: 200px;"></el-input>
                      </el-form-item>
                      <el-form-item label="驾驶证等级" style="display: inline-block;float: left;margin-left: 80px;">
                        <el-input v-model="changeform.user_driver_type" style="width: 200px;"></el-input>
                      </el-form-item>
                      <el-form-item label="驾驶证编号" style="display: inline-block;float: left;">
                        <el-input v-model="changeform.user_driver_id" style="width: 200px;"></el-input>
                      </el-form-item>
                      <el-form-item label="职业" style="display: inline-block;margin-left: 80px;">
                        <el-select v-model="changeform.user_job_id" placeholder="请选择">
                          <el-option
                            v-for="item in zhiyeList"
                            :key="item.user_job_id"
                            :label="item.user_job_name"
                            :value="item.user_job_id">
                          </el-option>
                        </el-select>
                      </el-form-item>
                      <el-form-item label="人员类型" style="display: inline-block;">
                        <el-cascader
                          :show-all-levels="false"
                          clearable
                          class="demonstration"
                          :options="options1"
                          :props="propsObj1"
                          style="width:200px;"
                          v-model="changeform.user_type_code_arr"
                          placeholder="请选择机构"
                          change-on-select
                          @change="handleChange1">
                        </el-cascader>
                      </el-form-item>
                      
                    </el-form>
                  </el-tab-pane>
                  <el-tab-pane label="监护人信息">
                    <el-form ref="form" :model="changeform" label-width="120px" label-position="left" style="margin-left:20px;">
                      <el-form-item label="监护人姓名" style="display: inline-block;">
                        <el-input v-model="changeform.keeper_name" style="width: 200px;float: left;"></el-input>
                      </el-form-item>
                      <el-form-item label="监护人关系" style="display: inline-block;margin-left:80px;">
                        <el-select v-model="changeform.keeper_relation" placeholder="请选择" style="width: 200px;float:left;">
                          <el-option
                            v-for="item in relationList"
                            :key="item.value"
                            :label="item.name"
                            :value="item.value">
                          </el-option>
                        </el-select>
                      </el-form-item>
                      <el-form-item label="监护人电话" style="display: inline-block;">
                        <el-input v-model="changeform.keeper_tel" style="width: 200px;float: left;"></el-input>
                      </el-form-item>
                      <el-form-item label="监护人地址" style="display: inline-block;margin-left:80px;">
                        <el-input v-model="changeform.keeper_now_address" style="width: 200px;float: left;"></el-input>
                      </el-form-item>
                      <el-form-item label="监护人证件号" style="display: inline-block;float: left;">
                        <el-input v-model="changeform.keeper_card_id" style="width: 200px;"></el-input>
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
              :expand-row-keys="expands"
              @row-click="rowClick"
              @row-dblclick="rowDbclick"
              class="tableClass"
              style="">
              <el-table-column type="expand">
                <template slot-scope="props">
                  <el-form label-position="left" inline class="demo-table-expand">
                    <!-- <el-form-item label="微信绑定电话">
                      <span>{{ props.row.user_wx_tel }}</span>
                    </el-form-item> -->
                    <!-- <el-form-item label="侦码仪手机号">
                      <span>{{ props.row.user_zm_tel }}</span>
                    </el-form-item> -->
                    <el-form-item label="监护人姓名">
                      <span>{{ props.row.keeper_name }}</span>
                    </el-form-item>
                    <el-form-item label="监护人关系">
                      <span>{{ props.row.keeper_relation }}</span>
                    </el-form-item>
                    <el-form-item label="监护人电话">
                      <span>{{ props.row.keeper_tel }}</span>
                    </el-form-item>
                    <el-form-item label="监护人地址">
                      <span>{{ props.row.keeper_now_address }}</span>
                    </el-form-item>
                    <el-form-item label="管控人地址">
                      <span>{{ props.row.user_card_address }}</span>
                    </el-form-item>
                    <el-form-item label="监护人证件">
                      <span>{{ props.row.keeper_card_id }}</span>
                    </el-form-item>
                    <el-form-item label="录入时间">
                      <span>{{ props.row.create_time }}</span>
                    </el-form-item>
                    <el-form-item label="开始时间">
                      <span>{{ props.row.shejie_begin_time }}</span>
                    </el-form-item>
                    <el-form-item label="结束时间">
                      <span>{{ props.row.shejie_end_time }}</span>
                    </el-form-item>
                    <el-form-item label="当前状态">
                      <span>{{ props.row.shejie_status }}</span>
                    </el-form-item>
                    <el-form-item label="职业">
                      <span>{{ props.row.user_job_name }}</span>
                    </el-form-item>
                    <el-form-item label="绑定策略">
                      <span>{{ props.row.userPlan?props.row.userPlan.plan_name:'暂无绑定' }}</span>
                    </el-form-item>
                    <div style="width:300px;height:50px;margin:0 auto;margin-top:30px;">
                      <el-button type="warning" size="mini" style="margin-left: 30px;" @click="danganClick(props.row)">详细档案</el-button>
                      <el-button v-if="show_btn" type="warning" size="mini" style="margin-left: 30px;" @click="updataClick(props.row)">修改资料</el-button>
                    </div>
                      
                    
                  </el-form>
                </template>
              </el-table-column>
              <el-table-column
                label="姓名"
                prop="user_true_name">
              </el-table-column>
              <el-table-column
                label="性别"
                prop="user_sex">
              </el-table-column>
              <el-table-column
                label="民族"
                prop="user_volk">
              </el-table-column>
              <el-table-column
                label="身份证号"
                prop="user_card_id">
              </el-table-column>
              <el-table-column
                label="电话"
                prop="user_tel">
              </el-table-column>
              
              <el-table-column
                label="现住址"
                prop="user_now_address">
              </el-table-column>
              <el-table-column
                label="当前状态"
                prop="shejie_status">
              </el-table-column>
            </el-table> 
                
          </div>
          <el-pagination
                small
                background
                style="text-align: center;margin-top: 20px;"
                @current-change="handleCurrentChange"
                :current-page.sync="currentPage"
                :page-size="9"
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
              fileList:[],
              myHeaders:null,
              uploadUrl:'',
              addFile:false,
              downLoadFile:false,
              date:[],
              shejie_status:'',
              djk:'',
              jkjs:'',
              jkz:'',
              show_btn:true,
              dialogFormVisible:false,
              currentPage:1,
              total:4,
              currentPage1:1,
              total1:4,
              name:'',
              number:'',
              restaurants: [],
              value1:'',
              value2:'',
              selectedOptions: [],
              options: [],
              options1:[],
              propsObj1:{
                label:'user_type_name',
                children:'userTypeList',
                value:'user_type_code'
              },
              value:'',
              tableData5: [],
              tableDataFile:[],
              expands: [],
              org_idList:[],
              zhiyeList:[],
              changeform:{
                userPlan:{

                }
              },
              fenzuList:[],
              celueList:[],
              relationList:[
                {
                  value: '父母',
                  label: '父母'
                },
                {
                  value: '兄弟',
                  label: '兄弟'
                },
                {
                  value: '姐妹',
                  label: '姐妹'
                },
                {
                  value: '朋友',
                  label: '朋友'
                },
                {
                  value: '其他',
                  label: '其他'
                },
              ],
              schoolHistory: [
              {
                value: '',
                label: '全部'
              },
              {
                value: 'shejie',
                label: '社戒'
              }, {
                value: 'shekang',
                label: '社康'
              }, {
                value: 'zaice',
                label: '在册'
              }],
            }
              
      },
      mounted() {
          var org_type = localStorage.getItem('org_type');
          if(org_type=='office'||org_type=='group'){
            this.show_btn = false;
          }
          var myHeaders = localStorage.getItem('auth');
          var uploadUrl = this.$axios.defaults.baseURL+'/stop/uploadOrgFile';
          this.uploadUrl = uploadUrl;
          var token = {'kf-token':myHeaders}
          this.myHeaders = token;
          this.getOrgsList1();
          this.getGkList();
          this.getOrgsList(); 
          this.getNameList();
          this.getDataList();
          this.getGroupList();
          this.getCelueList(); 
          this.getZhiyeList();
          this.getFileList();
      },
      methods: {
          //获取策略信息
          getCelueList(){
                const self = this;
                var params = new URLSearchParams();
                var token = localStorage.getItem('auth');    
                self.$axios({
                    method: 'post',
                    url: '/stop/getReportPlans',
                    data: params,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded','kf-token':token},
                 }).then(function(data){
                    if(data.data.code==0){
                       self.celueList = data.data.data

                    }else{
                      self.$response(data,self);
                    }
                 });
          },
          handleChange1(value) {
              // console.log(value)
          },
          //获取分组信息
          getGroupList(){
                const self = this;
                var params = new URLSearchParams();
                var token = localStorage.getItem('auth');
                params.append('currentPage',self.currentPage); 
                params.append('pageSize','100');       
                self.$axios({
                    method: 'post',
                    url: '/stop/getOrgs',
                    data: params,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded','kf-token':token},
                 }).then(function(data){
                    if(data.data.code==0){
                       self.fenzuList = data.data.data.list

                    }else{
                      self.$response(data,self);
                    }
                 });
          },
          //下载文件
          downLoadFileClick(data){
             window.open(data.org_file_url);
          },
          getFileList(){
                const self = this;
                var params = new URLSearchParams();
                var token = localStorage.getItem('auth');
                params.append('currentPage',self.currentPage1); 
                params.append('pageSize',9);        
                self.$axios({
                    method: 'post',
                    url: '/stop/file/getPage',
                    data: params,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded','kf-token':token},
                 }).then(function(data){
                    if(data.data.code==0){
                       self.tableDataFile = data.data.data.list;
                       self.total1 = data.data.data.total;
                       
                    }else{
                      self.$response(data,self);
                    }
                 });
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
            this.changeform = data;
            this.changeform.plan_id = data.userPlan.plan_id;
            console.log(this.changeform)
          },
          //确定修改资料
          sureToChange(){
                const self = this;
                var params = new URLSearchParams();
                var token = localStorage.getItem('auth');
                console.log(self.changeform.password)
                if(self.changeform.password==''||self.changeform.password==null){
                  var passwordmd5 = '';
                }else{
                  var passwordmd5 = md5.hex(self.changeform.password);
                }
                
                params.append('password',passwordmd5);
                params.append('user_id',self.changeform.user_id); 
                params.append('username',self.changeform.username);
                params.append('user_true_name',self.changeform.user_true_name);
                params.append('user_status',self.changeform.user_status);
                params.append('user_sex',self.changeform.user_sex);
                params.append('user_card_address',self.changeform.user_card_address);
                params.append('user_now_address',self.changeform.user_now_address);
                params.append('user_card_id',self.changeform.user_card_id);
                params.append('user_desc',self.changeform.user_desc);
                params.append('user_tel',self.changeform.user_tel);
                params.append('create_time',self.changeform.create_time);
                params.append('create_user',self.changeform.create_user);
                params.append('org_id',self.changeform.org_id);
                params.append('gk_id',self.changeform.gk_id);
                params.append('user_type_code',self.changeform.user_type_code_arr.pop());
                params.append('shejie_begin_time',self.changeform.shejie_begin_time);
                params.append('shejie_reason',self.changeform.shejie_reason);
                params.append('shejie_end_time',self.changeform.shejie_end_time);
                params.append('group_id',self.changeform.group_id);
                params.append('national_id',self.changeform.national_id);
                params.append('provincial_id',self.changeform.provincial_id);
                params.append('city_id',self.changeform.city_id);
                params.append('county_id',self.changeform.county_id);
                params.append('office_id',self.changeform.office_id);
                params.append('plan_id',self.changeform.userPlan.plan_id);
                params.append('keeper_tel',self.changeform.keeper_tel);
                params.append('keeper_relation',self.changeform.keeper_relation);
                params.append('keeper_now_address',self.changeform.keeper_now_address);
                params.append('keeper_name',self.changeform.keeper_name);
                params.append('keeper_card_id',self.changeform.keeper_card_id);
                params.append('user_driver_id',self.changeform.user_driver_id);
                params.append('user_driver_type',self.changeform.user_driver_type);
                params.append('user_job_id',self.changeform.user_job_id);
                self.$axios({
                    method: 'post',
                    url: '/stop/updateUser',
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
           handleCurrentChange1(){
            //页码发生变化请求新数据
            this.getFileList();
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
          //姓名查询
          nameSearch(){
            this.getDataList();
          },
          //身份证号查询
          numberSearch(){
            this.getDataList();
          },
          //分组查询
          fenzuSearch(){
            this.getDataList();   
          },
          //获取管控等级
          getGkList(){
                const self = this;
                var params = new URLSearchParams();
                var token = localStorage.getItem('auth');  
                self.$axios({
                    method: 'post',
                    url: '/stop/userGk/getStatus',
                    data: params,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded','kf-token':token},
                 }).then(function(data){
                    if(data.data.code==0){
                      self.schoolHistory = data.data.data;
                    }else{
                      self.$response(data,self);
                    }
                 });
          },
          //获取日期方法
          doHandleMonth(month){
                var m = month;
                if(month.toString().length == 1){
                 m = "0" + month;
                }
                return m;
            },
          getDay(day){
                var today = new Date();
                var targetday_milliseconds=today.getTime() + 1000*60*60*24*day;
                today.setTime(targetday_milliseconds); //注意，这行是关键代码
                var tYear = today.getFullYear();
                var tMonth = today.getMonth();
                var tDate = today.getDate();
                tMonth = this.doHandleMonth(tMonth + 1);
                tDate = this.doHandleMonth(tDate);
                return tYear+"-"+tMonth+"-"+tDate;
          },
          //默认获取用户列表页面
          getDataList(){
                const self = this;
                var params = new URLSearchParams();
                var token = localStorage.getItem('auth');
                if(self.date==null||self.date.length==0){
                  var begin_time = '';
                  var end_time = '';
                }else{
                  var begin_time = self.date[0];
                  var end_time = self.date[1];
                }
                params.append('currentPage',self.currentPage); 
                params.append('pageSize','9');
                params.append('baodao_begin_time',begin_time);
                params.append('baodao_end_time',end_time);
                params.append('user_type_code','shejie');      
                self.$axios({
                    method: 'post',
                    url: '/stop/user/getBaoDao',
                    data: params,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded','kf-token':token},
                 }).then(function(data){
                    if(data.data.code==0){
                      self.tableData5 = data.data.data.list;
                      self.total = data.data.data.total;
                      self.djk = data.data.djk;
                      self.jkjs = data.data.jkjs;
                      self.jkz = data.data.jkz;
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
          //获取职业信息
          getZhiyeList(){
                const self = this;
                var params = new URLSearchParams();
                var token = localStorage.getItem('auth');       
                self.$axios({
                    method: 'post',
                    url: '/stop/user/job/get',
                    data: params,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded','kf-token':token},
                 }).then(function(data){
                    if(data.data.code==0){
                       self.zhiyeList = data.data.data;
                       console.log(self.zhiyeList)
                    }else{
                      self.$response(data,self);
                    }
                 });
          },
          //姓名模糊查询提示
          getNameList(){
                const self = this;
                var params = new URLSearchParams();
                var token = localStorage.getItem('auth');
                // params.append('currentPage',self.currentPage);
                self.$axios({
                    method: 'post',
                    url: '/stop/getUserNames',
                    data: params,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded','kf-token':token},
                 }).then(function(data){
                    
                    if(data.data.code==0){
                        self.restaurants = data.data.data
                    }else{
                      self.$response(data,self);
                    }
                 });
          },
           //递归处理树形结构最后一项为空
          digui1(data){
            for(var i = 0; i<data.length;i++){
              if(data[i].userTypeList.length==0){
                var obj = {};
                obj.user_type_name = data[i].user_type_name;
                obj.user_type_code = data[i].user_type_code;
                // obj.org_type = data[i].org_type;
                obj.value = data[i].value;
                data[i] = obj;
              }else{
                this.digui1(data[i].userTypeList)
              }
            }
            this.data = data;
            return data
          },
          //获取分组信息
          getOrgsList1(){
                const self = this;
                var params = new URLSearchParams();
                var token = localStorage.getItem('auth');
                // params.append('currentPage',self.currentPage);        
                self.$axios({
                    method: 'post',
                    url: '/stop/userType/getByTree',
                    data: params,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded','kf-token':token},
                 }).then(function(data){
                    if(data.data.code==0){
                       self.data = self.digui1(data.data.data);
                       self.options1 = self.data;
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
    .el-upload-list{
      text-align: center;
    }
    .el-upload-list__item-name {
        color: #000!important;
    }
    .tableList{
      width: 99%;
      height: 580px!important;
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