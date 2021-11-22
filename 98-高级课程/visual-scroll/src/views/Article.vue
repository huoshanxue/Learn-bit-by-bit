<template>
  <div class="article">
    <button @click="changeShow">点击一下切换</button>
    <MyInput ref="inputRef" v-if="showInput" placeholder="请输入" name="test"></MyInput>
    <div v-else class="news-ul" ref="scrollContainer"  @scroll.passive="handleScroll">
      <div :style="scrollSpace">
        <div class="news-li" v-for="(item, index) in showList" :key="index" ref="newsItem" @click="clickItem">
          <div class="news-left">
            <h3 class="news-title">{{item.id}} --- {{ item.title }}</h3>
            <div class="news-info">
              <div class="news-info-left">
                <span class="comment-num">{{ item.reads }}</span>
                <span class="author">{{ item.from }}</span>
              </div>
              <div class="news-date">{{ item.date }}</div>
            </div>
          </div>
          <div class="news-right"><img :src="item.image" /></div>
        </div>
      </div>
      <div class="loading-text" v-if="isLoading">正在加载...</div>
    </div>
  </div>
</template>

<script>
// import MyInput from '../components/Input'
import MyInput from '../components/InputPage'
export default {
  components: { MyInput },
  data () {
    return {
      isLoading: false,
      fisrtLoading: true,
      list: [],
      canScroll: true,
      startIndex: 0, // 可是元素开始索引
      containerHeight: '', // 容积的高度
      containSize: '', // 能够容纳多少
      oneHeight: 120, // 计算某个高度
      showInput: false,
      scrollTop: 0 // 保存页面滚动的高度
    }
  },
  computed: {
    // 可视元素最后索引
    endIndex () {
      let endIndex = this.startIndex + this.containSize * 2
      if (!this.list[endIndex]) {
        endIndex = this.list.length
      }
      // console.log('endIndex', endIndex)
      return endIndex
    },
    // 实际显示的列表
    showList () {
      let start = 0
      if (this.startIndex < this.containSize) {
        start = 0
      } else {
        start = this.startIndex - this.containSize
      }
      const showList = this.list.slice(start, this.endIndex)
      return showList
    },
    // 计算空白占位，用于滚动
    scrollSpace () {
      return {
        paddingTop: this.startIndex * this.oneHeight + 'px',
        paddingBottom: (this.list.length - this.endIndex) * this.oneHeight + 'px'
      }
    }
  },
  activated () {
    console.log(this.scrollTop)
    this.$refs.scrollContainer.scrollTop = this.scrollTop
  },
  created () {
    this.getList()
  },
  updated () {
    this.getMysize()
    window.onresize = this.getMysize
    window.orientationchange = this.getMysize // 横屏滚动
  },
  methods: {
    changeShow () {
      this.showInput = !this.showInput
      if (this.showInput) {
        this.$nextTick(() => {
          // console.log(this.$refs.inputRef)
          // this.$refs.inputRef.$el.focus()
        })
      }
    },
    async getList () {
      if (this.isLoading) return
      this.isLoading = true
      const res = await this.$axios.get('http://192.168.1.103:4000/data?num=10')
      this.list = [...this.list, ...res.data.list]
      console.log('请求的列表：', this.list)
      this.fisrtLoading = false
      this.isLoading = false
    },
    getMysize () {
      // DOM结构已经渲染出来了，但是如果在DOM结构中的某个DOM节点使用了v-if、v-show或者v-for
      // （即根据获得的后台数据来动态操作DOM，即响应式），那么这些DOM是不会再mounted阶段找到的。
      // console.log(this.$refs.scrollContainer)
      this.containerHeight = this.$refs.scrollContainer.offsetHeight
      this.containSize = Math.ceil(this.containerHeight / this.oneHeight) + 1
      console.log(this.containSize)
      // console.log('containSize = ' + this.containSize)
    },
    handleScroll () {
      // console.log('页面滚动了')
      // this.setStartIndex()
      // let oldTime = (new Date()).valueOf()
      // const fn = () => {
      //   this.setStartIndex()
      //   const newTime = (new Date()).valueOf()
      //   if (newTime - oldTime > 1000) {
      //     oldTime = newTime
      //     // window.requestAnimationFrame(arguments.callee)
      //     window.requestAnimationFrame(fn)
      //   }
      // }
      // window.requestAnimationFrame(fn)
      if (this.canScroll) {
        this.canScroll = false
        this.setStartIndex()
        const timer = setTimeout(() => {
          this.canScroll = true
          clearTimeout(timer)
        }, 30)
      }
    },
    setStartIndex () {
      this.scrollTop = this.$refs.scrollContainer.scrollTop
      const startIndex = ~~(this.$refs.scrollContainer.scrollTop / this.oneHeight)
      // console.log(this.startIndex)
      if (this.startIndex === startIndex) return
      this.startIndex = startIndex
      // console.log('startIndex', this.startIndex)
      // console.log(this.endIndex, this.list.length)
      if (this.endIndex === this.list.length) {
        this.getList()
      }
    },
    clickItem () {
      this.$router.push('/news')
    }
  }
}
</script>

<style lang="less" scoped>
@import '../assets/css/article.less';
</style>
