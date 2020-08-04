<template>
    <div>
       <!--  <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><span style="color: #fff;font-size: 16px;"><i class="el-icon-location"></i>表格导入</span></el-breadcrumb-item>
            </el-breadcrumb>
        </div> -->
        <div v-loading="loading">
            <div class="uploadBtn" v-if="hidden==false?true:false">
              <el-upload
                class="upload-demo"
                drag
                name="file"
                :on-progress="uploadProgress"
                :action="uploadUrl"
                :on-success = 'uploadSuccess'
                :headers="myHeaders"
                >
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                
              </el-upload>
              <div class="downExcle" @click="downExcle">
                  <div>点击此处下载上传模板文件</div>
                  <i class="el-icon-download" style="font-size: 50px;"></i>
              </div>
            </div>
            <div class="block"  style="margin-left: 30px;" v-if="hidden==false?true:false">
               <el-autocomplete
                  class="inline-input"
                  v-model="adname"
                  :fetch-suggestions="querySearch"
                  placeholder="上传人姓名"
                  @select="handleSelect"
                ></el-autocomplete>
                <el-button type="warning" style="margin-left: 30px;" @click="adNameSearch">查询</el-button>
                <el-date-picker
                  style="margin-left: 50px;"
                  v-model="date1"
                  type="date"
                  placeholder="开始日期"
                  format="yyyy 年 MM 月 dd 日"
                  value-format="yyyy-MM-dd">
                </el-date-picker>
                <span style="color: #fff;">至</span>
                <el-date-picker
                  v-model="date2"
                  type="date"
                  placeholder="结束日期"
                  format="yyyy 年 MM 月 dd 日"
                  value-format="yyyy-MM-dd">
                </el-date-picker>
                <el-button type="warning" style="margin-left: 30px;" @click="dateSearch">查询</el-button>
            </div>
            <div class="block" v-if="hidden" style="">
               <el-autocomplete
                  class="inline-input"
                  v-model="name"
                  :fetch-suggestions="querySearch2"
                  placeholder="姓名查询"
                  @select="handleSelect2"
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
            <div id="container" style="width: 75%;height: 110%; margin-top: 20px;float: left;" v-if="hidden==false?true:false">
              <div class="numData">
                <div class="tableTitle" style="font-size: 20px;">
                  上传历史
                </div>
                <div class="tableTitle">
                 当前机构：{{org_name}}
                </div>
                <!-- <div class="tableTitle">
                  警员总数：{{adUserCount}}人
                </div> -->
                <div class="tableTitle">
                  管控人总计：{{userCount}}人
                </div>
                <div class="tableTitle">
                  监控中：{{jkz}}人
                </div>
                
              </div>
              <div class="tableList">
                <el-table
                  :data="tableData5"
                  :header-cell-style="{ 'background-color': '#deedf4','color':'#000'}"
                  :row-style="rowStyle"
                  class="tableClass"
                  style="">
                  <el-table-column type="expand">
                    <!-- <template slot-scope="props">
                      <el-form label-position="left" inline class="demo-table-expand">
                        <el-form-item label="商品名称">
                          <span>{{ props.row.name }}</span>
                        </el-form-item>
                        <el-form-item label="所属店铺">
                          <span>{{ props.row.shop }}</span>
                        </el-form-item>
                        <el-form-item label="商品 ID">
                          <span>{{ props.row.id }}</span>
                        </el-form-item>
                        <el-form-item label="店铺 ID">
                          <span>{{ props.row.shopId }}</span>
                        </el-form-item>
                        <el-form-item label="商品分类">
                          <span>{{ props.row.category }}</span>
                        </el-form-item>
                        <el-form-item label="店铺地址">
                          <span>{{ props.row.address }}</span>
                        </el-form-item>
                        <el-form-item label="商品描述">
                          <span>{{ props.row.desc }}</span>
                        </el-form-item>
                      </el-form>
                    </template> -->
                  </el-table-column>
                 <el-table-column
                    label="上传时间"
                    prop="upload_time">
                  </el-table-column>
                  <el-table-column
                    label="上传操作人"
                    prop="upload_user_name">
                  </el-table-column>
                  <el-table-column
                    label="上传编号"
                    prop="pici">
                  </el-table-column>
                  <el-table-column
                    label="导入结果"
                    >
                    <template slot-scope="scope">
                        <span>{{scope.row.status==1?'已导入':'已上传未导入'}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="详细信息"
                    >
                    <template slot-scope="scope">
                        <el-button @click="uoploadDetail(scope.row)" type="text" size="small">查看</el-button>
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
        <div id="container" style="width: 100%;height: 110%; margin-top: 20px;" v-if="hidden">
          <div class="numData">
            <div class="tableTitle" style="font-size: 20px;">
              导入结果
            </div>
            <div class="tableTitle">
             当前机构：{{org_name}}
            </div>
            <!-- <div class="tableTitle">
              警员总数：{{adUserCount}}人
            </div> -->
            <div class="tableTitle">
              管控人总计：{{userCount}}人
            </div>
            <div class="tableTitle">
              监控中：{{jkz}}人
            </div>
            <div class="tableTitle">
              <el-button type="warning" style="margin-left: 30px;" @click="sureToUpload">确定上传</el-button>
            </div>
            <div class="tableTitle">
              <el-button type="warning" style="margin-left: 30px;" @click="reUpload">重新上传</el-button>
            </div>
          </div>
          <div class="tableList">
            <el-table
              :data="tableData6"
              :header-cell-style="{ 'background-color': '#deedf4','color':'#000'}"
              :row-style="rowStyle"
              class="tableClass"
              style="">
              <el-table-column type="expand">
                <template slot-scope="props">
                  <el-form label-position="left" inline class="demo-table-expand">
                    <el-form-item label="商品名称">
                      <span>{{ props.row.name }}</span>
                    </el-form-item>
                    <el-form-item label="所属店铺">
                      <span>{{ props.row.shop }}</span>
                    </el-form-item>
                    <el-form-item label="商品 ID">
                      <span>{{ props.row.id }}</span>
                    </el-form-item>
                    <el-form-item label="店铺 ID">
                      <span>{{ props.row.shopId }}</span>
                    </el-form-item>
                    <el-form-item label="商品分类">
                      <span>{{ props.row.category }}</span>
                    </el-form-item>
                    <el-form-item label="店铺地址">
                      <span>{{ props.row.address }}</span>
                    </el-form-item>
                    <el-form-item label="商品描述">
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
                label="描述"
                prop="desc">
              </el-table-column>
            </el-table> 
                
          </div>
          <el-pagination
                small
                background
                style="text-align: center;margin-top: 20px;"
                @current-change="handleCurrentChange"
                :current-page.sync="currentPage2"
                :page-size="9"
                layout="prev, pager, next, jumper"
                :total="total2">
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
              loading:false,
              myHeaders: null,
              hidden:false,
              number:'',
              date1:'',
              date2:'',
              currentPage:1,
              total:1,
              currentPage2:1,
              total2:1,
              name:'',
              adname:'',
              restaurants: [],
              restaurants2: [],
              value1:'',
              value2:'',
              selectedOptions: [],
              options: [],
              value:'',
              tableData5: [],
              tableData6: [],
              uploadUrl:'',
              pici:'',
              adUserCount:'',
              djk:'',
              jkjs:'',
              jkz:'',
              userCount:'',
              org_name:''
            }
              
      },
      mounted() {
          var myHeaders = localStorage.getItem('auth');
          var uploadUrl = this.$axios.defaults.baseURL+'/stop/importUsers';
          this.uploadUrl = uploadUrl;
          var token = {'kf-token':myHeaders}
          this.myHeaders = token;
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
          this.getHistoryList();
          this.getADNameList();
          this.getNameList();
      },
      methods: {
          downExcle(){
            window.open("http://119.29.93.138/jiedu/files/excel.xlsx");
          },
          uploadProgress(event, file, fileList){
            this.loading = true;
          },
          uploadSuccess(response, file, fileList){
            console.log(response)
            this.loading = false;
            if(response.code==0){
              this.pici = response.data;
              this.hidden = true;
              this.getDataList();
            }else{
              this.$message({
                  type: 'error',
                  message: response.msg
              });      
            }
            

          },
          sureToUpload(){
                const self = this;
                var params = new URLSearchParams();
                var token = localStorage.getItem('auth');
                params.append('pici',self.pici);
                self.$axios({
                    method: 'post',
                    url: '/stop/confirmImport',
                    data: params,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded','kf-token':token},
                 }).then(function(data){
                    if(data.data.code==0){
                        self.$message({
                          type: 'success',
                          message: '导入成功'
                        });  
                    }else{
                        self.$response(data,self);
                    }
                 });
            this.hidden = true;
          },
          uoploadDetail(row){
            this.hidden = true;
            this.pici = row.pici;
            this.getDataList();
          },
          reUpload(){
            this.hidden = false;
          },
          handleCurrentChange(){
              console.log(this.currentPage)
              //页码发生变化请求新数据
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
              this.getADNameList();
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
          querySearch2(queryString, cb) {
              this.getNameList();
              var restaurants = this.restaurants2;
              var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
              // 调用 callback 返回建议列表的数据
              cb(results);
          },
          createFilter2(queryString) {
              return (restaurant) => {
                return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
              };
          },
          handleSelect(item) {
              this.getHistoryList();
          },
          handleSelect2(item){
               this.getDataList();
          },
          //姓名查询
          adNameSearch(){
            this.getHistoryList();
          },
          nameSearch(){
            this.getDataList();
          },
          //日期查询
          dateSearch(){
            this.getHistoryList();
          },
          //身份证号查询
          numberSearch(){
            this.getDataList();
          },
          //分组查询
          search(){

              
          },
          //请求分组信息
          request(){
            
          },
          //获取上传结果方法
          getDataList(){
                const self = this;
                var params = new URLSearchParams();
                var token = localStorage.getItem('auth');
                params.append('currentPage',self.currentPage2);
                params.append('pageSize','9');
                params.append('pici',self.pici);
                params.append('user_true_name',self.name);
                params.append('user_card_id',self.number);
                self.$axios({
                    method: 'post',
                    url: '/stop/getImportUsers',
                    data: params,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded','kf-token':token},
                 }).then(function(data){
                    console.log(data)

                    if(data.data.code==0){
                        self.tableData6 = data.data.data.list;
                        self.total2 = data.data.data.total
                    }else{
                        self.$response(data,self);
                    }
                 });
          },
          //默认获取上传人姓名列表
          getADNameList(){
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
                    if(data.data.code==0){
                        self.restaurants = data.data.data
                    }else{
                      self.$response(data,self);
                    }
                 });
          },
          //默认获取历史数据列表
          getHistoryList(){
                const self = this;
                var params = new URLSearchParams();
                var token = localStorage.getItem('auth');
                if(self.date1==null){
                  self.date1 = '';
                }
                if(self.date2==null){
                  self.date2 = '';
                }
                params.append('currentPage',self.currentPage);
                params.append('pageSize','9');
                params.append('upload_user_name',this.adname);
                params.append('begin_time',self.date1);
                params.append('end_time',self.date2);
                self.$axios({
                    method: 'post',
                    url: '/stop/getUserExcelHeads',
                    data: params,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded','kf-token':token},
                 }).then(function(data){
                    if(data.data.code==0){
                        self.tableData5 = data.data.data.list;
                        self.total = data.data.data.total
                    }else{
                        self.$response(data,self);
                    }
                 });
          },
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
                        self.restaurants2 = data.data.data
                    }else{
                      self.$response(data,self);
                    }
                 });
          }
      }
     
  }
</script>

<style scoped>
    .uploadBtn{
      width: 20%;
      height: 500px;
      float: left;
      margin-top: 100px;
      margin-left: 30px;
    }
    .downExcle{
      width: 300px;
      height: 180px;
      margin-top: 100px;
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      box-sizing: border-box;
      cursor: pointer;
      background-color: #fff;
      text-align: center;
      line-height: 100px;
      cursor:pointer;
    }
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
    .el-upload-list__item-name,.el-icon-document{
      color: #fff;
    }
    .el-upload-dragger{
      width: 300px;
    }
    
</style>