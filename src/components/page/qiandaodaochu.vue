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
                  style="margin-left: 30px;"
                  :fetch-suggestions="querySearch"
                  placeholder="姓名查询"
                  @select="handleSelect"
                ></el-autocomplete>
                <el-button type="warning" style="margin-left: 20px;" @click="nameSearch">查询</el-button>
                <el-input
                    clearable
                    placeholder="身份证号查询"
                    style="width: 200px;margin-left: 30px;"
                    v-model="number"
                    clearable>
                </el-input>
                <el-button type="warning" style="margin-left: 20px;" @click="numberSearch">查询</el-button>
                <el-date-picker
                  v-model="date"
                  style="margin-left:30px;"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  format="yyyy 年 MM 月 dd 日"
                  value-format="yyyy-MM-dd">
                </el-date-picker>
                <el-button type="warning" style="margin-left: 20px;" @click="dateSearch">查询</el-button>
            </div>

          
        </div>
        <div id="container" style="width: 100%;height: 110%; margin-top: 20px;">
          <div class="numData">
            <div class="tableTitle" style="font-size: 20px;">
              签到情况统计
            </div>
            <div class="tableTitle">
              开始日期：{{begin_time}}
            </div>
            <div class="tableTitle">
              结束日期：{{end_time}}
            </div>
            <div class="tableTitle">
              总计：{{total}}人
            </div>
            <div class="tableTitle">
              <el-button type="warning" style="margin-left: 30px;" @click="downLoad">下载报表</el-button>
            </div>
          </div>
          <div class="tableList">
            <el-table
              :data="tableData5"
              :header-cell-style="{ 'background-color': '#deedf4','color':'#000'}"
              :row-style="rowStyle"
              row-key="user_card_id"
              :expand-row-keys="expands"
              class="tableClass"
              style="">
              <el-table-column
                label="姓名"
                align="center"
                prop="user_true_name">
              </el-table-column>
              <el-table-column
                label="性别"
                align="center"
                prop="user_sex">
              </el-table-column>
              <el-table-column
                label="身份证号"
                align="center"
                prop="user_card_id">
              </el-table-column>
              <el-table-column
                label="已签到次数"
                align="center"
                prop="uploaded_count">
              </el-table-column>
              <el-table-column
                label="未签到次数"
                align="center"
                prop="notUpload_count">
              </el-table-column>
              <el-table-column
                label="操作"
                align="center">
                <template slot-scope="props">
                  <el-button
                  size="mini"
                  type="warning"
                  @click="signDetail(props.row)">详细签到</el-button>
                  <el-button
                  size="mini"
                  type="warning"
                  @click="danganClick(props.row)">档案资料</el-button>
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
              date:[],
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
              begin_time:'',
              end_time:''
            }
              
      },
      mounted() {
          this.getOrgsList(); 
          this.getNameList();
          this.getDataList(); 
          
      },
      methods: {
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
          download (data) {
              if (!data) {
                  return
              }
              let url = window.URL.createObjectURL(new Blob([data]))
              let link = document.createElement('a')
              link.style.display = 'none'
              link.href = url
              link.setAttribute('download', 'excel.xls')
              
              document.body.appendChild(link)
              link.click()
          },
          //下载报告
          downLoad(){
                const self = this;
                if(self.date==null||self.date.length==0){
                  var begin_time = self.getDay(-30);
                  var end_time = self.getDay(1)
                }else{
                  var begin_time = self.date[0];
                  var end_time = self.date[1];
                }
                self.begin_time = begin_time;
                self.end_time = end_time;
                var params = new URLSearchParams();
                var token = localStorage.getItem('auth');
                params.append('user_true_name',self.name);
                params.append('begin_time',begin_time);
                params.append('end_time',end_time);
                params.append('user_card_id',self.number);
                params.append('org_id',self.org_idList);  
                params.append('report_id','0');     
                self.$axios({
                    method: 'post',
                    url: '/stop/export/signReportExport',
                    data: params,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded','kf-token':token},
                    responseType: 'blob'
                 }).then(function(data){
                    self.download(data.data)
                 });
          },
          //档案详情
          danganClick(data){
            localStorage.setItem('user_true_name',data.user_true_name);
            this.$router.push('/jiedurendangan');
          },
          //签到详情
          signDetail(data){
            localStorage.setItem('user_true_name',data.user_true_name);
            this.$router.push('/jiedurenqiandao');
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
          dateSearch(){
            if(this.date==null){
              this.data = [];
            }
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
          //分组查询
          fenzuSearch(){
            this.getDataList();   
          },
          //默认获取用户列表页面
          getDataList(){
                const self = this;
                if(self.date==null||self.date.length==0){
                  var begin_time = self.getDay(-30);
                  var end_time = self.getDay(1)
                }else{
                  var begin_time = self.date[0];
                  var end_time = self.date[1];
                }
                self.begin_time = begin_time;
                self.end_time = end_time;
                var params = new URLSearchParams();
                var token = localStorage.getItem('auth');
                params.append('currentPage',self.currentPage); 
                params.append('pageSize','9');
                params.append('user_true_name',self.name);
                params.append('begin_time',begin_time);
                params.append('end_time',end_time);
                params.append('user_card_id',self.number);
                params.append('org_id',self.org_idList);  
                params.append('report_id','0');     
                self.$axios({
                    method: 'post',
                    url: '/stop/export/signReportQuery',
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