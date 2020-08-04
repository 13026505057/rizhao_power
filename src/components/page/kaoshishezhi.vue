<template>
    <div>
        
        <div >

            <div class="block">
               
                <el-cascader
                  clearable
                  class="demonstration"
                  :options="options"
                  v-model="selectedOptions"
                  placeholder="请选择机构"
                  change-on-select
                  @change="handleChange">
                </el-cascader>
                <el-button type="warning" style="margin-left: 30px;" @click="fenzuSearch">查询</el-button>

               <el-autocomplete
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
                <el-button type="warning" style="margin-left: 30px;" @click="numberSearch">查询</el-button>
                <el-button type="primary" style="margin-left: 100px;" @click="addNew">新增考试</el-button>
            </div>

          
        </div>
        <!-- 修改警员资料弹窗 -->
        <el-dialog title="修改警员资料" :visible.sync="dialogFormVisible2">
          <el-form ref="form" :model="changeform" label-width="120px" label-position="left" style="margin-left:20px;">
            <el-form-item label="用户名" style="display: inline-block;">
              <el-input v-model="changeform.ad_username" style="width: 200px;float: left;"></el-input>
            </el-form-item>
            <el-form-item label="密码" style="display: inline-block;margin-left: 80px;">
              <el-input v-model="changeform.ad_password" style="width: 200px;float: left;"></el-input>
            </el-form-item>
            <el-form-item label="真实姓名" style="display: inline-block;">
              <el-input v-model="changeform.ad_user_true_name" style="width: 200px;float: left;"></el-input>
            </el-form-item>
            <el-form-item label="性别" style="display: inline-block;margin-left: 80px;">
              <el-input v-model="changeform.ad_user_sex" style="width: 200px;float: left;"></el-input>
            </el-form-item>
            <el-form-item label="身份证号" style="display: inline-block;float: left;">
              <el-input v-model="changeform.ad_id_card" style="width: 200px;"></el-input>
            </el-form-item>
            <el-form-item label="学历" style="display: inline-block;margin-left: 80px;">
              <el-select v-model="changeform.ad_school" placeholder="请选择">
                <el-option
                  v-for="item in schoolHistory"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="联系电话" style="display: inline-block;float: left;">
              <el-input v-model="changeform.ad_user_tel" style="width: 200px;"></el-input>
            </el-form-item>
            <el-form-item label="部门" style="display: inline-block;margin-left: 80px;">
              <el-select v-model="changeform.dept_id" placeholder="请选择">
                <el-option
                  v-for="item in deptList"
                  :key="item.dept_id"
                  :label="item.dept_name"
                  :value="item.dept_id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="入职时间" style="display: inline-block;float: left;">
              <div class="block1" style="width: 200px;height:20px;">
                
                <el-date-picker
                  v-model="changeform.ad_join_date"
                  type="date"
                  format="yyyy 年 MM 月 dd 日"
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期">
                </el-date-picker>
              </div>
            </el-form-item>

            <el-form-item label="职位" style="display: inline-block;margin-left: 80px;">
              <el-select v-model="changeform.job_id" placeholder="请选择">
                <el-option
                  v-for="item in positionList"
                  :key="item.job_id"
                  :label="item.job_name"
                  :value="item.job_id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="现住址" style="display: inline-block;float: left;">
              <el-input v-model="changeform.ad_now_address" style="width: 200px;float: left;"></el-input>
            </el-form-item>
            <el-form-item label="邮编" style="display: inline-block;margin-left: 80px;">
              <el-input v-model="changeform.ad_zip_code" style="width: 230px;float: left;"></el-input>
            </el-form-item>
            <el-form-item label="身份证地址" style="display: inline-block;">
              <el-input v-model="changeform.ad_card_address" style="width: 200px;float: left;"></el-input>
            </el-form-item>
            <el-form-item label="家庭电话" style="display: inline-block;margin-left: 80px;">
              <el-input v-model="changeform.ad_home_tel" style="width: 230px;float: left;"></el-input>
            </el-form-item>
            <el-form-item v-if="org_type=='bangongshi'?true:false" label="分组" style="display: inline-block;">
                <el-select v-model="changeform.group_id" placeholder="请选择" style="width: 200px;">
                  <el-option
                    v-for="item in fenzuList"
                    :key="item.org_id"
                    :label="item.org_name"
                    :value="item.org_id">
                  </el-option>
                </el-select>
            </el-form-item>
            
            
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible2 = false">取 消</el-button>
            <el-button type="primary" @click="sureToChange">确定修改</el-button>
          </div>
        </el-dialog>
        <!-- 新增警员弹窗 -->
        <el-dialog title="新增考试" :visible.sync="dialogFormVisible">
          <el-form ref="form" :model="form" label-width="120px" label-position="left" style="margin-left:20px;">
            <el-form-item label="考试名称*" style="display: inline-block;">
              <el-input v-model="form.exam_name" style="width: 200px;float: left;"></el-input>
            </el-form-item>
            <el-form-item label="题目数量*" style="display: inline-block;margin-left: 80px;">
              <el-input v-model="form.exam_question_quantity" style="width: 200px;float: left;"></el-input>
            </el-form-item>
            
            
            <el-form-item label="开始时间*" style="display: inline-block;float: left;">
              <div class="block1" style="width: 200px;">
                
                <el-date-picker
                  v-model="form.exam_begin_time"
                  type="date"
                  format="yyyy 年 MM 月 dd 日"
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期">
                </el-date-picker>
              </div>
            </el-form-item>
            <el-form-item label="结束时间*" style="display: inline-block;float: left;margin-left: 85px;">
              <div class="block1" style="width: 200px;">
                
                <el-date-picker
                  v-model="form.exam_end_time"
                  type="date"
                  format="yyyy 年 MM 月 dd 日"
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期">
                </el-date-picker>
              </div>
            </el-form-item>
            
           
            <el-form-item  label="参考题库*" style="display: inline-block;">
                <el-select v-model="form.bank_id" placeholder="请选择" style="width: 200px;">
                  <el-option
                    v-for="item in fenzuList"
                    :key="item.bank_id"
                    :label="item.bank_name"
                    :value="item.bank_id">
                  </el-option>
                </el-select>
            </el-form-item>
            <el-form-item  label="考试人员*" style="display: inline-block;margin-left: 85px;">
                <el-select v-model="form.exam_user" placeholder="请选择" style="width: 200px;">
                  <el-option
                    v-for="item in user_list"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="每题分值*" style="display: inline-block;">
              <el-input v-model="form.exam_question_fen" style="width: 200px;float: left;"></el-input>
            </el-form-item>
            
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="sureToAddNew">确定新增</el-button>
          </div>
        </el-dialog>
        <!-- 考试详情弹窗 -->
        <el-dialog title="考试详情" :visible.sync="kaoshiDetailBox">
            <el-table
              :data="tableData6"
              :header-cell-style="{ 'background-color': '#deedf4','color':'#000'}"
              :row-style="rowStyle"
              row-key="ad_user_id"
              
              @row-click="rowClick"
              @row-dblclick="rowDbclick"
              class="tableClass"
              style="">
              <el-table-column
                type="index"
                width="50">
              </el-table-column>
              <el-table-column
                label="考生姓名"
                align="center"
                prop="ad_user_true_name">
              </el-table-column>
              <el-table-column
                label="所属机构"
                align="center"
               >
                <template slot-scope="props">
                  <span>{{props.row.national_name==null?'':props.row.national_name}}-{{props.row.provincial_name==null?'':props.row.provincial_name}}-{{props.row.city_name==null?'':props.row.city_name}}-{{props.row.county_name==null?'':props.row.county_name}}-{{props.row.office_name==null?'':props.row.office_name}}-{{props.row.group_name==null?'':props.row.group_name}}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="考试时间"
                align="center"
                prop="user_exam_time">
              </el-table-column>
              <el-table-column
                label="考试总分"
                align="center"
                ><template slot-scope="props">
                  <span>100</span>
                </template>
              </el-table-column>
              <el-table-column
                label="考生得分"
                align="center"
                prop="user_exam_grade">
              </el-table-column>
              <el-table-column
                label="考试状态"
                align="center"
                >
                <template slot-scope="props">
                  <span>{{props.row.user_exam_status==2?'答题结束':'未答题'}}</span>
                </template> 
              </el-table-column>
              <el-table-column
                label="操作"
                align="center"
                >
                <template slot-scope="props">
                  <el-button  type="warning" size="mini" @click="kaoshiDetail(props.row)">答题详情</el-button>
                </template> 
              </el-table-column>
            </el-table>
            <el-pagination
                small
                background
                style="text-align: center;margin-top: 20px;"
                @current-change="handleCurrentChange1"
                :current-page.sync="currentPage1"
                :page-size="10"
                layout="prev, pager, next, jumper"
                :total="total1">
          </el-pagination> 
          <div slot="footer" class="dialog-footer">
            <el-button @click="kaoshiDetailBox = false">关 闭</el-button>
            <!-- <el-button type="primary" @click="sureToAddNew">确定新增</el-button> -->
          </div>
        </el-dialog>
        <div id="container" style="width: 100%;height: 110%; margin-top: 20px;">
          <div class="numData">
            <div class="tableTitle" style="font-size: 20px;">
              警员列表
            </div>
            <div class="tableTitle" style="font-size: 20px;">
             当前机构：{{org_name}}
            </div>
            <div class="tableTitle">
              警员总数：{{adUserCount}}人
            </div>
            <div class="tableTitle">
              管控人总计：{{userCount}}人
            </div>
            <div class="tableTitle">
              监控中：{{jkz}}人
            </div>
            <div class="tableTitle">
              已结束：{{jkjs}}人
            </div>
          </div>
          <div class="tableList">
            <el-table
              :data="tableData5"
              :header-cell-style="{ 'background-color': '#deedf4','color':'#000'}"
              :row-style="rowStyle"
              row-key="ad_user_id"
              
              @row-click="rowClick"
              @row-dblclick="rowDbclick"
              class="tableClass"
              style="">
              <el-table-column
                label="考试名称"
                align="center"
                prop="exam_name">
              </el-table-column>
              <el-table-column
                label="题目数量"
                align="center"
                prop="exam_question_quantity">
              </el-table-column>
              <el-table-column
                label="发起人"
                align="center"
                prop="exam_create_user">
              </el-table-column>
              <el-table-column
                label="开始时间"
                align="center"
                prop="exam_begin_time">
              </el-table-column>
              <el-table-column
                label="结束时间"
                align="center"
                prop="exam_end_time">
              </el-table-column>
              <el-table-column
                label="状态"
                align="center"
                >
                <template slot-scope="props">
                  <span>{{props.row.exam_status==0?'未使用':'考试中'}}</span>
                </template> 
              </el-table-column>
              <el-table-column
                label="操作"
                align="center"
                >
                <template slot-scope="props">
                  <el-button  type="warning" size="mini" @click="kaoshiDetail(props.row)">参考详情</el-button>
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
              currentPage:1,
              currentPage1:1,
              dialogFormVisible:false,
              dialogFormVisible2:false,
              kaoshiDetailBox:false,
              total:4,
              total1:4,
              exam_id:'',
              name:'',
              number:'',
              restaurants: [],
              value1:'',
              value2:'',
              selectedOptions: [],
              org_idList:[],
              options: [],
              value:'',
              tableData5: [],
              tableData6:[],
              expands: [],
              changeform:{
                ad_user_id:'',
                ad_username:'',
                ad_password:'',
                ad_user_true_name:'',
                ad_user_sex:'',
                ad_id_card:'',
                ad_school:'',
                ad_birthday:'',
                ad_user_tel:'',
                dept_id:'',
                job_id:'',
                ad_join_date:'',
                ad_now_address:'',
                ad_card_address:'',
                ad_zip_code:'',
                ad_home_tel:'',
              },
              fenzuList:[],
              form:{
                exam_name:'',
                bank_id:'',
                exam_begin_time:'',
                exam_end_time:'',
                exam_question_quantity:'',
                exam_question_fen:'',
              },
              schoolHistory: [{
                value: '专科',
                label: '专科'
              }, {
                value: '本科',
                label: '本科'
              }, {
                value: '硕士',
                label: '硕士'
              }, {
                value: '博士',
                label: '博士'
              }, {
                value: '保密',
                label: '保密'
              }],
              user_list: [{
                value: 'my_org',
                label: '仅限本机构'
              }, {
                value: 'my_all_org',
                label: '本机构及下级机构'
              },],
              deptList:[],
              positionList:[],
              adUserCount:'',
              djk:'',
              jkjs:'',
              jkz:'',
              userCount:'',
              org_name:'',
              org_type:''
            }
              
      },
      mounted() {
          var adUserCount =  localStorage.getItem('adUserCount');
          var djk =  localStorage.getItem('djk');
          var jkjs =  localStorage.getItem('jkjs');
          var jkz =  localStorage.getItem('jkz');
          var userCount =  localStorage.getItem('userCount');
          var org_name =  localStorage.getItem('org_name');
          var org_type =  localStorage.getItem('org_type');
          this.adUserCount = adUserCount;
          this.djk = djk;
          this.jkjs = jkjs;
          this.jkz = jkz;
          this.userCount = userCount;
          this.org_name = org_name;
          this.org_type = org_type;
          this.getOrgsList(); 
          this.getNameList();
          this.getDataList(); 
          this.getDeptList();
          this.getGroupList();
          this.getPositionList();
          this.restaurants = this.loadAll();
      },
      methods: {
          //考试详情
          kaoshiDetail(row){
            this.kaoshiDetailBox = true;
            this.exam_id = row.exam_id;
            this.getDataList1();
          },
          changeData(row){
            console.log(row);
            this.dialogFormVisible2 = true;
            this.changeform = row;
          },
          sureToChange(){
                const self = this;
                var params = new URLSearchParams();
                var token = localStorage.getItem('auth');
                if(self.changeform.ad_password==''||self.changeform.ad_password==null){
                  var passwordmd5 = '';
                }else{
                  var passwordmd5 = md5.hex(self.changeform.ad_password);
                }
                

                params.append('ad_password',passwordmd5);
                params.append('ad_user_id',self.changeform.ad_user_id);
                params.append('ad_username',self.changeform.ad_username); 
                params.append('ad_user_true_name',self.changeform.ad_user_true_name);
                params.append('ad_user_sex',self.changeform.ad_user_sex);    
                params.append('ad_id_card',self.changeform.ad_id_card); 
                params.append('ad_school',self.changeform.ad_school);
                params.append('ad_birthday','');
                params.append('dept_id',self.changeform.dept_id);   
                params.append('job_id',this.changeform.job_id);
                params.append('ad_join_date',self.changeform.ad_join_date); 
                params.append('ad_now_address',self.changeform.ad_now_address);
                params.append('ad_card_address',self.changeform.ad_card_address);
                params.append('ad_zip_code',self.changeform.ad_zip_code);   
                params.append('ad_home_tel',this.changeform.ad_home_tel); 
                params.append('ad_user_tel',this.changeform.ad_user_tel);     
                self.$axios({
                    method: 'post',
                    url: '/stop/updateAdUser',
                    data: params,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded','kf-token':token},
                 }).then(function(data){
                    if(data.data.code==0){
                      self.$message({
                        message: '修改成功',
                        type: 'success'
                      });
                      self.getDataList();
                      self.dialogFormVisible2 = false;
                    }else{
                      self.$response(data,self);
                    }
                 });
          },
          sureToAddNew(){
                const self = this;
                var params = new URLSearchParams();
                var token = localStorage.getItem('auth');
                params.append('exam_name',this.form.exam_name);
                params.append('bank_id',this.form.bank_id);
                params.append('exam_begin_time',this.form.exam_begin_time);
                params.append('exam_end_time',this.form.exam_end_time);
                params.append('exam_question_quantity',this.form.exam_question_quantity);
                params.append('exam_user',this.form.exam_user); 
                params.append('exam_question_fen',this.form.exam_question_fen);      
                self.$axios({
                    method: 'post',
                    url: '/stop/exam/addExam',
                    data: params,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded','kf-token':token},
                 }).then(function(data){
                    if(data.data.code==0){
                      self.$message({
                        message: '创建成功',
                        type: 'success'
                      });
                      self.getDataList();
                      self.dialogFormVisible = false;
                    }else{
                      self.$response(data,self);
                    }
                 });
          },
          addNew(){
            this.dialogFormVisible = true;
          },
          //点击展开表格展示处置
          rowClick(row, event, column) {
                Array.prototype.remove = function (val) {
                    let index = this.indexOf(val);
                    if (index > -1) {
                        this.splice(index, 1);
                    }
                };
 
                if (this.expands.indexOf(row.ad_user_id) < 0) {
                    this.expands = []
                    this.expands.push(row.ad_user_id);
                } else {
                    this.expands.remove(row.ad_user_id);
                }
                console.log(this.expands)
 
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
            this.getDataList1();
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
          loadAll() {
              return [
              ];
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
          //查询考试人员信息
          getDataList1(){
                const self = this;
                var params = new URLSearchParams();
                var token = localStorage.getItem('auth');
                params.append('currentPage',self.currentPage1); 
                params.append('pageSize','10');
                params.append('exam_id',this.exam_id); 
                self.$axios({
                    method: 'post',
                    url: '/stop/exam/getExamUsersByPage',
                    data: params,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded','kf-token':token},
                 }).then(function(data){
                    if(data.data.code==0){
                      self.tableData6 = data.data.data.list;
                      self.total1 = data.data.data.total;
                    }else{
                      self.$response(data,self);
                    }
                 });
          },
          //默认考试信息
          getDataList(){
                const self = this;
                var params = new URLSearchParams();
                var token = localStorage.getItem('auth');
                params.append('currentPage',self.currentPage); 
                params.append('pageSize','9');
                   
                self.$axios({
                    method: 'post',
                    url: '/stop/exam/getExams',
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
            return data
          },
          //获取题库信息
          getGroupList(){
                const self = this;
                var params = new URLSearchParams();
                var token = localStorage.getItem('auth');
                // params.append('currentPage',self.currentPage); 
                // params.append('pageSize','100');       
                self.$axios({
                    method: 'post',
                    url: '/stop/exam/getExamBanks',
                    data: params,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded','kf-token':token},
                 }).then(function(data){
                    if(data.data.code==0){
                       self.fenzuList = data.data.data;

                    }else{
                      self.$response(data,self);
                    }
                 });
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
          //姓名模糊查询提示
          getNameList(){
                const self = this;
                var params = new URLSearchParams();
                var token = localStorage.getItem('auth');
                params.append('ad_user_true_name',self.name);
                self.$axios({
                    method: 'post',
                    url: '/stop/getAdUserNames',
                    data: params,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded','kf-token':token},
                 }).then(function(data){
                    console.log(data)

                    if(data.data.code==0){
                        self.restaurants = data.data.data
                    }else{
                      self.$response(data,self);
                    }
                 });
          },
          getDeptList(){
                const self = this;
                var params = new URLSearchParams();
                var token = localStorage.getItem('auth');
                // params.append('currentPage',self.currentPage);
                self.$axios({
                    method: 'post',
                    url: '/stop/getDepts',
                    data: params,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded','kf-token':token},
                 }).then(function(data){
                    console.log(data)

                    if(data.data.code==0){
                        self.deptList = data.data.data
                    }else{
                      self.$response(data,self);
                    }
                 });
          },
          getPositionList(){
                const self = this;
                var params = new URLSearchParams();
                var token = localStorage.getItem('auth');
                // params.append('currentPage',self.currentPage);
                self.$axios({
                    method: 'post',
                    url: '/stop/getJobs',
                    data: params,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded','kf-token':token},
                 }).then(function(data){
                    console.log(data)

                    if(data.data.code==0){
                        self.positionList = data.data.data
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
      background-color: #231a75;
    }
    .tableList{
      width: 99%;
      height: 480px;
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
    .row-expand-cover td:last-child .el-icon-arrow-right{
      visibility: hidden;
    }
</style>