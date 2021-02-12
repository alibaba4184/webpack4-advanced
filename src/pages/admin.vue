<template>
  <div>
    admin页面
    <router-link to="/login">登陆页面</router-link>
    <router-link to="/404">404</router-link>
    <router-link to="/demo/test">测试页面</router-link>
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  mounted() {},
};
</script>
