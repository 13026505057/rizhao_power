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
                <el-button type="warning" style="margin-left: 20px;" @click="fenzuSearch">查询</el-button>

               <el-autocomplete
                  clearable
                  class="inline-input"
                  v-model="name"
                  style="margin-left: 15px;width:150px;"
                  :fetch-suggestions="querySearch"
                  placeholder="姓名查询"
                  @select="handleSelect"
                ></el-autocomplete>
                <el-button type="warning" style="margin-left: 15px;" @click="nameSearch">查询</el-button>
                <el-input
                    clearable
                    placeholder="身份证号查询"
                    style="width: 150px;margin-left: 15px;"
                    v-model="number"
                    clearable>
                </el-input>
                <el-button type="warning" style="margin-left: 15px;" @click="numberSearch">查询</el-button>
                <el-date-picker
                  style="margin-left: 15px;width:300px;"
                  v-model="date"
                  type="daterange"
                  range-separator="至"
                  format="yyyy 年 MM 月 dd 日"
                  value-format="yyyy-MM-dd"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期">
                </el-date-picker>
                <el-button type="warning" style="margin-left: 15px;" @click="dateSearch">查询</el-button>
                <el-select v-model="report_id" placeholder="请选择" style="width:150px;margin-left:20px;">
                  <el-option
                    v-for="item in reportList"
                    :key="item.report_id"
                    :label="item.report_name"
                    :value="item.report_id">
                  </el-option>
                </el-select>
                <el-button type="warning" style="margin-left: 20px;" @click="reportSearch">查询</el-button>
            </div>

          
        </div>
        <div id="container" style="width: 100%;height: 110%; margin-top: 20px;">
          <div class="numData">
            <div class="tableTitle" style="font-size: 20px;">
              管控人报告上传情况
            </div>
            <div class="tableTitle">
              管控人总计：{{userCount}}人
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
          </div>
          <el-dialog
            title="签到留证查询"
            :visible.sync="centerDialogVisible"
            width="50%"
            center>
            <img style="width:100%;height:100%;" :src="imgUrl" />
            <span slot="footer" class="dialog-footer">
              <el-button @click="centerDialogVisible = false">关 闭</el-button>
              <!-- <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button> -->
            </span>
          </el-dialog>
          <el-dialog
            title="签到留证查询"
            :visible.sync="centerDialogVisible1"
            width="50%"
            center>
              <video :key='videoId' width="100%" height="540" controls autoplay >
                <source :src="videoUrl" type="video/mp4">
              </video>
            <span slot="footer" class="dialog-footer">
              <el-button @click="centerDialogVisible1 = false">关 闭</el-button>
              <!-- <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button> -->
            </span>
          </el-dialog>
          <div class="tableList">
            <el-table
              :data="tableData5"
              :header-cell-style="{ 'background-color': '#deedf4','color':'#000'}"
              :row-style="rowStyle"
              row-key="ur_id"
              :expand-row-keys="expands"
             
             
              class="tableClass"
              style="">
              
              <el-table-column
                label="姓名"
                width='160'
                align="center"
                prop="user_true_name">
              </el-table-column>
              <el-table-column
                width='120'
                align="center"
                label="性别"
                prop="user_sex">
              </el-table-column>
              <el-table-column
                label="身份证号"
                align="center"
                prop="user_card_id">
              </el-table-column>
              <el-table-column
                label="报告类型"
                align="center"
                prop="report_name">
              </el-table-column>
              <el-table-column
                label="是否上传"
                align="center"
                width='160'
                prop="upload_status"
                :filters="[{text: '未上传', value: '0'}, {text: '已上传', value: '1'}]"
                :filter-method="filterHandler">
                <template slot-scope="props">
                  <span v-bind:class="[props.row.upload_status==0?'notUpload':'upload']">{{props.row.upload_status==0?'未上传':'已上传'}}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="上传时间"
                align="center"
                prop="upload_time">
              </el-table-column>
              <el-table-column
                label="上传留证"
                align="center">
                <template slot-scope="props">
                  <el-button v-if="props.row.upload_status==1?true:false" type="warning" size="mini" @click="lookSave(props.row)">查看</el-button>
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
              report_id:'1',
              reportList:[],
              videoId:0,
              date:[],
              centerDialogVisible:false,
              centerDialogVisible1:false,
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
              classA:'classA',
              classA:'classB',
              imgUrl:'http://www.kofanchina.com/img_z/img_zl/building.jpg',
              videoUrl:'',
              adUserCount:'',
              djk:'',
              jkjs:'',
              jkz:'',
              userCount:''
            }
              
      },
      mounted() {
          var adUserCount =  localStorage.getItem('adUserCount');
          var djk =  localStorage.getItem('djk');
          var jkjs =  localStorage.getItem('jkjs');
          var jkz =  localStorage.getItem('jkz');
          var userCount =  localStorage.getItem('userCount');
          this.adUserCount = adUserCount;
          this.djk = djk;
          this.jkjs = jkjs;
          this.jkz = jkz;
          this.userCount = userCount;
          this.getOrgsList(); 
          this.getNameList();
          this.getDataList(); 
          this.getReportList();
      },
      methods: {
          lookSave(data){
            if(data.img_url==null||data.img_url==''){
              this.videoId++
              this.videoUrl = data.video_url;
              this.centerDialogVisible1 = true;
            }else{
              this.imgUrl = data.img_url;
              this.centerDialogVisible = true;
            }
            
          },
          filterTag(value, row) {
            return row.tag === value;
          },
          filterHandler(value, row, column) {
            
            const property = column['property'];
            return row[property] === value;
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
          //修改单元行颜色
          // rowStyle({ row, rowIndex}){
          //   if(rowIndex%2 ==0){
          //     return 'background:#231a75;color:#fff;'
          //   }else{
          //    return 'background:#1b1167;color:#fff;'
          //   }
          // },       
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
          reportSearch(){
            this.getDataList();
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
          dateSearch(){
            this.getDataList();
          },
          //分组查询
          fenzuSearch(){
            this.getDataList();   
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
           //获取出去签到的报告页面
          getReportList(){

                const self = this;
                var params = new URLSearchParams();
                var token = localStorage.getItem('auth');
                self.$axios({
                    method: 'post',
                    url: '/stop/getReportsNoSign',
                    data: params,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded','kf-token':token},
                 }).then(function(data){
                    if(data.data.code==0){
                      self.reportList = data.data.data;
                     
                    }else{
                      self.$response(data,self);
                    }
                    if(user_true_name==''||user_true_name==null){

                    }else{
                      localStorage.removeItem('user_true_name');
                    }
                 });
          },
          //获取用户报告详情
          getDataList(){

                const self = this;
                var user_true_name = localStorage.getItem('user_true_name');
                if(user_true_name==''||user_true_name==null){

                }else{
                  self.name = user_true_name;
                }
                
                if(self.date==null||self.date.length==0){
                  var begin_time = self.getDay(-30);
                  var end_time = self.getDay(1)
                }else{
                  var begin_time = self.date[0];
                  var end_time = self.date[1];
                }
                var params = new URLSearchParams();
                var token = localStorage.getItem('auth');
                params.append('currentPage',self.currentPage); 
                params.append('pageSize','9');
                params.append('user_true_name',self.name);
                params.append('begin_time',begin_time);
                params.append('end_time',end_time);
                params.append('user_card_id',self.number);
                params.append('org_id',self.org_idList);
                params.append('user_id',''); 
                params.append('report_id',self.report_id);
                params.append('upload_status','');     
                self.$axios({
                    method: 'post',
                    url: '/stop/sign/getUserReportsByPage',
                    data: params,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded','kf-token':token},
                 }).then(function(data){
                    if(data.data.code==0){
                      self.tableData5 = data.data.data.list;
                      self.total = data.data.data.total;
                    }else{
                      self.$response(data,self);
                    }
                    if(user_true_name==''||user_true_name==null){

                    }else{
                      localStorage.removeItem('user_true_name');
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
        width: 200px;
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
    
    .notUpload{
      color: red;
    }
</style>