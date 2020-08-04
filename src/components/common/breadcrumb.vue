<template>
    <div class="level-bread">
    
        
        <span style="float:left;font-weight:bold;padding-right:20px;"><i class="el-icon-location"></i>位置:</span>
        <el-breadcrumb separator-class="el-icon-arrow-right" >

            <el-breadcrumb-item v-for="item in realList" :to="item.path" style="line-height:50px;"><span style="color: #000;font-size: 14px;font-weight:nomal;">{{item.name}}</span></el-breadcrumb-item>

        </el-breadcrumb>

  
    </div>
   
</template>

<script>
     export default {

      name: "lelve-bread",

      created(){

        this.getRoutePath();

      },

      data() {

        return {

          realList: []

        }

      },

      methods:{

        getRoutePath() {

          this.realList = this.$route.meta.routeList;
          console.log(this.realList)

        }

      },

      beforeRouteEnter(to,from, next) {

        next((vm) => {

          vm.realList = to.meta.routeList;

        });

      },

      // watch:{

      //   $route:function(newV,oldV) {

      //     this.realList =newV.meta.routeList;

      //   }

      // }

    }
</script>
<style scoped>
    .el-breadcrumb__inner a, .el-breadcrumb__inner.is-link{
        font-weight:normal!important;
    }
</style>
