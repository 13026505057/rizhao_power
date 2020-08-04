<template>
    <div>
        
        <div >

            <div class="block">
               
                <el-cascader
                  clearable
                  class="demonstration"
                  :options="options"
                  style="width:160px;"
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
                  style="margin-left: 20px;width:160px;"
                  :fetch-suggestions="querySearch"
                  placeholder="姓名查询"
                  @select="handleSelect"
                ></el-autocomplete>
                <el-button type="warning" style="margin-left: 20px;" @click="nameSearch">查询</el-button>
                <el-input
                    clearable
                    placeholder="身份证号查询"
                    style="width: 180px;margin-left: 30px;"
                    v-model="number"
                    clearable>
                </el-input>
                <el-button type="warning" style="margin-left: 20px;" @click="numberSearch">查询</el-button>
                <el-date-picker
                  style="margin-left: 20px;width:260px;"
                  v-model="date"
                  type="daterange"
                  range-separator="至"
                  format="yyyy 年 MM 月 dd 日"
                  value-format="yyyy-MM-dd"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期">
                </el-date-picker>
                <el-button type="warning" style="margin-left: 20px;" @click="dateSearch">查询</el-button>
                <el-select v-model="help_status" placeholder="是否处理" style="margin-left:20px;width:160px;">
                  <el-option
                    v-for="item in dealOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
                <el-button type="warning" style="margin-left: 20px;" @click="dateSearch">查询</el-button>
            </div>

          
        </div>
        <div id="container" style="width: 100%;height: 110%; margin-top: 20px;">
          <div class="numData">
            <div class="tableTitle" style="font-size: 20px;">
              求助信息列表
            </div>
            <div class="tableTitle">
              总计：{{total}}条
            </div>
            <div class="tableTitle">
              已处理回复：{{unUpload}}条
            </div>
            <div class="tableTitle">
              未处理回复：{{upload}}条
            </div>
            <div class="tableTitle">
              
            </div>
            <div class="tableTitle">
              <el-button type="warning" style="margin-left: 30px;" @click="userSelfDeal">本人处理求助查询</el-button>
            </div>
          </div>
          <el-dialog
            title="签到留证查询"
            :visible.sync="centerDialogVisible"
            width="50%"
            center>
            <img v-for="(item,index) in imgList" style="width:100%;height:100%;" :src="item.img_url" />
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
          <el-dialog
            :title="locationTitle"
            :visible.sync="centerDialogVisible2"
            width="80%"
            height="80%"
            center>
              <div id="containeraa" :key='id' style="width:1500px;height: 600px;"></div>
            <span slot="footer" class="dialog-footer">
              <el-button @click="centerDialogVisible2 = false">关 闭</el-button>
              <!-- <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button> -->
            </span>
          </el-dialog>
          <div class="tableList">
            <el-table
              :data="tableData5"
              :header-cell-style="{ 'background-color': '#deedf4','color':'#000'}"
              :row-style="rowStyle"
              row-key="help_id"
              :expand-row-keys="expands"
             
             
              class="tableClass"
              style="">
              <el-table-column type="expand">
                <template slot-scope="props">
                  <el-form label-position="left" inline class="demo-table-expand">
                    <el-form-item label="处理时间">
                      <span>{{ props.row.deal_time }}</span>
                    </el-form-item>
                    <el-form-item label="处理回复">
                      <span>{{ props.row.deal_msg }}</span>
                    </el-form-item>
                    <el-form-item label="处理人">
                      <span>{{ props.row.deal_user_name }}</span>
                    </el-form-item>
                     <div style="width:300px;height:50px;margin:0 auto;margin-top:30px;">
                      <el-button type="warning" size="mini" style="margin-left: 30px;" @click="dealHelp(props.row)">处理回复</el-button>
                    </div>
                  </el-form>
                </template>
              </el-table-column>
              <el-table-column
                label="姓名"
                width='160'
                prop="help_user_name">
              </el-table-column>
              <!-- <el-table-column
                width='120'
                label="性别"
                prop="user_sex">
              </el-table-column>
              <el-table-column
                label="身份证号"
                prop="user_card_id">
              </el-table-column> -->
              <el-table-column
                label="求助内容"
                show-overflow-tooltip
                align="center"
                prop="help_msg">
              </el-table-column>
              <el-table-column
                label="是否处理"
                width='160'
                prop="help_status"
                :filters="[{text: '未处理', value: '0'}, {text: '已处理', value: '1'}]"
                :filter-method="filterHandler">
                <template slot-scope="props">
                  <span v-bind:class="[props.row.help_status==0?'notUpload':'upload']">{{props.row.help_status==0?'未处理':'已处理'}}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="求助时间"
                width="200"
                prop="help_time">
              </el-table-column>
              <el-table-column
                width="140"
                label="求助位置">
                <template slot-scope="props">
                  <el-button type="warning" size="mini" @click="lookLocation(props.row)">求助位置</el-button>
                </template>
              </el-table-column>
              
              <el-table-column
                width="140"
                label="求助图片">
                <template slot-scope="props">
                  <el-button v-if="props.row.help_img_list==null?false:true" type="warning" size="mini" @click="lookSave(props.row)">查看</el-button>
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
              unUpload:'',
              upload:'',
              locationTitle:'求助位置',
              help_status:'',
              videoId:0,
              date:[],
              centerDialogVisible:false,
              centerDialogVisible1:false,
              centerDialogVisible2:false,
              id:0,
              currentPage:1,
              total:4,
              name:'',
              number:'',
              restaurants: [],
              value1:'',
              value2:'',
              selectedOptions: [],
              options: [],
              dealOptions:[
                {
                  label:'全部',
                  value:''
                },
                {
                  label:'已处理',
                  value:'1'
                },
                {
                  label:'未处理',
                  value:'0'
                }
              ],
              value:'',
              tableData5: [],
              expands: [],
              org_idList:[],
              classA:'classA',
              classA:'classB',
              imgList:[
                {
                  img_url:'http://www.kofanchina.com/img_z/img_zl/building.jpg'
                },
                {
                  img_url:'http://www.kofanchina.com/img_z/img_zl/building.jpg'
                }
              ],
              videoUrl:''
            }
              
      },
      mounted() {
          this.getOrgsList(); 
          this.getNameList();
          this.getDataList(); 
          
      },
      methods: {
          dealHelp(data){
                const self = this;
                this.$prompt('请输入回复内容', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  inputPattern: '',
                  inputErrorMessage: ''
                }).then(({ value }) => {
                  var params = new URLSearchParams();
                  var token = localStorage.getItem('auth');
                  params.append('help_id',data.help_id); 
                  params.append('deal_msg',value);    
                  self.$axios({
                      method: 'post',
                      url: '/stop/help/dealUserHelp',
                      data: params,
                      headers: {'Content-Type': 'application/x-www-form-urlencoded','kf-token':token},
                   }).then(function(data){
                      if(data.data.code==0){
                        self.$message({
                          type: 'success',
                          message: '处理回复成功'
                        });
                      }else{
                        self.$response(data,self);
                      }
                      
                   });
                }).catch(() => {
                  this.$message({
                    type: 'info',
                    message: '取消输入'
                  });       
                });
                
          },
          lookLocation(data){
            this.locationTitle = data.help_user_name+'最后出现位置';
            this.centerDialogVisible2 = true;
            this.id++;
            this.drawLocationMap(data);
          },
          drawLocationMap(data){
                var self = this;
                TMap('7NLBZ-VMS6F-I7OJ6-JC2DF-VKD43-IABKA').then(qq => {
                                    var latlngs = []; 
                                    var latlngsname = [];
                                    var latlngssex = [];
                                    var latlngscode = [];
                                    var latlngsshenfencode = [];
                                    latlngs.push(new qq.maps.LatLng(data.latitude,data.longitude));
                                    latlngsname.push(data.help_user_name);
                                    latlngssex.push(data.user_sex); 
                                    latlngscode.push(data.user_id);
                                    latlngsshenfencode.push(data.user_card_id)
                                   
                                    
                                    var map = new qq.maps.Map(document.getElementById("containeraa"), {
                                        // 地图的中心地理坐标。
                                        center:  latlngs[0],
                                        zoom: 8
                                    });
                                    for(var i = 0; i<latlngs.length;i++){
                                        var marker = new qq.maps.Marker({
                                            position: latlngs[i],
                                            map: map,
                                            // animation: qq.maps.MarkerAnimation.BOUNCE,
                                            content:'zhejijd'
                                            // title: latlngsname[i]
                                        });
                                    }
                                    for(var i = 0; i<latlngs.length;i++){
                                        var marker = new qq.maps.Label({
                                            position: latlngs[i],
                                            map: map,
                                            content: latlngsname[i]
                                        });
                                    }
                                    var info = new qq.maps.InfoWindow({
                                        map: map
                                    });
                                    for(var i = 0; i<latlngs.length;i++){
                                        var marker = new qq.maps.Marker({
                                            position: latlngs[i],
                                            map: map,
                                            // animation: qq.maps.MarkerAnimation.BOUNCE,
                                            content:'zhejijd',
                                            title: latlngsname[i],
                                        });
                                        marker.shenfencode = latlngsshenfencode[i];
                                        marker.sex = latlngssex[i];
                                        marker.code = latlngscode[i];
                                        marker.name = latlngsname[i];
                                        console.log(this.position)
                                        qq.maps.event.addListener(marker, 'click', function() {    //获取标记的点击事件
                                            info.open();  //点击标记打开提示窗
                                            info.setContent('<div class="mapInfo"><p class="center">'+'性别:'+this.sex+'</p><p>'+'身份证号:'+this.shenfencode+'</p><button type="button" onclick="bindShop('+this.code+')">查看详情</button></div>');  

                                            info.setPosition(new qq.maps.LatLng(this.position.lat, this.position.lng));  //提示窗位置
                                        });
                                    }
                                    

                });

          },
          lookSave(data){
            
              this.imgList = data.help_img_list;
              this.centerDialogVisible = true;
            
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
          userSelfDeal(){
                const self = this;
                
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
                params.append('help_user',self.name);
                params.append('begin_time',begin_time);
                params.append('end_time',end_time);
                params.append('user_card_id',self.number);
                params.append('help_status',self.help_status);
                  
                self.$axios({
                    method: 'post',
                    url: '/stop/help/getMyDealHelpLog',
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
                var params = new URLSearchParams();
                var token = localStorage.getItem('auth');
                params.append('currentPage',self.currentPage); 
                params.append('pageSize','9');
                params.append('help_user',self.name);
                params.append('begin_time',begin_time);
                params.append('end_time',end_time);
                params.append('user_card_id',self.number);
                params.append('help_status',self.help_status);
                params.append('org_id',self.org_idList);   
                self.$axios({
                    method: 'post',
                    url: '/stop/help/getUserHelps',
                    data: params,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded','kf-token':token},
                 }).then(function(data){
                    if(data.data.code==0){
                      self.tableData5 = data.data.data.list;
                      self.total = data.data.data.total;
                      self.upload = data.data.upload;
                      self.unUpload = data.data.unUpload;
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
    
    .notUpload{
      color: red;
    }
</style>