<template>
<div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-date"></i> 资料修改</el-breadcrumb-item>
                <el-breadcrumb-item>警员资料修改</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
   <el-form ref="form" :model="form" label-width="280px">
    <el-form-item label="姓名" style="width: 500px;">
      <el-input v-model="form.Employeename"></el-input>
    </el-form-item>
    <el-form-item label="助记码(姓名的首位字母)" style="width: 400px;">
      <el-input v-model="form.zjm"></el-input>
    </el-form-item>
    <el-form-item label="性别" style="width: 400px;">
      <el-input v-model="form.Employeesex"></el-input>
    </el-form-item>
    <el-form-item label="学历" style="width: 500px;">
      <el-input v-model="form.Employeeedu"></el-input>
    </el-form-item>
    <el-form-item label="生日（格式为2018-01-01）" style="width: 600px;">
       <el-date-picker
      v-model="form.Employeeborthday"
      type="date"
      placeholder="请选择日期">
    </el-date-picker>
    </el-form-item>
    <el-form-item label="身份证号" style="width: 700px;">
      <el-input v-model="form.Employeeidcard"></el-input>
    </el-form-item>
    <el-form-item label="职务" style="width: 300px;">
      <el-select v-model="form.Employeerank" placeholder="请选择职务">
        <el-option v-for="item in options1" :label="item.unitname" :key="item.id"  :value="item.unitname"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="就职日期（格式为2018-01-01）" style="width: 600px;">
     
       <el-date-picker
      v-model="form.Employeecdate"
      type="date"
      placeholder="请选择日期">
    </el-date-picker>
    </el-form-item>
    <el-form-item label="现住址" style="width: 700px;">
      <el-input v-model="form.Employeeaddr"></el-input>
    </el-form-item>
    <el-form-item label="邮编" style="width: 500px;">
      <el-input v-model="form.Employeezip"></el-input>
    </el-form-item>
    <el-form-item label="手机" style="width: 500px;">
      <el-input v-model="form.Employeetel"></el-input>
    </el-form-item>
    <el-form-item label="身份证地址" style="width: 700px;">
      <el-input v-model="form.Employeerdr"></el-input>
    </el-form-item>
   <!--  <el-form-item label="操作员" style="width: 300px;">
      <el-input v-model="form.Employeeuser"></el-input>
    </el-form-item> -->
    <!-- <el-form-item label="所在部门">
      <el-select v-model="form.Employeedept" placeholder="请选择部门">
        <el-option v-for="item in options" :label="item.unitname" :key="item.id"  :value="item.unitname"></el-option>
      </el-select>
    </el-form-item> -->
    <el-form-item label="家庭电话" style="width: 500px;">
      <el-input v-model="form.Employeejttel"></el-input>
    </el-form-item>
    <el-form-item label="组编号" style="width: 500px;">
      
      <el-select v-model="form.zcode" placeholder="请选择分组">
        <el-option v-for="item in options2" :label="item.unitname" :key="item.id"  :value="item.unitcode"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="组名称" style="width: 500px;">
      <el-select v-model="form.zname" placeholder="请选择分组">
        <el-option v-for="item in options2" :label="item.unitname" :key="item.id"  :value="item.unitname"></el-option>
      </el-select>
    </el-form-item>
   <!--  <el-form-item label="类型">
      <el-select v-model="form.region" placeholder="请选择类型">
        <el-option label="职务" value="职务"></el-option>
        <el-option label="部门" value="部门"></el-option>
        <el-option label="分组" value="分组"></el-option>
        <el-option label="资料" value="资料"></el-option>
      </el-select>
    </el-form-item> -->




    <el-form-item>
      <el-button type="primary" @click="onSubmit">立即修改</el-button>
      <el-button>取消</el-button>
    </el-form-item>
  </el-form>
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
          zname:'',
          flag:'',
          Employeeinputedate:'',
          Employeecode:''
         
        },
        options2:[],
        options:[],
        options1:[]
      }
    },
    methods: {
      onSubmit() {
      	var self = this;
         	var code = localStorage.getItem('ms_username');
         
                var aaa = "[{'fcode':'b02','usercode':'"+code+"','Employeecode':'"+self.form.Employeecode+"','Employeename':'"+self.form.Employeename+"','flag':'"+self.form.flag+"','zjm':'"+self.form.zjm+"','Employeesex':'"+self.form.Employeesex+"','Employeeedu':'"+self.form.Employeeedu+"','Employeeborthday':'"+self.form.Employeeborthday+"','Employeeidcard':'"+self.form.Employeeidcard+"','Employeerank':'"+self.form.Employeerank+"','Employeecdate':'"+self.form.Employeecdate+"','Employeeaddr':'"+self.form.Employeeaddr+"','Employeezip':'"+self.form.Employeezip+"','Employeetel':'"+self.form.Employeetel+"','Employeerdr':'"+self.form.Employeerdr+"','Employeeuser':'"+code+"','Employeedept':'"+self.form.Employeedept+"','Employeejttel':'"+self.form.Employeejttel+"','Employeeinputedate':'"+self.form.Employeeinputedate+"','zcode':'"+self.form.zcode+"','zname':'"+self.form.zname+"','saveflag':'edit'}]"
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
        var Employeecode =  localStorage.getItem('Employeecode');
        var Employeename =  localStorage.getItem('Employeename');
        var flag =  localStorage.getItem('flag');
        var zjm =  localStorage.getItem('zjm');
        var Employeesex =  localStorage.getItem('Employeesex');
        var Employeeedu =  localStorage.getItem('Employeeedu');
        var Employeeborthday =  localStorage.getItem('Employeeborthday');
        var Employeeidcard =  localStorage.getItem('Employeeidcard');
        var Employeerank =  localStorage.getItem('Employeerank');
        var Employeecdate =  localStorage.getItem('Employeecdate');
        var Employeeaddr =  localStorage.getItem('Employeeaddr');
        var Employeezip =  localStorage.getItem('Employeezip');
        var Employeetel =  localStorage.getItem('Employeetel');
        var Employeerdr =  localStorage.getItem('Employeerdr');
        var Employeedept =  localStorage.getItem('Employeedept');
        var Employeejttel =  localStorage.getItem('Employeejttel');
        var Employeeinputedate =  localStorage.getItem('Employeeinputedate');
        var zcode =  localStorage.getItem('zcode');
        var zname =  localStorage.getItem('zname');
        this.form.Employeecode = Employeecode;
        this.form.Employeename = Employeename;
        this.form.flag = flag;
        this.form.zjm = zjm;
        this.form.Employeesex = Employeesex;
        this.form.Employeeedu = Employeeedu;
        this.form.Employeeborthday = Employeeborthday;
        this.form.Employeeidcard = Employeeidcard;
        this.form.Employeerank = Employeerank;
        this.form.Employeecdate = Employeecdate;
        this.form.Employeeaddr = Employeeaddr;
        this.form.Employeezip = Employeezip;
        this.form.Employeetel = Employeetel;
        this.form.Employeerdr = Employeerdr;
        this.form.Employeedept = Employeedept;
        this.form.Employeejttel = Employeejttel;
        this.form.Employeeinputedate = Employeeinputedate;
        this.form.zcode = zcode;
        this.form.zname = zname;
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