### 清除 ios 上搜索框一些默认样式

```css
CSS代码：
/* 去除圆角 */
input[type=search] { -webkit-appearance: none; }

/* 隐藏取消按钮 */
::-webkit-search-cancel-button { -webkit-appearance: none; }

/* 隐藏放大镜 */
::-webkit-search-results-button { -webkit-appearance: none; }
```