<template>
  <div id="app">
    <router-view />
    {{ msg }}
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
