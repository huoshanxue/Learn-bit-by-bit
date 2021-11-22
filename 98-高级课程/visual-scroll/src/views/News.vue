<template>
  <div class="news-page" @scroll="handleScroll" ref="scrollContainer">
    <!-- <router-link to="/article">点击返回去</router-link> -->
    <!-- <div class="search-box">
      <input ref="inputRef" type="text" autofocus="autofocus">
    </div> -->
    <!-- <MyInput ref="inputRef" placeholder="请输入" name="test"></MyInput> -->
    <div class="page-title">新闻列表</div>
    <transition name="fadeInOut" :duration="{enter: 1000,leave: 0}">
      <div class="top-fixed-area" v-show="showTopArea" ref="showTopArea">
        <div class="date-box">
          <h2 class="title">{{ currentTtile }}111</h2>
          <div class="date">{{ currentDate }}22</div>
        </div>
      </div>
    </transition>
    <div class="list-area">
      <div v-for="item in mockData" :key="item.id">
        <div class="date-box date-test" id="currentDate" ref="dateBox">
          <h2 class="title">{{ item.title }}</h2>
          <div class="date">{{ item.date }}</div>
        </div>
        <div class="content-box" v-for="content in item.data" :key="content.id">
          <h3>{{ content.title }}</h3>
          <img class="img" :src="content.image" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import MyInput from '../components/Input'
export default {
  // components: { MyInput },
  data () {
    return {
      mockData: [],
      currentTtile: '',
      currentDate: '',
      showTopArea: false
    }
  },
  async created () {
    const res = await this.$axios.get('http://192.168.1.103:4000/data?num=10')
    console.log(res)
    this.mockData = res.data.list
  },
  mounted () {
    // console.log('mounted')
    // alert(1)
    // this.$nextTick(() => {
    //   this.$refs.inputRef.focus()
    // })
  },
  methods: {
    handleScroll () {
      const scrollTop = this.$refs.scrollContainer.scrollTop
      const firstOffsetTop = this.$refs.dateBox[0].offsetTop
      console.log(scrollTop, firstOffsetTop)
      const dateBoxs = this.$refs.dateBox
      dateBoxs.forEach((element, index) => {
        if (scrollTop >= (element.offsetTop - 80)) {
          console.log(this.mockData[index], element.offsetTop)
          this.currentTtile = this.mockData[index].title
          this.currentDate = this.mockData[index].date
        }
      })
      if (scrollTop >= firstOffsetTop) {
        this.showTopArea = true
      } else {
        this.showTopArea = false
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import '../assets/css/news.less';
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
