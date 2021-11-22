<template>
  <div id="app">
    <router-view />
    <!-- <keep-alive>
      <router-view />
    </keep-alive> -->
  </div>
</template>

<style lang="less">
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
h1,
h2,
h3 {
  font-size: 19px;
  font-weight: normal;
}
ul, li {
  text-decoration: none;
}
#app {
  height: 100%;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  color: #2c3e50;
}
html, body {
  width: 100%;
  height: 100%;
}
</style>
