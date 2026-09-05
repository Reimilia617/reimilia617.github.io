---
title: '关于我是如何开发的UTNixOS_Pro？'
date: 2026-09-05
tags: [技术]
description: 'UTNixOS_Pro不为人知的一面'
---

## 我是怎么想出使用WebUI管理系统的方式？
那只是一个平常的深夜，我一直被Nix的语法和报错折磨得痛不欲生，于是我便化愤怒为动力连夜写出了*NixOS_Config*，仓库链接：[NixOS_Config](https://github.com/Reimilia617/NixOS_Config)

我在此刻终于拥有了自己的NixOS配置，但是我却高兴不起来，因为我一想到后面想装软件或者换个桌面还要编辑那一坨配置文件我就难受。而且首次安装还需要先git clone下来再cp到/etc/nixos里，实在是太不优雅了，于是我又写了*UTNixOS*，仓库链接：[UTNixOS](https://github.com/Reimilia617/UTNixOS),其实就是**用一个脚本管理整个Nix配置系统，顺便加了个一键安装的功能。**

到这其实已经很不错了，但是我认为每次都需要通过终端和脚本管理，还是不够优雅。但是我也是灵感枯竭了，实在没事干了就想着玩玩安卓Root，在打开KernelSU的那一瞬间我突然明白了：既然KSU模块（例如Zygisk Next）会**使用一个WebUI控制自己的配置文件**以达到修改策略的操作，那我也可不可以给我的NixOS配置也加一个呢？

最终，在我和一条蓝色大肥鱼的操作下，*UTNixOS_Pro诞生了*，仓库链接：[UTNixOS_Pro](https://github.com/Reimilia617/UTNixOS_Pro)我选择了**使用HTML前端+Go后端的做法，前端HTML会把操作传输到Go后端的守护进程，守护进程拉起后端调用bash脚本。**对，本质还是bash脚本，只不过加了个外壳而已，后面会考虑彻底去除除了安装的脚本外的所有脚本，全部使用Go后端操作配置，而不是经过脚本用bash配置。

最后，我只是一个普通的高中生，平常还要上学，只有周末才可能更新一下。如果你对我的代码感兴趣想要优化，欢迎来fork我的仓库，也可以提issue，我看到了会做的