<template>
    <div class="box">
        <el-row :gutter="30">
          
          <el-col :span="6"><div class="grid-content bg-purple">
            <el-row :gutter="20">
              <el-col :span="12"><div class="grid-content bg-purple2">
                <i class="el-icon-bell"></i>
              </div></el-col>
              <el-col :span="12"><div class="grid-content1 bg-purple">
                <el-row :gutter="20" class="title top">
                  社戒社康
                </el-row>
                <el-row :gutter="20" class="title bottom">
                   <countTo :startVal='startNum' :endVal='endNm2' :duration='3000'></countTo>
                </el-row>
              </div></el-col>
            </el-row>
          </div></el-col>
          <el-col :span="6"><div class="grid-content bg-purple">
            <el-row :gutter="20">
              <el-col :span="12"><div class="grid-content bg-purple2">
                <i class="el-icon-bell"></i>
              </div></el-col>
              <el-col :span="12"><div class="grid-content1 bg-purple">
                <el-row :gutter="20" class="title top">
                  高风险
                </el-row>
                <el-row :gutter="20" class="title bottom">
                   <countTo :startVal='startNum' :endVal='endNm2' :duration='3000'></countTo>
                </el-row>
              </div></el-col>
            </el-row>
          </div></el-col>
          <el-col :span="6"><div class="grid-content bg-purple">
            <el-row :gutter="20">
              <el-col :span="12"><div class="grid-content bg-purple3">
                <i class="el-icon-warning"></i>
              </div></el-col>
              <el-col :span="12"><div class="grid-content1 bg-purple">
                <el-row :gutter="20" class="title top">
                   中风险
                </el-row>
                <el-row :gutter="20" class="title bottom">
                   <countTo :startVal='startNum' :endVal='endNm3' :duration='3000'></countTo>
                </el-row>
              </div></el-col>
            </el-row>
          </div></el-col>
          <el-col :span="6"><div class="grid-content bg-purple">
            <el-row :gutter="20">
              <el-col :span="12"><div class="grid-content bg-purple4">
                <i class="el-icon-edit"></i>
              </div></el-col>
              <el-col :span="12"><div class="grid-content1 bg-purple">
                <el-row :gutter="20" class="title top">
                  低风险
                </el-row>
                <el-row :gutter="20" class="title bottom">
                   <countTo :startVal='startNum' :endVal='endNm4' :duration='3000'></countTo>
                </el-row>
              </div></el-col>
            </el-row>
          </div></el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12"><div class="grid">
            <div id="container" :key="id" style="width: 100%;height: 100%; "></div>
          </div></el-col>
          <el-col :span="12"><div class="grid" style="background-color: #eee;">
            <el-row  class="gridRignt imgBox">
              <el-carousel :interval="6000"  height="275px">
                <el-carousel-item v-for="item in imgArr" >
                  <img :src="item" alt="" style="width: 100%;height: 100%;">
                </el-carousel-item>
                <el-carousel-item >
                  <video controls loop width="780px" height="250px" :src="videoUrl"></video>
                </el-carousel-item>
              </el-carousel>
            </el-row>
            <el-row  class="gridRignt titleBox">
              <div class="titleName">{{showInfo.org_title}}</div>
              <div class="titleContent" id="textslow">{{showInfo.org_content}}</div>
            </el-row>
          </div></el-col>
        </el-row>
    </div>
</template>

<script>
  import  TMap from '../../TMap';
  import countTo from 'vue-count-to';
  export default {
    components: { countTo },
      data: function(){
          return {
            startNum:0,
            endNm1:10000,
            endNm2:10570,
            endNm3:56765,
            endNm4:24785,
            numTrue4:0,
            id:0,
            imgArr:[],
            videoUrl:'',
            showInfo:'',
            counti:1
          }

              
      },
      mounted() {
        
         // this.getDataShow();
         // this.getLocationData();
         // this.time1();
      },
      watch: {
       
      },
      methods: {
        textFlow(){
          var self = this;
          var id=document.getElementById("textslow");
          var msg=self.showInfo.org_content;
          var len=msg.length;
          var msg1=msg.substring(0,self.counti);
          id.innerHTML=msg1;
          if(self.counti==len){clearInterval(t)}
          else
            self.counti++;
        },
        time1(){
          var self = this;
           const t=setInterval(function(){self.textFlow()},30);
           
        },
        //获取原来得展示信息
        getDataShow(){
                const self = this;
                var params = new URLSearchParams();
                var token = localStorage.getItem('auth');
                var org_id = localStorage.getItem('org_id');
                params.append('org_id',org_id);    
                self.$axios({
                    method: 'post',
                    url: '/stop/orgShow/getByOrg',
                    data: params,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded','kf-token':token},
                 }).then(function(data){
                    if(data.data.code==0){
                       self.showInfo = data.data.data;
                       self.imgArr = data.data.data.org_imgs.split(',');
                       self.videoUrl = data.data.data.org_videos;
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
                params.append('user_true_name',''); 
                params.append('user_card_id',''); 
                params.append('user_type_code','');
                var org_id = ''
                
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
            bindShop(data){
              console.log(data)
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
                                            info.setContent('<div class="mapInfo"><p class="center">'+'性别:'+this.sex+'</p><p onclick="bindShop1('+this.code+')">'+'身份证号:'+this.shenfencode+'</p><button type="button" @click="bindShop('+this.code+')">查看位置详情</button></div>');  
                                            self.bindShop(232);
                                            console.log(this.position);
                                            var count1= this.position.lat+'';
                                            var count2= this.position.lng+'';
                                            var centerPosition = new qq.maps.LatLng(count1,count2);
                                            info.setPosition(centerPosition);  //提示窗位置
                                        });
                                    }
                                    

                });

            },

      }
     
  }
</script>

<style scoped>
  .box{
    width: 98%;
    height: 100%;
    padding:20px;
    overflow-y:scroll;
    background-color: #eee;
  }
  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;

  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
    height: 100px;
    background-color: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
    border-color: rgba(0, 0, 0, 0.05);
  }
  .grid-content1{
    border-radius: 4px;
    min-height: 36px;
    height: 100px;
    background-color: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
    border-color: rgba(0, 0, 0, 0.05);
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
  .grid{
    border-radius: 4px;
    min-height: 36px;
    height: 600px;
    background-color: #fff;
  }
  .gridRignt{
    border-radius: 4px;
    min-height: 36px;
    height: 290 px;
    background-color: #fff;
  }
  .bg-purple1{
    width: 80%;
    height: 100px;
    color: #fff ;
    font-size: 50px;
    background-color: #000;
    line-height: 100px;
    text-align: center;
  }
  .bg-purple1:hover{
    width: 100%;
    height: 100px;
    color: #fff;
    font-size: 50px;
    line-height: 100px;
    text-align: center;
  }
  .bg-purple2{
    width: 80%;
    height: 100px;
    color: #fff ;
    font-size: 50px;
    background-color:#f26522;
    line-height: 100px;
    text-align: center;
  }
  .bg-purple2:hover{
    width: 100%;
    height: 100px;
    color: #fff;
    font-size: 50px;
    line-height: 100px;
    text-align: center;
  }
  .bg-purple3{
    width: 80%;
    height: 100px;
    color: #fff ;
    font-size: 50px;
    background-color: #fcaf17;
    line-height: 100px;
    text-align: center;
  }
  .bg-purple3:hover{
    width: 100%;
    height: 100px;
    color: #fff;
    font-size: 50px;
    line-height: 100px;
    text-align: center;
  }
  .bg-purple4{
    width: 80%;
    height: 100px;
    color: #fff ;
    font-size: 50px;
    background-color: #1d953f;
    line-height: 100px;
    text-align: center;
  }
  .bg-purple4:hover{
    width: 100%;
    height: 100px;
    color: #fff;
    font-size: 50px;
    line-height: 100px;
    text-align: center;
  }
  .title{
    width: 100%;
    height: 50px;
    padding-right: 20px;
    text-align: right;
  }
  .top{
    line-height: 65px;
    font-size: 22px;
    color: rgba(0, 0, 0, 0.45);
  }
  .bottom{
    line-height: 0px;
    font-size: 28px;
    color: #666;
  }
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }
  
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
  .titleName{
    width: 100%;
    height: 50px;
    line-height: 50px;
    text-align: center;
    font-size: 20px;
    font-weight: bold;
    
    background: -webkit-linear-gradient(#b3f2ff, #96e9f9); /* Safari 5.1 - 6.0 */
        background: -o-linear-gradient(#b3f2ff, #96e9f9); /* Opera 11.1 - 12.0 */
        background: -moz-linear-gradient(#b3f2ff, #96e9f9); /* Firefox 3.6 - 15 */
        background: linear-gradient(#b3f2ff, #96e9f9); /* 标准的语法（必须放在最后） */
  }
  .titleContent{
    width: 95%;
    height: 220px;
    padding: 20px;
    text-indent: 33px;
    padding-top:1px;
    margin-top: 13px;
    line-height: 30px;
  }
</style>