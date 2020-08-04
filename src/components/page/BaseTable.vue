<template>
   <el-form ref="form" :model="form" label-width="80px">
    <el-form-item label="名称" style="width: 300px;">
      <el-input v-model="form.name"></el-input>
    </el-form-item>
    <el-form-item label="助记码（名字首字母）" style="width: 300px;">
      <el-input v-model="form.zjm"></el-input>
    </el-form-item>
    <!-- <el-form-item label="编号">
      <el-input v-model="form.code"></el-input>
    </el-form-item> -->
    <el-form-item label="备注">
      <el-input v-model="form.remark"></el-input>
    </el-form-item>
    <el-form-item label="类型">
      <el-select v-model="form.region" placeholder="请选择类型">
        <el-option label="职务" value="职务"></el-option>
        <el-option label="部门" value="部门"></el-option>
        <el-option label="分组" value="分组"></el-option>
        <el-option label="资料" value="资料"></el-option>
      </el-select>
    </el-form-item>




    <el-form-item>
      <el-button type="primary" @click="onSubmit">立即创建</el-button>
      <el-button>取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import md5 from 'js-md5';
 export default {
    data() {
      return {
        form: {
          name: '',
          zjm:'',
          remark:'',
          region:''
        
        }
      }
    },
    methods: {
      onSubmit() {
        var self = this;
          var code = localStorage.getItem('ms_username');
                
                var aaa = "[{'fcode':'b01','usercode':'"+code+"','unitlx':'"+self.form.region+"','unitcode':'','unitname':'"+self.form.name+"','unitdesc':'"+self.form.remark+"','saveflag':'new','zjm':'"+self.form.zjm+"'}]"
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
                            message: '添加成功!'
                          });
                         
                        
                        
                    }else{
                        self.$message({
                          type: 'info',
                          message: '添加失败'
                        });   
                                      
                    }
                 });
      }
    }
  }
    
</script>

<style scoped>
.handle-box{
    margin-bottom: 20px;
}
.handle-select{
    width: 120px;
}
.handle-input{
    width: 300px;
    display: inline-block;
}
</style>