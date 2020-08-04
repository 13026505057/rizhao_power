<template>
  
    <div @click="gotoFunc" class="box">
      <!-- 左侧列表 -->
      <div class="leftBox">
        <div class="littleBox" >
          <div class="littleBox1"  id='main1'>
            
          </div>
        </div>
        <div class="littleBox" >
          <div class="littleBox1"  id='main2'>
            
          </div>
        </div>
        <div class="littleBox" >
          <div class="littleBox1"  id='main3'>
            
          </div>
        </div>
      </div> 
      <!-- 中间列表 -->
      <div class="centerBox">
        <div class="littleCenterBox">
          
        </div>
        <div class="littleCenterBox">
          
        </div>
      </div> 
      <!-- 右侧列表 --> 
      <div class="rightBox">
        <div class="littleBox">
          
        </div>
        <div class="littleBox">
          
        </div>
        <div class="littleBox">
          
        </div>
      </div>   
    </div>
  
</template>
<script type="text/javascript">
  
  //import NProgress from 'nprogress'
  export default {
    data() {
      return {
        option1:{
          title: {
                text: '受理案件总数量按月分布',
                textStyle:{
                  color:'#fff',
                  align:'center'
                }
            },
            tooltip: {},
            // legend: {
            //     data:['销量']
            // },
            xAxis: {
                data: ["2018-01","2018-01","2018-01","2018-01","2018-01","2018-01"],
                axisLine: {
                    lineStyle: {
                        type: 'solid',
                        color: '#fff',//左边线的颜色
                        width:'1'//坐标线的宽度
                    }
                },
                
                axisLabel: {
                    textStyle: {
                        color: '#00b7ee',//坐标值得具体的颜色
 
                    }
                }
            },
            yAxis: {
              axisLine: {
                   lineStyle: {
                       type: 'solid',
                       color:'#fff',
                       width:'1'
                   }
               },
               splitLine: {
                    show: true,
                    lineStyle:{
                        color: ['#0000ff'],
                        width: 1,
                        type: 'solid'
                    }
                },
               axisLabel: {
                   textStyle: {
                       color: '#00b7ee'
                   }
               }
            },
            series: [{
                name: '销量',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20],
                barWidth : 30,//柱图宽度
                itemStyle:{
                    normal:{
                          color:'#fff45c'
                    }
                }

            }]
          },
          option2:{
            title: {
                text: '涉案物品在库时长分布',
                textStyle:{
                  color:'#fff',
                  align:'center'
                }
            },
            tooltip: {},
            // legend: {
            //     data:['销量']
            // },
            xAxis: {
                data: ["3个月","6个月","9个月","1年以上"],
                axisLine: {
                    lineStyle: {
                        type: 'solid',
                        color: '#fff',//左边线的颜色
                        width:'1'//坐标线的宽度
                    }
                },
                
                axisLabel: {
                    textStyle: {
                        color: '#00b7ee',//坐标值得具体的颜色
 
                    }
                }
            },
            yAxis: {
              axisLine: {
                   lineStyle: {
                       type: 'solid',
                       color:'#fff',
                       width:'1'
                   }
               },
               splitLine: {
                    show: true,
                    lineStyle:{
                        color: ['#0000ff'],
                        width: 1,
                        type: 'solid'
                    }
                },
               axisLabel: {
                   textStyle: {
                       color: '#00b7ee'
                   }
               }
            },
            series: [{
                name: '销量',
                type: 'bar',
                data: [5, 20, 36, 10],
                barWidth : 30,//柱图宽度
                itemStyle:{
                    normal:{
                          color:'#00b7ee'
                    }
                }

            }]
          },
          option3:{
            title: {
                text: '涉案物品受理案件部门分布',
                textStyle:{
                  color:'#fff',
                  align:'center'
                }
            },
            tooltip: {},
            // legend: {
            //     data:['销量']
            // },
            xAxis: {
                data: ["1科","2科","3科","4科"],
                axisLine: {
                    lineStyle: {
                        type: 'solid',
                        color: '#fff',//左边线的颜色
                        width:'1'//坐标线的宽度
                    }
                },
                
                axisLabel: {
                    textStyle: {
                        color: '#00b7ee',//坐标值得具体的颜色
 
                    }
                }
            },
            yAxis: {
              axisLine: {
                   lineStyle: {
                       type: 'solid',
                       color:'#fff',
                       width:'1'
                   }
               },
               splitLine: {
                    show: true,
                    lineStyle:{
                        color: ['#0000ff'],
                        width: 1,
                        type: 'solid'
                    }
                },
               axisLabel: {
                   textStyle: {
                       color: '#00b7ee'
                   }
               }
            },
            series: [{
                name: '销量',
                type: 'bar',
                data: [5, 20, 36, 10],
                barWidth : 30,//柱图宽度
                itemStyle:{
                    normal:{
                          color:'#eb6877'
                    }
                }

            }]
          }
      };
    },
    mounted(){
      this.drawLine();    
       
    },
    methods: {
      drawLine(){
          var self = this;
            // 基于准备好的dom，初始化echarts实例
            // if(document.getElementsByTagName('html')[0].style.zoom<=0.70){
            //      document.getElementById('chart').style.zoom=1.42;
            // }else{

            // }
           
          // 使用刚指定的配置项和数据显示图表。

          // 第一个柱状图
          var myChart1 = this.$echarts.init(document.getElementById('main1'));
          // 第二个柱状图
          var myChart2 = this.$echarts.init(document.getElementById('main2'));
          // 第三个柱状图
          var myChart3 = this.$echarts.init(document.getElementById('main3'));
          myChart1.setOption(self.option1);
          myChart2.setOption(self.option2);
          myChart3.setOption(self.option3);
           
            
        },
        gotoFunc(){
          this.$router.push('/index');
        }
      
       
    }
  }
</script>

<style scoped>
      .box{
        width: 100%;
        height: 100%;
        background-image: url(../../../static/img/banner.png);
        background-repeat: no-repeat;
        background-size: 100% 100%;
        display: flex;
        overflow: hidden;
      }
      .leftBox{
        flex:1;
        height:95%;
        margin-top: 2.5%;
        
        display: flex;
        flex-direction: column;
      }
      .centerBox{
        flex:1.1;
        height:90%;
        margin-top: 4%;
        
        display: flex;
        flex-direction: column;
      }
      .rightBox{
        flex:1;
        height:95%;
        margin-top: 2.5%;
       
        display: flex;
        flex-direction: column;
      }
      .littleBox{
        flex:1;
        width: 95%;
        margin:0 auto;
        background-image: url(../../../static/img/banner1.png);
        background-repeat: no-repeat;
        background-size: 100% 100%;
        margin-bottom: 2%;
      }
      .littleBox1{
        width: 95%;
        height: 255px;
        margin:0 auto;
        margin-top: 20px;
        background-image: url(../../../static/img/banner1.png);
        background-repeat: no-repeat;
        background-size: 100% 100%;
        margin-bottom: 2%;
      }
      .littleCenterBox{
        flex:1;
        width: 95%;
        margin:0 auto;
        margin-bottom: 2%;
        border:3px solid #0ae0d7;
      }
      canvas{
        top:20px !important ;
        left:5px !important ;
      }
     
</style>