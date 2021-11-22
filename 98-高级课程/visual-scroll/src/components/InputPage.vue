<template>
  <div class="article">
    <h1>这是搜索区域</h1>
    <!-- <div class="search-box">
      <input ref="inputRef" type="text" autofocus="autofocus">
    </div> -->
    <MyInput ref="inputRef" placeholder="请输入" name="test"></MyInput>
  </div>
</template>

<script>
import MyInput from '../components/Input'
export default {
  components: { MyInput },
  data () {
    return {}
  },
  mounted () {
    console.log('mounted')
    this.$nextTick(() => {
      this.$refs.inputRef.focus()
    })
  },
  methods: {}
}
</script>

<style lang="less" scoped>
@import '../assets/css/article.less';
.search-box {
  width: 100%;
  height: 60px;
  box-sizing: border-box;
  input {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
  }
}
</style>
