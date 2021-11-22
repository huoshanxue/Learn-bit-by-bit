<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <h1 class="link-news" @click="toNews">跳转新闻页面</h1>
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld
  },
  methods: {
    toNews () {
      this.$router.push('/article')
    }
  }
}
</script>

<style lang="less" scoped>
.link-news {
  text-decoration: underline;
}
</style>
