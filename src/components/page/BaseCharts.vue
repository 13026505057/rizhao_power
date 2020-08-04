<template>
    <div class="bigBox" id="bigBox">
        <div class="block">
                <el-cascader
                  clearable
                  class="demonstration"
                  :options="orgTree"
                  v-model="selectedOptions"
                  placeholder="请选择机构"
                  change-on-select
                  @change="handleChange">
                </el-cascader>
                <el-button type="warning" style="margin-left: 30px;" @click="fenzuSearch">查询</el-button>
        </div>
        <div class="chart" id="chart">
            
            <div class="chartDiv2" id="weiqiandao" :style="{width: '45%', height: '300px'}"></div>
            <div class="chartDiv2" id="zongrenshu" :style="{width: '45%', height: '300px',float:'right'}"></div>
            <div class="chartDiv2" id="xingbie" :style="{width: '45%', height: '300px'}"></div>
            <div class="chartDiv2" id="nianling" :style="{width: '45%', height: '300px',float:'right'}"></div>
            <div class="chartDiv2" id="zhiye" :style="{width: '45%', height: '300px'}"></div>
            <div class="chartDiv2" id="leixing" :style="{width: '45%', height: '300px',float:'right'}"></div>
            <!-- <div class="chartDiv" id="notUpLoad" :style="{width: '90%', height: '400px'}"></div> -->
            <div class="chartDiv" id="qiandao" :style="{width: '45%', height: '300px'}"></div>
            <div class="chartDiv" id="notqiandao" :style="{width: '45%', height: '300px',float:'right'}"></div>
            <div class="chartDiv" id="niaojian" :style="{width: '45%', height: '300px'}"></div>
            <div class="chartDiv" id="weiniaojian" :style="{width: '45%', height: '300px',float:'right'}"></div>
            <div class="chartDiv" id="myChart" :style="{width: '45%', height: '300px'}"></div>
            <div class="chartDiv" id="xinzeng" :style="{width: '45%', height: '300px',float:'right'}"></div>
            <div class="chartDiv" id="jianmianjiancha" :style="{width: '45%', height: '300px'}"></div>
            <div class="chartDiv" id="shegongzoufang" :style="{width: '45%', height: '300px',float:'right'}"></div>
            <div class="chartDiv" id="shejiezhixing" :style="{width: '45%', height: '300px'}"></div>
            <div class="chartDiv" id="shekangkangfu" :style="{width: '45%', height: '300px',float:'right'}"></div>
            <div class="chartDiv" id="zaicezengzhang" :style="{width: '45%', height: '300px'}"></div>

            
            
        </div>
        
    </div>
</template>

<script>
    export default {
      name: 'hello',
      data () {
        return {
                    selectedOptions:[],
                    orgTree:[],
                    msg: 'Welcome to Your Vue.js App',
                    qiandao:{
                         
                        title: {
                            text: '签到人数按月统计',
                            subtext: '',
                            textStyle :{
                                color:'#000'
                            }
                        },
                        tooltip: {
                            trigger: 'axis'
                        },
                        grid: {
                            left: '3%',
                            right: '4%',
                            bottom: '3%',
                            containLabel: true
                        },
                        xAxis: [{
                            type: 'category',
                            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
                            splitLine: {
                                show: false
                            },
                            axisTick: {
                                alignWithLabel: true
                            },
                            axisLine:{
                                lineStyle :{
                                    color:'#000'
                                }
                            }
                        }],
                        yAxis: [{
                            type: 'value',
                            splitLine: {
                                show: false
                            },
                            splitArea: {
                                show: true,
                            },
                            axisLine:{
                                lineStyle :{
                                    color:'#000'
                                }
                            }
                        }],
                        series: [{
                            name: '人数',
                            type: 'bar',
                            barWidth : 20,//柱图宽度
                            barMaxWidth:20,//最大宽度
                            label: {
                                normal: {
                                    show: true,
                                    position: 'top'
                                }
                            },
                            itemStyle: {
                                normal: {
                                    // 随机显示
                                    //color:function(d){return "#"+Math.floor(Math.random()*(256*256*256-1)).toString(16);}
                                  
                                    // 定制显示（按顺序）
                                    color: function(params) { 
                                        var colorList = ['#C33531','#EFE42A','#64BD3D','#EE9201','#29AAE3', '#B74AE5','#0AAF9F','#E89589','#16A085','#4A235A','#C39BD3 ','#F9E79F','#BA4A00','#ECF0F1','#616A6B','#EAF2F8','#4A235A','#3498DB' ]; 
                                        return colorList[params.dataIndex] 
                                    }
                                },
                            },
                            data: [32.6, 25.9, 39.0, 26.4, 28.7, 70.7, 75.6, 82.2, 48.7, 58.8, 16.0, 32.3],
                        }]
                    },
                    notqiandao:{
                         
                        title: {
                            text: '未签到人数按月统计',
                            subtext: '',
                            textStyle :{
                                color:'#000'
                            }
                        },
                        tooltip: {
                            trigger: 'axis'
                        },
                        grid: {
                            left: '3%',
                            right: '4%',
                            bottom: '3%',
                            containLabel: true
                        },
                        xAxis: [{
                            type: 'category',
                            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
                            splitLine: {
                                show: false
                            },
                            axisTick: {
                                alignWithLabel: true
                            },
                            axisLine:{
                                lineStyle :{
                                    color:'#000'
                                }
                            }
                        }],
                        yAxis: [{
                            type: 'value',
                            splitLine: {
                                show: false
                            },
                            splitArea: {
                                show: true,
                            },
                            axisLine:{
                                lineStyle :{
                                    color:'#000'
                                }
                            }
                        }],
                        series: [{
                            name: '人数',
                            type: 'bar',
                            barWidth : 20,//柱图宽度
                            barMaxWidth:20,//最大宽度
                            label: {
                                normal: {
                                    show: true,
                                    position: 'top'
                                }
                            },
                            itemStyle: {
                                normal: {
                                    // 随机显示
                                    //color:function(d){return "#"+Math.floor(Math.random()*(256*256*256-1)).toString(16);}
                                  
                                    // 定制显示（按顺序）
                                    color: function(params) { 
                                        var colorList = ['#C33531','#EFE42A','#64BD3D','#EE9201','#29AAE3', '#B74AE5','#0AAF9F','#E89589','#16A085','#4A235A','#C39BD3 ','#F9E79F','#BA4A00','#ECF0F1','#616A6B','#EAF2F8','#4A235A','#3498DB' ]; 
                                        return colorList[params.dataIndex] 
                                    }
                                },
                            },
                            data: [32.6, 25.9, 39.0, 26.4, 28.7, 70.7, 75.6, 82.2, 48.7, 58.8, 16.0, 32.3],
                        }]
                    },
                    niaojian:{
                         
                        title: {
                            text: '尿检人数按月统计',
                            subtext: '',
                            textStyle :{
                                color:'#000'
                            }
                        },
                        tooltip: {
                            trigger: 'axis'
                        },
                        grid: {
                            left: '3%',
                            right: '4%',
                            bottom: '3%',
                            containLabel: true
                        },
                        xAxis: [{
                            type: 'category',
                            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
                            splitLine: {
                                show: false
                            },
                            axisTick: {
                                alignWithLabel: true
                            },
                            axisLine:{
                                lineStyle :{
                                    color:'#000'
                                }
                            }
                        }],
                        yAxis: [{
                            type: 'value',
                            splitLine: {
                                show: false
                            },
                            splitArea: {
                                show: true,
                            },
                            axisLine:{
                                lineStyle :{
                                    color:'#000'
                                }
                            }
                        }],
                        series: [{
                            name: '人数',
                            type: 'bar',
                            barWidth : 20,//柱图宽度
                            barMaxWidth:20,//最大宽度
                            label: {
                                normal: {
                                    show: true,
                                    position: 'top'
                                }
                            },
                            itemStyle: {
                                normal: {
                                    // 随机显示
                                    //color:function(d){return "#"+Math.floor(Math.random()*(256*256*256-1)).toString(16);}
                                  
                                    // 定制显示（按顺序）
                                    color: function(params) { 
                                        var colorList = ['#C33531','#EFE42A','#64BD3D','#EE9201','#29AAE3', '#B74AE5','#0AAF9F','#E89589','#16A085','#4A235A','#C39BD3 ','#F9E79F','#BA4A00','#ECF0F1','#616A6B','#EAF2F8','#4A235A','#3498DB' ]; 
                                        return colorList[params.dataIndex] 
                                    }
                                },
                            },
                            data: [32.6, 25.9, 39.0, 26.4, 28.7, 70.7, 75.6, 82.2, 48.7, 58.8, 16.0, 32.3],
                        }]
                    },
                    weiniaojian:{
                         
                        title: {
                            text: '未尿检人数按月统计',
                            subtext: '',
                            textStyle :{
                                color:'#000'
                            }
                        },
                        tooltip: {
                            trigger: 'axis'
                        },
                        grid: {
                            left: '3%',
                            right: '4%',
                            bottom: '3%',
                            containLabel: true
                        },
                        xAxis: [{
                            type: 'category',
                            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
                            splitLine: {
                                show: false
                            },
                            axisTick: {
                                alignWithLabel: true
                            },
                            axisLine:{
                                lineStyle :{
                                    color:'#000'
                                }
                            }
                        }],
                        yAxis: [{
                            type: 'value',
                            splitLine: {
                                show: false
                            },
                            splitArea: {
                                show: true,
                            },
                            axisLine:{
                                lineStyle :{
                                    color:'#000'
                                }
                            }
                        }],
                        series: [{
                            name: '人数',
                            type: 'bar',
                            barWidth : 20,//柱图宽度
                            barMaxWidth:20,//最大宽度
                            label: {
                                normal: {
                                    show: true,
                                    position: 'top'
                                }
                            },
                            itemStyle: {
                                normal: {
                                    // 随机显示
                                    //color:function(d){return "#"+Math.floor(Math.random()*(256*256*256-1)).toString(16);}
                                  
                                    // 定制显示（按顺序）
                                    color: function(params) { 
                                        var colorList = ['#C33531','#EFE42A','#64BD3D','#EE9201','#29AAE3', '#B74AE5','#0AAF9F','#E89589','#16A085','#4A235A','#C39BD3 ','#F9E79F','#BA4A00','#ECF0F1','#616A6B','#EAF2F8','#4A235A','#3498DB' ]; 
                                        return colorList[params.dataIndex] 
                                    }
                                },
                            },
                            data: [32.6, 25.9, 39.0, 26.4, 28.7, 70.7, 75.6, 82.2, 48.7, 58.8, 16.0, 32.3],
                        }]
                    },
                    allUserNum:{
                         
                        title: {
                            text: '管控总人数按月汇总',
                            subtext: '',
                            textStyle :{
                                color:'#000'
                            }
                        },
                        tooltip: {
                            trigger: 'axis'
                        },
                        grid: {
                            left: '3%',
                            right: '4%',
                            bottom: '3%',
                            containLabel: true
                        },
                        xAxis: [{
                            type: 'category',
                            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
                            splitLine: {
                                show: false
                            },
                            axisTick: {
                                alignWithLabel: true
                            },
                            axisLine:{
                                lineStyle :{
                                    color:'#000'
                                }
                            }
                        }],
                        yAxis: [{
                            type: 'value',
                            splitLine: {
                                show: false
                            },
                            splitArea: {
                                show: true,
                            },
                            axisLine:{
                                lineStyle :{
                                    color:'#000'
                                }
                            }
                        }],
                        series: [{
                            name: '人数',
                            type: 'bar',
                            barWidth : 20,//柱图宽度
                            barMaxWidth:20,//最大宽度
                            label: {
                                normal: {
                                    show: true,
                                    position: 'top'
                                }
                            },
                            itemStyle: {
                                normal: {
                                    // 随机显示
                                    //color:function(d){return "#"+Math.floor(Math.random()*(256*256*256-1)).toString(16);}
                                  
                                    // 定制显示（按顺序）
                                    color: function(params) { 
                                        var colorList = ['#C33531','#EFE42A','#64BD3D','#EE9201','#29AAE3', '#B74AE5','#0AAF9F','#E89589','#16A085','#4A235A','#C39BD3 ','#F9E79F','#BA4A00','#ECF0F1','#616A6B','#EAF2F8','#4A235A','#3498DB' ]; 
                                        return colorList[params.dataIndex] 
                                    }
                                },
                            },
                            data: [32.6, 25.9, 39.0, 26.4, 28.7, 70.7, 75.6, 82.2, 48.7, 58.8, 16.0, 32.3],
                        }]
                    },
                    jianmianjiancha:{
                         
                        title: {
                            text: '见面核查总人数按月汇总',
                            subtext: '',
                            textStyle :{
                                color:'#000'
                            }
                        },
                        tooltip: {
                            trigger: 'axis'
                        },
                        grid: {
                            left: '3%',
                            right: '4%',
                            bottom: '3%',
                            containLabel: true
                        },
                        xAxis: [{
                            type: 'category',
                            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
                            splitLine: {
                                show: false
                            },
                            axisTick: {
                                alignWithLabel: true
                            },
                            axisLine:{
                                lineStyle :{
                                    color:'#000'
                                }
                            }
                        }],
                        yAxis: [{
                            type: 'value',
                            splitLine: {
                                show: false
                            },
                            splitArea: {
                                show: true,
                            },
                            axisLine:{
                                lineStyle :{
                                    color:'#000'
                                }
                            }
                        }],
                        series: [{
                            name: '人数',
                            type: 'bar',
                            barWidth : 20,//柱图宽度
                            barMaxWidth:20,//最大宽度
                            label: {
                                normal: {
                                    show: true,
                                    position: 'top'
                                }
                            },
                            itemStyle: {
                                normal: {
                                    // 随机显示
                                    //color:function(d){return "#"+Math.floor(Math.random()*(256*256*256-1)).toString(16);}
                                  
                                    // 定制显示（按顺序）
                                    color: function(params) { 
                                        var colorList = ['#C33531','#EFE42A','#64BD3D','#EE9201','#29AAE3', '#B74AE5','#0AAF9F','#E89589','#16A085','#4A235A','#C39BD3 ','#F9E79F','#BA4A00','#ECF0F1','#616A6B','#EAF2F8','#4A235A','#3498DB' ]; 
                                        return colorList[params.dataIndex] 
                                    }
                                },
                            },
                            data: [32.6, 25.9, 39.0, 26.4, 28.7, 70.7, 75.6, 82.2, 48.7, 58.8, 16.0, 32.3],
                        }]
                    },
                    shegongzoufang:{
                         
                        title: {
                            text: '社工走访数按月汇总',
                            subtext: '',
                            textStyle :{
                                color:'#000'
                            }
                        },
                        tooltip: {
                            trigger: 'axis'
                        },
                        grid: {
                            left: '3%',
                            right: '4%',
                            bottom: '3%',
                            containLabel: true
                        },
                        xAxis: [{
                            type: 'category',
                            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
                            splitLine: {
                                show: false
                            },
                            axisTick: {
                                alignWithLabel: true
                            },
                            axisLine:{
                                lineStyle :{
                                    color:'#000'
                                }
                            }
                        }],
                        yAxis: [{
                            type: 'value',
                            splitLine: {
                                show: false
                            },
                            splitArea: {
                                show: true,
                            },
                            axisLine:{
                                lineStyle :{
                                    color:'#000'
                                }
                            }
                        }],
                        series: [{
                            name: '人数',
                            type: 'bar',
                            barWidth : 20,//柱图宽度
                            barMaxWidth:20,//最大宽度
                            label: {
                                normal: {
                                    show: true,
                                    position: 'top'
                                }
                            },
                            itemStyle: {
                                normal: {
                                    // 随机显示
                                    //color:function(d){return "#"+Math.floor(Math.random()*(256*256*256-1)).toString(16);}
                                  
                                    // 定制显示（按顺序）
                                    color: function(params) { 
                                        var colorList = ['#C33531','#EFE42A','#64BD3D','#EE9201','#29AAE3', '#B74AE5','#0AAF9F','#E89589','#16A085','#4A235A','#C39BD3 ','#F9E79F','#BA4A00','#ECF0F1','#616A6B','#EAF2F8','#4A235A','#3498DB' ]; 
                                        return colorList[params.dataIndex] 
                                    }
                                },
                            },
                            data: [32.6, 25.9, 39.0, 26.4, 28.7, 70.7, 75.6, 82.2, 48.7, 58.8, 16.0, 32.3],
                        }]
                    },
                    shejiezhixing:{
                         
                        title: {
                            text: '社戒执行率按月汇总',
                            subtext: '',
                            textStyle :{
                                color:'#000'
                            }
                        },
                        tooltip: {
                            trigger: 'axis'
                        },
                        grid: {
                            left: '3%',
                            right: '4%',
                            bottom: '3%',
                            containLabel: true
                        },
                        xAxis: [{
                            type: 'category',
                            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
                            splitLine: {
                                show: false
                            },
                            axisTick: {
                                alignWithLabel: true
                            },
                            axisLine:{
                                lineStyle :{
                                    color:'#000'
                                }
                            }
                        }],
                        yAxis: [{
                            type: 'value',
                            splitLine: {
                                show: false
                            },
                            splitArea: {
                                show: true,
                            },
                            axisLine:{
                                lineStyle :{
                                    color:'#000'
                                }
                            }
                        }],
                        series: [{
                            name: '人数',
                            type: 'bar',
                            barWidth : 20,//柱图宽度
                            barMaxWidth:20,//最大宽度
                            label: {
                                normal: {
                                    show: true,
                                    position: 'top'
                                }
                            },
                            itemStyle: {
                                normal: {
                                    // 随机显示
                                    //color:function(d){return "#"+Math.floor(Math.random()*(256*256*256-1)).toString(16);}
                                  
                                    // 定制显示（按顺序）
                                    color: function(params) { 
                                        var colorList = ['#C33531','#EFE42A','#64BD3D','#EE9201','#29AAE3', '#B74AE5','#0AAF9F','#E89589','#16A085','#4A235A','#C39BD3 ','#F9E79F','#BA4A00','#ECF0F1','#616A6B','#EAF2F8','#4A235A','#3498DB' ]; 
                                        return colorList[params.dataIndex] 
                                    }
                                },
                            },
                            data: [32.6, 25.9, 39.0, 26.4, 28.7, 70.7, 75.6, 82.2, 48.7, 58.8, 16.0, 32.3],
                        }]
                    },
                    shekangkangfu:{
                         
                        title: {
                            text: '社康康复率按月汇总',
                            subtext: '',
                            textStyle :{
                                color:'#000'
                            }
                        },
                        tooltip: {
                            trigger: 'axis'
                        },
                        grid: {
                            left: '3%',
                            right: '4%',
                            bottom: '3%',
                            containLabel: true
                        },
                        xAxis: [{
                            type: 'category',
                            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
                            splitLine: {
                                show: false
                            },
                            axisTick: {
                                alignWithLabel: true
                            },
                            axisLine:{
                                lineStyle :{
                                    color:'#000'
                                }
                            }
                        }],
                        yAxis: [{
                            type: 'value',
                            splitLine: {
                                show: false
                            },
                            splitArea: {
                                show: true,
                            },
                            axisLine:{
                                lineStyle :{
                                    color:'#000'
                                }
                            }
                        }],
                        series: [{
                            name: '人数',
                            type: 'bar',
                            barWidth : 20,//柱图宽度
                            barMaxWidth:20,//最大宽度
                            label: {
                                normal: {
                                    show: true,
                                    position: 'top'
                                }
                            },
                            itemStyle: {
                                normal: {
                                    // 随机显示
                                    //color:function(d){return "#"+Math.floor(Math.random()*(256*256*256-1)).toString(16);}
                                  
                                    // 定制显示（按顺序）
                                    color: function(params) { 
                                        var colorList = ['#C33531','#EFE42A','#64BD3D','#EE9201','#29AAE3', '#B74AE5','#0AAF9F','#E89589','#16A085','#4A235A','#C39BD3 ','#F9E79F','#BA4A00','#ECF0F1','#616A6B','#EAF2F8','#4A235A','#3498DB' ]; 
                                        return colorList[params.dataIndex] 
                                    }
                                },
                            },
                            data: [32.6, 25.9, 39.0, 26.4, 28.7, 70.7, 75.6, 82.2, 48.7, 58.8, 16.0, 32.3],
                        }]
                    },
                    zaicezengzhang:{
                         
                        title: {
                            text: '在册增长率按月汇总',
                            subtext: '',
                            textStyle :{
                                color:'#000'
                            }
                        },
                        tooltip: {
                            trigger: 'axis'
                        },
                        grid: {
                            left: '3%',
                            right: '4%',
                            bottom: '3%',
                            containLabel: true
                        },
                        xAxis: [{
                            type: 'category',
                            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
                            splitLine: {
                                show: false
                            },
                            axisTick: {
                                alignWithLabel: true
                            },
                            axisLine:{
                                lineStyle :{
                                    color:'#000'
                                }
                            }
                        }],
                        yAxis: [{
                            type: 'value',
                            splitLine: {
                                show: false
                            },
                            splitArea: {
                                show: true,
                            },
                            axisLine:{
                                lineStyle :{
                                    color:'#000'
                                }
                            }
                        }],
                        series: [{
                            name: '人数',
                            type: 'bar',
                            barWidth : 20,//柱图宽度
                            barMaxWidth:20,//最大宽度
                            label: {
                                normal: {
                                    show: true,
                                    position: 'top'
                                }
                            },
                            itemStyle: {
                                normal: {
                                    // 随机显示
                                    //color:function(d){return "#"+Math.floor(Math.random()*(256*256*256-1)).toString(16);}
                                  
                                    // 定制显示（按顺序）
                                    color: function(params) { 
                                        var colorList = ['#C33531','#EFE42A','#64BD3D','#EE9201','#29AAE3', '#B74AE5','#0AAF9F','#E89589','#16A085','#4A235A','#C39BD3 ','#F9E79F','#BA4A00','#ECF0F1','#616A6B','#EAF2F8','#4A235A','#3498DB' ]; 
                                        return colorList[params.dataIndex] 
                                    }
                                },
                            },
                            data: [32.6, 25.9, 39.0, 26.4, 28.7, 70.7, 75.6, 82.2, 48.7, 58.8, 16.0, 32.3],
                        }]
                    },
                    xinzeng:{
                         
                        title: {
                            text: '管控新增人数按月汇总',
                            subtext: '',
                            textStyle :{
                                color:'#000'
                            }
                        },
                        tooltip: {
                            trigger: 'axis'
                        },
                        grid: {
                            left: '3%',
                            right: '4%',
                            bottom: '3%',
                            containLabel: true
                        },
                        xAxis: [{
                            type: 'category',
                            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
                            splitLine: {
                                show: false
                            },
                            axisTick: {
                                alignWithLabel: true
                            },
                            axisLine:{
                                lineStyle :{
                                    color:'#000'
                                }
                            }
                        }],
                        yAxis: [{
                            type: 'value',
                            splitLine: {
                                show: false
                            },
                            splitArea: {
                                show: true,
                            },
                            axisLine:{
                                lineStyle :{
                                    color:'#000'
                                }
                            }
                        }],
                        series: [{
                            name: '新增人数',
                            type: 'bar',
                            barWidth : 20,//柱图宽度
                            barMaxWidth:20,//最大宽度
                            label: {
                                normal: {
                                    show: true,
                                    position: 'top'
                                }
                            },
                            itemStyle: {
                                normal: {
                                    // 随机显示
                                    //color:function(d){return "#"+Math.floor(Math.random()*(256*256*256-1)).toString(16);}
                                  
                                    // 定制显示（按顺序）
                                    color: function(params) { 
                                        var colorList = ['#C33531','#EFE42A','#64BD3D','#EE9201','#29AAE3', '#B74AE5','#0AAF9F','#E89589','#16A085','#4A235A','#C39BD3 ','#F9E79F','#BA4A00','#ECF0F1','#616A6B','#EAF2F8','#4A235A','#3498DB' ]; 
                                        return colorList[params.dataIndex] 
                                    }
                                },
                            },
                            data: [32.6, 25.9, 39.0, 26.4, 28.7, 70.7, 75.6, 82.2, 48.7, 58.8, 16.0, 32.3],
                        }]
                    },
                    notUpLoad:{
                        title: {
                            text: '未签到人数按月统计',
                            subtext: '',
                            textStyle :{
                                color:'#000'
                            }
                        },
                        xAxis: {
                            type: 'category',
                            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                            axisLine:{
                                lineStyle :{
                                    color:'#000'
                                }
                            }
                        },
                        yAxis: {
                            type: 'value',
                            axisLine:{
                                lineStyle :{
                                    color:'#000'
                                }
                            }
                        },
                        series: [{
                            data: [820, 932, 901, 934, 1290, 1320, 1320],
                            type: 'line',
                            itemStyle : {  
                                normal : {  
                                    lineStyle:{  
                                        color:'#00FF00'  
                                    }  
                                }  
                            },  
                        }]
                    },
                    notUpLoadByOrg:{
                            title : {
                                text: '未签到人数按机构分布',
                                // subtext: '纯属虚构',
                                x:'center',
                                textStyle :{
                                    color:'#000'
                                }
                            },
                            tooltip : {
                                trigger: 'item',
                                formatter: "{a} <br/>{b} : {c} ({d}%)"
                            },
                            legend: {
                                orient: 'vertical',
                                left: 'left',
                                data: ['分组一','分组二','分组三','分组三','分组四'],
                                textStyle :{
                                    color:'#000'
                                }
                            },
                            series : [
                                {
                                    name: '违规人数',
                                    type: 'pie',
                                    radius : '55%',
                                    center: ['50%', '60%'],
                                    data:[
                                        {value:335, name:'分组一'},
                                        {value:310, name:'分组二'},
                                        {value:234, name:'分组三'},
                                        {value:135, name:'分组三'},
                                        {value:1548, name:'分组四'}
                                    ],
                                    itemStyle: {
                                        emphasis: {
                                            shadowBlur: 10,
                                            shadowOffsetX: 0,
                                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                                        }
                                    }
                                }
                            ]
                    },
                    zongrenshu:{
                            title : {
                                text: '管控人按机构分布',
                                // subtext: '纯属虚构',
                                x:'center',
                                textStyle :{
                                    color:'#000'
                                }
                            },
                            tooltip : {
                                trigger: 'item',
                                formatter: "{a} <br/>{b} : {c} ({d}%)"
                            },
                            legend: {
                                orient: 'vertical',
                                left: 'left',
                                data: ['分组一','分组二','分组三','分组三','分组四'],
                                textStyle :{
                                    color:'#000'
                                }
                            },
                            series : [
                                {
                                    name: '管控人数',
                                    type: 'pie',
                                    radius : '55%',
                                    center: ['50%', '60%'],
                                    data:[
                                        {value:335, name:'分组一'},
                                        {value:310, name:'分组二'},
                                        {value:234, name:'分组三'},
                                        {value:135, name:'分组三'},
                                        {value:1548, name:'分组四'}
                                    ],
                                    itemStyle: {
                                        emphasis: {
                                            shadowBlur: 10,
                                            shadowOffsetX: 0,
                                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                                        }
                                    }
                                }
                            ]
                    },
                    xingbie:{
                            title : {
                                text: '性别分布饼状图',
                                // subtext: '纯属虚构',
                                x:'center',
                                textStyle :{
                                    color:'#000'
                                }
                            },
                            tooltip : {
                                trigger: 'item',
                                formatter: "{a} <br/>{b} : {c} ({d}%)"
                            },
                            legend: {
                                orient: 'vertical',
                                left: 'left',
                                data: ['分组一','分组二','分组三','分组三','分组四'],
                                textStyle :{
                                    color:'#000'
                                }
                            },
                            series : [
                                {
                                    name: '管控人数',
                                    type: 'pie',
                                    radius : '55%',
                                    center: ['50%', '60%'],
                                    data:[
                                        {value:335, name:'分组一'},
                                        {value:310, name:'分组二'},
                                        {value:234, name:'分组三'},
                                        {value:135, name:'分组三'},
                                        {value:1548, name:'分组四'}
                                    ],
                                    itemStyle: {
                                        emphasis: {
                                            shadowBlur: 10,
                                            shadowOffsetX: 0,
                                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                                        }
                                    }
                                }
                            ]
                    },
                    nianling:{
                            title : {
                                text: '年龄分布饼状图',
                                // subtext: '纯属虚构',
                                x:'center',
                                textStyle :{
                                    color:'#000'
                                }
                            },
                            tooltip : {
                                trigger: 'item',
                                formatter: "{a} <br/>{b} : {c} ({d}%)"
                            },
                            legend: {
                                orient: 'vertical',
                                left: 'left',
                                data: ['分组一','分组二','分组三','分组三','分组四'],
                                textStyle :{
                                    color:'#000'
                                }
                            },
                            series : [
                                {
                                    name: '管控人数',
                                    type: 'pie',
                                    radius : '55%',
                                    center: ['50%', '60%'],
                                    data:[
                                        {value:335, name:'分组一'},
                                        {value:310, name:'分组二'},
                                        {value:234, name:'分组三'},
                                        {value:135, name:'分组三'},
                                        {value:1548, name:'分组四'}
                                    ],
                                    itemStyle: {
                                        emphasis: {
                                            shadowBlur: 10,
                                            shadowOffsetX: 0,
                                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                                        }
                                    }
                                }
                            ]
                    },
                    zhiye:{
                            title : {
                                text: '职业分布饼状图',
                                // subtext: '纯属虚构',
                                x:'center',
                                textStyle :{
                                    color:'#000'
                                }
                            },
                            tooltip : {
                                trigger: 'item',
                                formatter: "{a} <br/>{b} : {c} ({d}%)"
                            },
                            legend: {
                                orient: 'vertical',
                                left: 'left',
                                data: ['分组一','分组二','分组三','分组三','分组四'],
                                textStyle :{
                                    color:'#000'
                                }
                            },
                            series : [
                                {
                                    name: '管控人数',
                                    type: 'pie',
                                    radius : '55%',
                                    center: ['50%', '60%'],
                                    data:[
                                        {value:335, name:'分组一'},
                                        {value:310, name:'分组二'},
                                        {value:234, name:'分组三'},
                                        {value:135, name:'分组三'},
                                        {value:1548, name:'分组四'}
                                    ],
                                    itemStyle: {
                                        emphasis: {
                                            shadowBlur: 10,
                                            shadowOffsetX: 0,
                                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                                        }
                                    }
                                }
                            ]
                    },
                    leixing:{
                            title : {
                                text: '社戒类型饼状图',
                                // subtext: '纯属虚构',
                                x:'center',
                                textStyle :{
                                    color:'#000'
                                }
                            },
                            tooltip : {
                                trigger: 'item',
                                formatter: "{a} <br/>{b} : {c} ({d}%)"
                            },
                            legend: {
                                orient: 'vertical',
                                left: 'left',
                                data: ['分组一','分组二','分组三','分组三','分组四'],
                                textStyle :{
                                    color:'#000'
                                }
                            },
                            series : [
                                {
                                    name: '管控人数',
                                    type: 'pie',
                                    radius : '55%',
                                    center: ['50%', '60%'],
                                    data:[
                                        {value:335, name:'分组一'},
                                        {value:310, name:'分组二'},
                                        {value:234, name:'分组三'},
                                        {value:135, name:'分组三'},
                                        {value:1548, name:'分组四'}
                                    ],
                                    itemStyle: {
                                        emphasis: {
                                            shadowBlur: 10,
                                            shadowOffsetX: 0,
                                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                                        }
                                    }
                                }
                            ]
                    },
                    org_idList:[],
        }
      },
      mounted(){
        
        this.notUpLoadNum();
        this.getOrgsList();
        this.getAllUserNum();
        this.getAddUserNum();
        this.notUpLoadNumByOrg();
        this.getOrgUserNum();
        this.getXingbieData();
        this.getLeixingData();
        this.getNianlingData();
        this.getZhiyeData();
        this.getShejiezhixingData();
        this.getShekangkangfuData();
        this.getZaicezengzhangData();
        this.getjianmianjianchaData();
        this.getshegongzoufangData();
        this.getNiaojianData();
        this.getWeiniaojianData();
        this.getQiandaoData();
        this.getNotqiandaoData();
      },
      methods: {
        fenzuSearch(){
            this.notUpLoadNum();
            this.getOrgsList();
            this.getAllUserNum();
            this.getAddUserNum();
            this.notUpLoadNumByOrg();
            this.getOrgUserNum();
            this.getXingbieData();
            this.getLeixingData();
            this.getNianlingData();
            this.getZhiyeData();
            this.getShejiezhixingData();
            this.getShekangkangfuData();
            this.getZaicezengzhangData();
            this.getjianmianjianchaData();
            this.getshegongzoufangData();
            this.getNiaojianData();
            this.getWeiniaojianData();
            this.getQiandaoData();
            this.getNotqiandaoData();
        },
        handleChange(value) {
              var newArr = [];
              newArr.push(value[value.length-1]) 
              this.org_idList = newArr;
        },
        drawLine(){
            // 基于准备好的dom，初始化echarts实例
            // if(document.getElementsByTagName('html')[0].style.zoom<=0.70){
            //      document.getElementById('chart').style.zoom=1.42;
            // }else{

            // }
           
            
            let myChart = this.$echarts.init(document.getElementById('myChart'));
            let xinzeng = this.$echarts.init(document.getElementById('xinzeng'));
            let weiqiandao = this.$echarts.init(document.getElementById('weiqiandao'));
            let zongrenshu = this.$echarts.init(document.getElementById('zongrenshu'));
            // let notUpLoad = this.$echarts.init(document.getElementById('notUpLoad'));
            let jianmianjiancha = this.$echarts.init(document.getElementById('jianmianjiancha'));
            let shegongzoufang = this.$echarts.init(document.getElementById('shegongzoufang'));
            let shejiezhixing = this.$echarts.init(document.getElementById('shejiezhixing'));
            let shekangkangfu = this.$echarts.init(document.getElementById('shekangkangfu'));
            let zaicezengzhang = this.$echarts.init(document.getElementById('zaicezengzhang'));
            let xingbie = this.$echarts.init(document.getElementById('xingbie'));
            let nianling = this.$echarts.init(document.getElementById('nianling'));
            let zhiye = this.$echarts.init(document.getElementById('zhiye'));
            let leixing = this.$echarts.init(document.getElementById('leixing'));
            let niaojian = this.$echarts.init(document.getElementById('niaojian'));
            let weiniaojian = this.$echarts.init(document.getElementById('weiniaojian'));
            let qiandao = this.$echarts.init(document.getElementById('qiandao'));
            let notqiandao = this.$echarts.init(document.getElementById('notqiandao'));

            // 绘制图表
            myChart.setOption(this.allUserNum);
            xinzeng.setOption(this.xinzeng);
            weiqiandao.setOption(this.notUpLoadByOrg);
            zongrenshu.setOption(this.zongrenshu);
            // notUpLoad.setOption(this.notUpLoad);
            jianmianjiancha.setOption(this.jianmianjiancha);
            shegongzoufang.setOption(this.shegongzoufang);
            shejiezhixing.setOption(this.shejiezhixing);
            shekangkangfu.setOption(this.shekangkangfu);
            zaicezengzhang.setOption(this.zaicezengzhang);
            xingbie.setOption(this.xingbie);
            nianling.setOption(this.nianling);
            zhiye.setOption(this.zhiye);
            leixing.setOption(this.leixing);
            niaojian.setOption(this.niaojian);
            weiniaojian.setOption(this.weiniaojian);
            qiandao.setOption(this.qiandao);
            notqiandao.setOption(this.notqiandao);
            
        },
        //递归处理树形结构最后一项为空
        digui(data){
            for(var i = 0; i<data.length;i++){
              if(data[i].children.length==0){
                var obj = {};
                obj.label = data[i].label;
                obj.org_id = data[i].org_id;
                obj.org_type = data[i].org_type;
                obj.value = data[i].value;
                data[i] = obj;
              }else{
                this.digui(data[i].children)
              }
            }
            this.data = data;
            return data
        },
        getAllUserNum(){
                const self = this;
                var params = new URLSearchParams();
                var token = localStorage.getItem('auth');
                params.append('org_id',self.org_idList);      
                self.$axios({
                    method: 'post',
                    url: '/stop/getTotalUserPerMonth',
                    data: params,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded','kf-token':token},
                 }).then(function(data){
                    if(data.data.code==0){
                        var countArr = [];
                        var countArr1 = [];
                        for(var i = 0;i<data.data.data.length;i++){
                            countArr.push(data.data.data[i].month);
                            countArr1.push(data.data.data[i].quantity);
                        }
                        self.allUserNum.xAxis[0].data = countArr;
                        self.allUserNum.series[0].data = countArr1;
                        self.drawLine();
                    }else{
                      self.$response(data,self);
                    }
                 });
        },
        getAddUserNum(){
                const self = this;
                var params = new URLSearchParams();
                var token = localStorage.getItem('auth');
                params.append('org_id',self.org_idList);      
                self.$axios({
                    method: 'post',
                    url: '/stop/getAddUserPerMonth',
                    data: params,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded','kf-token':token},
                 }).then(function(data){
                    if(data.data.code==0){
                        var countArr = [];
                        var countArr1 = [];
                        for(var i = 0;i<data.data.data.length;i++){
                            countArr.push(data.data.data[i].month);
                            countArr1.push(data.data.data[i].quantity);
                        }
                        self.xinzeng.xAxis[0].data = countArr;
                        self.xinzeng.series[0].data = countArr1;
                        self.drawLine();
                    }else{
                      self.$response(data,self);
                    }
                 });
        },
        //见面检查状图数据
        getjianmianjianchaData(){
                const self = this;
                var params = new URLSearchParams();
                var token = localStorage.getItem('auth');
                params.append('org_id',self.org_idList); 
                params.append('report_id','4');
                params.append('upload_status','1');      
                self.$axios({
                    method: 'post',
                    url: '/stop/getUploadPerMonth',
                    data: params,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded','kf-token':token},
                 }).then(function(data){
                    if(data.data.code==0){
                        var countArr = [];
                        var countArr1 = [];
                        for(var i = 0;i<data.data.data.length;i++){
                            countArr.push(data.data.data[i].month);
                            countArr1.push(data.data.data[i].quantity);
                        }
                        self.jianmianjiancha.xAxis[0].data = countArr;
                        self.jianmianjiancha.series[0].data = countArr1;
                        self.drawLine();
                    }else{
                      self.$response(data,self);
                    }
                 });
        },
        //见面社工走访数据
        getshegongzoufangData(){
                const self = this;
                var params = new URLSearchParams();
                var token = localStorage.getItem('auth');
                params.append('org_id',self.org_idList); 
                params.append('report_id','5'); 
                params.append('upload_status','1');     
                self.$axios({
                    method: 'post',
                    url: '/stop/getUploadPerMonth',
                    data: params,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded','kf-token':token},
                 }).then(function(data){
                    if(data.data.code==0){
                        var countArr = [];
                        var countArr1 = [];
                        for(var i = 0;i<data.data.data.length;i++){
                            countArr.push(data.data.data[i].month);
                            countArr1.push(data.data.data[i].quantity);
                        }
                        self.shegongzoufang.xAxis[0].data = countArr;
                        self.shegongzoufang.series[0].data = countArr1;
                        self.drawLine();
                    }else{
                      self.$response(data,self);
                    }
                 });
        },
        //签到人数柱状图数据
        getQiandaoData(){
                const self = this;
                var params = new URLSearchParams();
                var token = localStorage.getItem('auth');
                params.append('org_id',self.org_idList); 
                params.append('report_id','sign'); 
                params.append('upload_status','1');     
                self.$axios({
                    method: 'post',
                    url: '/stop/getUploadPerMonth',
                    data: params,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded','kf-token':token},
                 }).then(function(data){
                    if(data.data.code==0){
                        var countArr = [];
                        var countArr1 = [];
                        for(var i = 0;i<data.data.data.length;i++){
                            countArr.push(data.data.data[i].month);
                            countArr1.push(data.data.data[i].quantity);
                        }
                        self.qiandao.xAxis[0].data = countArr;
                        self.qiandao.series[0].data = countArr1;
                        self.drawLine();
                    }else{
                      self.$response(data,self);
                    }
                 });
        },
        //未签到人数柱状图数据
        getNotqiandaoData(){
                const self = this;
                var params = new URLSearchParams();
                var token = localStorage.getItem('auth');
                params.append('org_id',self.org_idList); 
                params.append('report_id','sign'); 
                params.append('upload_status','0');     
                self.$axios({
                    method: 'post',
                    url: '/stop/getUploadPerMonth',
                    data: params,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded','kf-token':token},
                 }).then(function(data){
                    if(data.data.code==0){
                        var countArr = [];
                        var countArr1 = [];
                        for(var i = 0;i<data.data.data.length;i++){
                            countArr.push(data.data.data[i].month);
                            countArr1.push(data.data.data[i].quantity);
                        }
                        self.notqiandao.xAxis[0].data = countArr;
                        self.notqiandao.series[0].data = countArr1;
                        self.drawLine();
                    }else{
                      self.$response(data,self);
                    }
                 });
        },
        //尿检人数柱状图数据
        getNiaojianData(){
                const self = this;
                var params = new URLSearchParams();
                var token = localStorage.getItem('auth');
                params.append('org_id',self.org_idList); 
                params.append('report_id','2'); 
                params.append('upload_status','1');     
                self.$axios({
                    method: 'post',
                    url: '/stop/getUploadPerMonth',
                    data: params,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded','kf-token':token},
                 }).then(function(data){
                    if(data.data.code==0){
                        var countArr = [];
                        var countArr1 = [];
                        for(var i = 0;i<data.data.data.length;i++){
                            countArr.push(data.data.data[i].month);
                            countArr1.push(data.data.data[i].quantity);
                        }
                        self.niaojian.xAxis[0].data = countArr;
                        self.niaojian.series[0].data = countArr1;
                        self.drawLine();
                    }else{
                      self.$response(data,self);
                    }
                 });
        },
        //尿检人数柱状图数据
        getWeiniaojianData(){
                const self = this;
                var params = new URLSearchParams();
                var token = localStorage.getItem('auth');
                params.append('org_id',self.org_idList); 
                params.append('report_id','2'); 
                params.append('upload_status','0');     
                self.$axios({
                    method: 'post',
                    url: '/stop/getUploadPerMonth',
                    data: params,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded','kf-token':token},
                 }).then(function(data){
                    if(data.data.code==0){
                        var countArr = [];
                        var countArr1 = [];
                        for(var i = 0;i<data.data.data.length;i++){
                            countArr.push(data.data.data[i].month);
                            countArr1.push(data.data.data[i].quantity);
                        }
                        self.weiniaojian.xAxis[0].data = countArr;
                        self.weiniaojian.series[0].data = countArr1;
                        self.drawLine();
                    }else{
                      self.$response(data,self);
                    }
                 });
        },
        //社戒柱状图数据
        getShejiezhixingData(){
                const self = this;
                var params = new URLSearchParams();
                var token = localStorage.getItem('auth');
                params.append('org_id',self.org_idList); 
                params.append('user_type_code','shejie');     
                self.$axios({
                    method: 'post',
                    url: '/stop/chart/getShejieLogCountPerMonth',
                    data: params,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded','kf-token':token},
                 }).then(function(data){
                    if(data.data.code==0){
                        var countArr = [];
                        var countArr1 = [];
                        for(var i = 0;i<data.data.data.length;i++){
                            countArr.push(data.data.data[i].month);
                            countArr1.push(data.data.data[i].quantity);
                        }
                        self.shejiezhixing.xAxis[0].data = countArr;
                        self.shejiezhixing.series[0].data = countArr1;
                        self.drawLine();
                    }else{
                      self.$response(data,self);
                    }
                 });
        },
        //社康柱状图数据
        getShekangkangfuData(){
                const self = this;
                var params = new URLSearchParams();
                var token = localStorage.getItem('auth');
                params.append('org_id',self.org_idList); 
                params.append('user_type_code','shekang');     
                self.$axios({
                    method: 'post',
                    url: '/stop/chart/getShejieLogCountPerMonth',
                    data: params,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded','kf-token':token},
                 }).then(function(data){
                    if(data.data.code==0){
                        var countArr = [];
                        var countArr1 = [];
                        for(var i = 0;i<data.data.data.length;i++){
                            countArr.push(data.data.data[i].month);
                            countArr1.push(data.data.data[i].quantity);
                        }
                        self.shekangkangfu.xAxis[0].data = countArr;
                        self.shekangkangfu.series[0].data = countArr1;
                        self.drawLine();
                    }else{
                      self.$response(data,self);
                    }
                 });
        },
        //在册柱状图数据
        getZaicezengzhangData(){
                const self = this;
                var params = new URLSearchParams();
                var token = localStorage.getItem('auth');
                params.append('org_id',self.org_idList); 
                params.append('user_type_code','zaice');     
                self.$axios({
                    method: 'post',
                    url: '/stop/chart/getShejieLogCountPerMonth',
                    data: params,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded','kf-token':token},
                 }).then(function(data){
                    if(data.data.code==0){
                        var countArr = [];
                        var countArr1 = [];
                        for(var i = 0;i<data.data.data.length;i++){
                            countArr.push(data.data.data[i].month);
                            countArr1.push(data.data.data[i].quantity);
                        }
                        self.zaicezengzhang.xAxis[0].data = countArr;
                        self.zaicezengzhang.series[0].data = countArr1;
                        self.drawLine();
                    }else{
                      self.$response(data,self);
                    }
                 });
        },
        notUpLoadNum(){
                const self = this;
                var params = new URLSearchParams();
                var token = localStorage.getItem('auth');
                params.append('org_id',self.org_idList);      
                self.$axios({
                    method: 'post',
                    url: '/stop/getUnUploadPerMonth',
                    data: params,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded','kf-token':token},
                 }).then(function(data){
                    if(data.data.code==0){
                        var countArr = [];
                        var countArr1 = [];
                        for(var i = 0;i<data.data.data.length;i++){
                            countArr.push(data.data.data[i].month);
                            countArr1.push(data.data.data[i].quantity);
                        }
                        self.notUpLoad.xAxis.data = countArr;
                        self.notUpLoad.series[0].data = countArr1;
                        self.drawLine();
                    }else{
                      self.$response(data,self);
                    }
                 });
        },
        notUpLoadNumByOrg(){
                const self = this;
                var params = new URLSearchParams();
                var token = localStorage.getItem('auth');
                params.append('org_id',self.org_idList);      
                self.$axios({
                    method: 'post',
                    url: '/stop/getUnUploadPerOrg',
                    data: params,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded','kf-token':token},
                 }).then(function(data){
                    if(data.data.code==0){
                        var countArr = [];
                        var countArr1 = [];
                        for(var i = 0;i<data.data.data.length;i++){
                            countArr.push(data.data.data[i].org_name);
                            var obj={};
                            obj.value = data.data.data[i].quantity;
                            obj.name = data.data.data[i].org_name;
                            countArr1.push(obj);
                        }
                        self.notUpLoadByOrg.legend.data = countArr;
                        self.notUpLoadByOrg.series[0].data = countArr1;
                        self.drawLine();
                    }else{
                      self.$response(data,self);
                    }
                 });
        },
        getOrgUserNum(){
                const self = this;
                var params = new URLSearchParams();
                var token = localStorage.getItem('auth');
                params.append('org_id',self.org_idList);      
                self.$axios({
                    method: 'post',
                    url: '/stop/getUserCountPerOrg',
                    data: params,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded','kf-token':token},
                 }).then(function(data){
                    if(data.data.code==0){
                        var countArr = [];
                        var countArr1 = [];
                        for(var i = 0;i<data.data.data.length;i++){
                            countArr.push(data.data.data[i].org_name);
                            var obj={};
                            obj.value = data.data.data[i].quantity;
                            obj.name = data.data.data[i].org_name;
                            countArr1.push(obj);
                        }
                        self.zongrenshu.legend.data = countArr;
                        self.zongrenshu.series[0].data = countArr1;
                        self.drawLine();
                    }else{
                      self.$response(data,self);
                    }
                 });
        },
        //性别饼状图数据
        getXingbieData(){
                const self = this;
                var params = new URLSearchParams();
                var token = localStorage.getItem('auth');
                params.append('org_id',self.org_idList);      
                self.$axios({
                    method: 'post',
                    url: '/stop/getUserCountBySex',
                    data: params,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded','kf-token':token},
                 }).then(function(data){
                    if(data.data.code==0){
                        var countArr = [];
                        var countArr1 = [];
                        for(var i = 0;i<data.data.data.length;i++){
                            countArr.push(data.data.data[i].user_sex);
                            var obj={};
                            obj.value = data.data.data[i].user_count;
                            obj.name = data.data.data[i].user_sex;
                            countArr1.push(obj);
                        }
                        self.xingbie.legend.data = countArr;
                        self.xingbie.series[0].data = countArr1;
                        self.drawLine();
                    }else{
                      self.$response(data,self);
                    }
                 });
        },
        //类型饼状图数据
        getLeixingData(){
                const self = this;
                var params = new URLSearchParams();
                var token = localStorage.getItem('auth');
                params.append('org_id',self.org_idList);      
                self.$axios({
                    method: 'post',
                    url: '/stop/getUserCountByUserType',
                    data: params,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded','kf-token':token},
                 }).then(function(data){
                    if(data.data.code==0){
                        var countArr = [];
                        var countArr1 = [];
                        for(var i = 0;i<data.data.data.length;i++){
                            countArr.push(data.data.data[i].user_type_name);
                            var obj={};
                            obj.value = data.data.data[i].user_count;
                            obj.name = data.data.data[i].user_type_name;
                            countArr1.push(obj);
                        }
                        self.leixing.legend.data = countArr;
                        self.leixing.series[0].data = countArr1;
                        self.drawLine();
                    }else{
                      self.$response(data,self);
                    }
                 });
        },
        
        //年龄饼状图数据
        getNianlingData(){
                const self = this;
                var params = new URLSearchParams();
                var token = localStorage.getItem('auth');
                params.append('org_id',self.org_idList);      
                self.$axios({
                    method: 'post',
                    url: '/stop/getUserCountByAge',
                    data: params,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded','kf-token':token},
                 }).then(function(data){
                    if(data.data.code==0){
                        var countArr = [];
                        var countArr1 = [];
                        for(var i = 0;i<data.data.data.length;i++){
                            countArr.push(data.data.data[i].user_age_name);
                            var obj={};
                            obj.value = data.data.data[i].user_count;
                            obj.name = data.data.data[i].user_age_name;
                            countArr1.push(obj);
                        }
                        self.nianling.legend.data = countArr;
                        self.nianling.series[0].data = countArr1;
                        self.drawLine();
                    }else{
                      self.$response(data,self);
                    }
                 });
        },
        //职业饼状图数据
        getZhiyeData(){
                const self = this;
                var params = new URLSearchParams();
                var token = localStorage.getItem('auth');
                params.append('org_id',self.org_idList);      
                self.$axios({
                    method: 'post',
                    url: '/stop/getUserCountByJob',
                    data: params,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded','kf-token':token},
                 }).then(function(data){
                    if(data.data.code==0){
                        var countArr = [];
                        var countArr1 = [];
                        for(var i = 0;i<data.data.data.length;i++){
                            countArr.push(data.data.data[i].user_job_name);
                            var obj={};
                            obj.value = data.data.data[i].user_count;
                            obj.name = data.data.data[i].user_job_name;
                            countArr1.push(obj);
                        }
                        self.zhiye.legend.data = countArr;
                        self.zhiye.series[0].data = countArr1;
                        self.drawLine();
                    }else{
                      self.$response(data,self);
                    }
                 });
        },

        //获取分组信息
        getOrgsList(){
                const self = this;
                var params = new URLSearchParams();
                var token = localStorage.getItem('auth');
                // params.append('currentPage',self.currentPage);        
                self.$axios({
                    method: 'post',
                    url: '/stop/getOrgTree',
                    data: params,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded','kf-token':token},
                 }).then(function(data){
                    if(data.data.code==0){
                       self.orgTree = self.digui(data.data.data);

                    }else{
                      self.$response(data,self);
                    }
                 });
          },
      }
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
    .bigBox{
        width: 100%;
        height: 100%;
        overflow-y: scroll;
    }
    .bigBox::-webkit-scrollbar {/*滚动条整体样式*/
            width: 4px;     /*高宽分别对应横竖滚动条的尺寸*/
            height: 4px;
    }
    .bigBox::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
            border-radius: 5px;
            -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
            background: rgba(0,0,0,0.2);
    }
    .bigBox::-webkit-scrollbar-track {/*滚动条里面轨道*/
            -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
            border-radius: 0;
            background: rgba(0,0,0,0.1);
    }
    .chart{
        width: 100%;
        margin-top:20px;
    }
    .chartDiv{
        float: left;
        margin-top: 50px;
        margin-left: 5%;
    }
    .chartDiv2{
        float: left;
        margin-top: 120px;
        margin-left: 5%;
        overflow:hidden;
    }
    
</style>