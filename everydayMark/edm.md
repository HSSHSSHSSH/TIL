# 20220610



### flutter引擎启动 

 http://gityuan.com/2019/06/22/flutter_booting/

### vue响应式解决方案

Object.defineProperty
Proxy
Class  的get 和set

### 触发响应式数据是使用Reflect的原因

使用 Proxy 的一个难点是 this 绑定。我们希望任何方法都绑定到这个 Proxy，而不是目标对象，这样我们也可以拦截它们。值得庆幸的是，ES6 引入了另一个名为 Reflect 的新特性，它允许我们以最小的代价消除了这个问题

## 20220624

https://github.com/resumejob/free-project-course#javascript

## 20220629

mini-docker

https://github.com/shuveb/containers-the-hard-way
https://unixism.net/2020/06/containers-the-hard-way-gocker-a-mini-docker-written-in-go/

## 20231018

Chrome浏览器崩溃，错误码 STATUS_INVALID_IMAGE_HASH

解决办法：chrome所在位置中的chrome.exe重命名，例 chrome0.exe，若使用桌面快捷方式，则需将快捷方式的属性中的目标的 chrome.exe也重命名。

以上解决办法使用后在 vscode 中使用 live server 打开html是会有异常，此时修改 live server 的 setting 中的以下属性：

"liveServer.settings.AdvanceCustomBrowserCmdLine": "C:\\Program Files\\Google\\Chrome\\Application\\chrome0.exe"

## 20241120

ios 手势冲突问题

```js
<template>
  <div class="conBox">
    <div class="edge-swipe-zone"></div>
    <!-- ... existing content ... -->
    <grid-template ref="gridTemplate" class="gridTemplate">
      <div slot="list" class="list">
        <!-- ... existing content ... -->
      </div>
    </grid-template>
  </div>
</template>

<style scoped lang="less">
.conBox {
  height: 100vh;
  overflow: hidden;
  background: rgba(245, 246, 250, 1);
  position: relative;
}

// 添加左侧边缘区域，用于触发系统返回手势
.edge-swipe-zone {
  position: absolute;
  left: 0;
  top: 0;
  width: 20px;
  height: 100%;
  z-index: 9999;
  // 确保这个区域不会影响到内容的点击
  pointer-events: auto;
}

.gridTemplate {
  .list {
    overflow-y: auto;
    overflow-x: hidden;
    height: 100%;
    // 防止列表区域干扰边缘手势
    pointer-events: auto;
  }
}

/* ... existing styles ... */
</style>
```

让我总结一下这个问题：

### 问题原因
1. **手势冲突**：
   - iOS 系统级返回手势是从屏幕左边缘向右滑动
   - 页面中的滚动容器(grid-template)占据了整个屏幕宽度
   - 滚动容器的触摸事件处理优先级高于系统手势，导致系统手势被阻断

2. **事件传播问题**：
   - 当用户从左边缘滑动时，触摸事件首先被滚动容器捕获
   - 滚动容器的默认行为阻止了事件继续传播到系统层面
   - 导致系统无法识别这个手势是要触发返回操作

### 解决方案原理
```vue
<div class="edge-swipe-zone"></div>
```

1. **独立手势区域**：
   - 在左侧创建一个宽度为20px的独立区域
   - 这个区域不参与任何滚动行为
   - 专门用于捕获边缘手势

2. **事件优先级**：
   - 通过 `z-index: 9999` 确保这个区域在最上层
   - `pointer-events: auto` 确保该区域可以正常接收触摸事件
   - 系统手势可以在这个"干净"的区域正常触发

3. **不影响功能**：
   - 20px的宽度刚好覆盖系统手势识别区域
   - 不会影响页面主要内容的展示和交互
   - 保持了列表正常的滚动功能

这个解决方案本质上是通过创建一个"安全区域"来避免手势冲突，而不是试图处理复杂的事件传播逻辑，是一个简单但有效的方案。
