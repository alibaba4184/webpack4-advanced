<template>
  <div id="app">
    {{ msg }}
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: "hello vue+webpack",
    };
  },
};
</script>

<style>
#test {
  color: aqua;
}
</style>
