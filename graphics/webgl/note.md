# WebGL 1.0.0

## 

### 绘制多个点

- 缓冲区对象

可以一次性地向着色器传入多个订单的数据。缓冲区对象是WebGL系统中的一块内存区域，我们可以一次性地向缓冲区对象中填充大量的顶点数据，然后将这些数据保存在其中，供顶点着色器使用。

使用缓冲器对象向顶点着色器中传入多个顶点数据需遵循以下五个步骤：

1. 创建缓冲区对象（gl.createBuffer()）
2. 绑定缓冲区对象（gl.bindBuffer()）
3. 将数据写入缓冲区对象（gl.bufferData()）
4. 将缓冲区对象分配给一个attribute变量（gl.vertexAttribPointer()）
5. 开启attribute变量（gl.enableAttribArray()）

**gl.createBuffer()**

| 参数 | 返回值                                   | 异常 |
| ---- | ---------------------------------------- | ---- |
| 无   | null \| 非Null                           | 无   |
|      | 新创建的缓冲区对象 \| 创建缓冲区对象失败 |      |

对应的可用 gl.deleteBuffer(buffer) 删除 由 gl.createBuffer() 创建的缓冲区对象

**gl.bindBuffer()**

将缓冲区绑定在 WebGL 系统中已存在的 target 上。

| 参数(target)                                                 | 返回值 | 异常                                             |
| ------------------------------------------------------------ | ------ | ------------------------------------------------ |
| gl.ARRAY_BUFFER: 表示缓冲区对象中包含了顶点的数据<br />gl.ELEMENT_ARRAY_BUFFER: 表示缓冲区对象中包含了订单的索引值<br />buffer: 指定之前由gl.createBuffer()返回的待绑定的缓冲区对象<br />null: 禁用对 target 的绑定 | 无     | INVALID_ENUM: target不合法，此时保持原有的绑定。 |

**gl.bufferData()**

在 WebGL 中，不可直接向缓冲区对象中写入数据，只能向 target 中写入，所以需要 gl.bindBuffer() 来绑定 target 与缓冲区对象。

| 参数 （target, data, usage）usage表示如何使用缓冲区对象的数据，用于提升效率 | 返回值 | 异常              |
| ------------------------------------------------------------ | ------ | ----------------- |
| usage:<br />gl.STATIC_DRAW: 向缓冲区中写入一次数据，绘制多次<br />gl.STREAM_DRAW: 向缓冲区中写入一次数据，绘制多次 // todo 监听？？<br />gl.DYNAMIC_DRAW: 写入多次，绘制对此 | 无     | 同gl.bindBuffer() |

**gl.vertexAttribPointer()**

将绑定到 gl.ARRAY_BUFFER 上的缓冲区对象分配给由 location 指定的 attribute 变量

| 参数 (location, size, type, normalized, stride, offset)      | 返回值 | 异常                                                         |
| ------------------------------------------------------------ | ------ | ------------------------------------------------------------ |
| location: 待分配 attribute 变量的存储地址。<br />size: 缓冲区中每个订单分配到的分量个数。若 size 比 attribute 变量需要的分量小，则按照与 gl.vertexAttrib(1234)f相同的规则补全。 即2、3分量默认0.0，4分量默认1.0。<br />type: 指定数据格式<br />          gl.UNSIGNED_BYTE: 无符号字节， Unit8Array<br />          gl.SHORT: 短整型，Int16Array<br />          gl.UNSINGED_SHORT: 无符号短整型， Unit16Arrat<br />          gl.INT: 整型， Int32Array<br />          gl.UNSIGNED_INT: 无符号整型， Unit32Array<br />          gl.FLOAT: 浮点型， Float32Array<br />normalize: 是否将非浮点型数据规划到 [0,1] 或 [-1,-1] 区间<br />          true \| false<br /> stride: 指定相邻两个顶点间的字节数，默认0<br /> offset: 指定缓冲区对象中的偏移量（已字节为单位），即 attribute 从缓冲区的何处开始存储，起始位置 offset 为0 | 无     | INVALID_OPERATION：不存在当前程序对象<br /> INVALID_VALUE: location >= attribute的最大数目，或stride为负，或offset为负 |

**gl.enableVertexAttributeArray()**

令顶点着色器可访问缓冲区对象内的数据

| 参数                                | 返回值 | 异常                                                         |
| ----------------------------------- | ------ | ------------------------------------------------------------ |
| location: 指定 attribute 的存储地址 | 无     | INVALID_VALUE: location >= attribute变量的最大数目（默认为8） |

对应的可使用 gl.disableVertexArray(location) 来关闭分配。

**gl.drawArrays()**

| 参数                                                         | 返回值 | 异常 |
| ------------------------------------------------------------ | ------ | ---- |
| mode: 绘制方式<br />     gl.POINTS, gl.LINES, gl.LINE_STRIP, gl.LINE_LOOP, gl.TRIANGLES, gl.TRIANGLE_STRIP, gl.TRIANGLE_FAN<br /> first: 从那个点开始绘制 （整型）<br /> count: 指定绘制需要多少顶点 （整型） |        |      |



