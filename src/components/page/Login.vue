<template>
    <div class="login-wrap">
        <div class="ms-title"><img style="width:700px;margin-top:-50px;" src="../../../static/img/title.png"> <!-- <img class="user-logo" src="../../../static/img/logo-.png"><div style="font-size:42px;font-weight: bold;color: #66b1ff;display: inline-block;width: 750px;height:70px;background-color: #fff;line-height: 70px;border:1px solid #fff;border-radius: 20px;">华能日照电厂供应商管理系统</div> --></div>
        <div class="ms-login">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
                <el-form-item prop="username">
                    <el-input style="width:300px;" v-model="ruleForm.username" placeholder="请输入用户名"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input style="width:300px;" type="password" placeholder="请输入密码" v-model="ruleForm.password" @keyup.enter.native="submitForm('ruleForm')"></el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
                </div>
                
               
            </el-form>
            <div class="login-btn">
                    <!-- <el-button type="danger" style="margin-top:20px;" @click="resetPassword">重置密码</el-button> -->
                </div>
                 <p style="font-size:18px;line-height:30px;color:#fff;">Tips : 用户名为个人工号，默认密码为admin</p>
        </div>
    </div>
</template>

<script>
   import md5 from 'js-md5';
    export default {
        data: function(){
            return {
                ruleForm: {
                    username: '',
                    password: ''
                },
                rules: {
                    username: [
                        { required: true, message: '请输入用户名', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            resetPassword(){
                var self = this;
                console.log(self.$axios.defaults.baseURL)
                var reset_password = md5.hex('admin');
                console.log(reset_password)
                var params = new URLSearchParams();
                if(self.ruleForm.username==""){
                    alert('登陆工号不能为空')
                    return
                }
                params.append('user_gonghao',self.ruleForm.username);
                params.append('password',reset_password);
                self.$axios({
                    method: 'post',
                    url: '/store/user/resetPassword',
                    data: params,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                 }).then(function(data){
                    // console.log(data)

                    if(data.data.code==0){
                        self.$message({
                          type: 'success',
                          message: '重置成功'
                        });
                    }else{
                        self.$response(data,self);
                    }
                 });
            },
            submitForm(formName) {
                const self = this;
                // console.log(self.$axios.defaults.baseURL)
                var passwordmd5 = md5.hex(self.ruleForm.password);
                var params = new URLSearchParams();
                params.append('username',self.ruleForm.username);
                params.append('password',passwordmd5);
                self.$axios({
                    method: 'post',
                    url: '/store/login',
                    data: params,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                 }).then(function(data){
                    // console.log(data)

                    if(data.data.code==0){
                        localStorage.setItem('auth',data.data.data.token);
                        localStorage.setItem('username',self.ruleForm.username);
                        localStorage.setItem('password',self.ruleForm.password);
                        localStorage.setItem('user_id',data.data.data.user.user_id);
                        localStorage.setItem('username',data.data.data.user.username);
                        localStorage.setItem('user_true_name',data.data.data.user.user_true_name);
                        var countGroups = data.data.data.user.userGroups;
                        var countArr = [];
                        for(var i = 0 ; i < countGroups.length;i++){
                            countArr.push(countGroups[i].group_id)
                        }
                        localStorage.setItem('userGroups',countArr.join(','));
                        self.$router.push('/oneGoodsInfo');
                    }else{
                        self.$response(data,self);
                    }
                 });
                 
            },
            onload(){
                var username = localStorage.getItem('username');
                var password = localStorage.getItem('password');
                if(username==null){

                }else{
                    this.ruleForm.password = password;
                    this.ruleForm.username = username;
                }
            }
        },
        mounted(){
            this.onload();
        }
    }
</script>

<style scoped>
    .login-wrap{
        position: relative;
        width:100%;
        height:100%;
        background-image: url(../../../static/img/bg.png);
        background-size: 100% 100%;
    }
    .ms-title{
        position: absolute;
        top:50%;
        width:100%;
        margin-top: -230px;
        text-align: center;
        font-size:30px;
        color: #fff;

    }
    .ms-login{
        position: absolute;
        left:50%;
        top:50%;
        width:300px;
        height:160px;
        margin:-100px 0 0 -190px;
        padding:40px;
        border-radius: 5px;
        
    }
    .el-input__inner{
        border-radius: 20px;
    }
    .login-btn{
        text-align: center;
    }
    .login-btn button{
        width:100%;
        height:36px;
    }
</style>