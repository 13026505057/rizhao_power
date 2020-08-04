<template>
  <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="5" class="FirBox">
    <div class="block">
               
                

                <el-select clearable v-model="good_name" style="height:40px;" remote reserve-keyword :remote-method="remoteMethod" :loading="loading" filterable placeholder="物品名称">
                  <el-option
                    style="height:40px;"
                    v-for="item in goodsNameList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
                <el-input
                  style="width:200px;margin-left:20px;"
                  placeholder="物品编码"
                  v-model="good_number"
                  clearable>
                </el-input>
                <el-select style="width:200px;margin-left:20px;" clearable v-model="store_id" filterable placeholder="所在二级库">
                  <el-option
                    v-for="item in storeList"
                    :key="item.store_id"
                    :label="item.store_name"
                    :value="item.store_id">
                  </el-option>
                </el-select>
                <el-date-picker
                  style="margin-left: 20px;width:420px;"
                  v-model="date"
                  type="daterange"
                  range-separator="至"
                  format="yyyy 年 MM 月 dd 日"
                  value-format="yyyy-MM-dd"
                  start-placeholder="起始日期"
                  end-placeholder="结束日期">
                </el-date-picker>
                
                <el-button type="warning" style="margin-left: 30px;" @click="goodsSearchClick">查询</el-button>
    </div>
    <div class="tableList">
            <el-tabs type="border-card" @tab-click="tableClick" v-model="tabPosition">
              <el-tab-pane label="图表数据" name="fir">
                <div style="width:100%;height:528px;">
                  <div style="width:100%;height:250px;">
                      <div style="width:49.5%;height:247px;float:left;border:1px solid #ccc;backgroundColor:#ccc;">
                        <div class="chartDiv2" id="xingbie" :style="{width: '100%', height: '247px'}"></div>
                      </div>
                      <div style="width:49.5%;height:247px;float:right;border:1px solid #ccc;backgroundColor:#ccc;">
                        <div class="chartDiv2" id="xingbie1" :style="{width: '100%', height: '247px'}"></div>
                        
                      </div>
                      
                  </div>
                  <div style="width:100%;height:250px;">
                      <div style="width:49.5%;height:247px;float:left;border:1px solid #ccc;margin-top:20px;backgroundColor:#ccc;">
                        <div class="chartDiv" id="zaicezengzhang" :style="{width: '100%', height: '247px'}"></div>
                      </div>
                      <div style="width:49.5%;height:247px;float:left;border:1px solid #ccc;margin-top:20px;margin-left:10px;backgroundColor:#ccc;">
                        <div class="chartDiv" id="zaicezengzhang1" :style="{width: '100%', height: '247px'}"></div>
                      </div>
                  </div>
                </div>
              </el-tab-pane>
<!--               <el-tab-pane label="列表数据" name="sec">
                <el-table
                  :data="ListDetail"
                  :header-cell-style="{ 'background-color': '#deedf4','color':'#000'}"
                  :row-style="rowStyle"
                  
                  class="tableClass"
                  style="">
                  <el-table-column type="expand">
                    <template slot-scope="props">
                        <div class="stepLine">
                          <el-steps :active="props.row.apply_approve_order" align-center>
                            <el-step v-for="item,index in props.row.userApplyApprove" :title="'步骤'+(index+1)" :description="item.apply_approve_dept_name+'的领导审批'"></el-step>
                          </el-steps>
                        </div>
                    </template>
                  </el-table-column>
                  <el-table-column
                    type="index"
                    align="center"
                    width="50">
                  </el-table-column>
                  <el-table-column
                    label="申请时间"
                    align="center"
                    prop="user_apply_time">
                  </el-table-column>
                  <el-table-column
                    label="申请类型"
                    align="center"
                    >
                    <template slot-scope="props">
                      <span>入库</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="申请物品"
                    align="center"
                    prop="userApplyLines[0].good_name">
                  </el-table-column>
                  <el-table-column
                    label="申请数量"
                    align="center"
                    prop="userApplyLines[0].quantity">
                  </el-table-column>
                  <el-table-column
                    label="调出仓库"
                    align="center"
                    prop="out_sotre_name">
                  </el-table-column>
                  <el-table-column
                    label="审批状态"
                    align="center"
                    >
                    <template slot-scope="props">
                      <span>待审批</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="操作"
                    align="center"
                    width="300px"
                    >
                    <template slot-scope="props">
                      <el-button size="mini" type="warning" style="" @click.stop="rowClick(props.row)">审批进度</el-button>
                      <el-button size="mini" type="warning" style="" @click.stop="approve(props.row)">通过</el-button>
                      <el-button size="mini" type="warning" style="" @click.stop="reject(props.row)">驳回</el-button>
                    </template>
                  </el-table-column>
                  
                </el-table> 
                <el-pagination
                  small
                  background
                  style="text-align: center;margin-top: 20px;"
                  @current-change="handleCurrentChange"
                  :current-page.sync="currentPage"
                  :page-size="pageSize"
                  layout="prev, pager, next, jumper"
                  :total="total">
                </el-pagination>
              </el-tab-pane> -->
              
            </el-tabs>
            
    </div>

    
  
  
  
  </div>

</template>

<script>
  import  TMap from '../../TMap';
  import countTo from 'vue-count-to';
  export default {
    components: { countTo },
      data: function(){
          return {
            ListDetail:[],
            tabPosition:'fir',
            myStoreList:[],
            applyForm:{
              good_id:'',
              out_store_id:''
            },
            applyGoods:false,
            currentPage:1,
            pageSize:10,
            total:10,
            storeList:[],
            goodsNameList:[],
            list: [],
            goods:'',
            loading:false,
            good_name:'',
            store_id:'',
            good_number:'',
            date:[],
            upload_status:'',
            ClassList:[
                {
                  label:'全部',
                  value:''
                },
                {
                  label:'分类1',
                  value:'1'
                },
                {
                  label:'分类2',
                  value:'0'
                }
            ],
            dataList:[
                    {
                        title: '物品分类',
                        list: ["苹果", "小米", "锤子", "魅族", "华为", "三星", "OPPO", "vivo", "乐视", "360", "中兴", "索尼","苹果", "小米", "锤子", "魅族", "华为", "三星", "OPPO", "vivo", "乐视", "360", "中兴", "索尼","苹果", "小米", "锤子", "魅族", "华为", "三星", "OPPO", "vivo", "乐视", "360", "中兴", "索尼"]
                    },
                    {
                        title: '技术参数',
                        list: ["3.0英寸以下", "3.0-3.9英寸", "4.0-4.5英寸", "4.6-4.9英寸", "5.0-5.5英寸", "6.0英寸以上"]
                    },
                    {
                        title: '规格型号',
                        list: ["安卓", "(", "Android", ")", "苹果", "(", "IOS", ")", "微软", "(", "WindowsPhone", ")", "无", "其他"]
                    },
                    {
                        title: '生产厂家',
                        list: ["安卓", "(", "Android", ")", "苹果", "(", "IOS", ")", "微软", "(", "WindowsPhone", ")", "无", "其他"]
                    },
                    // {
                    //     title: '价格范围',
                    //     list: ["100-200", "201-300", "301-400", "401-500", "501-600", "601-700"]
                    // }
                ],
            choose:{
              
              },
            json:{
              list:[
                {
                  src:'../../static/img/banner.jpg',
                  des:'这是第三个描述',
                  price:423
                }
              ]
            },
            states: [],
            xingbie:{
                            title : {
                                text: '物品库存量按部门分布',
                                // subtext: '纯属虚构',
                                x:'center',
                                textStyle :{
                                    color:'#000'
                                }
                            },
                            tooltip : {
                                trigger: 'item',
                                formatter: "{a} <br/>{b} : {c} ({d}%)"
                            },
                            legend: {
                                orient: 'vertical',
                                left: 'left',
                                data: ['分组一','分组二','分组三','分组三','分组四'],
                                textStyle :{
                                    color:'#000'
                                }
                            },
                            series : [
                                {
                                    name: '库存数量',
                                    type: 'pie',
                                    radius : '55%',
                                    center: ['50%', '60%'],
                                    data:[
                                        {value:335, name:'分组一'},
                                        {value:310, name:'分组二'},
                                        {value:234, name:'分组三'},
                                        {value:135, name:'分组三'},
                                        {value:1548, name:'分组四'}
                                    ],
                                    itemStyle: {
                                        emphasis: {
                                            shadowBlur: 10,
                                            shadowOffsetX: 0,
                                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                                        }
                                    }
                                }
                            ]
            },
            xingbie1:{
                            title : {
                                text: '物品消耗量按部门分布',
                                // subtext: '纯属虚构',
                                x:'center',
                                textStyle :{
                                    color:'#000'
                                }
                            },
                            tooltip : {
                                trigger: 'item',
                                formatter: "{a} <br/>{b} : {c} ({d}%)"
                            },
                            legend: {
                                orient: 'vertical',
                                left: 'left',
                                data: ['分组一','分组二','分组三','分组三','分组四'],
                                textStyle :{
                                    color:'#000'
                                }
                            },
                            series : [
                                {
                                    name: '消耗数量',
                                    type: 'pie',
                                    radius : '55%',
                                    center: ['50%', '60%'],
                                    data:[
                                        {value:335, name:'分组一'},
                                        {value:310, name:'分组二'},
                                        {value:234, name:'分组三'},
                                        {value:135, name:'分组三'},
                                        {value:1548, name:'分组四'}
                                    ],
                                    itemStyle: {
                                        emphasis: {
                                            shadowBlur: 10,
                                            shadowOffsetX: 0,
                                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                                        }
                                    }
                                }
                            ]
            },
            zaicezengzhang:{
                         
                        title: {
                            text: '物品消耗量按月统计',
                            subtext: '',
                            textStyle :{
                                color:'#000'
                            }
                        },
                        tooltip: {
                            trigger: 'axis'
                        },
                        grid: {
                            left: '3%',
                            right: '4%',
                            bottom: '3%',
                            containLabel: true
                        },
                        xAxis: [{
                            type: 'category',
                            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
                            splitLine: {
                                show: false
                            },
                            axisTick: {
                                alignWithLabel: true
                            },
                            axisLine:{
                                lineStyle :{
                                    color:'#000'
                                }
                            }
                        }],
                        yAxis: [{
                            type: 'value',
                            splitLine: {
                                show: false
                            },
                            splitArea: {
                                show: true,
                            },
                            axisLine:{
                                lineStyle :{
                                    color:'#000'
                                }
                            }
                        }],
                        series: [{
                            name: '人数',
                            type: 'bar',
                            barWidth : 20,//柱图宽度
                            barMaxWidth:20,//最大宽度
                            label: {
                                normal: {
                                    show: true,
                                    position: 'top'
                                }
                            },
                            itemStyle: {
                                normal: {
                                    // 随机显示
                                    //color:function(d){return "#"+Math.floor(Math.random()*(256*256*256-1)).toString(16);}
                                  
                                    // 定制显示（按顺序）
                                    color: function(params) { 
                                        var colorList = ['#C33531','#EFE42A','#64BD3D','#EE9201','#29AAE3', '#B74AE5','#0AAF9F','#E89589','#16A085','#4A235A','#C39BD3 ','#F9E79F','#BA4A00','#ECF0F1','#616A6B','#EAF2F8','#4A235A','#3498DB' ]; 
                                        return colorList[params.dataIndex] 
                                    }
                                },
                            },
                            data: [32.6, 25.9, 39.0, 26.4, 28.7, 70.7, 75.6, 82.2, 48.7, 58.8, 16.0, 32.3],
                        }]
            },
            zaicezengzhang1:{
                         
                        title: {
                            text: '物品消耗量按月统计',
                            subtext: '',
                            textStyle :{
                                color:'#000'
                            }
                        },
                        tooltip: {
                            trigger: 'axis'
                        },
                        grid: {
                            left: '3%',
                            right: '4%',
                            bottom: '3%',
                            containLabel: true
                        },
                        xAxis: [{
                            type: 'category',
                            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
                            splitLine: {
                                show: false
                            },
                            axisTick: {
                                alignWithLabel: true
                            },
                            axisLine:{
                                lineStyle :{
                                    color:'#000'
                                }
                            }
                        }],
                        yAxis: [{
                            type: 'value',
                            splitLine: {
                                show: false
                            },
                            splitArea: {
                                show: true,
                            },
                            axisLine:{
                                lineStyle :{
                                    color:'#000'
                                }
                            }
                        }],
                        series: [{
                            name: '人数',
                            type: 'bar',
                            barWidth : 20,//柱图宽度
                            barMaxWidth:20,//最大宽度
                            label: {
                                normal: {
                                    show: true,
                                    position: 'top'
                                }
                            },
                            itemStyle: {
                                normal: {
                                    // 随机显示
                                    //color:function(d){return "#"+Math.floor(Math.random()*(256*256*256-1)).toString(16);}
                                  
                                    // 定制显示（按顺序）
                                    color: function(params) { 
                                        var colorList = ['#C33531','#EFE42A','#64BD3D','#EE9201','#29AAE3', '#B74AE5','#0AAF9F','#E89589','#16A085','#4A235A','#C39BD3 ','#F9E79F','#BA4A00','#ECF0F1','#616A6B','#EAF2F8','#4A235A','#3498DB' ]; 
                                        return colorList[params.dataIndex] 
                                    }
                                },
                            },
                            data: [32.6, 25.9, 39.0, 26.4, 28.7, 70.7, 75.6, 82.2, 48.7, 58.8, 16.0, 32.3],
                        }]
            },

          }

              
      },
      mounted() {
        this.getNameSearchList('');
        this.getTypeList();
        this.getStoreList();
        this.getDataList();
        this.getMyStoreList();
        this.drawLine();
        this.getNumByMounth();
        this.getPey1();
        this.getPey();
      },
      watch: {
       
      },
      methods: {
            getPey1(){
              const self = this;
                var params = new URLSearchParams();
                var token = localStorage.getItem('auth');
                if(self.date==null||self.date.length==0){
                  var begin_time = '';
                  var end_time = '';
                }else{
                  var begin_time = self.date[0];
                  var end_time = self.date[1];
                } 
                params.append('good_name',self.good_name);
                params.append('good_out_id',self.good_number);
                params.append('begin_time',begin_time);
                params.append('end_time',end_time);
                self.$axios({
                    method: 'post',
                    url: '/store/chart/getGoodXiaoHaoByDept',
                    data: params,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded','kf-token':token},
                 }).then(function(data){
                    if(data.data.code==0){
                        var countArr = [];
                        var countArr1 = [];
                        for(var i = 0;i<data.data.data.length;i++){
                            countArr.push(data.data.data[i].dept_name);
                            var obj={};
                            obj.value = data.data.data[i].quantity;
                            obj.name = data.data.data[i].dept_name;
                            countArr1.push(obj);
                        }
                        self.xingbie1.legend.data = countArr;
                        self.xingbie1.series[0].data = countArr1;
                        self.drawLine();
                    }else{
                      self.$response(data,self);
                    }
                 });
            },
             getPey(){
              const self = this;
                var params = new URLSearchParams();
                var token = localStorage.getItem('auth');
                if(self.date==null||self.date.length==0){
                  var begin_time = '';
                  var end_time = '';
                }else{
                  var begin_time = self.date[0];
                  var end_time = self.date[1];
                } 
                params.append('good_name',self.good_name);
                params.append('good_out_id',self.good_number);
                params.append('begin_time',begin_time);
                params.append('end_time',end_time);
                self.$axios({
                    method: 'post',
                    url: '/store/chart/getGoodStockByDept',
                    data: params,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded','kf-token':token},
                 }).then(function(data){
                    if(data.data.code==0){
                        var countArr = [];
                        var countArr1 = [];
                        for(var i = 0;i<data.data.data.length;i++){
                            countArr.push(data.data.data[i].dept_name);
                            var obj={};
                            obj.value = data.data.data[i].quantity;
                            obj.name = data.data.data[i].dept_name;
                            countArr1.push(obj);
                        }
                        self.xingbie.legend.data = countArr;
                        self.xingbie.series[0].data = countArr1;
                        self.drawLine();
                    }else{
                      self.$response(data,self);
                    }
                 });
            },

            //物品消耗按月分布
            getNumByMounth(){
                const self = this;
                var params = new URLSearchParams();
                var token = localStorage.getItem('auth');
                params.append('good_name',self.good_name);
                params.append('good_out_id',self.good_number);
                params.append('store_id',self.store_id);
                self.$axios({
                    method: 'post',
                    url: '/store/chart/getStockPerMonthByGood',
                    data: params,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded','kf-token':token},
                 }).then(function(data){
                    if(data.data.code==0){
                      var countArr = [];
                      var countArr1 = [];
                      for(var i = 0;i<data.data.data.length;i++){
                            countArr.push(data.data.data[i].month);
                            countArr1.push(data.data.data[i].quantity);
                      }
                      self.zaicezengzhang.xAxis[0].data = countArr;
                      self.zaicezengzhang.series[0].data = countArr1;
                      self.drawLine();
                    }else{
                      self.$response(data,self);
                    }
                 });
              
            },
            drawLine(){
                // 基于准备好的dom，初始化echarts实例
                // if(document.getElementsByTagName('html')[0].style.zoom<=0.70){
                //      document.getElementById('chart').style.zoom=1.42;
                // }else{

                // }
               
                
                
                let xingbie = this.$echarts.init(document.getElementById('xingbie'));
                let xingbie1 = this.$echarts.init(document.getElementById('xingbie1'));
                let zaicezengzhang = this.$echarts.init(document.getElementById('zaicezengzhang'));
                let zaicezengzhang1 = this.$echarts.init(document.getElementById('zaicezengzhang1'));
                

                // 绘制图表
                zaicezengzhang.setOption(this.zaicezengzhang);
                // zaicezengzhang1.setOption(this.zaicezengzhang1);
                xingbie.setOption(this.xingbie);
                xingbie1.setOption(this.xingbie1);
                
                
            },
            //修改单元行颜色
            rowStyle({ row, rowIndex}){
              if(rowIndex%2 ==0){
                return 'background:#eee;color:#000;'
              }else{
               return 'background:#e5e7e8;color:#000;'
              }
            },    
            //标签点击事件
            tableClick(tabName){
              if(tabName.name=='fir'){
                
              }else{
                this.getListData();
              }
            },
            //获取图表数据
            getInfoData(){
                const self = this;
                console.log(res)
                var params = new URLSearchParams();
                var token = localStorage.getItem('auth');
                params.append('good_id',self.applyForm.good_id);
                params.append('in_store_id',self.applyForm.in_store_id);
                params.append('out_store_id',self.applyForm.out_store_id);
                params.append('quantity',self.applyForm.quantity);
                params.append('apply_type','固定字段');
                params.append('user_apply_reason',self.applyForm.user_apply_reason);
                self.$axios({
                    method: 'post',
                    url: '/store/userApply/add',
                    data: params,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded','kf-token':token},
                 }).then(function(data){
                    if(data.data.code==0){
                      self.$message({
                        type: 'success',
                        message: '申请提交成功，请等待领导审批'
                      });
                    }else{
                      self.$response(data,self);
                    }
                 });
            },
            //获取图表数据
            getListData(){
                const self = this;
                console.log(res)
                var params = new URLSearchParams();
                var token = localStorage.getItem('auth');
                params.append('good_id',self.applyForm.good_id);
                params.append('in_store_id',self.applyForm.in_store_id);
                params.append('out_store_id',self.applyForm.out_store_id);
                params.append('quantity',self.applyForm.quantity);
                params.append('apply_type','固定字段');
                params.append('user_apply_reason',self.applyForm.user_apply_reason);
                self.$axios({
                    method: 'post',
                    url: '/store/userApply/add',
                    data: params,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded','kf-token':token},
                 }).then(function(data){
                    if(data.data.code==0){
                      self.$message({
                        type: 'success',
                        message: '申请提交成功，请等待领导审批'
                      });
                    }else{
                      self.$response(data,self);
                    }
                 });
            },
            
            //远程搜索
            remoteMethod(query){
              if (query !== '') {
                this.loading = true;
                this.getNameSearchList(query);
              } else {
                this.goodsNameList = [];
              }
            },
            getNameSearchList(query){
                const self = this;
                self.good_name = query;
                var params = new URLSearchParams();
                var token = localStorage.getItem('auth');
                params.append('good_name',query); 
                self.$axios({
                    method: 'post',
                    url: '/store/good/getGoodsForName',
                    data: params,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded','kf-token':token},
                 }).then(function(data){
                    if(data.data.code==0){
                      self.states = data.data.data;
                      self.list = self.states.map(item => {
                        return { value: item, label: item };
                      });
                      setTimeout(() => {
                        self.loading = false;
                        self.goodsNameList = self.list.filter(item => {
                          return item.label.toLowerCase()
                            .indexOf(query.toLowerCase()) > -1;
                        });
                      }, 200);
                    }else{
                      self.$response(data,self);
                    }
                 });
            },
            loadMore(){
              this.busy = true;
              this.getDataListScroll();
              console.log('加载中...')
            },
            //页码发生变化加载更多
            handleCurrentChange(){

            },
            goodsSearchClick(){
              this.getNumByMounth();
              this.getPey1();
              this.getPey();
            },
            handleSelect(item) {
              
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
            showFn(val,i,j){

                //下面这种方法给对象添加属性并不会响应
                // this.choose[i] = val
                this.$set(this.choose,i,val)
                //找到操作的一行，把这一行的数据中的index设置为点击的标签的下标
                this.dataList[i].index = j;
                
                this.getDataList();
            },
            delFn(key){
                /*
                删除对象中的属性
                 */
                this.$delete(this.choose,key);
                this.dataList[key].index = -1;
                this.getDataList();
            },
            //获取二级库列表
            getStoreList(){
                const self = this;
                var params = new URLSearchParams();
                var token = localStorage.getItem('auth');
                params.append('pageNum',1);   
                params.append('pageSize',1000);        
                self.$axios({
                    method: 'post',
                    url: '/store/store/getByPage',
                    data: params,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded','kf-token':token},
                 }).then(function(data){
                    if(data.data.code==0){
                       self.storeList = data.data.data.list;
                    }else{
                      self.$response(data,self);
                    }
                 });      
            },
            //获取商品列表滚动
            getDataListScroll(){
                const self = this;
                self.currentPage = self.currentPage+1;
                var params = new URLSearchParams();
                var token = localStorage.getItem('auth');
                var good_mode_count,good_parameter_count,good_factory_count,type_id_count;
                if(self.choose[0]=='undefined'||self.choose[0]==null||self.choose[0]==''){
                  type_id_count = ''
                }else{
                  type_id_count = self.choose[0].type_id;
                }
                if(self.choose[1]=='undefined'||self.choose[1]==null||self.choose[1]==''){
                  good_parameter_count = ''
                }else{
                  good_parameter_count = self.choose[1].good_parameter;
                }
                if(self.choose[2]=='undefined'||self.choose[2]==null||self.choose[2]==''){
                  good_mode_count = ''
                }else{
                  good_mode_count = self.choose[2].good_mode;
                }
                if(self.choose[3]=='undefined'||self.choose[3]==null||self.choose[3]==''){
                  good_factory_count = ''
                }else{
                  good_factory_count = self.choose[3].good_factory;
                }
                params.append('pageNum',self.currentPage); 
                params.append('pageSize',self.pageSize);
                params.append('good_mode',good_mode_count);
                params.append('good_parameter',good_parameter_count);
                params.append('good_factory',good_factory_count);
                params.append('type_id',type_id_count); 
                params.append('good_name',self.good_name);
                params.append('store_id',self.store_id);  
                self.$axios({
                    method: 'post',
                    url: '/store/good/getGoodsByName',
                    data: params,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded','kf-token':token},
                 }).then(function(data){
                    if(data.data.code==0){
                      for(var i = 0 ; i < data.data.data.pageInfo.list.length;i++){
                        if(data.data.data.pageInfo.list[i].good_banner_img==''||data.data.data.pageInfo.list[i].good_banner_img==null||data.data.data.pageInfo.list[i].good_banner_img=='null'){
                        data.data.data.pageInfo.list[i].good_banner_img = [];
                        }else{
                          data.data.data.pageInfo.list[i].good_banner_img = data.data.data.pageInfo.list[i].good_banner_img.split(',')
                        }
                      }
                      self.dataList[1].list = data.data.data.goodParameters;
                      self.dataList[2].list = data.data.data.goodModes;
                      self.dataList[3].list = data.data.data.goodFactorys;
                      self.json.list.concat(data.data.data.pageInfo.list);
                    }else{
                      self.currentPage = self.currentPage-1;
                      self.$response(data,self);
                    }
                 });
            },
            //获取商品列表
            getDataList(){
                const self = this;
                self.currentPage = 1;
                var params = new URLSearchParams();
                var token = localStorage.getItem('auth');
                var good_mode_count,good_parameter_count,good_factory_count,type_id_count;
                if(self.choose[0]=='undefined'||self.choose[0]==null||self.choose[0]==''){
                  type_id_count = ''
                }else{
                  type_id_count = self.choose[0].type_id;
                }
                if(self.choose[1]=='undefined'||self.choose[1]==null||self.choose[1]==''){
                  good_parameter_count = ''
                }else{
                  good_parameter_count = self.choose[1].good_parameter;
                }
                if(self.choose[2]=='undefined'||self.choose[2]==null||self.choose[2]==''){
                  good_mode_count = ''
                }else{
                  good_mode_count = self.choose[2].good_mode;
                }
                if(self.choose[3]=='undefined'||self.choose[3]==null||self.choose[3]==''){
                  good_factory_count = ''
                }else{
                  good_factory_count = self.choose[3].good_factory;
                }
                params.append('pageNum',self.currentPage); 
                params.append('pageSize',self.pageSize);
                params.append('good_mode',good_mode_count);
                params.append('good_parameter',good_parameter_count);
                params.append('good_factory',good_factory_count);
                params.append('type_id',type_id_count); 
                params.append('good_name',self.good_name);
                params.append('store_id',self.store_id);  
                self.$axios({
                    method: 'post',
                    url: '/store/good/getGoodsByName',
                    data: params,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded','kf-token':token},
                 }).then(function(data){
                    if(data.data.code==0){
                      for(var i = 0 ; i < data.data.data.pageInfo.list.length;i++){
                        if(data.data.data.pageInfo.list[i].good_banner_img==''||data.data.data.pageInfo.list[i].good_banner_img==null||data.data.data.pageInfo.list[i].good_banner_img=='null'){
                        data.data.data.pageInfo.list[i].good_banner_img = [];
                        }else{
                          data.data.data.pageInfo.list[i].good_banner_img = data.data.data.pageInfo.list[i].good_banner_img.split(',')
                        }
                      }
                      self.dataList[1].list = data.data.data.goodParameters;
                      self.dataList[2].list = data.data.data.goodModes;
                      self.dataList[3].list = data.data.data.goodFactorys;
                      
                      self.json.list = data.data.data.pageInfo.list;
                    }else{
                      self.$response(data,self);
                    }
                 });
            },
            getTypeList(){
                const self = this;
                var params = new URLSearchParams();
                var token = localStorage.getItem('auth');
                self.$axios({
                    method: 'post',
                    url: '/store/good/getGoodExtras',
                    data: params,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded','kf-token':token},
                 }).then(function(data){
                    if(data.data.code==0){
                      self.dataList[0].list = data.data.data.goodTypes;
                      self.dataList[1].list = data.data.data.goodParameters;
                      self.dataList[2].list = data.data.data.goodModels;
                      self.dataList[3].list = data.data.data.goodFactorys;
                    }else{
                      self.$response(data,self);
                    }
                 });
            },
            getMyStoreList(){
                const self = this;
                var params = new URLSearchParams();
                var token = localStorage.getItem('auth');
                self.$axios({
                    method: 'post',
                    url: '/store/store/getUserStore',
                    data: params,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded','kf-token':token},
                 }).then(function(data){
                    if(data.data.code==0){
                      self.myStoreList = data.data.data;
                    }else{
                      self.$response(data,self);
                    }
                 });
            }

      }
     
  }
</script>

<style scoped>
        .grid-content{
          text-align: center;
        }
        h4,h5,h6,p{
          padding: 4px 10px;
        }
        .FirBox{
          width: 100%;
          height: 100%;
          overflow-y: scroll;
          overflow-x: hidden;
        }
        .FirBox::-webkit-scrollbar {/*滚动条整体样式*/
            width: 4px;     /*高宽分别对应横竖滚动条的尺寸*/
            height: 4px;
        }
        .FirBox::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
                border-radius: 5px;
                -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
                background: rgba(0,0,0,0.2);
        }
        .FirBox::-webkit-scrollbar-track {/*滚动条里面轨道*/
                -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
                border-radius: 0;
                background: rgba(0,0,0,0.1);
        }
        #box{
          margin-top:30px;
        }
        #box ul{
          display: flex;
          flex-wrap: wrap;
        }
        #box li{
          padding: 5px;
          list-style: none;
          margin-right: 16px;
          margin-top:20px;
          border: 1px solid #eee;
        }
        #box img{
          width: 200px;
          height: 200px;
        }


        ul {
            padding: 0;
            margin: 0;
            list-style: none;
        }
        a {
            text-decoration: none;
        }
        img {
            vertical-align: top;
        }
        #wrap {
            width: 100%;
            height: 260px;
            margin: 100px auto;
            padding: 145px 120px 95px;
            background: url(../../../static/img/data.jpg) no-repeat 0 0;
        }
        #section {
            width: 100%;
            height: 260px;
            -webkit-box-shadow: 0px 0px 4px rgba(0,0,0,.2);
            box-shadow: 0px 0px 4px rgba(0,0,0,.2);
        }
        #choose {
            width: 101%;
            height: 50px;
            margin: 0 auto;
            margin-top: 10px;
            background: url(../../../static/img/justBg.png) no-repeat 0 0;
            background-size: 100% 100%;
            line-height: 50px;
            text-indent: 21px;
        }
        #type {
            width: 99%;
            height: 210px;
            margin-top: 10px;
            background: url(../../../static/img/justBg.png) no-repeat 0 0;
            background-size: 100% 100%;
            padding: 17px 0 16px 28px;
            overflow: hidden;
        }
        #type li {
            width:95%;
            min-height: 44px;
            color: #8a8a8a;
            line-height: 44px;
        }
        #type a {
            margin: 0 12px 0 11px;
            color: #000;
        }
        #choose mark {
            position: relative;
            display: inline-block;
            height: 24px;
            line-height: 24px;
            border: 1px solid #28a5c4;
            color: #28a5c4;
            margin: 12px 5px 0;
            background: none;
            padding: 0 30px 0 6px;
            text-indent: 0;
        }
        #choose mark a {
            position: absolute;
            top: 3px;
            right: 2px;
            display: inline-block;
            width: 18px;
            height: 18px;
            background: #28a5c4;
            color: #fff;
            line-height: 18px;
            font-size: 16px;
            text-align: center;
        }
        .active {
            background: rgb(40, 165, 196);
        }
            .stepLine{
      width: 100%;
      height: 80px;
    }
    .goodsDetail{
      width:100%;
      min-height:200px; 
    }
    .el-collapse-item__header{
      height: 108px!important;
      line-height: 108px!important;
    }
    .el-steps--simple{
      padding:0px!important;
    }
    .tableClass{
      width: 100%;
      height: 480px;
      /*background-color: #231a75;*/
    }
    .tableList{
      width: 99%;
      height: 600px!important;
      overflow-y: scroll;
      border:1px solid #231a75;
     /* border-radius: 20px;*/
      margin-top: 20px;
      /*background-color: #231a75;*/
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
    .indexClass{
      margin-left: 20px;
      display: inline-block;
      font-size: 18px;
      width: 20px;
      height: 108px;
      line-height: 108px;
    }
    .goods{
      margin-left:20px;
      font-size: 18px;
      display: inline-block;
      width: 450px;
      height: 108px;
      line-height: 108px;
    }

</style>