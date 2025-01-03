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


#### 20241231


让我为您解释 hosts 文件的作用：

### hosts 文件基本概念
hosts 文件是一个本地系统文件，作用是将主机名（域名）映射到 IP 地址。它的优先级比 DNS 服务器高，也就是说系统会优先查找 hosts 文件中的映射关系。

### 位置
- Windows: `C:\Windows\System32\drivers\etc\hosts`
- Linux/Mac: `/etc/hosts`

### 基本格式
```text
IP地址    域名
# 例如：
127.0.0.1    localhost
127.0.0.1    ops.justtake.shop
```

### 工作原理
1. 当您在浏览器输入一个域名时（如 `ops.justtake.shop`）
2. 系统首先查找 hosts 文件是否有这个域名的映射
3. 如果有，直接使用 hosts 中的 IP
4. 如果没有，才会去查询 DNS 服务器

### 常见用途
1. **本地开发**
   ```text
   127.0.0.1    dev.myproject.com
   ```
   可以让本地开发环境使用生产环境相同的域名

2. **屏蔽网站**
   ```text
   127.0.0.1    ads.example.com
   ```
   将不想访问的网站指向本地

3. **多环境测试**
   ```text
   192.168.1.100    test.myproject.com
   192.168.1.101    staging.myproject.com
   ```
   可以方便地切换不同环境

4. **加快域名解析**
   ```text
   8.8.8.8    www.google.com
   ```
   直接指定常用网站的 IP，减少 DNS 查询时间

### 在您的场景中
```text
127.0.0.1    ops.justtake.shop
```
这条配置的含义是：
- 当访问 `ops.justtake.shop` 时
- 系统会将请求指向 `127.0.0.1`（本机）
- 然后由本地运行的开发服务器（监听在 80 端口）处理请求

这样就可以在本地模拟线上环境的域名访问，便于开发和测试。



是的，网络代理可能会影响 hosts 文件的运行。让我详细解释：

### 代理对 hosts 的影响

1. **直接代理模式（常见的 VPN）**
   - 一般不会影响 hosts 文件
   - 因为系统仍然会先查找 hosts 文件，然后再进行网络请求

2. **浏览器代理（如 Chrome 插件）**
   - 可能会绕过 hosts 文件
   - 因为请求直接被浏览器转发给代理服务器
   - 代理服务器会使用自己的 DNS 解析

3. **系统代理（如 Proxifier）**
   - 会影响 hosts 文件
   - 因为它会拦截所有网络请求，包括 DNS 查询

### 解决方案

1. **代理软件的 PAC 规则设置**
```javascript
function FindProxyForURL(url, host) {
    // 本地域名直连
    if (dnsDomainIs(host, "ops.justtake.shop")) {
        return "DIRECT";
    }
    // 其他域名走代理
    return "PROXY 127.0.0.1:7890";
}
```

2. **代理软件的绕过规则**
```text
# 添加不走代理的域名
ops.justtake.shop
*.justtake.shop
```

3. **浏览器设置**
- 在 Chrome 中设置 "跳过代理服务器的本地地址"
- 或在代理插件中添加不代理的域名列表

### 检查方法

1. **查看实际连接**
```bash
# Windows
curl -v http://ops.justtake.shop

# 或使用 ping
ping ops.justtake.shop
```

2. **检查代理状态**
```bash
# Mac/Linux
env | grep -i proxy

# Windows
netstat -an | findstr "LISTENING"
```

### 建议
1. 开发时临时关闭代理
2. 配置代理软件的绕过规则
3. 使用 `localhost` 或 IP 地址直接访问
4. 如果必须用域名，确保将域名添加到代理的例外列表中

#### 20250103

这是一个常见的 Git 代理配置问题。当使用 Clash 作为代理时，需要配置 Git 使用相同的代理设置。

以下是解决方案:

1. 首先确认你的 Clash 代理端口，默认通常是 7890。可以在 Clash 的设置界面查看。

2. 然后配置 Git 使用这个代理。打开终端，运行以下命令:

```bash
# 设置 http 代理
git config --global http.proxy http://127.0.0.1:7890

# 设置 https 代理
git config --global https.proxy http://127.0.0.1:7890
```

如果之后想要取消代理设置，可以使用:

```bash
# 取消 http 代理
git config --global --unset http.proxy

# 取消 https 代理
git config --global --unset https.proxy
```

如果上述方法仍然不能解决问题，可以尝试:

1. 检查 Clash 是否开启了"允许局域网连接"
2. 确认代理端口是否正确（可能不是 7890）
3. 尝试使用 socks5 代理:
```bash
git config --global http.proxy socks5://127.0.0.1:7890
git config --global https.proxy socks5://127.0.0.1:7890
```

配置完成后，再次尝试 git push 应该就能正常工作了。
