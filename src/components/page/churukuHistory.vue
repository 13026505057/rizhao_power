<template>
    <div>
        
        <div >

            <div class="block">
               
               <el-input
                  style="width:200px;margin-left:20px;"
                  placeholder="物品编码"
                  v-model="good_number"
                  clearable>
                </el-input>
                <el-date-picker
                  style="margin-left: 30px;width:420px;"
                  v-model="date"
                  type="daterange"
                  range-separator="至"
                  format="yyyy 年 MM 月 dd 日"
                  value-format="yyyy-MM-dd"
                  start-placeholder="起始日期"
                  end-placeholder="结束日期">
                </el-date-picker>
                <el-select style="width:200px;margin-left:30px;" clearable v-model="store_id" filterable placeholder="所在二级库">
                  <el-option
                    v-for="item in storeList"
                    :key="item.store_id"
                    :label="item.store_name"
                    :value="item.store_id">
                  </el-option>
                </el-select>
                
                <el-button type="warning" style="margin-left: 60px;" @click="Search">查询</el-button>
            </div>

          
        </div>
        <div id="container" style="width: 100%;height: 110%; margin-top: 20px;">
          <!-- <div class="numData">
            <div class="tableTitle" style="font-size: 20px;">
              管控人列表
            </div>
            <div class="tableTitle">
              总计：{{total}}人
            </div>
            <div class="tableTitle">
              待监控：{{djk}}人
            </div>
            <div class="tableTitle">
              监控中：{{jkz}}人
            </div>
            <div class="tableTitle">
              已结束：{{jkjs}}人
            </div>
          </div> -->

          <div class="tableList">
            <el-tabs type="border-card" @tab-click="tableClick" v-model="tabPosition">
              <el-tab-pane label="入库历史" name="need">
                <el-table
                  :data="goodsDetail"
                  :header-cell-style="{ 'background-color': '#deedf4','color':'#000'}"
                  :row-style="rowStyle"
                  row-key="log_id"
                  :expand-row-keys="expands"
                  @row-click="rowClick"
                  
                  class="tableClass"
                  style="">
                  <el-table-column type="expand">
                    <template slot-scope="props">
                        <div class="stepLine">
                          <el-steps  align-center>
                            <el-step :status="item.apply_approve_result==1?'success':'finish'" v-for="item,index in props.row.userApplyApproves" :title="item.apply_approve_result==1?'已审批':'待审批'" :description="item.apply_approve_dept_name+item.apply_approve_user_name+item.apply_approve_msg"></el-step>
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
                    label="入库时间"
                    align="center"
                    prop="log_time">
                  </el-table-column>
                  <el-table-column
                    label="入库类型"
                    align="center"
                    >
                    <template slot-scope="props">
                      <span>申请或者初始化</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="申请人"
                    align="center"
                    prop="log_user_true_name">
                  </el-table-column>
                  <el-table-column
                    label="申请物品"
                    align="center"
                    prop="good_name">
                  </el-table-column>
                  <el-table-column
                    label="申请数量"
                    align="center"
                    prop="quantity">
                  </el-table-column>
                  <el-table-column
                    label="申请原因"
                    align="center"
                    prop="userApplyHead.user_apply_reason">
                  </el-table-column>
                  <el-table-column
                    label="调入仓库"
                    align="center"
                    prop="userApplyHead.in_store_name">
                  </el-table-column>
                  <el-table-column
                    label="调出仓库"
                    align="center"
                    prop="userApplyHead.out_store_name">
                  </el-table-column>
                  <el-table-column
                    label="操作"
                    align="center"
                    width="300px"
                    >
                    <template slot-scope="props">
                      <el-button size="mini" type="warning" style="" @click.stop="rowClick(props.row)">审批信息</el-button>
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
              <el-tab-pane label="出库历史" name="history">
                <el-table
                  :data="goodsDetailHistory"
                  :header-cell-style="{ 'background-color': '#deedf4','color':'#000'}"
                  :row-style="rowStyle"
                  row-key="log_id"
                  :expand-row-keys="expands"
                  @row-click="rowClick2"
                  
                  class="tableClass"
                  style="">
                  <el-table-column type="expand">
                    <template slot-scope="props">
                        <div class="stepLine">
                          <el-steps  align-center>
                            <el-step :status="item.apply_approve_result==1?'success':'finish'" v-for="item,index in props.row.userApplyApproves" :title="item.apply_approve_result==1?'已审批':'待审批'" :description="item.apply_approve_dept_name+item.apply_approve_user_name+item.apply_approve_msg"></el-step>
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
                    label="出库时间"
                    align="center"
                    prop="log_time">
                  </el-table-column>
                  <el-table-column
                    label="出库类型"
                    align="center"
                    >
                    <template slot-scope="props">
                      <span>申请出库</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="申请人"
                    align="center"
                    prop="log_user_true_name">
                  </el-table-column>
                  <el-table-column
                    label="申请物品"
                    align="center"
                    prop="good_name">
                  </el-table-column>
                  <el-table-column
                    label="申请数量"
                    align="center"
                    prop="quantity">
                  </el-table-column>
                  <el-table-column
                    label="申请原因"
                    align="center"
                    prop="userApplyHead.user_apply_reason">
                  </el-table-column>
                  <el-table-column
                    label="调入仓库"
                    align="center"
                    prop="userApplyHead.in_store_name">
                  </el-table-column>
                  <el-table-column
                    label="调出仓库"
                    align="center"
                    prop="userApplyHead.out_store_name">
                  </el-table-column>
                  <el-table-column
                    label="操作"
                    align="center"
                    >
                    <template slot-scope="props">
                    <el-button type="warning" size="mini" style="" @click.stop="rowClick2(props.row)">审批信息</el-button>
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
            date:[],
            store_id:'',
            storeList:[],
            good_number:'',
            tabPosition:'need',
            goodsDetailHistory:[{

            }],
            goodsDetail: [{

            }],
            tableData5:[],
            expands:[],
            name:'',
            date:[],
            currentPage:1,
            total:100,
            pageSize:10,
            currentPage2:1,
            total2:100,
            pageSize2:10,
            active: 0
          }

              
      },
      mounted() {
        this.getApplyList();
        this.getStoreList();
      },
      methods: {
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
          //审批通过
          approve(res){
                  const self = this;
                  var params = new URLSearchParams();
                  var token = localStorage.getItem('auth');
                  params.append('user_apply_head_id',res.user_apply_head_id);     
                  self.$axios({
                      method: 'post',
                      url: '/store/stock/confirmOut',
                      data: params,
                      headers: {'Content-Type': 'application/x-www-form-urlencoded','kf-token':token},
                   }).then(function(data){
                      if(data.data.code==0){
                        self.$message({
                          type: 'success',
                          message: '出库成功'
                        });
                        self.getApplyList();
                      }else{
                        self.$response(data,self);
                      }
                   });
               
          },
          //驳回事件
          reject(){
                const self = this;
                self.$prompt('请输入备注', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  
                }).then(({ value }) => {
                  
                  var params = new URLSearchParams();
                  var token = localStorage.getItem('auth');
                  params.append('user_apply_approve_id',res.user_apply_approve_id);
                  params.append('apply_approve_result','0');
                  params.append('apply_approve_msg','驳回该审批'+value);     
                  self.$axios({
                      method: 'post',
                      url: '/store/apply/dealApply',
                      data: params,
                      headers: {'Content-Type': 'application/x-www-form-urlencoded','kf-token':token},
                   }).then(function(data){
                      if(data.data.code==0){
                        self.$message({
                          type: 'success',
                          message: '驳回成功，你的备注是: ' + value
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
          //标签页点击事件
          tableClick(tabName){
            if(tabName.name=='name'){
              this.getApplyList();
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
 
                if (this.expands.indexOf(row.log_id) < 0) {
                    this.expands = []
                    this.expands.push(row.log_id);
                } else {
                    this.expands.remove(row.log_id);
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
 
                if (this.expands.indexOf(row.log_id) < 0) {
                    this.expands = []
                    this.expands.push(row.log_id);
                } else {
                    this.expands.remove(row.log_id);
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
            this.getApplyList();
            this.getApplyListHistory();
          },
          //获取申请历史
          getApplyList(){
                const self = this;
                var params = new URLSearchParams();
                var token = localStorage.getItem('auth');
                params.append('pageNum',self.currentPage); 
                params.append('pageSize','9');
                params.append('good_out_id',self.good_number);
                params.append('store_id',self.store_id);   
                params.append('log_type','in');
                if(self.date==null||self.date.length==0){
                  var begin_time = '';
                  var end_time = '';
                }else{
                  var begin_time = self.date[0];
                  var end_time = self.date[1];
                } 
                params.append('log_begin_time',begin_time);   
                params.append('log_end_time',end_time);
                self.$axios({
                    method: 'post',
                    url: '/store/stock/getLog',
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
                params.append('good_out_id',self.good_number);
                params.append('store_id',self.store_id);   
                params.append('log_type','out');
                if(self.date==null||self.date.length==0){
                  var begin_time = '';
                  var end_time = '';
                }else{
                  var begin_time = self.date[0];
                  var end_time = self.date[1];
                }      
                params.append('log_begin_time',begin_time);   
                params.append('log_end_time',end_time); 
                self.$axios({
                    method: 'post',
                    url: '/store/stock/getLog',
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
            this.getApplyList();
          },
          handleCurrentChange2(){
            this.getApplyListHistory();
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
      height: 120px;
      overflow-x: auto;
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
    .tableList::-webkit-scrollbar,.stepLine::-webkit-scrollbar {/*滚动条整体样式*/
            width: 4px;     /*高宽分别对应横竖滚动条的尺寸*/
            height: 4px;
    }
    .tableList::-webkit-scrollbar-thumb,.stepLine::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
            border-radius: 5px;
            -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
            background: rgba(0,0,0,0.2);
    }
    .tableList::-webkit-scrollbar-track,.stepLine::-webkit-scrollbar-track {/*滚动条里面轨道*/
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