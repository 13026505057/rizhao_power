<template>
  <div class="box">
    
 
  <el-form ref="form" :model="form" label-width="80px">
    <el-form-item label="机构名称">
      <el-input v-model="form.org_title" style="width: 300px;"></el-input>
    </el-form-item>
    <el-form-item label="活动形式">
      <el-input style="width: 400px;" type="textarea" v-model="form.org_content"></el-input>
    </el-form-item>
    <el-form-item label="宣传图片">
      <el-upload
        class="upload-demo"
        drag
        name="files"
        multiple
        :headers="myHeaders"
        :action="uploadUrl"
        
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :before-remove="beforeRemove"
        :on-success="handSuccess"
        :limit="6"
        :on-exceed="handleExceed"
        :file-list="fileList"
        list-type="picture">
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
    </el-form-item>
    <el-form-item label="宣传视频">
      <el-upload
        class="upload-demo"
        name="files"
        multiple
        :headers="myHeaders"
        :action="uploadUrl"
        
        :on-preview="handlePreview1"
        :on-remove="handleRemove1"
        :before-remove="beforeRemove1"
        :on-success="handSuccess1"
        :limit="1"
        :on-exceed="handleExceed1"
        :file-list="fileList1"
        multiple>
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
    </el-form-item>
    
    
    
    <el-form-item>
      <el-button type="primary" @click="onSubmit">保存修改</el-button>
      <el-button>取消</el-button>
    </el-form-item>
  </el-form>
</div>
</template>

<script>
  
  export default {
      data: function(){
          return {
            myHeaders:null,
            uploadUrl:'',
            showInfo:'',
            form: {
              org_title: '',
             
              org_content: ''
            },
            fileList: [],
            fileListcount: [],
            fileList1: [],
            fileListCount1: [],
            nameList: [],
            videoList:[],
            videoNameList:[]
          }

              
      },
      mounted() {
          var myHeaders = localStorage.getItem('auth');
          var uploadUrl = this.$axios.defaults.baseURL+'/stop/uploadOrgShowPic';
          this.uploadUrl = uploadUrl;
          var token = {'kf-token':myHeaders}
          this.myHeaders = token;
          this.getDataShow();
      },
      watch: {
       
      },
      methods: {
        onSubmit() {
          this.upDataShow()
        },
        
        handleRemove(file, fileList) {
        console.log(file, fileList);
        },
        handlePreview(file) {
          console.log(file);
        },
        handSuccess(file,fileList){
          console.log(fileList);

          if(fileList.response.code==0){
            var obj = {};
            obj.name = fileList.name;
            obj.url = fileList.response.data[0];
            this.fileListcount.push(obj)
          }else{

          }
          console.log(this.fileListcount)
        },
        handleExceed(files, fileList) {
          this.$message.warning(`当前限制选择 6 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
        },
        beforeRemove(file, fileList) {
          return this.$confirm(`确定移除 ${ file.name }？`);
        },
        handleProgress1(file, fileList){
          // console.log(fileList);
          // this.nameList.push(file)
        },
        handleRemove1(file, fileList) {
        console.log(file, fileList);
        },
        handlePreview1(file) {
          console.log(file);
        },
        handSuccess1(file,fileList){
          console.log(fileList);

          if(file.code==0){
            var obj = {};
            obj.name = fileList.name;
            obj.url = fileList.response.data[0];
            this.fileListCount1.push(obj)
          }else{

          }
        },
        handleExceed1(files, fileList) {
          this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList1.length} 个文件`);
        },
        beforeRemove1(file, fileList) {
          return this.$confirm(`确定移除 ${ file.name }？`);
        },
        //获取原来得展示信息
        getDataShow(){
                const self = this;
                var params = new URLSearchParams();
                var token = localStorage.getItem('auth');
                var org_id = localStorage.getItem('org_id');
                params.append('org_id',org_id);    
                self.$axios({
                    method: 'post',
                    url: '/stop/orgShow/getByOrg',
                    data: params,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded','kf-token':token},
                 }).then(function(data){
                    if(data.data.code==0){
                       self.showInfo = data.data.data;
                    }else{
                      self.$response(data,self);
                    }
                 });      
        },
        //修改展示信息
        upDataShow(){
                const self = this;
                var params = new URLSearchParams();
                var token = localStorage.getItem('auth');
                var org_id = localStorage.getItem('org_id');
                var org_imgs = [];
                var org_videos = [];
                var org_img_names = [];
                var org_video_names = [];
                for(var i = 0; i < self.fileListcount.length;i++){
                  org_imgs.push(self.fileListcount[i].url);
                  org_img_names.push(self.fileListcount[i].name)
                }
                for(var k = 0; k < self.fileListCount1.length;k++){
                  org_videos.push(self.fileListCount1[k].url);
                  org_video_names.push(self.fileListCount1[k].name)
                }
                params.append('org_id',org_id);
                params.append('org_title',self.form.org_title); 
                params.append('org_content',self.form.org_content); 
                params.append('org_imgs',org_imgs);  
                params.append('org_videos',org_videos);
                params.append('org_img_names',org_img_names);  
                params.append('org_video_names',org_video_names);  
                self.$axios({
                    method: 'post',
                    url: '/stop/orgShow/update',
                    data: params,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded','kf-token':token},
                 }).then(function(data){
                    if(data.data.code==0){
                       self.showInfo = data.data.data;
                    }else{
                      self.$response(data,self);
                    }
                 });      
        },
      }
     
  }
</script>

<style scoped>
  .is-success{
    width: 400px!important;
  }
  .box{
    width: 100%;
    height: 100%;
    overflow-y: scroll;
  }
</style>