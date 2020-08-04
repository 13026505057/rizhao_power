<template>
   <el-form ref="form" :model="form" label-width="80px">
    <el-form-item label="名称" style="width: 300px;">
      <el-input v-model="form.unitname"></el-input>
    </el-form-item>
    <el-form-item label="编号">
      <el-input v-model="form.unitcode"></el-input>
    </el-form-item>
    <el-form-item label="备注">
      <el-input v-model="form.unitdesc"></el-input>
    </el-form-item>
   




    <el-form-item>
      <el-button type="primary" @click="onSubmit">立即修改</el-button>
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
          unitcode: '',
          unitname:'',
          unitdesc:'',
          unitlx:'',
          zjm:''
         
        }
      }
    },
    methods: {
      onSubmit() {
      	var self = this;
         	var code = localStorage.getItem('ms_username');
                
                var aaa = "[{'fcode':'b01','usercode':'"+code+"','unitlx':'"+self.form.unitlx+"','unitcode':'"+self.form.unitcode+"','unitname':'"+self.form.unitname+"','unitdesc':'"+self.form.unitdesc+"','saveflag':'edit','zjm':'"+self.form.zjm+"'}]"
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
                            message: '修改成功!'
                          });
                         
                        
                        
                    }else{
                        self.$message({
                          type: 'info',
                          message: '修改失败'
                        });   
                                      
                    }
                 });
      }
    },
     mounted() {
        var unitcode =  localStorage.getItem('tongyongxiugaicode');
        var unitname =  localStorage.getItem('tongyongxiugainame');
        var unitdesc =  localStorage.getItem('tongyongxiugaidesc');
        var unitlx = localStorage.getItem('tongyongxiugailx');
        var zjm = localStorage.getItem('tongyongxiugaizjm');
        this.form.unitcode = unitcode;
        this.form.unitname = unitname;
        this.form.unitdesc = unitdesc;
        this.form.unitlx = unitlx;
        this.form.zjm = zjm;
           
    },
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