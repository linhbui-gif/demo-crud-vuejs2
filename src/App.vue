<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
// import HomePage from '@/pages/HomePage'

export default {
  name: 'App',
  components: { }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
html,body,#app,.admin-layout,.el-container,.el-menu{
  height: 100%!important;
}
</style>
