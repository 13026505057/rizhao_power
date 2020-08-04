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
        <span style="margin-left: 10px">{{ scope.row.code }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="姓名"
      width="180">
      <template slot-scope="scope">
        <el-popover trigger="hover" placement="top">
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.name }}</el-tag>
          </div>
        </el-popover>
      </template>
    </el-table-column>
    <el-table-column
      label="密码"
      width="180">
      <template slot-scope="scope">
       
        <span style="margin-left: 10px">{{ scope.row.password }}</span>
      </template>
    </el-table-column>
        <el-table-column
      label="角色编号"
      width="180">
      <template slot-scope="scope">
       
        <span style="margin-left: 10px">{{ scope.row.rolecode }}</span>
      </template>
    </el-table-column>
        <el-table-column
      label="角色名称"
      width="180">
      <template slot-scope="scope">
       
        <span style="margin-left: 10px">{{ scope.row.role_name }}</span>
      </template>
    </el-table-column>
        <el-table-column
      label="有效标志"
      width="180">
      <template slot-scope="scope">
       
        <span style="margin-left: 10px">{{ scope.row.flat }}</span>
      </template>
    </el-table-column>
            <el-table-column
      label="已登录次数"
      width="180">
      <template slot-scope="scope">
       
        <span style="margin-left: 10px">{{ scope.row.cqty }}</span>
      </template>
    </el-table-column>
            <el-table-column
      label="最后登录时间"
      width="180">
      <template slot-scope="scope">
       
        <span style="margin-left: 10px">{{ scope.row.lsttime }}</span>
      </template>
    </el-table-column>
    <el-table-column label="操作" width="180">
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
        // console.log(index, row);
        // localStorage.setItem('tongyongxiugaicode',row.unitcode);
        // localStorage.setItem('tongyongxiugainame',row.unitname);
        // localStorage.setItem('tongyongxiugaidesc',row.unitdesc);
        // localStorage.setItem('tongyongxiugailx',row.unitlx);
        // localStorage.setItem('tongyongxiugaizjm',row.zjm);
        //  this.$router.push('/tongyongxiugai');
        alert('暂不支持直接修改')
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
                
                var aaa = "[{'fcode':'b03','usercode':'"+code+"','code':'"+row.code+"','name':'"+row.name+"','rolecode':'"+row.rolecode+"','role_name':'"+row.role_name+"','saveflag':'del','flat':'true','password':'"+row.password+"'}]"
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
                
                var aaa = "[{'fcode':'s03','usercode':'"+code+"'}]"
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