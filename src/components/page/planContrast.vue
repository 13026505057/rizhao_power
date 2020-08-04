<template>
    <div>
        
        <div >

            <div class="block">
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
                <el-button type="warning" style="margin-left: 60px;" @click="Search">查询</el-button>
                <el-button type="warning" style="margin-left: 200px;" @click="planUploadDialog = true">上传计划</el-button>
                <el-button type="warning" style="margin-left: 60px;" @click="downLoadFile">下载计划模板</el-button>
            </div>

          
        </div>
        <div id="container" style="width: 100%;height: 110%; margin-top: 20px;">
          <el-dialog
            title="计划上传"
            :visible.sync="planUploadDialog"
            width="40%"
            center
            >
            <el-upload
              class="upload-demo"
              drag
              :data="uploadData"
              :headers="myHeaders"
              name="file"
              style="text-align:center;"
              :action="planUploadUrl"
              :on-success="uploadSuccess"
              >
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
              <div class="el-upload__tip" slot="tip">只能上传excle文件</div>
          </el-upload>
          <span slot="footer" class="dialog-footer">
            <el-button @click="planUploadDialog = false">取 消</el-button>
            <el-button type="primary" @click="planUploadDialog = false">确 定</el-button>
          </span>
        </el-dialog>
          <el-dialog
            title="详细库存情况"
            :visible.sync="detailDialog"
            width="50%"
            center>
                <el-table
                  :data="detailList"
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
                    label="物品编号"
                    align="center"
                    prop="good_out_id">
                  </el-table-column>
                  <el-table-column
                    label="物品名称"
                    align="center"
                    prop="good_name">
                  </el-table-column>
                  <el-table-column
                    label="规格型号"
                    align="center"
                    prop="good_mode">
                  </el-table-column>
                  <el-table-column
                    label="技术参数"
                    align="center"
                    prop="good_parameter">
                  </el-table-column>
                  <el-table-column
                    label="生产厂家"
                    align="center"
                    prop="good_factory">
                  </el-table-column>
                  <el-table-column
                    label="所在仓库"
                    align="center"
                    prop="store_name">
                  </el-table-column>
                  <el-table-column
                    label="库存总数"
                    align="center"
                    prop="quantity">
                  </el-table-column>
                </el-table> 
                <el-pagination
                  small
                  background
                  style="text-align: center;margin-top: 20px;"
                  @current-change="handleCurrentChange1"
                  :current-page.sync="currentPage1"
                  :page-size="pageSize1"
                  layout="prev, pager, next, jumper"
                  :total="total1">
                </el-pagination>
            <span slot="footer" class="dialog-footer">
              
              <el-button type="primary" @click="detailDialog = false">确 定</el-button>
            </span>
          </el-dialog>
          <div class="tableList">
            <el-tabs type="border-card" @tab-click="tableClick" v-model="tabPosition">
              <el-tab-pane label="计划对比" name="fir">
                <el-table
                  :data="goodsDetail"
                  :header-cell-style="{ 'background-color': '#deedf4','color':'#000'}"
                  :row-style="rowStyle"
                  class="tableClass"
                  style="">
                  <!-- <el-table-column type="expand">
                    <template slot-scope="props">
                        <div class="stepLine">
                          <el-steps  align-center>
                            <el-step :status="item.apply_approve_result==1?'finish':'wait'" v-for="item,index in props.row.userApplyApprove" :title="'步骤'+(index+1)" :description="item.apply_approve_dept_name+item.apply_approve_user_name+item.apply_approve_msg"></el-step>
                          </el-steps>
                        </div>
                    </template>
                  </el-table-column> -->
                  <el-table-column
                    type="index"
                    align="center"
                    width="50">
                  </el-table-column>
                  <el-table-column
                    label="物品编号"
                    align="center"
                    prop="good_out_id">
                  </el-table-column>
                  <el-table-column
                    label="物品名称"
                    align="center"
                    prop="good_name">
                  </el-table-column>
                  <el-table-column
                    label="规格型号"
                    align="center"
                    prop="good_mode">
                  </el-table-column>
                  <el-table-column
                    label="技术参数"
                    align="center"
                    prop="good_parameter">
                  </el-table-column>
                  <el-table-column
                    label="生产厂家"
                    align="center"
                    prop="good_factory">
                  </el-table-column>
                  <el-table-column
                    label="计划提报数"
                    align="center"
                    prop="good_buy_quantity">
                  </el-table-column>
                  <el-table-column
                    label="库存总数"
                    align="center"
                    prop="good_now_quantity">
                  </el-table-column>
                  <el-table-column
                    label="操作"
                    align="center"
                    width="300px"
                    >
                    <template slot-scope="props">
                      
                      <el-button :disabled="props.row.good_id==null?true:false" size="mini" type="warning" style="" @click.stop="reject(props.row)">详细库存信息</el-button>
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
              </el-tab-pane>
              <el-tab-pane label="计划对比历史" name="history">
                <el-table
                  :data="goodsDetailHistory"
                  :header-cell-style="{ 'background-color': '#deedf4','color':'#000'}"
                  :row-style="rowStyle"
                  row-key="user_apply_head_id"
                  :expand-row-keys="expands"
                  @row-click="rowClick2"
                  
                  class="tableClass"
                  style="">
                  <el-table-column type="expand">
                    <template slot-scope="props">
                        <div class="stepLine">
                          <el-steps  align-center>
                            <el-step :status="item.apply_approve_result==1?'finish':'wait'" v-for="item,index in props.row.userApplyApprove" :title="'步骤'+(index+1)" :description="item.apply_approve_dept_name+item.apply_approve_user_name+item.apply_approve_msg"></el-step>
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
                    label="对比文件名"
                    align="center"
                    prop="buy_name">
                  </el-table-column>
                  
                  <el-table-column
                    label="上传时间"
                    align="center"
                    prop="create_time">
                  </el-table-column>
                  
                  
                  
                  <el-table-column
                    label="操作"
                    align="center"
                    >
                    <template slot-scope="props">
                    <el-button type="warning" size="mini" style="" @click.stop="contrastDetail(props.row)">对比详情</el-button>
                    </template>
                  </el-table-column>
                  
                </el-table> 
                <el-pagination
                  small
                  background
                  style="text-align: center;margin-top: 20px;"
                  @current-change="handleCurrentChange2"
                  :current-page.sync="currentPage2"
                  :page-size="pageSize2"
                  layout="prev, pager, next, jumper"
                  :total="total2">
                </el-pagination>
              </el-tab-pane>
              
            </el-tabs>
            
          </div>
          
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
            detailDialog:false,
            detailList:[],
            myHeaders:null,
            planUploadUrl:'',
            planUploadDialog:false,
            tabPosition:'fir',
            goodsDetailHistory:[],
            goodsDetail: [],
            tableData5:[],
            expands:[],
            uploadData:{},
            name:'',
            date:[],
            currentPage:1,
            total:0,
            pageSize:10,
            currentPage2:1,
            total2:0,
            pageSize2:10,
            active: 0,
            total1:0,
            currentPage1:1,
            pageSize1:10,
          }

              
      },
      mounted() {
        var uploadUrl = this.$axios.defaults.baseURL+'/store/buy/uploadPlan';
        this.planUploadUrl = uploadUrl;
        var myHeaders = localStorage.getItem('auth');
        var token = {'kf-token':myHeaders}
        this.myHeaders = token;
        this.uploadData = {
          pageNum:this.currentPage,
          pageSize:this.pageSize
        }
        // this.getApplyList();
      },
      methods: {
          //下载文件
          downLoadFile(){
            var url = this.$axios.defaults.baseURL+'/ejk/file/采购计划导入.xls';
            console.log(url)
            try{ 
                var elemIF = document.createElement("iframe");   
                elemIF.src = url;   
                elemIF.style.display = "none";   
                document.body.appendChild(elemIF);   
            }catch(e){ 
     
            } 
          },
          //  对比详情
          contrastDetail(res){
            this.goodsDetail = res.buyLines;
            this.tabPosition = 'fir'
          },
          //上传成功
          uploadSuccess(response, file, fileList){
            console.log(response)
            if(response.code=='0'){
              this.goodsDetail = response.data.list[0].buyLines;
              this.total = response.data.total;
              this.planUploadDialog = false;
            }else if(response.code=='500'){
              this.$message.error('系统错误');
            }else{
              this.$message.error(response.msg);
            }
             
          },
          //审批通过
          approve(res){
                const self = this;
                self.$prompt('请输入备注', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  
                }).then(({ value }) => {
                  
                  var params = new URLSearchParams();
                  var token = localStorage.getItem('auth');
                  params.append('user_apply_approve_id',res.user_apply_approve_id);
                  params.append('apply_approve_result','1');
                  params.append('apply_approve_msg','同意该审批'+value);     
                  self.$axios({
                      method: 'post',
                      url: '/store/apply/dealApply',
                      data: params,
                      headers: {'Content-Type': 'application/x-www-form-urlencoded','kf-token':token},
                   }).then(function(data){
                      if(data.data.code==0){
                        self.$message({
                          type: 'success',
                          message: '审批成功，你的备注是: ' + value
                        });
                        self.getApplyList();
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
          handleCurrentChange1(){
            this.reject();
          },
          //驳回事件
          reject(res){
            console.log(res)
                  const self = this;
                  var params = new URLSearchParams();
                  var token = localStorage.getItem('auth');
                  params.append('pageNum',self.currentPage); 
                  params.append('pageSize',self.pageSize);
                  // params.append('good_out_id',res.match_good_out_id);     
                  params.append('good_id',res.good_id);
                  self.$axios({
                      method: 'post',
                      url: '/store/good/getGoodsByName',
                      data: params,
                      headers: {'Content-Type': 'application/x-www-form-urlencoded','kf-token':token},
                   }).then(function(data){
                      if(data.data.code==0){
                          self.detailList = data.data.data.pageInfo.list;
                          self.total1 = data.data.data.pageInfo.total;
                          self.detailDialog = true;
                      }else{
                        self.$response(data,self);
                      }
                   });
                
          },
          //标签页点击事件
          tableClick(tabName){
            if(tabName.name=='fir'){
              
            }else{
              this.getApplyListHistory();
            }
          },
          //点击展开表格展示处置
          rowClick(row) {
                Array.prototype.remove = function (val) {
                    let index = this.indexOf(val);
                    if (index > -1) {
                        this.splice(index, 1);
                    }
                };
 
                if (this.expands.indexOf(row.user_apply_head_id) < 0) {
                    this.expands = []
                    this.expands.push(row.user_apply_head_id);
                } else {
                    this.expands.remove(row.user_apply_head_id);
                }
                // console.log(this.expands)
 
          },
          //点击展开表格展示处置
          rowClick2(row) {
                Array.prototype.remove = function (val) {
                    let index = this.indexOf(val);
                    if (index > -1) {
                        this.splice(index, 1);
                    }
                };
 
                if (this.expands.indexOf(row.user_apply_head_id) < 0) {
                    this.expands = []
                    this.expands.push(row.user_apply_head_id);
                } else {
                    this.expands.remove(row.user_apply_head_id);
                }
                // console.log(this.expands)
 
          },
          //修改单元行颜色
          rowStyle({ row, rowIndex}){
            if(rowIndex%2 ==0){
              return 'background:#eee;color:#000;'
            }else{
             return 'background:#e5e7e8;color:#000;'
            }
          },      
          next() {
            if (this.active++ > 2) this.active = 0;
          },
          //按条件查询
          Search(){
           
            this.getApplyListHistory();
          },
          //获取申请历史
          getApplyList(){
                const self = this;
                var params = new URLSearchParams();
                var token = localStorage.getItem('auth');
                params.append('pageNum',self.currentPage); 
                params.append('pageSize','9');
                params.append('approve_type','in');
                params.append('apply_approve_status','2');
                if(self.date==null||self.date.length==0){
                  var begin_time = '';
                  var end_time = '';
                }else{
                  var begin_time = self.date[0];
                  var end_time = self.date[1];
                }      
                params.append('user_apply_begin_time',begin_time); 
                params.append('user_apply_end_time',end_time);      
                self.$axios({
                    method: 'post',
                    url: '/store/apply/getNeedDealApply',
                    data: params,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded','kf-token':token},
                 }).then(function(data){
                    if(data.data.code==0){
                      self.goodsDetail = data.data.data.list;
                      self.total = data.data.data.total;
                    }else{
                      self.$response(data,self);
                    }
                 });
          },
          getApplyListHistory(){
                const self = this;
                var params = new URLSearchParams();
                var token = localStorage.getItem('auth');
                params.append('pageNum',self.currentPage2); 
                params.append('pageSize','9'); 
                if(self.date==null||self.date.length==0){
                  var begin_time = '';
                  var end_time = '';
                }else{
                  var begin_time = self.date[0];
                  var end_time = self.date[1];
                }      
                params.append('begin_time',begin_time); 
                params.append('end_time',end_time);     
                self.$axios({
                    method: 'post',
                    url: '/store/buy/getBuyHeadByPage',
                    data: params,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded','kf-token':token},
                 }).then(function(data){
                    if(data.data.code==0){
                      self.goodsDetailHistory = data.data.data.list;
                      self.total2 = data.data.data.total;
                    }else{
                      self.$response(data,self);
                    }
                 });
          },
          handleSelect(item) {
              
          },
          handleCurrentChange(){

          },
          handleCurrentChange2(){

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
         
         
         
         
         
        
         
        
          
          
         
         
          
         
      }
     
  }
</script>

<style scoped>
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
      overflow-y: scroll;
      /*background-color: #231a75;*/
    }
    .tableClass::-webkit-scrollbar {/*滚动条整体样式*/
            width: 4px;     /*高宽分别对应横竖滚动条的尺寸*/
            height: 4px;
    }
    .tableClass::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
            border-radius: 5px;
            -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
            background: rgba(0,0,0,0.2);
    }
    .tableClass::-webkit-scrollbar-track {/*滚动条里面轨道*/
            -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
            border-radius: 0;
            background: rgba(0,0,0,0.1);
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