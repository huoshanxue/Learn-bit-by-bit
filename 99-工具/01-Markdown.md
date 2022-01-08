

## Markdown 常用语法<a id="top"></a>

### 1.  跳转

> 跳转有两种方式，一个为 markdown 语法 `[链接文字](链接地址)`，一种为 html 中的 a 标签 `<a href="链接地址">链接文字</a> `

[跳转页内最底部](#footer)  
[跳转其他文件](./git.md)  
<a href="#footer">跳转页内最底部(a标签)</a>  
<a href="./git.md">跳转其他文件(a标签)</a>


### 2. 表格
| id   |   name   | age  |  job   |      target |
| :--- | :------: | :--: | :----: | ----------: |
| 居左 |   居中   | 居中 |  居中  |        居右 |
| 1    | zhangsan |  19  | tester | contributor |
| 2    |   lisi   |  21  |  none  |       happy |
| 3    |  wangwu  |  22  |  none  |       happy |

### 3. 图片

> markdown 语法的图片不支持改变大小，如果需要改变大小就需要使用 html 中 img 标签。
>
> - markdown 语法 `![图片描述](图片地址)`
> - img 标签 `<img src="图片地址" alt="图片描述" width="50%" />`
>
> 注：如需要改变图片大小则需要使用 img 标签

![背景图](./background.jpg)
<img src="./background.jpg" alt="背景图" width="50%" />


### 4. 换行
> 换行的方式有许多，下面主要讲述集中比较常用的。

- `---` 使用三个横杠表示
---
- `***` 使用三个星号表示
***
- `-----` 使用多个横杠表示
------

### 5. 居中
> 使用 `<center></center>` 标签包裹内容即可实现内容的居中，图片居中只能够使用 img 标签。

1. 文字居中
<center>这段文字居中显示</center>

2. 图片居中
<center><img src="./background.jpg" width="50%" /></center>


### 6. 自动转换
> 使用 `<>` 包裹内容即可实现内容的自动转换。

邮箱 <example@example.com>  
网址 <https://github.com/huoshanxue>


### 7. 代码
> 代码语法分为代码和代码块两种，代码使用两个反单引号` `` `包裹内容，如：`console.log('单行代码')`，代码块需要使用两对三个反单 ` ```  ``` ` 引号，在第一对反单引号后面可以注明代码块所使用的语言。
``` JavaScript
function hello() {
  console.log('hello world!')
}
```

### 8. 序号列表
1. 有序列表
2. 有序列表
3. 有序列表
    1. 有序列表
    2. 有序列表
    3. 有序列表

- 无序列表
- 无序列表
- 无序列表
    - 无序列表
    - 无序列表
    - 无序列表



### 9. 其他
[脚注][^1]

[^1]: https://www.baidu.com

[矛盾][1]的作品有许多&copy;


参考资料: 

[1]: 我国著名文学家

<a id="footer" href="#top">返回顶部</a>
