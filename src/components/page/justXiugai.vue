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
            </div>

          
        </div>
        <div id="container" style="width: 100%;height: 110%; margin-top: 20px;">
          <div class="numData">
            <div class="tableTitle" style="font-size: 20px;">
              管控人列表
            </div>
            <div class="tableTitle">
              总计：200人
            </div>
            <div class="tableTitle">
              待监控：199人
            </div>
            <div class="tableTitle">
              监控中：199人
            </div>
            <div class="tableTitle">
              已结束：199人
            </div>
          </div>
                  <!-- 修改警员资料弹窗 -->
          <el-dialog title="修改管控人资料" :visible.sync="dialogFormVisible">
            <el-form ref="form" :model="changeform" label-width="120px">
              <el-form-item label="用户名" style="display: inline-block;">
                <el-input v-model="changeform.username" style="width: 200px;float: left;"></el-input>
              </el-form-item>
              <el-form-item label="密码" style="display: inline-block;margin-left: 80px;">
                <el-input v-model="changeform.password" style="width: 200px;float: left;"></el-input>
              </el-form-item>
              <el-form-item label="真实姓名" style="display: inline-block;">
                <el-input v-model="changeform.user_true_name" style="width: 200px;float: left;"></el-input>
              </el-form-item>
              <el-form-item label="性别" style="display: inline-block;margin-left: 80px;">
                <el-input v-model="changeform.user_sex" style="width: 200px;float: left;"></el-input>
              </el-form-item>
              <el-form-item label="身份证号" style="display: inline-block;float: left;">
                <el-input v-model="changeform.user_card_id" style="width: 290px;"></el-input>
              </el-form-item>
              <el-form-item label="身份证地址" style="display: inline-block;float: left;">
                <el-input v-model="changeform.user_card_address" style="width: 290px;"></el-input>
              </el-form-item>
              <el-form-item label="现住址" style="display: inline-block;float: left;">
                <el-input v-model="changeform.user_now_address" style="width: 290px;"></el-input>
              </el-form-item>
              <el-form-item label="描述信息" style="display: inline-block;float: left;">
                <el-input v-model="changeform.user_desc" style="width: 290px;"></el-input>
              </el-form-item>
              <el-form-item label="管控状态" style="display: inline-block;margin-left: 0px;">
                <el-select v-model="changeform.shejie_status" placeholder="请选择">
                  <el-option
                    v-for="item in schoolHistory"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="联系电话" style="display: inline-block;float: left;">
                <el-input v-model="changeform.user_tel" style="width: 290px;"></el-input>
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
                <div class="block1" style="width: 290px;">
                  
                  <el-date-picker
                    v-model="changeform.shejie_begin_time"
                    type="date"
                    format="yyyy 年 MM 月 dd 日"
                    value-format="yyyy-MM-dd"
                    placeholder="选择日期">
                  </el-date-picker>
                </div>
              </el-form-item>
              <el-form-item label="管控结束时间" style="display: inline-block;float: left;">
                <div class="block1" style="width: 290px;">
                  
                  <el-date-picker
                    v-model="changeform.shejie_end_time"
                    type="date"
                    format="yyyy 年 MM 月 dd 日"
                    value-format="yyyy-MM-dd"
                    placeholder="选择日期">
                  </el-date-picker>
                </div>
              </el-form-item>
              <el-form-item label="分组" style="display: inline-block;margin-left: 00px;">
                <el-select v-model="changeform.group_id" placeholder="请选择">
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
              class="tableClass"
              style="">
              <el-table-column type="expand">
                <template slot-scope="props">
                  <el-form label-position="left" inline class="demo-table-expand">
                    <el-form-item label="监护人姓名">
                      <span>{{ props.row.user_true_name }}</span>
                    </el-form-item>
                    <el-form-item label="监护人关系">
                      <span>{{ props.row.user_sex }}</span>
                    </el-form-item>
                    <el-form-item label="监护人电话">
                      <span>{{ props.row.user_card_id }}</span>
                    </el-form-item>
                    <el-form-item label="录入时间">
                      <span>{{ props.row.shopId }}</span>
                    </el-form-item>
                    <el-form-item label="开始时间">
                      <span>{{ props.row.category }}</span>
                    </el-form-item>
                    <el-form-item label="结束时间">
                      <span>{{ props.row.address }}</span>
                    </el-form-item>
                    <el-form-item label="当前状态">
                      <span>{{ props.row.desc }}</span>
                    </el-form-item>
                    <el-form-item label="所属机构">
                      <span>{{ props.row.desc }}</span>
                    </el-form-item>
                    <el-form-item label="入所原因">
                      <span>{{ props.row.desc }}</span>
                    </el-form-item>
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
                label="操作"
                >
                <template slot-scope="props">
                  <el-button type="warning" size="mini" @click="updataUser(props.row)" >修 改</el-button>
                  <el-button type="warning" size="mini" @click="delUser(props.row)">删 除</el-button>
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
              dialogFormVisible:false,
              currentPage:1,
              total:4,
              name:'',
              number:'',
              restaurants: [],
              value1:'',
              value2:'',
              selectedOptions: [],
              options: [],
              value:'',
              tableData5: [],
              expands: [],
              org_idList:[],
              fenzuList:[],
              form:{

              },
              schoolHistory: [{
                value: '待监控',
                label: '待监控'
              }, {
                value: '监控中',
                label: '监控中'
              }, {
                value: '监控结束',
                label: '监控结束'
              }],
              changeform:{

              }
            }
              
      },
      mounted() {
          this.getOrgsList(); 
          this.getNameList();
          this.getDataList(); 
          this.getGroupList();
      },
      methods: {
          delUser(data){
            const self = this;
                var params = new URLSearchParams();
                var token = localStorage.getItem('auth');
                params.append('user_id',data.user_id); 
                params.append('user_status','0');
                self.$axios({
                    method: 'post',
                    url: '/stop/updateUser',
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
          sureToChange(){
                const self = this;
                var params = new URLSearchParams();
                var token = localStorage.getItem('auth');
                params.append('user_id',self.changeform.user_id); 
                params.append('username',self.changeform.username);
                params.append('password',self.changeform.password);
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
                params.append('shejie_status',self.changeform.shejie_status);
                params.append('shejie_begin_time',self.changeform.shejie_begin_time);
                params.append('shejie_end_time',self.changeform.shejie_end_time);
                params.append('group_id',self.changeform.group_id);
                params.append('national_id',self.changeform.national_id);
                params.append('provincial_id',self.changeform.provincial_id);
                params.append('city_id',self.changeform.city_id);
                params.append('county_id',self.changeform.county_id);
                params.append('office_id',self.changeform.office_id);
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
          updataUser(data){
            this.dialogFormVisible = true;
            this.changeform = data;
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
          //默认获取用户列表页面
          getDataList(){
                const self = this;
                var user_card_id = localStorage.getItem('xiugai_card_id')
                var params = new URLSearchParams();
                var token = localStorage.getItem('auth');
                params.append('currentPage',self.currentPage); 
                params.append('pageSize','9');
                params.append('user_true_name',self.name);
                params.append('user_status','');
                params.append('user_sex','');
                params.append('user_card_id',self.number);
                params.append('org_id',self.org_idList);      
                self.$axios({
                    method: 'post',
                    url: '/stop/getUsers',
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
          //获取机构树形图
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
                // params.append('currentPage',self.currentPage);
                self.$axios({
                    method: 'post',
                    url: '/stop/getUserNames',
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
    .row-expand-cover td:last-child .el-icon-arrow-right{
      visibility: hidden;
    }
</style>