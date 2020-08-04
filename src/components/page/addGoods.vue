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
                <!-- <el-button type="warning" style="margin-left: 120px;" @click="addManyGoods">批量导入</el-button> -->
                <!-- <el-button type="primary" style="margin-left: 60px;" @click="downLoadFile">导入模板下载</el-button> -->
                <el-button type="warning" style="margin-left: 60px;" @click="addGoodsClick">单条新增</el-button>
    </div>
    <el-dialog
            title="物品批量导入"
            :visible.sync="addManyGoodsDialog"
            width="40%"
            style="text-align:center;"
            >
            <el-upload
              class="upload-demo"
              drag
              :headers="myHeaders"
              :action="addManyGoodsUploadUrl"
              :on-success="uploadSuccessFile"
              name="file">
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
              <div class="el-upload__tip" slot="tip">只能上传excle文件</div>
            </el-upload>
            <span slot="footer" class="dialog-footer">
              <el-button @click="addManyGoodsDialog = false">取 消</el-button>
              <el-button type="primary" @click="addManyGoodsDialog = false">确 定</el-button>
            </span>
    </el-dialog>
    <el-dialog  title="新增物品" :visible.sync="addGoodsDialog">
                <el-tabs type="border-card">
                  <el-tab-pane label="物品资料">
                    <el-form ref="form" :model="changeform" label-width="120px" label-position="left" style="margin-left:20px;">
                      <el-form-item label="物品编码" style="display: inline-block;">
                        <el-input v-model="changeform.good_out_id"  style="width: 200px;float: left;"></el-input>
                      </el-form-item>
                      <el-form-item label="物品名称" style="display: inline-block;margin-left:80px;">
                        <el-input v-model="changeform.good_name" style="width: 200px;float: left;"></el-input>
                      </el-form-item>
                      <el-form-item label="单价" style="display: inline-block;">
                        <el-input v-model="changeform.worth" style="width: 200px;float: left;"></el-input>
                      </el-form-item>
                      <el-form-item label="技术参数" style="display: inline-block;margin-left:80px;">
                        <el-input v-model="changeform.good_parameter" style="width: 200px;float: left;"></el-input>
                      </el-form-item>
                      
                      <el-form-item label="规格型号" style="display: inline-block;">
                        <el-input v-model="changeform.good_mode" style="width: 200px;float: left;"></el-input>
                      </el-form-item>
                      <el-form-item label="生产厂家" style="display: inline-block;margin-left:80px;">
                        <el-input v-model="changeform.good_factory" style="width: 200px;float: left;"></el-input>
                      </el-form-item>
                      <el-form-item label="初始库存" style="display: inline-block;">
                        <el-input v-model="changeform.quantity_last" style="width: 200px;float: left;"></el-input>
                      </el-form-item>
                      <!-- <el-form-item label="现库存" style="display: inline-block;margin-left:80px;">
                        <el-input v-model="changeform.quantity_now" style="width: 200px;float: left;"></el-input>
                      </el-form-item> -->
                      <el-form-item label="入库时间" style="display: inline-block;margin-left:80px;">
                        <el-input v-model="changeform.in_time" style="width: 200px;float: left;" placeholder="如2019-01-01"></el-input>
                      </el-form-item>
                      <!-- <el-form-item label="出库时间" style="display: inline-block;margin-left:80px;">
                        <el-input v-model="changeform.out_time" style="width: 200px;float: left;" placeholder="如2019-01-01"></el-input>
                      </el-form-item> -->
                      <el-form-item label="分类" style="display: inline-block;">
                          <el-select v-model="changeform.type_id" filterable placeholder="请选择" style="width:200px;">
                            <el-option
                              v-for="item in classList.goodTypes"
                              :key="item.type_id"
                              :label="item.type_name"
                              :value="item.type_id">
                            </el-option>
                          </el-select>
                      </el-form-item>
                      <el-form-item label="归属仓库" style="display: inline-block;margin-left:80px;">
                          <el-select v-model="changeform.store_id" filterable placeholder="请选择" style="width:200px;">
                            <el-option
                              v-for="item in storeList"
                              :key="item.store_id"
                              :label="item.store_name"
                              :value="item.store_id">
                            </el-option>
                          </el-select>
                      </el-form-item>
                      <el-form-item label="货位" style="display: inline-block;">
                        <el-input v-model="changeform.huowei" style="width: 200px;float: left;" placeholder="库存位置"></el-input>
                      </el-form-item>
                      <el-form-item label="展示图" style="display:block;width:100%;min-height:200px;">
                          <div style="display:inline-block;position:relative;" v-for="item,index in changeGoodsBannerImgList">
                            <span style="position:absolute;top:-15px;right:5px;font-size:20px;color:red;" @click="delBannerImg(index)"> x </span>
                            <img style="width:150px;height:150px;" :src="item">
                          </div>
                          <el-upload
                            class="upload-demo"
                            drag
                            :action="uploadUrl"
                            :headers='myHeaders'
                            :on-success="uploadSuccess"
                            multiple>
                            <i class="el-icon-upload"></i>
                            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                            <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
                          </el-upload>
                          
                      </el-form-item>
                    </el-form>
                  </el-tab-pane>
                  
                </el-tabs>

              <div slot="footer" class="dialog-footer">
                <el-button @click="addGoodsDialog = false">取 消</el-button>
                <el-button type="primary" @click="sureToAddGoods">确 定</el-button>
              </div>
    </el-dialog>
    <el-dialog  title="修改物品资料" :visible.sync="changeGoodsDialog">
                <el-tabs type="border-card">
                  <el-tab-pane label="物品资料">
                    <el-form ref="form" :model="changeform" label-width="120px" label-position="left" style="margin-left:20px;">
                      <el-form-item label="物品编码" style="display: inline-block;">
                        <el-input v-model="changeform.good_out_id"  style="width: 200px;float: left;"></el-input>
                      </el-form-item>
                      <el-form-item label="物品名称" style="display: inline-block;margin-left:80px;">
                        <el-input v-model="changeform.good_name" style="width: 200px;float: left;"></el-input>
                      </el-form-item>
                      <el-form-item label="单价" style="display: inline-block;">
                        <el-input v-model="changeform.worth" style="width: 200px;float: left;"></el-input>
                      </el-form-item>
                      <el-form-item label="技术参数" style="display: inline-block;margin-left:80px;">
                        <el-input v-model="changeform.good_parameter" style="width: 200px;float: left;"></el-input>
                      </el-form-item>
                      
                      <el-form-item label="规格型号" style="display: inline-block;">
                        <el-input v-model="changeform.good_mode" style="width: 200px;float: left;"></el-input>
                      </el-form-item>
                      <el-form-item label="生产厂家" style="display: inline-block;margin-left:80px;">
                        <el-input v-model="changeform.good_factory" style="width: 200px;float: left;"></el-input>
                      </el-form-item>
                      <el-form-item label="分类" style="display: inline-block;">
                          <el-select v-model="changeform.type_id" filterable placeholder="请选择" style="width:200px;">
                            <el-option
                              v-for="item in classList.goodTypes"
                              :key="item.type_id"
                              :label="item.type_name"
                              :value="item.type_id">
                            </el-option>
                          </el-select>
                      </el-form-item>
                      <el-form-item label="归属仓库" style="display: inline-block;margin-left:80px;">
                          <el-select v-model="changeform.store_id" style="width: 200px;" filterable placeholder="请选择">
                            <el-option
                              v-for="item in storeList"
                              :key="item.store_id"
                              :label="item.store_name"
                              :value="item.store_id">
                            </el-option>
                          </el-select>
                      </el-form-item>
                      <el-form-item label="库存数量" style="display: inline-block;">
                          <el-input v-model="changeform.quantity" style="width: 200px;float: left;"></el-input>
                      </el-form-item>
                      <el-form-item label="展示图" style="display:block;width:100%;min-height:200px;">
                          <div style="display:inline-block;position:relative;" v-for="item,index in changeGoodsBannerImgList">
                            <span style="position:absolute;top:-15px;right:5px;font-size:20px;color:red;" @click="delBannerImg(index)"> x </span>
                            <img style="width:150px;height:150px;" :src="item">
                          </div>
                          <el-upload
                            class="upload-demo"
                            drag
                            :action="uploadUrl"
                            :headers='myHeaders'
                            :on-success="uploadSuccess1"
                            multiple>
                            <i class="el-icon-upload"></i>
                            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                            <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
                          </el-upload>
                          
                      </el-form-item>
                    </el-form>
                  </el-tab-pane>
                  
                </el-tabs>

              <div slot="footer" class="dialog-footer">
                <el-button @click="changeGoodsDialog = false">取 消</el-button>
                <el-button type="primary" @click="sureToChange">确定修改</el-button>
              </div>
    </el-dialog>
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

  <div class="" id="box">
    <ul>
      <li v-for="v in json.list">
        <img v-bind:src="v.good_banner_img.length==0?'../../../static/img/150.png':v.good_banner_img[0]" alt="">
        <h5>物资名称:{{v.good_name}}</h5>
        <h5>所属仓库:{{v.store_name}}</h5>
        <h5>库存地点:{{v.huowei}}</h5>
        <h5>规格型号:{{v.good_mode}}</h5>
        <h5>技术参数:{{v.good_parameter}}</h5>
        <!-- <h5>单价:<span style="color:blue;margin-left:10px;">{{v.worth}}</span></h5> -->
        <h5>库存:<span style="color:red;margin-left:10px;">{{v.quantity}}</span></h5>
        <div>
          <el-row>
            <el-col :span="12"><div class="grid-content">
               <el-button size="mini" @click="changeDetail(v)" type="warning">修改资料</el-button>
            </div></el-col>
            <el-col :span="12"><div class="grid-content">
               <el-button size="mini" @click="addApplyList()" type="warning">删除物品</el-button>
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
            addManyGoodsDialog:false,
            addManyGoodsUploadUrl:'',
            myHeaders:null,
            uploadUrl:'',
            storeList:'',
            classList:'',
            changeGoodsDialog:false,
            addGoodsDialog:false,
            addGoodsBannerImgList:[],
            changeGoodsBannerImgList:[],
            changeform:{
              worth:'0',
              type_id:''
            },
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
                {good_banner_img:[]}
              ]
            },
             states: []

          }

              
      },
      mounted() {
        var uploadUrl = this.$axios.defaults.baseURL+'/store/uploadGoodPic';
        this.uploadUrl = uploadUrl;
        var addManyGoodsUploadUrl = this.$axios.defaults.baseURL+'/store/good/addGoodByExcel';
        this.addManyGoodsUploadUrl = addManyGoodsUploadUrl;
        var myHeaders = localStorage.getItem('auth');
        var token = {'kf-token':myHeaders}
        this.myHeaders = token;
        this.getNameSearchList('');
        this.getTypeList();
        this.getStoreList();
        this.getDataList();
        this.getClassList();
      },
      watch: {
       
      },
      methods: {
            //下载文件
            downLoadFile(){
              var url = this.$axios.defaults.baseURL+'/ejk/file/物料批量导入模板.xls';
              try{ 
                  var elemIF = document.createElement("iframe");   
                  elemIF.src = url;   
                  elemIF.style.display = "none";   
                  document.body.appendChild(elemIF);   
              }catch(e){ 
       
              } 
            },
            //批量添加物品
            addManyGoods(){
              this.addManyGoodsDialog = true;
            },
            //删除展示图
            delBannerImg(index){
              this.changeGoodsBannerImgList.splice(index,1)
            },
            //上传图片成功
            uploadSuccess(res){
              if(res.code==0){
                this.addGoodsBannerImgList.push(res.msg)
              }else{
                this.$message({
                  type: 'error',
                  message: '上传失败'
                }); 
              }
            },
            //修改图片成功
            uploadSuccess1(res){
              if(res.code==0){
                this.changeGoodsBannerImgList.push(res.data)
              }else{
                this.$message({
                  type: 'error',
                  message: '上传失败'
                }); 
              }
            },
            // //获取仓库信息
            // getClassList(){
            //     const self = this;
            //     var params = new URLSearchParams();
            //     var token = localStorage.getItem('auth');
            //     params.append('pageNum',1);   
            //     params.append('pageSize',1000);        
            //     self.$axios({
            //         method: 'post',
            //         url: '/store/store/getByPage',
            //         data: params,
            //         headers: {'Content-Type': 'application/x-www-form-urlencoded','kf-token':token},
            //      }).then(function(data){
            //         if(data.data.code==0){
            //            self.storeList = data.data.data.list;
            //         }else{
            //           self.$response(data,self);
            //         }
            //      });      
            // },
            uploadSuccessFile(response,file,fileList){
              if(response.code=='0'){
                this.$message({
                  message: response.msg,
                  type: 'success'
                });
              }else{
                 this.$message.error(response.msg);
              }
            },
            //获取分类
            getClassList(){
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
                      self.classList = data.data.data;
                      // self.dataList[0].list = data.data.data.goodTypes;
                      // self.dataList[1].list = data.data.data.goodParameters;
                      // self.dataList[2].list = data.data.data.goodModels;
                      // self.dataList[3].list = data.data.data.goodFactorys;
                    }else{
                      self.$response(data,self);
                    }
                 });
            },
            //确定修改
            sureToChange(){
                const self = this;
                var params = new URLSearchParams();
                var token = localStorage.getItem('auth');
                params.append('good_id',self.changeform.good_id); 
                params.append('good_out_id',self.changeform.good_out_id); 
                params.append('good_name',self.changeform.good_name); 
                params.append('worth',self.changeform.worth); 
                params.append('type_id',self.changeform.type_id); 
                params.append('good_mode',self.changeform.good_mode); 
                params.append('good_parameter',self.changeform.good_parameter); 
                params.append('good_factory',self.changeform.good_factory); 
                params.append('store_id',self.changeform.store_id); 
                params.append('good_banner_img',self.changeGoodsBannerImgList.join(',')); 
                params.append('quantity',self.changeform.quantity); 
                params.append('stock_id',self.changeform.stock_id);
                params.append('good_cover_img',''); 
                params.append('good_content',''); 
                 
                self.$axios({
                    method: 'post',
                    url: '/store/good/update',
                    data: params,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded','kf-token':token},
                 }).then(function(data){
                    if(data.data.code==0){
                      self.$message({
                        type: 'success',
                        message: '修改成功'
                      }); 
                      self.changeGoodsDialog = false;
                      self.getDataList();
                    }else{
                      self.$response(data,self);
                    }
                 });
            },
            //确定新增
            sureToAddGoods(){
                const self = this;
                var params = new URLSearchParams();
                var token = localStorage.getItem('auth');
                 
                params.append('good_out_id',self.changeform.good_out_id); 
                params.append('good_name',self.changeform.good_name); 
                params.append('worth',self.changeform.worth); 
                params.append('type_id',self.changeform.type_id); 
                params.append('good_mode',self.changeform.good_mode); 
                params.append('good_parameter',self.changeform.good_parameter); 
                params.append('good_factory',self.changeform.good_factory);
                params.append('quantity_last',self.changeform.quantity_last);
                // params.append('quantity_now',self.changeform.quantity_now); 
                params.append('in_time',self.changeform.in_time);
                // params.append('out_time',self.changeform.out_time);
                params.append('huowei',self.changeform.huowei);  
                
                params.append('store_id',self.changeform.store_id); 
                params.append('good_banner_img',self.addGoodsBannerImgList.join(',')); 
                params.append('good_cover_img',''); 
                params.append('good_content',''); 
                 
                self.$axios({
                    method: 'post',
                    url: '/store/good/add',
                    data: params,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded','kf-token':token},
                 }).then(function(data){
                    if(data.data.code==0){
                      self.$message({
                        type: 'success',
                        message: '新增成功'
                      }); 
                      self.getDataList();
                      self.addGoodsDialog = false;
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
              
            },
            //页码发生变化加载更多
            handleCurrentChange(){

            },
            changeDetail(res){
                this.changeform = res;
                this.changeGoodsBannerImgList = res.good_banner_img;
                this.changeGoodsDialog = true;
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
            addGoodsClick(){
              this.changeform = {
                worth:'0',
                good_out_id:'',
                good_name:'',
                type_id:'',
                good_mode:'',
                good_parameter:'',
                good_factory:'',
                quantity_last:'',
                // quantity_now:'0',
                in_time:'',
                // out_time:'',
                huowei:'',
                store_id:'',
                good_banner_img:'',
                good_cover_img:'',
                good_content:''
              };
             
              this.changeGoodsBannerImgList = [];
              this.addGoodsDialog = true;
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
                console.log('加载中...')
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
                    url: '/store/good/getGoodsByName1',
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
                      self.json.list = self.json.list.concat(data.data.data.pageInfo.list);
                      console.log(data.data.data.pageInfo.list)
                      console.log(self.json.list)
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
                    url: '/store/good/getGoodsByName1',
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
            }

      }
     
  }
</script>

<style scoped>
        .grid-content{
          text-align: center;
        }
        h4,h5,h6,p{
          width: 220px;
          /*height: auto;*/
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
          width: 100%;
          height: 200px;
          /*margin-left: 50px;*/
          text-align: center;
          margin:0 auto;
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