<!--  -->
<template>
  <el-container class="page">
    <el-header>
      <Head></Head>
    </el-header>
    <el-container class="body">
      <el-main class="main">
        <transition>
          <router-view class="router-view"></router-view>
        </transition>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Head from "./../components/head";
export default {
  //import所引入的组件注册
  components: {
       Head
  },

  data() {
    return {};
  },

  //监听属性
  computed: {},

  //监控data中的数据变化
  watch: {},

  //方法集合
  methods: {},

  //生命周期 - 组件实例刚被创建
  beforeCreate() {},
  //创建完成 访问当前this实例
  created() {},
  //挂载之前
  beforeMount() {},
  //挂载完成 访问DOM元素
  mounted() {},
  //更新之前
  beforeUpdate() {},
  beforeRouteEnter(to, from, next) {
    //console.log('通过组件内部判断到当前访问Home页面，放行、通过！')
    //next();
    //问题：项目场景，在执行beforeRouteEnter后改变数据data里面值？
    //重点：beforeRouteEnter钩子比beforCreate都要更早执行，因此我们是不能通过this.msg拿到当前deta值
    //解决方案：next回调函数
    next(vm => {
      vm.msg =
        "欢迎访问我的路由案例，我是在beforeRouteEnter执行后改变过的数据！";
    });
  },
  beforRouteUpdata(to, from, next) {
    next();
    //这个钩子函数主要是针对主导航下的二级导航，也就是说我们之前那么钩子函数都是针对主导航来进行设置，这个是针对二级导航
  },
  beforRouteLeave(to, from, next) {
    next();
    //离开时时候执行钩子函数，如果设置next(false)，那么组件就一直停留在当前路由组件，无法进入其他任何路由组件
  },
  //更新之后
  updated() {},
  //for keep-alive 缓存功能，组件被激活时调用
  activated() {},
  //for keep-alive 组件被移除时调用
  deactivated() {},
  //组件销毁之前调用
  beforeDestroy() {},
  //组件销毁之后调用
  destroyed() {}
};
</script>
<style lang='less' scoped>
.page{
  display: flex;
  flex-direction: column;
  align-items: center;
}
ul.nav .normal {
  color: #71777c;
}
ul.nav .selected {
  color: #007fff;
}
.body{
  max-width: 960px;
  width: 100%;
  min-height:calc( 100vh - 60px);
  color:#333333;
}
.main{
  // border: 1px solid red;
  position: relative;
  /* margin-top:60px */
}
.router-view {
  width: 100%;
  position: absolute;
  z-index: 1;
  left: 0;
  top:0;
}
/*路由组件进出场动画效果start*/
.v-enter {
  opacity: 0;
}
.v-enter-to {
  opacity: 1;
}
.v-enter-active {
  transition: 1s;
}
.v-leave {
  opacity: 1;
}
.v-leave-to {
  opacity: 0;
}
.v-leave-active {
  transition: 0.7s;
}
/*路由组件进出场动画效果end*/

/*自定义的组件动画方式start*/
/*注意，在自定义动画时候的class只能修改v-，后面的不可以修改*/
.left-enter {
  transform: translateX(100%);
}
.left-enter-to {
  transform: translateX(0%);
}
.left-enter-active,
.left-leave-active {
  transition: 1s;
}
.left-leave {
  transform: translateX(0);
}
.left-leave-to {
  transform: translateX(-100%);
}
</style>