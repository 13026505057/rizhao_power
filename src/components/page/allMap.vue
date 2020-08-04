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
                  class="inline-input"
                  v-model="name"
                  clearable
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
                <el-select v-model="shejie_status" placeholder="管控状态" clearable style="margin-left: 20px;">
                  <el-option
                    v-for="item in schoolHistory"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
                <el-button type="warning" style="margin-left: 20px;" @click="numberSearch">查询</el-button>
            </div>
            <el-dialog
              title="签到情况统计"
              :visible.sync="showDataShow"
              width="60%"
              >
              <div class="block">
                <el-input
                    clearable
                    placeholder="时间间隔查询"
                    style="width: 200px;margin-left: 10px;"
                    v-model="day_range"
                    clearable>
                </el-input>
                <el-select v-model="report_id" placeholder="报告类型" clearable style="margin-left: 20px;">
                  <el-option
                    v-for="item in reportList"
                    :key="item.report_id"
                    :label="item.report_name"
                    :value="item.report_id">
                  </el-option>
                </el-select>
                <el-button type="warning" style="margin-left: 30px;" @click="daySearch">查询</el-button>
            </div>
              <div class="tableList">
                <el-table
                  :data="tableData5"
                  :header-cell-style="{ 'background-color': '#deedf4','color':'#000'}"
                  :row-style="rowStyle"
                  row-key="user_card_id"
                  
                  
                  class="tableClass"
                  style="">
                  <el-table-column
                    label="机构名称"
                    align="center"
                    prop="org_name">
                  </el-table-column>
                  <el-table-column
                    label="报告名称"
                    align="center"
                    prop="report_name">
                  </el-table-column>
                  <el-table-column
                    label="应上传次数"
                    align="center"
                    >
                    <template slot-scope="props">
                      <span>{{props.row.upload_count+props.row.unupload_count}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="上传次数"
                    align="center"
                    prop="upload_count">
                  </el-table-column>
                  <el-table-column
                    label="未上传次数"
                    align="center"
                    prop="unupload_count">
                  </el-table-column>
                </el-table> 
                    
              </div>
              <!-- <el-pagination
                    small
                    background
                    style="text-align: center;margin-top: 20px;"
                    @current-change="handleCurrentChange"
                    :current-page.sync="currentPage"
                    :page-size="9"
                    layout="prev, pager, next, jumper"
                    :total="total">
              </el-pagination> -->
              <span slot="footer" class="dialog-footer">
                <el-button @click="showDataShow = false">关 闭</el-button>
                <el-button type="primary" @click="showDataShow = false">确 定</el-button>
              </span>
            </el-dialog>
          
        </div>
        <div id="container" :key="id" style="width: 100%;height: 120%; margin-top: 20px;">
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
                total:10,
                report_id:'3',
                id:0,
                shejie_status:'',
                name:'',
                number:'',
                showDataShow:false,
                restaurants: [],
                value1:'',
                value2:'',
                selectedOptions: [],
                options: [],
                value:'',
                tableData5:[],
                day_range:'3',
                reportList:[],
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
            this.getLocationData(); 
            this.getOrgsList();
            this.getNameList();
            this.getDataModel();
            this.showDataModel();
            this.getReportList();
            // this.socketApi.sendSock('text',this.getConfigResult);

           
        },
        methods: {
            //首页弹窗展示未签到列表
            showDataModel(){
              var self = this;
              var isDataModelShow = localStorage.getItem('isDataModelShow');
              setTimeout(function(){
                if(isDataModelShow=='1'){
                 self.showDataShow = true;
                 localStorage.setItem('isDataModelShow','0');
                }else{

                }
              },2000)
             
            },
            //获取弹窗展示数据
            getDataModel(){
                var self = this;
                var params = new URLSearchParams();
                var token = localStorage.getItem('auth');
                params.append('day',self.day_range);
                params.append('report_id',self.report_id);     
                self.$axios({
                    method: 'post',
                    url: '/stop/getUploadUsersCountByDay',
                    data: params,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded','kf-token':token},
                 }).then(function(data){
                    if(data.data.code==0){
                      self.tableData5 = data.data.data;
                    }else{
                      self.$response(data,self);
                    }
                 }); 
             
            },
            //时间间隔更改查询
            daySearch(){
              this.getDataModel();
            },
            //修改单元行颜色
            rowStyle({ row, rowIndex}){
              if(rowIndex%2 ==0){
                return 'background:#eee;color:#000;'
              }else{
               return 'background:#e5e7e8;color:#000;'
              }
            },  
            //分页器点击事件
            handleCurrentChange(){

            }, 
            // getConfigResult(e){
            //   console.log(e)
            // },
            //分组选项被点击事件
            handleChange(value) {
                this.getLocationData();
            },
            fenzuSearch(){
                this.getLocationData();
            },
            nameSearch(){
                this.getLocationData();
            },
            handleSelect(item) {
                this.getLocationData();
            },
            numberSearch(){
                this.getLocationData();
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
            search(){

              
            },
            //获取报告列表
            getReportList(){
                  const self = this;
                  var params = new URLSearchParams();
                  var token = localStorage.getItem('auth');
                  params.append('currentPage',self.currentPage);
                  params.append('pageSize',100);        
                  self.$axios({
                      method: 'post',
                      url: '/stop/getReports',
                      data: params,
                      headers: {'Content-Type': 'application/x-www-form-urlencoded','kf-token':token},
                   }).then(function(data){
                      if(data.data.code==0){
                         self.reportList = data.data.data;
                      }else{
                        self.$response(data,self);
                      }
                   });      
            },
            getLocationData(){
                const self = this;
                var params = new URLSearchParams();
                var token = localStorage.getItem('auth');
                params.append('user_id','');
                params.append('user_true_name',self.name); 
                params.append('user_card_id',self.number); 
                params.append('user_type_code',self.shejie_status);
                var org_id = ''
                if(self.selectedOptions[0]==null){
                    org_id=''
                }else{
                    org_id=self.selectedOptions[self.selectedOptions.length-1]
                }
                params.append('org_id',org_id);     
                self.$axios({
                    method: 'post',
                    url: '/stop/sign/getUsersLastSigns',
                    data: params,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded','kf-token':token},
                 }).then(function(data){
                   

                    if(data.data.code==0){
                      self.drawLocationMap(data.data.data);
                      self.id++;
                    }else{
                      self.$response(data,self);
                    }
                 });
            },
            drawLocationMap(data){
                var self = this;
                if(data.length==0){
                    TMap('7NLBZ-VMS6F-I7OJ6-JC2DF-VKD43-IABKA').then(qq => {
                            var map = new qq.maps.Map(document.getElementById("container"), {
                                center: new qq.maps.LatLng(39.916527,116.397128),      // 地图的中心地理坐标。
                                zoom:8                                                 // 地图的中心地理坐标。
                            });
                                    
                                    

                    });
                    self.$message({
                      type: 'error',
                      message: '暂无任何位置记录'
                    }); 
                    return
                }
                TMap('7NLBZ-VMS6F-I7OJ6-JC2DF-VKD43-IABKA').then(qq => {
                                    var latlngs = []; 
                                    var latlngsname = [];
                                    var latlngssex = [];
                                    var latlngscode = [];
                                    var latlngsshenfencode = [];
                                    for(var j = 0; j<data.length;j++){
                                        if(data[j].latitude==null){

                                        }else{
                                          latlngs.push(new qq.maps.LatLng(data[j].latitude,data[j].longitude));
                                          latlngsname.push(data[j].user_true_name);
                                          latlngssex.push(data[j].user_sex); 
                                          latlngscode.push(data[j].user_id);
                                          latlngsshenfencode.push(data[j].user_card_id)
                                        }
                                    }
                                   
                                    
                                    var map = new qq.maps.Map(document.getElementById("container"), {
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
                                        qq.maps.event.addListener(marker, 'click', function() {    //获取标记的点击事件
                                            info.open();  //点击标记打开提示窗
                                            info.setContent('<div class="mapInfo"><p class="center">'+'性别:'+this.sex+'</p><p onclick="bindShop1('+this.code+')">'+'身份证号:'+this.shenfencode+'</p><button type="button" onclick="bindShop('+this.code+')">查看位置详情</button></div>');  
                                            console.log(this.position);
                                            var count1= this.position.lat+'';
                                            var count2= this.position.lng+'';
                                            var centerPosition = new qq.maps.LatLng(count1,count2);
                                            info.setPosition(centerPosition);  //提示窗位置
                                        });
                                    }
                                    

                });

            },
            getDataList(){
                const self = this;
                var params = new URLSearchParams();
                var token = localStorage.getItem('auth');
                params.append('currentPage',self.currentPage); 
                params.append('pageSize','9');
                params.append('user_true_name',self.name);
                params.append('user_status','');
                params.append('user_sex',self.user_sex);
                params.append('user_card_id',self.number);      
                self.$axios({
                    method: 'post',
                    url: '/stop/getOrgTree',
                    data: params,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded','kf-token':token},
                 }).then(function(data){
                    if(data.data.code==0){
                      self.options = data.data.data;
                      self.total = data.data.total;
                      self.$url = 'ssskkkk'
                      console.log(self.$url)
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
                  params.append('user_true_name',self.name);
                  self.$axios({
                      method: 'post',
                      url: '/stop/getUserNames',
                      data: params,
                      headers: {'Content-Type': 'application/x-www-form-urlencoded','kf-token':token},
                   }).then(function(data){
                      // console.log(data)
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
    #container {
        min-width:900px;
        min-height:657px;
        
    }
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
    .tableList{
      width: 99%;
      height: 480px;
      overflow-y: scroll;
      border:1px solid #231a75;
     /* border-radius: 20px;*/
      margin-top: 20px;
      /*background-color: #231a75;*/
    }
</style>