---
title: GitBug总结
published: 2023-06-13
description: Git Bug 总结和解决方案
category: Note
tags:
  - Note
draft: false
pinned: false
lang: zh
---

Git Bug 总结和解决方案

@[TOC](GitBug总结)

# Git Bug

```
// git 提交报错
fatal: unable to access 'https://github.com/Nickzxw/Nickzxw.github.io.git/': Failed to connect to github.com port 443 after 21047 ms: Timed out
```

问题：远程库和本地库不一致

解决方案：将远程库 clone 到本地，然后再进行修改，然后再次 push

```
ERROR Cannot find module 'hexo' from
```

切换文件夹忘记重新安装 hexo 了