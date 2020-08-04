<template>
<!-- <el-button :plain="true" >成功</el-button> -->

  <el-table
    :data="tableData"
    style="width: 100%">
    <el-table-column
      label="编号"
      width="180">
      <template slot-scope="scope">
        <i class="el-icon-time"></i>
        <span style="margin-left: 10px">{{ scope.row.unitcode }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="姓名"
      width="180">
      <template slot-scope="scope">
        <el-popover trigger="hover" placement="top">
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.unitname }}</el-tag>
          </div>
        </el-popover>
      </template>
    </el-table-column>
    <el-table-column
      label="备注"
      width="180">
      <template slot-scope="scope">
       
        <span style="margin-left: 10px">{{ scope.row.unitdesc }}</span>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
   import md5 from 'js-md5';
  export default {

    data() {
      return {
        tableData: []
      }
    },
    methods: {
      handleEdit(index, row) {
        console.log(index, row);
        localStorage.setItem('tongyongxiugaicode',row.unitcode);
        localStorage.setItem('tongyongxiugainame',row.unitname);
        localStorage.setItem('tongyongxiugaidesc',row.unitdesc);
        localStorage.setItem('tongyongxiugailx',row.unitlx);
        localStorage.setItem('tongyongxiugaizjm',row.zjm);
         this.$router.push('/tongyongxiugai');
      },
      handleDelete(index, row) {
        console.log(index, row);
        var self = this;
        self.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {

           var code = localStorage.getItem('ms_username');
                
                var aaa = "[{'fcode':'b01','usercode':'"+code+"','unitlx':'分组','unitcode':'"+row.unitcode+"','unitname':'"+row.unitname+"','unitdesc':'"+row.unitdesc+"','saveflag':'del'}]"
                var bbb = md5.hex(aaa+'urty');
                self.$axios({
                    method: 'post',
                    url: 'http://www.kofanchina.com/main.php/Home/Request/post2',
                    data: {
                        requireUrl:'https://www.srwghb.com/jdfw/lhfw.aspx',
                        wmsdata: aaa,
                        dbname:'wmsdata',
                        wmskey:bbb
                    },
                    headers: {'Content-Type': 'application/json'},
                 }).then(function(data){
                    console.log(data)
                    if(data.data.errNum==0){
                          self.$message({
                            type: 'success',
                            message: '删除成功!'
                          });
                         
                        
                        
                    }else{
                        self.$message({
                          type: 'info',
                          message: '删除失败'
                        });   
                                      
                    }
                 });

         
        }).catch(() => {
          self.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
         
               
      },
      request(){

                var self = this;
                var code = localStorage.getItem('ms_username');
                
                var aaa = "[{'fcode':'s01','usercode':'"+code+"','unitlx':'分组'}]"
                var bbb = md5.hex(aaa+'urty');
                self.$axios({
                    method: 'post',
                    url: 'http://www.kofanchina.com/main.php/Home/Request/post2',
                    data: {
                        requireUrl:'https://www.srwghb.com/jdfw/lhfw.aspx',
                        wmsdata: aaa,
                        dbname:'wmsdata',
                        wmskey:bbb
                    },
                    headers: {'Content-Type': 'application/json'},
                 }).then(function(data){
                    console.log(data)
                    if(data.data.errNum==0){
                         console.log(data)
                          self.tableData = data.data.retData.webdata
                        
                        
                    }else{
                        
                        
                    }
                 });
      }
    },
    mounted() {
           this.request(); 
           
    },
  }
</script>