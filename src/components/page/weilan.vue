<template>
   
</template>
<script type="text/javascript">
  
  //import NProgress from 'nprogress'
  export default {
    data() {
      return {
       
      };
    },
    methods: {
 
      
       onload(){
          window.open('http://www.sinoaf.com','_blank');
          setTimeout(function(){
             window.history.go(-1)
          },1000)
         
      },
    },
    mounted() {
           this.onload(); 
           
        },
  }
</script>

<style  scoped>
    .page-container {
      margin-top: 100px;
        font-size: 24px;
        text-align: center;
        color: #F7BA2A;
    }
    .page-container1 {
      width: 200px;
      height: 60px;
      line-height: 60px;
      margin:0 auto;
      cursor:pointer;
      border:1px solid #fff;
      border-radius: 10px;
      margin-top: 100px;
        font-size: 24px;
        text-align: center;
        background-color: #13CE66;
        color: #fff;
    }
</style>