# Node Note

## CommonJs规范
    每个文件都是一个单独的模块，各个模块之间通过暴露接口与相互引用进行不同模块之间的调用。
    
    在使用是，注意
    - 通过 module.exports 定义暴露的接口
    - 通过 require 引入其他模块暴露的接口

## Node 解释代码
    当执行 node hello.js代码时，node命令是调用解释器