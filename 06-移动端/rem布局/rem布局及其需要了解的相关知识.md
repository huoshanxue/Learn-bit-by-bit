## rem 单位
相对于 html 元素的 font-size 大小

## em 单位
相对于父元素的 font-size 大小

## @media 媒体查询使用
``` css
@media mediatype ans|not|only (media feature) {
  css-code;
}
```
- 用 @media 开头，注意@符号
- mediatype 媒体类型
  - all ：用于所有的设备
  - print ：用于打印机和打印预览
  - screen ：用于电脑屏幕，平板电脑，智能手机等 
- 关键字 and not only
  - and ：可以将多个媒体特性连接到一起，相当于“且”的意思
  - not ：排除某个媒体类型，相当于“非”的意思，可以省略
  - only ：指定某个特定的媒体类型，可以省略 
- media feature 媒体特性，必须使用小括号包含。暂且了解其中三个
  - width ：宽度
  - min-width ：最小宽度
  - max-width ：最大宽度

举例说明：
``` css
/* 屏幕上，并且最大的宽度是 800px 设置想要的样式 */
@media screen and (max-width: 800px) {
  body {
    background-color: pink;
  }
}
@media screen and (max-width: 500px) {
  body {
    background-color: brown;
  }
}
```

## 媒体查询
### 引入资源
当样式比较复杂的时候，我们可针对不同的媒体使用不同的 stylesheet（样式表），原理，就是直接在 link 中判断设备的尺寸，然后引用不同的 css 文件。
#### 语法规范
``` html
<link rel="stylesheet" media="mediatype and|not|only (media feature)" href="mystylesheet.css">
```
具体说明：
``` html
<link rel="stylesheet" href="style320.css" media="screen and (min-width: 320px)">
<link rel="stylesheet" href="style640.css" media="screen and (min-width: 640px)">
```

## rem 适配方案技术主流
1. 技术方案1
  - less
  - 媒体查询
  - rem
2. 技术方案2（推荐）
  - flexible.js
  - rem

### 动态设置 html 标签的 font-size 大小
  1. 假设设计稿是 750px
  2. 假设整个屏幕划分为 15 等分（划分标准不一可以是20份也可以是10等分）
  3. 每一份作为 html 字体大小，这里就是 50px
  4. 那么在 320px 设备的时候，字体大小为 320、15 就是 21.33px
  5. 用我们页面设计大小除以不同的 html 字体大小就会发现他们的比例还是相同的
  6. 比如我们以 750 为标准的设计稿
  7. 一个 100 * 100 像素的页面元素在 750 屏幕下，就是 100/50 转为 rem 是 2rem * 2rem 比例是 1:1
  8. 320 屏幕下，html 字体大小为 21.33，则 2rem=42.66px，此时宽和高都是 42.66，但是宽和高的比例还是 1:1
  9. 但是已经能够实现不同平刷新页面元素盒子等比例缩放的效果

### 元素大小取值方法
  1. 公式：页面元素的 rem 值 = 页面元素值（px） / （屏幕宽度 / 划分的份数）
  2. 屏幕宽度 / 划分的份数就是 html font-size 的大小
  3. 或者：页面元素的 rem 值 = 页面元素值（px） / html font-size 大小

### rem + flexible.js
> 手机淘宝团队出的简洁高效移动端适配库，我们再也不用再写不同屏幕的媒体查询，因为里面 js 做了处理。  
> 它的原理就是把当前的设备划分为 10 等份，但是在不同设备下，比例还是一致的。  
> 我们要做的就是确定好当前的设备的 html 文字大小就可以了。  
> 比如当前设计稿是 750px，那么我们需要把 html 文字大小设置为 75px（750px / 10）就可以，里面页面元素 rem 值：页面元素的 px 值 / 75，剩余的就让 flexible 来计算。

#### VSCode 将 px 转换为 rem 插件 cssrem
这个插件默认的 html 文字大小 cssroot 16px，需要根据需要修改
  1. 打开设置快捷键是 ctrl+逗号