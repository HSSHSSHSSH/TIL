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