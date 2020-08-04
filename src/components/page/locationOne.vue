<template>
    <div>
        
            <div class="block">
               
                <el-autocomplete
                  clearable
                  class="inline-input"
                  v-model="name"                                                                                                                                                                                                            
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
        <div id="container" style="width: 100%;height: 100%; margin-top: 20px;">
        </div>
        

    </div>
</template>

<script>
    import  TMap from '../../TMap';
     import md5 from 'js-md5';
    export default {
        data: function(){
            return {
                value1:'',
                value2:'',
                name:'',
                number:'',
                options: [],
                restaurants: [],
                value:'',
                locationList:[],
                locationList2:[]
                }
                
        },
        mounted() {
            this.getNameList(); 
           
            this.getUserData();
        },
        methods: {
            handleSelect(item) {
                
                this.getLocationOne1();
            },
            nameSearch(){
                this.getLocationOne1();
            },
            numberSearch(){
                this.getLocationOne1();
            },
            //通过user_id拿到用户信息清空user——id本地存储
            getUserData(){
                var user_id = localStorage.getItem('locationOneCode');
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
                        self.name = '';
                        self.number = '';
                        self.getLocationOne();
                        localStorage.removeItem('locationOneCode');
                    }else{
                        self.$response(data,self);
                    }
                });    
            },
            querySearch(queryString, cb) {
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
            getLocationOne1(num){
                const self = this;
                var list = [];
                var list2 = [];
                
                var begin_time = self.getDay(-90);
                var end_time = self.getDay(-4);
                
                var begin_time1 = self.getDay(-3);
                var end_time1 = self.getDay(1);
                
                
                var params = new URLSearchParams();
                var user_id = localStorage.getItem('locationOneCode');
                var token = localStorage.getItem('auth');
                params.append('user_id','');
                params.append('user_true_name',self.name);
                params.append('user_card_id',self.number);
                params.append('upload_begin_time',begin_time);
                params.append('upload_end_time',end_time);
                self.$axios({
                    method: 'post',
                    url: '/stop/code/getUserLocations',
                    data: params,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded','kf-token':token},
                }).then(function(data){
                    console.log(data)
                    if(data.data.code==0){
                        list = data.data.data;
                        var params2 = new URLSearchParams();
                        params2.append('user_id','');
                        params2.append('user_true_name',self.name);
                        params2.append('user_card_id',self.number);
                        params2.append('upload_begin_time',begin_time1);
                        params2.append('upload_end_time',end_time1);
                        self.$axios({
                            method: 'post',
                            url: '/stop/code/getUserLocations',
                            data: params2,
                            headers: {'Content-Type': 'application/x-www-form-urlencoded','kf-token':token},
                        }).then(function(data){
                            console.log(data)
                            if(data.data.code==0){
                                list2 = data.data.data;
                                self.drawLocationMap(list,list2)
                            }else{
                                self.$response(data,self);
                            }
                        });  
                    }else{
                        self.$response(data,self);
                    }
                });  
                return list

            },
            getLocationOne(num){
                const self = this;
                var list = [];
                var list2 = [];
                
                var begin_time = self.getDay(-90);
                var end_time = self.getDay(-4);
                
                var begin_time1 = self.getDay(-3);
                var end_time1 = self.getDay(1);
                
                
                var params = new URLSearchParams();
                var user_id = localStorage.getItem('locationOneCode');
                var token = localStorage.getItem('auth');
                params.append('user_id',user_id);
                params.append('upload_begin_time',begin_time);
                params.append('upload_end_time',end_time);
                self.$axios({
                    method: 'post',
                    url: '/stop/code/getUserLocations',
                    data: params,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded','kf-token':token},
                }).then(function(data){
                    console.log(data)
                    if(data.data.code==0){
                        list = data.data.data;
                        var params2 = new URLSearchParams();
                        params2.append('user_id',user_id);
                        params2.append('upload_begin_time',begin_time1);
                        params2.append('upload_end_time',end_time1);
                        self.$axios({
                            method: 'post',
                            url: '/stop/code/getUserLocations',
                            data: params2,
                            headers: {'Content-Type': 'application/x-www-form-urlencoded','kf-token':token},
                        }).then(function(data){
                            console.log(data)
                            if(data.data.code==0){
                                list2 = data.data.data;
                                self.drawLocationMap(list,list2)
                            }else{
                                self.$response(data,self);
                            }
                        });  
                    }else{
                        self.$response(data,self);
                    }
                });  
                return list

            },
            drawLocationMap(data,data2){
                
                var self = this;
                if(data.length==0&&data2.length==0){
                    TMap('7NLBZ-VMS6F-I7OJ6-JC2DF-VKD43-IABKA').then(qq => {
                            var map = new qq.maps.Map(document.getElementById("container"), {
                                center: new qq.maps.LatLng(39.916527,116.397128),      // 地图的中心地理坐标。
                                zoom:8                                                 // 地图的中心地理坐标。
                            });
                                    
                                    

                    });
                    self.$message({
                      type: 'error',
                      message: '暂无任何签到记录'
                    }); 
                    return
                }
                TMap('7NLBZ-VMS6F-I7OJ6-JC2DF-VKD43-IABKA').then(qq => {
                                     var latlngs1 = [ 
                                            // new qq.maps.LatLng(39.91474,116.37333), 
                                            // new qq.maps.LatLng(39.91447,116.39336), 
                                            // new qq.maps.LatLng(39.90884,116.41306) 
                                        ]; 
                                       
                                        var latlngstime1=[];
                                        var latlngs2 = [ 
                                            
                                        ]; 
                                       
                                        var latlngstime2=[];
                                    if(data.length!=0){
                                        
                                        for(var j = 0; j<data.length;j++){
                                            if(data[j].sign_status==0){

                                            }else{
                                              latlngs2.push(new qq.maps.LatLng(data[j].latitude,data[j].longitude));
                                              
                                              latlngstime2.push(data[j].upload_time) 
                                             
                                            }
                                        }
                                    }

                                    if(data2.length!=0){
                                         
                                        for(var k = 0; k<data2.length;k++){
                                            if(data2[k].sign_status==""){

                                            }else{
                                              latlngs1.push(new qq.maps.LatLng(data2[k].latitude,data2[k].longitude));
                                              
                                              latlngstime1.push(data2[k].upload_time) 
                                             
                                            }
                                        }
                                    }
                                    if(data.length!=0){
                                        var map = new qq.maps.Map(document.getElementById("container"), {
                                            // 地图的中心地理坐标。
                                            center:  latlngs2[0],
                                            zoom: 8
                                        });
                                    }
                                    if(data2.length!=0){
                                        var map = new qq.maps.Map(document.getElementById("container"), {
                                            // 地图的中心地理坐标。
                                            center:  latlngs1[0],
                                            zoom: 8
                                        });
                                    }
                                    
                                    if(data2.length!=0){
                                         
                                        for(var l = 0; l<latlngs1.length;l++){
                                            var marker1 = new qq.maps.Marker({
                                                position: latlngs1[l],
                                                map: map,
                                                title: latlngstime1[l],
                                            });
                                            var marker2 = new qq.maps.Label({
                                                position: latlngs1[l],
                                                map: map,
                                                content:""+data.length-0+l-0+1+""
                                            });
                                            var polyline1 = new qq.maps.Polyline({
                                                path: latlngs1,
                                                strokeColor: '#00ff66',
                                                strokeWeight: 5,
                                                editable:false,
                                                map: map
                                            });
                                            var anchor = new qq.maps.Point(0, 39),
                                            size = new qq.maps.Size(42, 68),
                                            origin = new qq.maps.Point(0, 0),
                                            icon = new qq.maps.MarkerImage(
                                                "https://www.kofanchina.com/img_z/img_zl/biaoji.png",
                                                size,
                                                origin,
                                                anchor
                                            );
                                            marker1.setIcon(icon);
                                        }
                                    }

                                    if(data.length!=0){
                                             
                                        for(var i = 0; i<latlngs2.length;i++){
                                            var marker = new qq.maps.Marker({
                                                position: latlngs2[i],
                                                map: map,
                                                title: latlngstime2[i],
                                            });
                                            var marker = new qq.maps.Label({
                                                position: latlngs2[i],
                                                map: map,
                                                content:""+i-0+1+""
                                            });
                                            var polyline = new qq.maps.Polyline({
                                                path: latlngs2,
                                                strokeColor: '#ff3333',
                                                strokeWeight: 5,
                                                editable:false,
                                                map: map
                                            });
                                           
                                        }
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
    #container {
        min-width:900px;
        min-height:667px;
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
</style>