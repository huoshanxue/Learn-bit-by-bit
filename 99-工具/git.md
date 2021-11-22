```shell
$ git commit -m 'initial commit'
$ git add forgotten_file
$ git commit --amend
```

最终你只会有一个提交——第二次提交将代替第一次提交的结果。

git reset HEAD <file>... 来取消暂存（取消 git add 操作）

请务必记得 git checkout -- <file> 是一个危险的命令 （撤销文件的修改）。 你对那个文件在本地的任何修 改都会消失——Git 会用最近提交的版本覆盖掉它。

从远程仓库中抓取与拉取：

```shell
$ git fetch <remote>
```

必须注意 git fetch 命令只会 将数据下载到你的本地仓库——它并不会自动合并或修改你当前的工作。

我们想把文件从 Git 仓库中删除（亦即从暂存区域移除），但仍然希望保留在当前工作目录 中。
$ git rm --cached README

删除分支
$ git branch -d hotfix

当 git fetch 命令从服务器上抓取本地没有的数据时，它并不会修改工作目录中的内容。
运行 git fetch <remote> 命令（在本例中为 git fetch origin）。

```shell
$ git fetch origin
```

可以运行 git merge origin/serverfix 将这些工作合并到当前所在的分支。 如果想要在自己的 serverfix 分支上工作，可以将其建立在远程跟踪分支之上：

```shell
$ git merge origin/serverfix
$ git checkout -b serverfix origin/serverfix
```
