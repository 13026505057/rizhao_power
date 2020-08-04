<template>
    <div>
    <el-form ref="form" :model="form" label-width="80px">
  
  
        <el-button type="primary" @click="onSubmit">修改密码</el-button>
    
  </el-form-item>
</el-form>
    </div>
</template>

<script>
    import Schart from 'vue-schart';
    import md5 from 'js-md5';
    export default {
        components: {
            Schart
        },
        mounted() {
            
           
        },
        methods: {
           onSubmit() {
            var self = this;
                 self.$prompt('请输入新密码(6-18位，字母开头且只能是字母数字组合)', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              inputPattern: /[a-zA-Z]\w{5,17}$/,
              inputErrorMessage: '密码格式不正确'
            }).then(({ value }) => {

                var code = localStorage.getItem('ms_username');
                
                var aaa = "[{'fcode':'b05','usercode':'"+code+"','newpass':'"+value+"'}]"
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
                          message: '添加失败'
                        });   
                                      
                    }
                 });
              
            }).catch(() => {
              self.$message({
                type: 'info',
                message: '取消输入'
              });       
            });
            }

        },
        data: () => ({
            form: {
              name: '',
              region: '',
              date1: '',
              date2: '',
              delivery: false,
              type: [],
              resource: '',
              desc: ''
            }
        })
    }
</script>

<style scoped>
    .schart{
        width: 500px;
        display: inline-block;
    }
    .content-title{
        clear: both;
        font-weight: 400;
        line-height: 50px;
        margin: 10px 0;
        font-size: 22px;
        color: #1f2f3d;
    }
    
</style>