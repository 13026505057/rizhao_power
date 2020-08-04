<template>
  <div v-loading.fullscreen.lock="loadingAll" class="FirBox">
    <div class="block">
               
                

                <!-- <el-select clearable v-model="good_name" style="height:40px;" remote reserve-keyword :remote-method="remoteMethod" :loading="loading" filterable placeholder="物品名称">
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
                </el-input> -->
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

                <el-button type="warning" style="margin-left: 180px;" @click="exportClick">下载对应报表</el-button>

                <el-button type="warning" style="margin-left: 180px;" @click="shangchuan">上传文件</el-button>
    </div>

    
      <el-dialog
            title="物品批量导入"
            :visible.sync="uploadDialog"
            width="40%"
            style="text-align:center;"
            >
            <el-upload
              class="upload-demo"
              drag
              :headers="myHeaders"
              :action="uploadNewUrl"
              :on-success="uploadSuccess"
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
 <div class="tableList">
            <el-table
              :data="tableData5"
              :header-cell-style="{ 'background-color': '#deedf4','color':'#000'}"
              :row-style="rowStyle"
              class="tableClass"
              style="">
              <el-table-column
                type="index"
                align="center"
                width="50">
              </el-table-column>
              <el-table-column
                label="物品名称"
                align="center"
                prop="good_name">
              </el-table-column>
              <el-table-column
                label="归属仓库"
                align="center"
                prop="store_name">
              </el-table-column>
              <el-table-column
                label="货位"
                align="center"
                prop="huowei">
              </el-table-column>
              <el-table-column
                label="库存数量"
                align="center"
                prop="quantity">
              </el-table-column>
              <el-table-column
                label="物品参数"
                align="center"
                prop="good_parameter">
              </el-table-column>
              <el-table-column
                label="物品型号"
                align="center"
                prop="good_mode">
              </el-table-column>
              <el-table-column
                label="生产厂商"
                align="center"
                prop="good_factory">
              </el-table-column>
              
            </el-table> 
                
          </div>
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
            uploadDialog:false,
            myHeaders:null,
            loadingAll:false,
            tableData5:[],
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
            uploadNewUrl:'',
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
                  price:423
                }
              ]
            },
             states: []

          }

              
      },
      mounted() {
        var myHeaders = localStorage.getItem('auth');
        var token = {'kf-token':myHeaders}
        this.myHeaders = token;
        var uploadNewUrl = this.$axios.defaults.baseURL+'/store/stock/updateByExcel';
        this.uploadNewUrl = uploadNewUrl;
        this.getNameSearchList('');
        this.getTypeList();
        this.getStoreList();
        this.getDataList();
        this.getMyStoreList();
      },
      watch: {
       
      },
      methods: {
             uploadSuccess(res){
              if(res.code==0){
                this.$message({
                  type: 'success',
                  message: res.msg
                }); 
              }else{
                this.$message({
                  type: 'error',
                  message: '上传失败'
                }); 
              }
            },
            shangchuan(){
              this.uploadDialog = true;
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
              this.loadingAll = false;
            },
             //修改单元行颜色
            rowStyle({ row, rowIndex}){
              if(rowIndex%2 ==0){
                return 'background:#eee;color:#000;'
              }else{
               return 'background:#e5e7e8;color:#000;'
              }
            },  
            //导出报表
            exportClick(){
                
                const self = this;
                
                var params = new URLSearchParams();
                var token = localStorage.getItem('auth');
                params.append('store_id',self.store_id); 
                self.$axios({
                    method: 'post',
                    url: '/store/stock/exportStock',
                    data: params,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded','kf-token':token},
                 }).then(function(data){
                    if(data.data.code==0){
                      window.open(data.data.data);
                    }else{
                      self.$response(data,self);
                    }
                    
                 });
            },
            //确定新增物资申请
            addApplyGoods(res){
                const self = this;
                
                var params = new URLSearchParams();
                var token = localStorage.getItem('auth');
                params.append('good_id',self.applyForm.good_id);
                params.append('in_store_id',self.applyForm.in_store_id);
                params.append('out_store_id',self.applyForm.out_store_id);
                params.append('quantity',self.applyForm.quantity);
                params.append('apply_type','diaobo');
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
              this.getDataList();
            },
            applyNow(res){
                this.applyGoods = true;
                this.applyForm.out_store_id = res.store_id;
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
                      self.dataList[4].list = data.data.data.goodAttach;
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
                
                var params = new URLSearchParams();
                var token = localStorage.getItem('auth');
                var good_mode_count,good_parameter_count,good_factory_count,type_id_count,good_attach_count;
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
                if(self.choose[4]=='undefined'||self.choose[4]==null||self.choose[4]==''){
                  good_attach_count = ''
                }else{
                  good_attach_count = self.choose[4].good_attach;
                }
                params.append('pageNum',self.currentPage); 
                params.append('pageSize',self.pageSize);
                params.append('good_mode',good_mode_count);
                params.append('good_out_id',self.good_number);
                params.append('good_parameter',good_parameter_count);
                params.append('good_factory',good_factory_count);
                params.append('type_id',type_id_count); 
                params.append('good_name',self.good_name);
                params.append('store_id',self.store_id);
                params.append('good_attach',good_attach_count);  
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
                      self.dataList[4].list = data.data.data.goodAttach;
                      self.tableData5 = data.data.data.pageInfo.list;
                      self.total = data.data.data.pageInfo.total;
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
                      self.dataList[4].list = data.data.data.goodAttach;
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
        .tableClass{
      width: 100%;
      height: auto;
      /*background-color: #231a75;*/
    }
    .tableList{
      width: 99%;
      height: 535px!important;
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

</style>