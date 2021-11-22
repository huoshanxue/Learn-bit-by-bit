## 前言

> 之所以有这篇文章，是因为最近公司有这样一个需求，就是需要把页面某一块内容生成一个图片，然后可以用来分享到第三方软件。然后自己在网上找了发现 html2canvas 这个 JS 库。

## 问题记录

首先贴出官网地址：有需要可以前往 [html2canvas 官网](http://html2canvas.hertzen.com/)

下面就是具体的实现代码：

```js
/**
 * @description: 根据window.devicePixelRatio获取像素比
 */
function DPR() {
  if (window.devicePixelRatio && window.devicePixelRatio > 1) {
    return window.devicePixelRatio;
  }
  return 1;
}

/**
 *  @description: 将传入值转为整数
 */
function parseValue(value) {
  return parseInt(value, 10);
}
/**
 * @description: 绘制canvas
 */
async function drawCanvas(selector) {
  // 获取想要转换的 DOM 节点
  const dom = document.querySelector(selector);
  // DOM 节点计算后宽高
  // 当 DOM 元素出现滚动就需要求 scrollWidth scrollHeight
  const width = parseValue(dom.offsetWidth);
  const height = parseValue(dom.offsetHeight);
  // 获取像素比
  const scaleBy = DPR();
  // 创建自定义 canvas 元素
  var canvas = document.createElement("canvas");
  // 设定 canvas 元素属性宽高为 DOM 节点宽高 * 像素比
  canvas.width = width * scaleBy;
  canvas.height = height * scaleBy;
  // 设定 canvas css宽高为 DOM 节点宽高
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  // 获取画笔
  const context = canvas.getContext("2d");
  // 将所有绘制内容放大像素比倍
  context.scale(scaleBy, scaleBy);
  let x = width;
  let y = height;
  return await html2canvas(dom, {
    canvas,
    width: x,
    heigth: y,
  }).then(function () {
    convertCanvasToImage(canvas, x, y);
  });
}
/**
 * @description: 图片转base64格式，将图片显示在页面上，以供查看
 */
function convertCanvasToImage(canvas, x, y) {
  let image = new Image();
  image.width = x;
  image.height = y;
  image.src = canvas.toDataURL("image/png");
  document.body.appendChild(image);
}
```

使用以上就发现一个巨大的问题，当页面内容过多，滚动后，隐藏的那一部分就不会被截取了，所以就需要作如下的修改

源码有如下一段内容，源码：

```js
return renderDocument(
  node.ownerDocument,
  options,
  node.ownerDocument.defaultView.innerWidth,
  node.ownerDocument.defaultView.innerHeight,
  index
).then(function (canvas) {
  if (typeof options.onrendered === "function") {
    log(
      "options.onrendered is deprecated, html2canvas returns a Promise containing the canvas"
    );
    options.onrendered(canvas);
  }
  return canvas;
});
```

将上部分代码修改为如下：

```js
//解决BUG 对于部分不能截屏不能全屏添加自定义宽高的参数以支持
var width =
  options.width != null
    ? options.width
    : node.ownerDocument.defaultView.innerWidth;
var height =
  options.height != null
    ? options.height
    : node.ownerDocument.defaultView.innerHeight;
return renderDocument(node.ownerDocument, options, width, height, index).then(
  function (canvas) {
    if (typeof options.onrendered === "function") {
      log(
        "options.onrendered is deprecated, html2canvas returns a Promise containing the canvas"
      );
      options.onrendered(canvas);
    }
    return canvas;
  }
);
```

修改之后就可以了。

> 在网上还看到一种办法，其思路就是在省城图片的之前让你需要截取的 DOM 元素 滚动到最开始，下面只是一种情况，让页面滚动到最顶端。当页面不滚动时候，只有 你要的 DOM 元素滚动到顶部就需要例如 `dom.scrollTop = 0`，思路就是这样，根据具体情况具体对待。

```js
window.pageYoffset = 0;
document.documentElement.scrollTop = 0;
document.body.scrollTop = 0;
// 生成图片前执行
```

### 参考：

[html2canvas 踩坑总结](http://www.cnblogs.com/zhengtulym/p/6092652.html)
