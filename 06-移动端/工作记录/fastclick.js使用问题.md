## 问题一：IOS 系统下 fastclick.js 导致 input+label 单击失效

### 前言

我平常复选框都用`input:checkbox+label`的处理方式，以前没有用过 fastclick.js,这次碰到这个问题，在 `ios` 下单击 `label` 无法选中。

### 解决办法

1、按照文档对 label 内的直接子元素全部添加 `needsclick` 的 class。
2、对 label 直接子元素全部添加样式 `pointer-events:none`。

### 原因分析

初看了下 fastclick.js，在`onMouse` 方法里面这个位置，由于当前点击不是 input 而是通过其他传递过去的，所以判断返回了 true,然后清除了后续行为。下面看源码：

```js
FastClick.prototype.onMouse = function (event) {
  // If a target element was never set (because a touch event was never fired) allow the event
  if (!this.targetElement) {
    return true;
  }
  if (event.forwardedTouchEvent) {
    return true;
  }
  // Programmatically generated events targeting a specific element should be permitted
  if (!event.cancelable) {
    return true;
  }
  // Derive and check the target element to see whether the mouse event needs to be permitted;
  // unless explicitly enabled, prevent non-touch click events from triggering actions,
  // to prevent ghost/doubleclicks.
  if (!this.needsClick(this.targetElement) || this.cancelNextClick) {
    // Prevent any user-added listeners declared on FastClick element from being fired.
    if (event.stopImmediatePropagation) {
      event.stopImmediatePropagation();
    } else {
      // Part of the hack for browsers that don't support Event#stopImmediatePropagation (e.g. Android 2)
      event.propagationStopped = true;
    }
    // Cancel the event
    event.stopPropagation();
    event.preventDefault();
    return false;
  }
  // If the mouse event is permitted, return true for the action to go through.
  return true;
};
```

## 问题二：导致 input 无法触发问题解决方案

在 iOS 11.3 移动端页面 input 输入框第一次触摸可以弹起键盘，后续再触摸需要很难弹起键盘，或者需要在输入框停一会才能弹起键盘。

### 解决办法

在 `import FastClick from 'fastclick'` 后重写 focus 方法，代码如下：

```js
FastClick.prototype.focus = function (targetElement) {
  var length;
  //兼容处理:在iOS7中，有一些元素（如date、datetime、month等）在setSelectionRange会出现TypeError
  //这是因为这些元素并没有selectionStart和selectionEnd的整型数字属性，所以一旦引用就会报错，因此排除这些属性才使用setSelectionRange方法
  if (
    deviceIsIOS &&
    targetElement.setSelectionRange &&
    targetElement.type.indexOf("date") !== 0 &&
    targetElement.type !== "time" &&
    targetElement.type !== "month" &&
    targetElement.type !== "email"
  ) {
    length = targetElement.value.length;
    targetElement.setSelectionRange(length, length);
    /*修复bug ios 11.3不弹出键盘，这里加上聚焦代码，让其强制聚焦弹出键盘*/
    targetElement.focus();
  } else {
    targetElement.focus();
  }
};
```
