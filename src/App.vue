<template>
  <div id="app">
    <router-link :to="{name:'registration'}">registration</router-link>
    <router-link :to="{name:'vueShop'}">vueShop</router-link>
    <router-link :to="{name:'popular'}">music</router-link>
    <router-view></router-view>
  </div>
</template>

<script>

export default{
}
</script>


<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
