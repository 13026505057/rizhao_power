<template>
<div>
<el-tabs type="border-card">
  <el-tab-pane label="主要信息">
    <el-form ref="form" :model="form" label-width="180px">
    <el-form-item label="姓名*" style="width: 400px;">
      <el-input v-model="form.Employeename"></el-input>
    </el-form-item>
   
    <el-form-item label="性别*" style="width: 300px;">
      <el-input v-model="form.Employeesex"></el-input>
    </el-form-item>

    <el-form-item label="身份证号*" style="width: 600px;">
      <el-input v-model="form.Employeeidcard"></el-input>
    </el-form-item>
   





    <el-form-item>
     
      <el-button>取消</el-button>
    </el-form-item>
  </el-form>

  </el-tab-pane>
  <el-tab-pane label="补充信息">
        <el-form ref="form" :model="form" label-width="180px">

    <el-form-item label="助记码*(姓名的首位字母)" style="width: 300px;">
      <el-input v-model="form.zjm"></el-input>
    </el-form-item>

    <el-form-item label="学历*" style="width: 300px;">
      <el-input v-model="form.Employeeedu"></el-input>
    </el-form-item>
    <el-form-item label="生日*" style="width: 300px;">
     <el-date-picker
      v-model="date1"
      type="date"
      placeholder="请选择日期">
    </el-date-picker>
    </el-form-item>

    <el-form-item label="职务*" style="width: 300px;">
      <el-select v-model="form.Employeerank" placeholder="请选择职务">
        <el-option v-for="item in options1" :label="item.unitname" :key="item.id"  :value="item.unitname"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="就职日期*" style="width: 300px;">
     <el-date-picker
      v-model="date2"
      type="date"
      placeholder="请选择日期">
    </el-date-picker>
    </el-form-item>
    <el-form-item label="现住址" style="width: 600px;">
      <el-input v-model="form.Employeeaddr"></el-input>
    </el-form-item>
    <el-form-item label="邮编" style="width: 300px;">
      <el-input v-model="form.Employeezip"></el-input>
    </el-form-item>
    <el-form-item label="手机" style="width: 300px;">
      <el-input v-model="form.Employeetel"></el-input>
    </el-form-item>
    <el-form-item label="身份证地址" style="width: 600px;">
      <el-input v-model="form.Employeerdr"></el-input>
    </el-form-item>
   <!--  <el-form-item label="操作员" style="width: 300px;">
      <el-input v-model="form.Employeeuser"></el-input>
    </el-form-item> -->
    <el-form-item label="所在部门">
      <el-select v-model="form.Employeedept" placeholder="请选择部门">
        <el-option v-for="item in options" :label="item.unitname" :key="item.id"  :value="item.unitname"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="家庭电话" style="width: 300px;">
      <el-input v-model="form.Employeejttel"></el-input>
    </el-form-item>





 
  </el-form>
  </el-tab-pane>
  <el-tab-pane label="分组信息">
        <el-form ref="form" :model="form" label-width="180px">
  
    <el-form-item label="分组" style="width: 300px;">
       <el-select v-model="form.zname" placeholder="请选择分组">
        <el-option v-for="item in options2" :label="item.unitname" :key="item.id"  :value="item.unitname"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="确认分组" style="width: 350px;">
      <el-select v-model="form.zcode" placeholder="请再次选择分组">
        <el-option v-for="item in options2" :label="item.unitname" :key="item.id"  :value="item.unitcode"></el-option>
      </el-select>
    </el-form-item>


  </el-form>
  </el-tab-pane>
  
</el-tabs>
 <el-button type="primary" @click="onSubmit">立即创建</el-button>
   </div>
</template>

<script>
import md5 from 'js-md5';
 export default {
    data() {
      return {
        form: {
          Employeename: '',
          zjm:'',
          Employeesex:'',
          Employeeedu:'',
          Employeeborthday:'',
          Employeeidcard:'',
          Employeerank:'',
          Employeecdate:'',
          Employeeaddr:'',
          Employeezip:'',
          Employeetel:'',
          Employeerdr:'',
          Employeedept:'',
          Employeejttel:'',
          zcode:'',
          zname:''
        },
        options: [],
        options1:[],
        options2:[],
        date1:'',
        date2:''
      }
    },
    methods: {
      onSubmit() {
        var self = this;
          var code = localStorage.getItem('ms_username');
                 let time1 = self.$moment(self.date1).format("YYYY-MM-DD");
                 let time2 = self.$moment(self.date2).format("YYYY-MM-DD");
                var aaa = "[{'fcode':'b02','usercode':'"+code+"','Employeecode':'','Employeename':'"+self.form.Employeename+"','flag':'在职','zjm':'"+self.form.zjm+"','Employeesex':'"+self.form.Employeesex+"','Employeeedu':'"+self.form.Employeeedu+"','Employeeborthday':'"+time1+"','Employeeidcard':'"+self.form.Employeeidcard+"','Employeerank':'"+self.form.Employeerank+"','Employeecdate':'"+time2+"','Employeeaddr':'"+self.form.Employeeaddr+"','Employeezip':'"+self.form.Employeezip+"','Employeetel':'"+self.form.Employeetel+"','Employeerdr':'"+self.form.Employeerdr+"','Employeeuser':'"+code+"','Employeedept':'"+self.form.Employeedept+"','Employeejttel':'"+self.form.Employeejttel+"','Employeeinputedate':'','zcode':'"+self.form.zcode+"','zname':'"+self.form.zname+"','saveflag':'new'}]"
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
                
                var aaa = "[{'fcode':'s01','usercode':'"+code+"','unitlx':'部门'}]"
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
                          self.options = data.data.retData.webdata
                        
                        
                    }else{
                        
                        
                    }
                 });
      },
      request2(){
                var self = this;
                var code = localStorage.getItem('ms_username');
                
                var aaa = "[{'fcode':'s01','usercode':'"+code+"','unitlx':'职务'}]"
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
                          self.options1 = data.data.retData.webdata
                        
                        
                    }else{
                        
                        
                    }
                 });
      },
      request3(){
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
                          self.options2 = data.data.retData.webdata
                        
                        
                    }else{
                        
                        
                    }
                 });
      }
    },
    mounted() {
           this.request(); 
           this.request2(); 
           this.request3(); 
           
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