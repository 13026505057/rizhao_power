<template>
    <div>

        <div class="plugins-tips">
        <el-dialog title="添加文章标题" :visible.sync="dialogFormVisible">
            <el-form :model="ruleForm"  ref="ruleForm" label-width="100px" class="demo-ruleForm">
              <el-form-item label="文章名称" prop="name" >
                <el-input v-model="ruleForm.name" style="width: 200px;"></el-input>
              </el-form-item>
              <el-form-item label="文章描述" prop="desc">
                <el-input v-model="ruleForm.desc"></el-input>
              </el-form-item>
              <el-form-item label="文章权限" prop="desc">
                <el-radio v-model="auth" label="org">本机构可看</el-radio>
                <el-radio v-model="auth" label="all">所有机构可看</el-radio>
              </el-form-item>
              <el-form-item label="展示图上传" prop="desc">
                <el-upload
                  class="upload-demo"
                  name="file"
                  action="http://119.29.93.138:80/stop/uploadPic"
                  :headers="myHeaders"
                  :on-preview="handlePreview"
                  :on-remove="handleRemove"
                  :on-success="handleUpLoadSuccess1"
                  :file-list="fileList"
                  list-type="picture">
                  <el-button size="small" type="primary">点击上传</el-button>
                  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                </el-upload>
              </el-form-item>
            </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="submit">确 定</el-button>
          </div>
        </el-dialog>

            
        </div>
        <div class="box">
          <quill-editor ref="myTextEditor" v-model="content" :config="editorOption" style="background-color: #fff;overflow-y: scroll;"></quill-editor>
        </div>
        
        <el-button class="editor-btn" type="primary" @click="openForm">提交</el-button>
    </div>
</template>

<script>
    import { quillEditor } from 'vue-quill-editor';
    export default {
        data: function(){
            return {
                auth:'org',
                myHeaders:null,
                dialogFormVisible:false,
                content: '',
                editorOption: {
                    // something config
                },
                imageUrl: '',
                imgArr:[],
                fileList:[],
                ruleForm: {
                  name: '',
                 
                  desc: ''
                },
            }
        },
        components: {
            quillEditor
        },
        methods: {
            handleUpLoadSuccess1(response, file, fileList){
                console.log(response)
                this.imgArr.push(response.data);
            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                console.log(file);
            },
            onEditorChange({ editor, html, text }) {
                this.content = html;
            },
            openForm(){
              this.dialogFormVisible = true;
            },
            submit(){ 
                const self = this;
                var arr = self.imgArr;
                console.log(arr);
                var string = arr.join(',');
                console.log(string);
                var params = new URLSearchParams();
                var token = localStorage.getItem('auth');
                params.append('art_name',self.ruleForm.name);
                params.append('art_desc',self.ruleForm.desc);
                params.append('art_content',self.content);
                params.append('art_cover',string);
                params.append('art_auth',self.auth);
                self.$axios({
                    method: 'post',
                    url: '/stop/addArt',
                    data: params,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded','kf-token':token},
                 }).then(function(data){
                    if(data.data.code==0){
                      self.$message({
                        type: 'success',
                        message: '文章上传成功'
                      });
                    }else{
                      self.$response(data,self);
                    }
                 });
                
                 // self.$axios({
                 //    method: 'post',
                 //    url: 'http://www.kofanchina.com/stop.php/Home/Article/addArticle',
                 //    data: {
                 //       art_title:self.ruleForm.name,
                 //       art_type:code,
                 //       art_desc:self.ruleForm.desc,
                 //       art_content:this.content,
                 //       art_img:string,
                 //       user_code:user_code,
                 //       user_name:user_name
                 //    },
                 //    headers: {'Content-Type': 'application/json'},
                 // }).then(function(data){
                 //    console.log(data);
                 //    if(data.data.errcode==0){
                 //       self.$message.success('提交成功！');
                 //       self.content = "";
                 //       self.ruleForm.name="";
                 //       self.ruleForm.desc = '';
                 //    }else{

                 //    }
 
                 // });
               
            }
        },
        mounted() {
          var token = localStorage.getItem('auth');
          this.myHeaders = {'kf-token':token}
          
       },
        computed: {
            editor() {
                return this.$refs.myTextEditor.quillEditor;
            }
        }
    }
</script>
<style scoped>
    .editor-btn{
        margin-top: 20px;
    }
    .box{
      height: 600px;
      overflow-y: scroll;
    }
    .box::-webkit-scrollbar {/*滚动条整体样式*/
            width: 4px;     /*高宽分别对应横竖滚动条的尺寸*/
            height: 4px;
    }
    .box::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
            border-radius: 5px;
            -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
            background: rgba(0,0,0,0.2);
    }
    .box::-webkit-scrollbar-track {/*滚动条里面轨道*/
            -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
            border-radius: 0;
            background: rgba(0,0,0,0.1);
    }
</style>