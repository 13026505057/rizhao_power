<template>
   <el-form ref="form" :model="form" label-width="200px">
<!--     <el-form-item label="名称" style="width: 300px;">
      <el-input v-model="form.name"></el-input>
    </el-form-item>
    <el-form-item label="助记码（名字首字母）" style="width: 300px;">
      <el-input v-model="form.zjm"></el-input>
    </el-form-item> -->
    <!-- <el-form-item label="编号">
      <el-input v-model="form.code"></el-input>
    </el-form-item> -->
<!--     <el-form-item label="备注">
      <el-input v-model="form.remark"></el-input>
    </el-form-item> -->
    <el-form-item label="请选择人员">
      <el-select v-model="form.name" placeholder="请选择人员">
        <el-option v-for="item in options1" :label="item.Employeename" :key="item.id"  :value="item.Employeename"></el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="请再次选择人员">
      <el-select v-model="form.code" placeholder="请再次选择人员">
        <el-option v-for="item in options1" :label="item.Employeename" :key="item.id"  :value="item.Employeecode"></el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="请选择权限">
      <el-select v-model="form.role_name" placeholder="请选择权限">
        <el-option v-for="item in options2" :label="item.role_name" :key="item.id"  :value="item.role_name"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="请再次选择权限">
      <el-select v-model="form.rolecode" placeholder="请再次选择权限">
        <el-option v-for="item in options2" :label="item.role_name" :key="item.id"  :value="item.role_id"></el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="输入登陆密码" style="width:300px">
      <el-input v-model="form.password"></el-input>
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
          code: '',
          name:'',
          rolecode:'',
          role_name:'',
          flat:'true',
          password:''
        
        },
        options1: [],
        options2: [],
      }
    },
    methods: {
      onSubmit() {
        var self = this;
          var code = localStorage.getItem('ms_username');
                
                var aaa = "[{'fcode':'b03','usercode':'"+code+"','code':'"+self.form.code+"','name':'"+self.form.name+"','rolecode':'"+self.form.rolecode+"','role_name':'"+self.form.role_name+"','saveflag':'new','flat':'true','password':'"+self.form.password+"'}]"
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
      },
      request(){
              var self = this;
                var code = localStorage.getItem('ms_username');
                
                var aaa = "[{'fcode':'s04','usercode':'"+code+"'}]"
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
                          self.options1 = data.data.locData.webdata;
                          self.options2 = data.data.retData.webdata;
                        
                        
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