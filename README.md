# JS Aho-Corasick Matcher

AC 自动机 （Aho-Corasick ） 多关键字字符串搜索算法的简单实现，用于学习之目的，代码当中有每一部分的详细说明。

## 算法简介

AC 自动机是一种多关键字字符串搜索算法。多关键字字符串搜索是指在 `目标字符串` 里同时搜索多个指定的 `关键字` 所出现的位置。

### 简单思想

1. AC 自动机一次同时搜索多个关键字；
2. AC 自动机假定多个关键字之间存在相同的部分，比如 "abcd", "bcw" 这两个关键字的 "bc" 是相同的；
3. 在搜索过程中，如果匹配中某个关键字的部分字符，然后接下来的字符不匹配，搜索会寻找跟当前 `部分匹配字符` 有 **相同前缀** 的其他关键字，如果存在则跳到其他关键字继续进行搜索。AC 自动机正是利用这种跳转来避免每次从头开始匹配每个关键字，以达到加速之目的；
4. 如果多个关键字之间没有相同的部分，则 AC 自动机复杂度跟暴力搜索一样。

### 实现方法

1. 用关键字构建一个前缀树，树的节点是关键字的字符，树的每条分支就是关键字，因为关键字之间有相同的部分，所以分支之间有可能有共用的地方；

```text
比如关键字 "abcd", "bcw" 和 "aby" 的前缀树：

ROOT
   |--a
   |  |--b
   |  |  |--c
   |  |  |  |--d
   |  |  |
   |  |  |--y
   |
   |--b
   |  |--c
   |  |  |--w
```

2. 为每个节点设置一个 `匹配失败` 的指针，用于当搜索某个关键字进行到一半而失败时，应该跳转到的节点。比如 "abcd" 的 "c" 的失败指针应该指向 "bcw" 的 "c"，因为它们有相同的 **前缀**；
3. 假设当前的被搜索的字符串是 "abcw"，一开始会沿着 "abcd" 分支的节点前进，当搜索到 "w" 时，当前节点是关键字 "abcd" 的 "c"，但它的子节点只有 "d" 而没有 "w"，所以这时会改道到 `匹配失败` 指针指向的 "bcw" 分支的 "c"，然后再查看其子节点是否存在 "w"；
4. 因为失败指针指向的节点（注意它已经是另外一个关键字的分支上的节点）跟之前的节点有相同的前缀，所以被搜索字符串不需要回退，而搜索指针也不需要从根节点开始。

## 单元测试

执行命令：

`$ npm test`

应该能看到 `testAhoCorasick() passed.` 字样。

## 单步调试/跟踪

有时跟踪程序的运行过程，能帮助对程序的理解，启动单步调试的方法是：

在 vscode 里打开该项目，然后在单元测试文件里设置断点，再执行 `Run and Debug` 即可。

## 字符串搜索算法系列项目

- JS Rabin-Karp Matcher
  https://github.com/hemashushu/js-rabin-karp-matcher

- JS Boyer-Moore-Horspool Matcher
  https://github.com/hemashushu/js-boyer-moore-horspool-matcher

- JS KMP Matcher
  https://github.com/hemashushu/js-kmp-matcher

- JS Aho-Corasick Matcher
  https://github.com/hemashushu/js-aho-corasick-matcher

- JS Regexp Interpreter
  https://github.com/hemashushu/js-regexp-interpreter
