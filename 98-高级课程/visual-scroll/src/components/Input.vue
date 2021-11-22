<template>
  <div class="zi-input" :class="{ 'zi-input_suffix': showSuffix}">
    <input class="zi-input_inner"
      ref="input"
      :class="{ 'is-disabled': disabled }"
      :placeholder="placeholder"
      :name="name"
      :type="showPassword ? (passwordVisibale ? 'text' : 'password') : type"
      :value="value"
      :autofocus="autofocus"
      @input="handleInput"
    />
    <span class="zi-input_suffix" v-if="showSuffix">
      <i class="zi-icon-cancel" v-if="clearable && value" @click="clear"></i>
      <i class="zi-icon-visible"
        :class="{ 'zi-icon-active': passwordVisibale }"
        v-if="showPassword && type=='password'"
        @click="handlePassword"
      ></i>
    </span>
  </div>
</template>

<script>
export default {
  name: 'ZiInput',
  data () {
    return {
      passwordVisibale: false
    }
  },
  props: {
    placeholder: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    },
    name: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    value: {
      type: String,
      default: ''
    },
    clearable: {
      type: Boolean,
      default: false
    },
    showPassword: {
      type: Boolean,
      default: false
    },
    autofocus: {
      type: Boolean,
      default: false
    }
  },
  // mounted () {
  //   this.$nextTick(() => {
  //     this.$refs.input.focus()
  //   })
  // },
  // activated () {
  //   alert(12)
  //   this.$nextTick(() => {
  //     this.$refs.input.focus()
  //   })
  // },
  methods: {
    handleInput (e) {
      this.$emit('input', e.target.value)
    },
    clear () {
      this.$emit('input', '')
    },
    handlePassword () {
      this.passwordVisibale = !this.passwordVisibale
    },
    focus () {
      // this.$nextTick(() => {
      this.$refs.input.focus()
      // })
    }
  },
  computed: {
    showSuffix () {
      return this.clearable || this.showPassword
    }
  }
}
</script>

<style lang="less" scoped>
.zi-input {
  width: 300px;
  position: relative;
  font-size: 14px;
  display: inline-block;
  .zi-input_inner {
    -webkit-appearance: none;
    background-color: #fff;
    background-image: none;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    font-size: inherit;
    height: 40px;
    line-height: 40px;
    outline: none;
    padding: 0 15px;
    transition: border-color 0.2s cubic-bezier(0.645, 045, 0.355, 1);
    width: 100%;

    &:focus {
      outline: none;
      border-color: #409eff;
    }
    // input禁用样式
    &.is-disabled {
      background-color: #f5f7fa;
      border-color: #e4e7ed;
      color: #c0c4cc;
      cursor: not-allowed;
    }
  }
}
// 通过判断有没有这个类，来给予样式，此类的添加就可以根据条件
.zi-input_suffix {
  .zi-input_inner {
    padding-right: 30px;
  }
  .zi-input_suffix {
    position: absolute;
    right: 10px;
    height: 100%;
    top: 0;
    line-height: 40px;
    text-align: center;
    color: #c0c4cc;
    transition: all 0.3s;
    z-index: 900;
    i {
      color: #c0c4cc;
      font-size: 14px;
      cursor: pointer;
      transition: color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
    }
    .zi-icon-active {
      color: blue;
    }
  }
}
</style>
