<template>
    <div>
           <el-form ref="form" :model="form" label-width="200px">
              
               <el-form-item label="设置资料上传开始日期">
                    <el-date-picker
                      v-model="form.zldate"
                      type="date"
                      placeholder="选择日期">
                    </el-date-picker>
              </el-form-item>
  
               <el-form-item label="设置资料上传间隔天数">
                    <el-input v-model="form.zlts" style="width: 200px;"></el-input>
              </el-form-item>

               <el-form-item label="设置签到开始日期">
                    <el-date-picker
                      v-model="form.qddate"
                      type="date"
                      placeholder="选择日期">
                    </el-date-picker>
              </el-form-item>

               <el-form-item label="设置签到间隔天数">
                    <el-input v-model="form.qdts"  style="width: 200px;"></el-input>
              </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">立即创建</el-button>
                   
                </el-form-item>
            </el-form>
    </div>
</template>

<script>
    import VueCoreImageUpload  from 'vue-core-image-upload';
    export default {
        data: function(){
            return {
               form:{
                zldate:"",
                zlts:'',
                qddate:'',
                qdts:''
               }
            }
        },
        components: {
                VueCoreImageUpload
        },
        methods:{
            onSubmit(){
                var that = this;
                let time1 = that.$moment(that.form.zldate).format("YYYY-MM-DD");
                 let time2 = that.form.zlts
                  let time3 = that.$moment(that.form.qddate).format("YYYY-MM-DD");
                   let time4 =that.form.qdts
                localStorage.setItem('zldate',time1);
                localStorage.setItem('zlts',time2);
                localStorage.setItem('qddate',time3);
                localStorage.setItem('qdts',time4);
                        that.$message({
                            type: 'success',
                            message: '保存成功!'
                          });
            }
            
        },
        mounted() {
         
                var zldate =  localStorage.getItem('zldate');
                console.log(zldate)
                var zlts =  localStorage.getItem('zlts');
                var qddate =  localStorage.getItem('qddate');
                var qdts =  localStorage.getItem('qdts');
                this.form.zldate = zldate;
                this.form.zlts = zlts;
                this.form.qddate = qddate;
                this.form.qdts = qdts;
           
        },
    }
</script>

<style scoped>
    .content-title{
        font-weight: 400;
        line-height: 50px;
        margin: 10px 0;
        font-size: 22px;
        color: #1f2f3d;
    }
    .pre-img{
        width:250px;
        height: 250px;
        margin-bottom: 20px;
    }
</style>