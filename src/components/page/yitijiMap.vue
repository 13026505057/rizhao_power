<template>
    <div>
        
            <div class="block" >
                 <el-cascader
                  clearable
                  class="demonstration"
                  :options="options"
                  v-model="selectedOptions"
                  placeholder="请选择机构"
                  change-on-select
                  @change="handleChange">
                </el-cascader>
                <el-button type="warning" style="margin-left: 30px;" @click="search">查询</el-button>
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
                locationList2:[],
                selectedOptions: [],
                level:'',
                org_idList:[],
                }
                
        },
        mounted() {
            var level = localStorage.getItem('org_type');
            this.level = level;
            this.getNameList(); 
            this.getDataList();
            // this.getUserData();
            this.getOrgsList();
        },
        methods: {
            handleChange(value) {
              var newArr = [];
              newArr.push(value[value.length-1]) 
              this.org_idList = newArr;
            },
            handleSelect(item) {
                
                this.getLocationOne1();
            },
            search(){
                this.getDataList();
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
            //默认获取一体机信息
            getDataList(){
                    const self = this;
                    var list = [];
                    var list2 = [];
                    var params = new URLSearchParams();
                    var token = localStorage.getItem('auth');
                    params.append('online',0);
                    params.append('org_id',self.org_idList);        
                    self.$axios({
                        method: 'post',
                        url: '/stop/getImacs',
                        data: params,
                        headers: {'Content-Type': 'application/x-www-form-urlencoded','kf-token':token},
                     }).then(function(data){
                        if(data.data.code==0){
                            list2 = data.data.data;
                            var params2 = new URLSearchParams();
                            var token = localStorage.getItem('auth');
                            params2.append('online',1);
                            params2.append('org_id',self.org_idList);
                            self.$axios({
                                method: 'post',
                                url: '/stop/getImacs',
                                data: params2,
                                headers: {'Content-Type': 'application/x-www-form-urlencoded','kf-token':token},
                             }).then(function(data){
                                if(data.data.code==0){
                                    list = data.data.data;
                                    self.drawLocationMap(list,list2)
                                }else{
                                    self.$response(data,self);
                                }
                             });  
                        }else{
                            self.$response(data,self);
                        }
                     });  
                     return list;    
            },
            getLocationOne1(num){
                const self = this;
                var list = [];
                var list2 = [];
                
                var begin_time = self.getDay(-90);
                var end_time = self.getDay(-11);
                
                var begin_time1 = self.getDay(-10);
                var end_time1 = self.getDay(1);
                
                
                var params = new URLSearchParams();
                var user_id = localStorage.getItem('locationOneCode');
                var token = localStorage.getItem('auth');
                params.append('user_id','');
                params.append('user_true_name',self.name);
                params.append('user_card_id',self.number);
                params.append('begin_time',begin_time);
                params.append('end_time',end_time);
                self.$axios({
                    method: 'post',
                    url: '/stop/sign/getUserSigns',
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
                        params2.append('begin_time',begin_time1);
                        params2.append('end_time',end_time1);
                        self.$axios({
                            method: 'post',
                            url: '/stop/sign/getUserSigns',
                            data: params2,
                            headers: {'Content-Type': 'application/x-www-form-urlencoded','kf-token':token},
                        }).then(function(data){
                            console.log(data)
                            if(data.data.code==0){
                                list2 = data.data.data;
                                // self.drawLocationMap(list,list2)
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
                var end_time = self.getDay(-11);
                
                var begin_time1 = self.getDay(-10);
                var end_time1 = self.getDay(1);
                
                
                var params = new URLSearchParams();
                var user_id = localStorage.getItem('locationOneCode');
                var token = localStorage.getItem('auth');
                params.append('user_id',user_id);
                params.append('begin_time',begin_time);
                params.append('end_time',end_time);
                self.$axios({
                    method: 'post',
                    url: '/stop/sign/getUserSigns',
                    data: params,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded','kf-token':token},
                }).then(function(data){
                    
                    if(data.data.code==0){
                        list = data.data.data;
                        var params2 = new URLSearchParams();
                        params2.append('user_id',user_id);
                        params2.append('begin_time',begin_time1);
                        params2.append('end_time',end_time1);
                        self.$axios({
                            method: 'post',
                            url: '/stop/sign/getUserSigns',
                            data: params2,
                            headers: {'Content-Type': 'application/x-www-form-urlencoded','kf-token':token},
                        }).then(function(data){
                           
                            if(data.data.code==0){
                                list2 = data.data.data;
                                // self.drawLocationMap(list,list2)
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
                                        var latlngs2 = []; 
                                        var latlngstime2=[];
                                        var latlngId1 = [];
                                        var latlngId2 = [];
                                        var latlngName1 = [];
                                        var latlngName2 = [];
                                    if(data.length!=0){
                                        
                                        for(var j = 0; j<data.length;j++){

                                            latlngName2.push(data[j].imac_name);
                                            latlngs2.push(new qq.maps.LatLng(data[j].latitude,data[j].longitude));
                                            latlngId2.push(data[j].imac_id);
                                            latlngstime2.push(data[j].last_online_time);
                                            
                                        }
                                    }

                                    if(data2.length!=0){
                                         
                                        for(var k = 0; k<data2.length;k++){

                                            latlngName1.push(data2[k].imac_name);
                                            latlngs1.push(new qq.maps.LatLng(data2[k].latitude,data2[k].longitude));
                                            latlngId1.push(data2[k].imac_id);
                                            latlngstime1.push(data2[k].last_online_time); 
                                            
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
                                                title: latlngName1[l]+latlngstime1[l],
                                            });
                                            var marker2 = new qq.maps.Label({
                                                position: latlngs1[l],
                                                map: map,
                                                content:""+latlngId1[l]+""
                                            });
                                            // var polyline1 = new qq.maps.Polyline({
                                            //     path: latlngs1,
                                            //     strokeColor: '#00EC00',
                                            //     strokeWeight: 2,
                                            //     editable:false,
                                            //     map: map
                                            // });
                                            qq.maps.event.addListener(marker1, 'click', function() {  
                                                
                                                self.$router.push('/yitiji');
                                                //获取标记的点击事件
                                                // info.open();  //点击标记打开提示窗
                                                // info.setContent('<div class="mapInfo"><p class="center">'+'性别:'+this.sex+'</p><p>'+'身份证号:'+this.shenfencode+'</p><button type="button" onclick="bindShop('+this.code+')">查看详情</button></div>');  
                                                // console.log(this.position);
                                                // var count1= this.position.lat+'';
                                                // var count2= this.position.lng+'';
                                                // var centerPosition = new qq.maps.LatLng(count1,count2);
                                                // info.setPosition(centerPosition);  //提示窗位置
                                            });
                                            var anchor = new qq.maps.Point(0, 39),
                                            size = new qq.maps.Size(42, 68),
                                            origin = new qq.maps.Point(0, 0),
                                            icon = new qq.maps.MarkerImage(
                                                "https://www.kofanchina.com/img_z/offline.jpg",
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
                                                title: latlngName2[i]+latlngstime2[i],
                                            });
                                            var marker3 = new qq.maps.Label({
                                                position: latlngs2[i],
                                                map: map,
                                                content:""+latlngId2[i]+""
                                            });
                                            var polyline = new qq.maps.Polyline({
                                                path: latlngs2,
                                                strokeColor: '#00EC00',
                                                strokeWeight: 2,
                                                editable:false,
                                                map: map
                                            });
                                            qq.maps.event.addListener(marker, 'click', function() {  
                                                
                                                self.$router.push('/yitiji'); 
                                                //获取标记的点击事件
                                                // info.open();  //点击标记打开提示窗
                                                // info.setContent('<div class="mapInfo"><p class="center">'+'性别:'+this.sex+'</p><p>'+'身份证号:'+this.shenfencode+'</p><button type="button" onclick="bindShop('+this.code+')">查看详情</button></div>');  
                                                // console.log(this.position);
                                                // var count1= this.position.lat+'';
                                                // var count2= this.position.lng+'';
                                                // var centerPosition = new qq.maps.LatLng(count1,count2);
                                                // info.setPosition(centerPosition);  //提示窗位置
                                            });
                                            var anchor = new qq.maps.Point(0, 39),
                                            size = new qq.maps.Size(42, 68),
                                            origin = new qq.maps.Point(0, 0),
                                            icon = new qq.maps.MarkerImage(
                                                "https://www.kofanchina.com/img_z/online.png",
                                                size,
                                                origin,
                                                anchor
                                            );
                                            marker.setIcon(icon);
                                           
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
                      if(data.data.code==0){
                          self.restaurants = data.data.data
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
                this.data = data;
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