---
title: Density-Based Spatial Clustering of Applications with Noise(DBSCAN)算法
published: 2022-10-14
description: DBSCAN 的原理、流程、参数设置、优缺点  Some of us get dipped in flat, some in satin, some in gloss. But every once in a while you find someone who's iridescent, and when you do, nothing will ever compare. —— 《Flippe
category: Note
tags:
  - Note
draft: false
pinned: false
lang: zh
---

DBSCAN 的原理、流程、参数设置、优缺点

> Some of us get dipped in flat, some in satin, some in gloss. But every once in a while you find someone who's iridescent, and when you do, nothing will ever compare. —— 《Flipped》

@[TOC](DBSCAN算法)

# DBSCAN

## DBSCAN 简介

DBSCAN(Density-based spatial clustering ofapplications with noise)是Martin Ester, Hans-PeterKriegel等人于1996年提出的一种基于密度的空间的数据聚类方法，该算法是最常用的一种聚类方法。该算法将具有足够密度区域作为距离中心，不断生长该区域。

算法基于一个事实：一个聚类可以由其中的任何核心对象唯一确定。该算法利用基于密度的聚类的概念，即要求聚类空间中的一定区域内所包含对象（点或其他空间对象）的数目不小于某一给定阈值。该方法能在具有噪声的空间数据库中发现任意形状的簇，可将密度足够大的相邻区域连接，能有效处理异常数据，主要用于对空间数据的聚类，优缺点总结如下:

优点：

1. 聚类速度快且能够有效处理噪声点和发现任意形状的空间聚类；
2. 与K-MEANS比较起来，不需要输入要划分的聚类个数；
3. 聚类簇的形状没有偏倚；
4. 可以在需要时输入过滤噪声的参数。

缺点：

1. 当数据量增大时，要求较大的内存支持I/O消耗也很大；
2. 当空间聚类的密度不均匀、聚类间距差相差很大时，聚类质量较差，因为这种情况下参数MinPts和Eps选取困难。
3. 算法聚类效果依赖与距离公式选取，实际应用中常用欧式距离，对于高维数据，存在"维数灾难"。

## DBSCAN 基本概念

1. **Eps 邻域：**给定对象半径 Eps 内的邻域称为该对象的 Eps 邻域；
2. **核心点（core point）：**如果对象的 Eps 邻域至少包含最小数目 MinPts 的对象，则称该对象为核心对象；
3. **边界点（edge point）：**边界点不是核心点，但落在某个核心点的邻域内；
4. **噪音点（outlier point）：**既不是核心点，也不是边界点的任何点；
5. **直接密度可达(directly density-reachable)：**给定一个对象集合D，如果 p 在 q 的 Eps 邻域内，而 q 是一个核心对象，则称对象 p 从对象 q 出发时是直接密度可达的；
6. **密度可达(density-reachable)：**如果存在一个对象链  p1, …,pi,.., pn，满足p1 = p 和pn = q，pi是从pi+1关于 Eps 和 MinPts 直接密度可达的，则对象p是从对象q关于 Eps 和 MinPts 密度可达的；
7. **密度相连(density-connected)：**如果存在对象 O∈D，使对象 p 和 q 都是从 O 关于 Eps 和MinPts 密度可达的，那么对象 p 到 q 是关于 Eps 和 MinPts 密度相连的；

（8）类（cluster）:设非空集合,若满足：，

（a），且从密度可达，那么。
（b）和密度相连。
则称构成一个类簇

有关核心点、边界点、噪音点以及直接密度可达、密度可达和密度相连解释如图1[1]：