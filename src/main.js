import Vue from 'vue';
import md5 from 'js-md5';
import App from './App';
import router from './router';
import axios from 'axios';
import XLSX from 'xlsx'
import Moment from 'moment';
import echarts from 'echarts';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';    // 默认主题
// import '../static/css/theme-green/index.css';       // 浅绿色主题
import "babel-polyfill";
import infiniteScroll from 'vue-infinite-scroll'
//WebSocket封装方法
import * as socketApi from './vender/socket'
Vue.prototype.socketApi = socketApi


Vue.use(ElementUI);
Vue.use(infiniteScroll);
// axios.defaults.baseURL ="http://172.18.80.97:80";
// axios.defaults.baseURL ="http://106.12.68.167:80";
// axios.defaults.baseURL ="http://192.168.2.99:8011";
// axios.defaults.baseURL ="http://wv8gj2.natappfree.cc";
// axios.defaults.baseURL ="http://172.18.33.20";
// axios.defaults.baseURL ="http://172.18.33.22";
axios.defaults.baseURL ="http://192.168.2.25:8080";
// axios.defaults.baseURL ="http://106.12.68.167";

Vue.prototype.$axios = axios;
Vue.prototype.$moment = Moment;
Vue.prototype.$echarts = echarts;
Vue.prototype.$userGroups = [];
Vue.prototype.$response = function(data,self){
var statu = data.data.code.substr(0,1);
  if(statu==2){
    self.$message({
      type: 'error',
      message: data.data.msg
    });  
  }else if(statu==4){
    self.$message({
      type: 'error',
      message: '登录过期，重新登录'
    });
    self.$router.push('/login');
  }else if(statu==5){
    self.$message({
      type: 'error',
      message: '系统错误，稍后重试'
    });
  }else if(statu==1){
    self.$message({
      type: 'error',
      message: '参数错误'
    });
  }else if(statu==3){
    self.$message({
      type: 'error',
      message: '账号密码错误'
    });
  }else if(statu==6){
    self.$message({
      type: 'error',
      message: '权限不足'
    });
  }
}
new Vue({
    router,
    render: h => h(App)
}).$mount('#app');

var routeList = [];
router.beforeEach((to, from, next) => {
  // console.log(1988778)
  // console.log(to)
  var index = -1;

  for(var i = 0; i < routeList.length; i++) {

    if(routeList[i].name == to.name) {

      index = i;

      break;

    }

  }

  if (index !== -1) {

//如果存在路由列表，则把之后的路由都删掉

    routeList.splice(index + 1, routeList.length - index - 1);

  } else if(to.name != '登录'){

    routeList.push({"name":to.name,"path":to.fullPath});

  }

  to.meta.routeList = routeList;
  // console.log(routeList)
  next();
 
  
});
// function getConfigResult(e){
//   console.log(e)
//   if(e.data==101){
//     router.push('/readme')
//   }else if(e.data==102){
//     router.push('/jiedurenliebiao')
//   }else if(e.data==103){
//     router.push('/jiedurendangan')
//   }else{
//     router.push('/jingyuanliebiao')
//   }
// }
// socketApi.sendSock('text',getConfigResult);