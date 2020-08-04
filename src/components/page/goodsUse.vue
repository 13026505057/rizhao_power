<template>
  <div v-loading.fullscreen.lock="loadingAll" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="5" class="FirBox">
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
                <el-select style="width:200px;margin-left:20px;" v-model="store_id" filterable placeholder="所在二级库">
                  <el-option
                    v-for="item in storeList"
                    :key="item.store_id"
                    :label="item.store_name"
                    :value="item.store_id">
                  </el-option>
                </el-select>
                <!-- <el-date-picker
                  style="margin-left: 20px;width:420px;"
                  v-model="date"
                  type="daterange"
                  range-separator="至"
                  format="yyyy 年 MM 月 dd 日"
                  value-format="yyyy-MM-dd"
                  start-placeholder="起始日期"
                  end-placeholder="结束日期">
                </el-date-picker>
                <el-select style="margin-left: 30px;width:220px;" v-model="goods" placeholder="分类查询" clearable>
                  <el-option
                    v-for="item in ClassList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select> -->
                <el-button type="warning" style="margin-left: 30px;" @click="goodsSearchClick">查询</el-button>
    </div>

    <section id="section">
        <nav id="choose">
            你的选择:
            <!-- <mark>锤子<a href="javascript:;">x</a></mark> -->
             <mark
                     v-for="item,key in choose"
                     @click="delFn(key)"
             >
                 {{item.type_name}}{{item.good_mode}}{{item.good_factory}}{{item.good_parameter}}
                 <a href="javascript:;"
                 >x</a>
             </mark>
        </nav>
        <ul id="type">
            <li v-for="item,i in dataList">
                {{item.title}}：
                <a v-for="value,j in item.list" href="javascript:;" v-bind:class="{active:item.index===j}" @click="showFn(value,i,j)">
                    {{value.type_name}}{{value.good_mode}}{{value.good_factory}}{{value.good_parameter}}
                </a>
            </li>
        </ul>
 
    </section>
  <el-dialog
            title="物资入库"
            :visible.sync="applyGoods"
            width="40%"
            style=""
            >
            <el-form ref="applyForm" :model="applyForm" label-width="80px"  >
              <el-form-item label="入库仓库">
                <el-select v-model="applyForm.in_store_id" placeholder="请选择">
                  <el-option
                    v-for="item in storeList"
                    :key="item.store_id"
                    :label="item.store_name"
                    :value="item.store_id">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="入库数量">
                <el-input style="width:300px;" v-model="applyForm.quantity"></el-input>
              </el-form-item>
              <el-form-item label="入库原因">
                <el-input style="width:300px;" v-model="applyForm.user_apply_reason"></el-input>
              </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
              <el-button @click="applyGoods = false">取 消</el-button>
              <el-button type="primary" @click="addApplyGoods">确 定</el-button>
            </span>
    </el-dialog>
  <div class="" id="box">
    <ul>
      <li v-for="v in json.list">
        <img v-bind:src="v.good_banner_img.length==0?'../../../static/img/150.png':v.good_banner_img[0]" alt="">
        <h5 style="width:200px;">物资名称:{{v.good_name}}</h5>
        <h5 style="width:200px;">所属仓库:{{v.store_name}}</h5>
        <h5 style="width:200px;">存放位置:{{v.huowei}}</h5>
        <h5 style="width:200px;">规格型号:{{v.good_mode}}</h5>
        <h5 style="width:200px;">技术参数:{{v.good_parameter}}</h5>
        <!-- <h5 style="width:200px;">单价:<span style="color:blue;margin-left:10px;">{{v.worth}}</span></h5> -->
        <h5 style="width:200px;">库存:<span style="color:red;margin-left:10px;">{{v.quantity}}</span></h5>
        <div>
          <el-row>
            <el-col :span="12"><div class="grid-content">
               <el-button size="mini" @click="applyNow(v)" type="warning">物资入库</el-button>
            </div></el-col>
            <el-col :span="12"><div class="grid-content">
               <!-- <el-button size="mini" @click="addApplyList()" type="warning">物资详情</el-button> -->
            </div></el-col>
          </el-row>
        </div>
      </li>
    </ul>
  </div>
  <!-- <el-pagination
                small
                background
                style="text-align: center;margin-top: 20px;"
                @current-change="handleCurrentChange"
                :current-page.sync="currentPage"
                :page-size="pageSize"
                layout="prev, pager, next, jumper"
                :total="total">
  </el-pagination> -->
  </div>

</template>

<script>
  import  TMap from '../../TMap';
  import countTo from 'vue-count-to';
  export default {
    components: { countTo },
      data: function(){
          return {
            loadingAll:false,
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
                    {
                        title: '价格范围',
                        list: ["100-200", "201-300", "301-400", "401-500", "501-600", "601-700"]
                    }
                ],
            choose:{
              
              },
            json:{
              list:[
                {
                  src:'../../static/img/banner.jpg',
                  des:'这是第三个描述',
                  price:423,
                  good_banner_img:[]
                }
              ]
            },
             states: []

          }

              
      },
      mounted() {
        this.getNameSearchList('');
        this.getTypeList();
        this.getStoreList();
        // this.getDataList();
        this.getMyStoreList();
      },
      watch: {
       
      },
      methods: {
            //确定新增物资申请
            addApplyGoods(res){
                const self = this;
                console.log(res)
                var params = new URLSearchParams();
                var token = localStorage.getItem('auth');
                params.append('good_id',self.applyForm.good_id);
                params.append('in_store_id',self.applyForm.in_store_id);
                // params.append('out_store_id',self.store_id);
                params.append('quantity',self.applyForm.quantity);
                params.append('apply_type','in');
                params.append('user_apply_reason',self.applyForm.user_apply_reason);
                self.$axios({
                    method: 'post',
                    url: '/store/userApply/addIn',
                    data: params,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded','kf-token':token},
                 }).then(function(data){
                    if(data.data.code==0){
                      self.$message({
                        type: 'success',
                        message: '申请提交成功，请等待领导审批'
                      });
                      self.applyGoods = false;
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
            applyNow(res){
                this.applyGoods = true;
                // this.applyForm.out_store_id = res.store_id;
                this.applyForm.good_id = res.good_id;
            },
            addApplyList(){
                this.$prompt('请输入数量', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  inputPattern: /^[1-9]\d*$/,
                  inputErrorMessage: '数量不正确'
                }).then(({ value }) => {
                  this.$message({
                    type: 'success',
                    message: '申请提交成功: ' + value
                  });
                }).catch(() => {
                  this.$message({
                    type: 'info',
                    message: '取消输入'
                  });       
                }); 
            },
            goodsSearchClick(){
              this.getDataList();
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
                params.append('pageSize',10000);       
                self.$axios({
                    method: 'post',
                    url: '/store/store/getByPage',
                    data: params,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded','kf-token':token},
                 }).then(function(data){
                    if(data.data.code==0){
                       self.storeList = data.data.data.list;
                       
                       // if(data.data.data.length==0){

                       // }else{
                       //  self.store_id = data.data.data[0].store_id;
                       // }
                       // self.getDataList();
                    }else{
                      self.$response(data,self);
                    }
                 });      
            },
            
            //获取商品列表滚动
            getDataListScroll(){
                const self = this;
                self.loadingAll = true;
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
                // params.append('store_id',self.store_id);  
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
                      self.json.list = self.json.list.concat(data.data.data.pageInfo.list);
                      self.loadingAll = false;
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
                self.loadingAll = true;
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
                      self.dataList[4].list = data.data.data.goodAttachs;
                      self.loadingAll = false;
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
                      self.dataList[4].list = data.data.data.goodAttachs;
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

</style>