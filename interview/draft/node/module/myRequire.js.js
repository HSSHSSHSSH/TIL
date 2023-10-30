const path = require('path'); // 路径处理
const fs = require('fs'); // 文件读取
const vm = require('vm'); // 文件执行

function Require(modulePath) {
  // 读取模块
  let absPathName = path.resolve(__dirname, modulePath)
  // 抽象模块
  let module = new Module(absPathName)
  // 加载模块
  tryModuleLoad(module)
  // 返回模块
  return module.exports
}

// 模块构造函数
// 用于存储模块信息
function Module(modulePath) {
  this.id = modulePath
  this.exports = {}
}

Module.wrapper = [
  "(function(exports, module, Require, __dirname, __filename) {",
  "})"
]

