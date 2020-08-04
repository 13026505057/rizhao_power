<template>
   <el-form ref="form" :model="form" label-width="80px">
    <el-form-item label="编号" style="width: 300px;">
      <el-input v-model="form.code"></el-input>
    </el-form-item>
    <el-form-item label="姓名" style="width: 300px;">
      <el-input v-model="form.name"></el-input>
    </el-form-item>
    <el-form-item label="性别" style="width: 300px;">
      <el-input v-model="form.code"></el-input>
    </el-form-item>
    <el-form-item label="身份证号" style="width: 300px;">
      <el-input v-model="form.idcard"></el-input>
    </el-form-item>
    <el-form-item label="身份证地址" style="width: 300px;">
      <el-input v-model="form.idaddr"></el-input>
    </el-form-item>
    <el-form-item label="现住址" style="width: 300px;">
      <el-input v-model="form.idcurraddr"></el-input>
    </el-form-item>
    <el-form-item label="手机号" style="width: 300px;">
      <el-input v-model="form.mobile"></el-input>
    </el-form-item>
    <el-form-item label="家长编号" style="width: 300px;">
      <el-input v-model="form.jhcode"></el-input>
    </el-form-item>
    <el-form-item label="家长姓名" style="width: 300px;">
      <el-input v-model="form.jhname"></el-input>
    </el-form-item>
    <el-form-item label="关系" style="width: 300px;">
      <el-input v-model="form.jhgx"></el-input>
    </el-form-item>
    <el-form-item label="家长身份证号" style="width: 300px;">
      <el-input v-model="form.jhidcard"></el-input>
    </el-form-item>
    <el-form-item label="家长地址" style="width: 300px;">
      <el-input v-model="form.jhaddr"></el-input>
    </el-form-item>
     <el-form-item label="家长手机" style="width: 300px;">
      <el-input v-model="form.jhmobile"></el-input>
    </el-form-item>
     <el-form-item label="备注" style="width: 300px;">
      <el-input v-model="form.remark"></el-input>
    </el-form-item>
     <el-form-item label="录入日期" style="width: 300px;">
      <el-input v-model="form.inputedate"></el-input>
    </el-form-item>
     <el-form-item label="录入员" style="width: 300px;">
      <el-input v-model="form.inputer"></el-input>
    </el-form-item>
     <el-form-item label="当前状态" style="width: 300px;">
      <el-input v-model="form.flag"></el-input>
    </el-form-item>
     <el-form-item label="开始日期" style="width: 300px;">
      <el-input v-model="form.startdate"></el-input>
    </el-form-item>
     <el-form-item label="结束日期" style="width: 300px;">
      <el-input v-model="form.enddate"></el-input>
    </el-form-item>
     <el-form-item label="组编号" style="width: 300px;">
      <el-input v-model="form.zcode"></el-input>
    </el-form-item>
     <el-form-item label="组名称" style="width: 300px;">
      <el-input v-model="form.zname"></el-input>
    </el-form-item>
   <!--  <el-form-item label="操作员" style="width: 300px;">
      <el-input v-model="form.Employeeuser"></el-input>
    </el-form-item> -->
    <!-- <el-form-item label="所在部门">
      <el-select v-model="form.Employeedept" placeholder="请选择部门">
        <el-option v-for="item in options" :label="item.unitname" :key="item.id"  :value="item.unitname"></el-option>
      </el-select>
    </el-form-item> -->
    
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
</template>

<script>
import md5 from 'js-md5';
 export default {
    data() {
      return {
        form: {
          code:'',
          name:'',
          sex:'',
          idcard:'',
          idaddr:'',
          idcurraddr:'',
          mobile:'',
          jhcode:'',
          jhname:'',
          jhgx:'',
          jhidcard:'',
          jhaddr:'',
          jhmobile:'',
          remark:'',
          inputedate:'',
          inputer:'',
          flag:'',
          startdate:'',
          enddate:'',
          zcode:'',
          zname:'',
          zldate:'',
          zlts:'',
          qddate:'',
          qdts:'',
          rsyy:''

        }
      }
    },
    methods: {
      onSubmit() {
        var self = this;
          var code = localStorage.getItem('ms_username');
                
                var aaa = "[{'fcode':'b04','usercode':'"+code+"','code':'"+self.form.code+"','name':'"+self.form.name+"','sex':'"+self.form.sex+"','idcard':'"+self.form.idcard+"','idaddr':'"+self.form.idaddr+"','idcurraddr':'"+self.form.idcurraddr+"','mobile':'"+self.form.mobile+"','jhcode':'"+self.form.jhcode+"','jhname':'"+self.form.jhname+"','jhgx':'"+self.form.jhgx+"','jhidcard':'"+self.form.jhidcard+"','jhaddr':'"+self.form.jhaddr+"','jhmobile':'"+self.form.jhmobile+"','remark':'"+self.form.remark+"','inputedate':'"+self.form.inputedate+"','inputer':'"+self.form.inputer+"','flag':'"+self.form.flag+"','startdate':'"+self.form.startdate+"','enddate':'"+self.form.enddate+"','zcode':'"+self.form.zcode+"','zname':'"+self.form.zname+"','zldate':'"+self.form.zldate+"','zlts':'"+self.form.zlts+"','qddate':'"+self.form.qddate+"','qdts':'"+self.form.qdts+"','rsyy':'"+self.form.rsyy+"','saveflag':'edit'}]"
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
          var code =  localStorage.getItem('jiedurencode');
          var name =  localStorage.getItem('jiedurenname');
          var sex =  localStorage.getItem('jiedurensex');
          var idcard =  localStorage.getItem('jiedurenidcard');
          var idaddr =  localStorage.getItem('jiedurenidaddr');
          var idcurraddr =  localStorage.getItem('jiedurenidcurraddr');
          var mobile =  localStorage.getItem('jiedurenmobile');
          var jhcode =  localStorage.getItem('jiedurenjhcode');
          var jhname =  localStorage.getItem('jiedurenjhname');
          var jhgx =  localStorage.getItem('jiedurenjhgx');
          var jhidcard =  localStorage.getItem('jiedurenjhidcard');
          var jhaddr =  localStorage.getItem('jiedurenjhaddr');
          var jhmobile =  localStorage.getItem('jiedurenjhmobile');
          var remark =  localStorage.getItem('jiedurenremark');
          var inputedate =  localStorage.getItem('jiedureninputedate');
          var inputer =  localStorage.getItem('jiedureninputer');
          var flag =  localStorage.getItem('jiedurenflag');
          var startdate =  localStorage.getItem('jiedurenstartdate');
          var enddate =  localStorage.getItem('jiedurenenddate');
          var zcode =  localStorage.getItem('jiedurenzcode');
          var zname =  localStorage.getItem('jiedurenzname');
          var zldate =  localStorage.getItem('jiedurenzldate');
          var zlts =  localStorage.getItem('jiedurenzlts');
          var qddate =  localStorage.getItem('jiedurenqddate');
          var qdts =  localStorage.getItem('jiedurenqdts');
          var rsyy =  localStorage.getItem('jiedurenrsyy');
        this.form.code = code;
        this.form.name = name;
        this.form.sex = sex;
        this.form.idcard = idcard;
        this.form.idaddr = idaddr;
        this.form.idcurraddr = idcurraddr;
        this.form.mobile = mobile;
        this.form.jhcode = jhcode;
        this.form.jhname = jhname;
        this.form.jhgx = jhgx;
        this.form.jhidcard = jhidcard;
        this.form.jhaddr = jhaddr;
        this.form.jhmobile = jhmobile;
        this.form.remark = remark;
        this.form.inputedate = inputedate;
        this.form.inputer = inputer;
        this.form.flag = flag;
        this.form.startdate = startdate;
        this.form.enddate = enddate;
        this.form.zcode = zcode;
        this.form.zname = zname;
        this.form.zldate = zldate;
        this.form.zlts = zlts;
        this.form.qddate = qddate;
        this.form.qdts = qdts;
        this.form.rsyy = rsyy;


           
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