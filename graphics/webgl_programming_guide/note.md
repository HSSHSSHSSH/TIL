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

| 参数(target，webglcontext)                                   | 返回值 | 异常                                             |
| ------------------------------------------------------------ | ------ | ------------------------------------------------ |
| gl.ARRAY_BUFFER: 表示缓冲区对象中包含了顶点的数据<br />gl.ELEMENT_ARRAY_BUFFER: 表示缓冲区对象中包含了点的索引值<br />buffer: 指定之前由gl.createBuffer()返回的待绑定的缓冲区对象<br />null: 禁用对 target 的绑定 | 无     | INVALID_ENUM: target不合法，此时保持原有的绑定。 |

**gl.bufferData()**

在 WebGL 中，不可直接向缓冲区对象中写入数据，只能向 target 中写入，所以需要 gl.bindBuffer() 来绑定 target 与缓冲区对象。

| 参数 （target, data, usage）usage表示如何使用缓冲区对象的数据，用于提升效率 | 返回值 | 异常              |
| ------------------------------------------------------------ | ------ | ----------------- |
| usage:<br />gl.STATIC_DRAW: 向缓冲区中写入一次数据，绘制多次<br />gl.STREAM_DRAW: 向缓冲区中写入一次数据，绘制多次 // todo 监听？？<br />gl.DYNAMIC_DRAW: 写入多次，绘制对此 | 无     | 同gl.bindBuffer() |

**gl.vertexAttribPointer()**

将绑定到 gl.ARRAY_BUFFER 上的缓冲区对象分配给由 location 指定的 attribute 变量

| 参数 (location, size, type, normalized, stride, offset)      | 返回值 | 异常                                                         |
| ------------------------------------------------------------ | ------ | ------------------------------------------------------------ |
| location: 待分配 attribute 变量的存储地址。<br />size: 缓冲区中每个订单分配到的分量个数。若 size 比 attribute 变量需要的分量小，则按照与 gl.vertexAttrib(1234)f相同的规则补全。 即2、3分量默认0.0，4分量默认1.0。<br />type: 指定数据格式<br />          gl.UNSIGNED_BYTE: 无符号字节， Unit8Array<br />          gl.SHORT: 短整型，Int16Array<br />          gl.UNSINGED_SHORT: 无符号短整型， Unit16Arrat<br />          gl.INT: 整型， Int32Array<br />          gl.UNSIGNED_INT: 无符号整型， Unit32Array<br />          gl.FLOAT: 浮点型， Float32Array<br />normalize: 是否将非浮点型数据规划到 [0,1] 或 [-1,-1] 区间<br />          true \| false<br /> stride: 指定相邻两个顶点间的字节数，默认0（当顶点属性数组中只有一种属性时（例如数组中只有位置属性，可以设为0，当有多个属性时，如既有位置属性也有颜色属性，则需考虑此参数））<br /> offset: 指定缓冲区对象中的偏移量（已字节为单位），即 attribute 从缓冲区的何处开始存储，起始位置 offset 为0 | 无     | INVALID_OPERATION：不存在当前程序对象<br /> INVALID_VALUE: location >= attribute的最大数目，或stride为负，或offset为负 |

**gl.enableVertexAttribArray()**

令顶点着色器可访问缓冲区对象内的数据

| 参数                                | 返回值 | 异常                                                         |
| ----------------------------------- | ------ | ------------------------------------------------------------ |
| location: 指定 attribute 的存储地址 | 无     | INVALID_VALUE: location >= attribute变量的最大数目（默认为8） |

对应的可使用 gl.disableVertexArray(location) 来关闭分配。

**gl.drawArrays()**

| 参数                                                         | 返回值 | 异常 |
| ------------------------------------------------------------ | ------ | ---- |
| mode: 绘制方式<br />     gl.POINTS, gl.LINES, gl.LINE_STRIP, gl.LINE_LOOP, gl.TRIANGLES, gl.TRIANGLE_STRIP, gl.TRIANGLE_FAN<br /> first: 从那个点开始绘制 （整型）<br /> count: 指定绘制需要多少顶点 （整型） |        |      |

**mode参数**

| 基本图形 | 参数mode          | 描述                                                         |
| -------- | ----------------- | ------------------------------------------------------------ |
| 点       | gl.POINTS         | 绘制在v0,v1....处的点                                        |
| 线段     | gl.LINES          | 单独的线段（v0,v1）,(v2,v3)...... , 若点是基数，则忽略最后一个 |
| 线条     | gl.LINE_STRIP     | 连接的线段 (v0,v1),(v1,v2).........                          |
| 回路     | gl.LINE_LOOP      | 闭合的线段，(v0,v1), (v1,v2)......(vn,v0)                    |
| 三角形   | gl.TRIANGLES      | 三角形，(v0,v1,v2), (v3,v4,v5)，若点的个数不是3的整数倍，则忽略余下的1个或2个点 |
| 三角带   | gl.TRIANGLE_STRIP | 连接的带状三角形，两个三角形共用一个边，（v0,v1,v2）,(v2,v1,v3),(v2,v3,v4)..... |
| 三角扇   | gl.TRIANGLE_FAN   | 一系列三角形构成的类似扇形的图形，多个三角形公用一个点， (v0,v1,v2),(v0,v2,v3),(v0,v3,v4) |

### 平移

平移的操作发生在顶点着色器中，各坐标轴的平移量用类型为的 uniform 变量来定义，

```
`attribute vec4 a_Position; \n` + 
`uniform vec4 u_Translation; \n`+
`void main () {` +
	`a_Position = a_Position + u_Translation; \n` +
`} \n`
```



对 u_Translation 变量赋值时，通过 gl.getUniformLocation 获取其地址，通过 gl.uniform4f() 进行赋值

```
let uniform4f = gl.getUniformLocation(gl.program, 'u_Translation')
 gl.uniform4f(uniform4f, 0.5, 0.5, 0.0, 0.0)
```

| ---                | ---   | ----  | ---   | ----    |
| ------------------ | ----- | ----- | ----- | ------- |
| vec4 a_Position    | x1    | y1    | z1    | w1      |
| vec4 u_Transiation | x2    | y2    | z2    | w2      |
|                    | x1+x2 | y1+y2 | z1+z2 | w1+w2=1 |



### 旋转

- 旋转轴 （X | Y | Z）
- 旋转方向 (逆时针 | 顺时针)
- 旋转角度

如：绕 Z 轴，逆时针旋转了 β (β > 0) 角度；即观察者在 Z 轴正半轴某处，视线沿着 Z 轴负方向观察，物体是逆时针旋转的。

**gl.uniformMatrix4fv**

为一个 4阶方阵赋值

| 参数                                                         | 返回值 | 异常                                                         |
| ------------------------------------------------------------ | ------ | ------------------------------------------------------------ |
| location: uniform变量的存储位置<br /> transpose: 在 WebGL 中必须为 false<br /> array: 待传输的类型化数组 | 无     | INVALID_OPERATION: 不存在当前程序对象<br /> INVALID_VALUE: transpose不为false,或数组长度小于16 |

<img src='../../assets/img/matrix4.png'>

### 动画

生成动画需：

- 在 t0, t1, t2 等时刻重复调用某一函数来绘制三角形
- 在每次绘制之前，清除上次的内容，对这次的绘制内容进行变换

### 顶点着色器和片元着色器的一种运行机制

以helloTriangle.js为例：

<img src="../../assets/img/shader_progress.png">

按照 gl.drawArrays() 中的参数 n 为 3，顶点着色器将被执行3此，每次的点都进入**装配区**;

当所有的顶点都进入图形装配阶段后, webgl 系统进入**图形装配阶段**;

根据 gl.drawArrays() 中的第一个参数，确定图形装配的方式，之后进入**光栅化**;

将图形转化为片元，之后调用片元着色器，根据每个片元的位置确定其颜色



在片元着色器中存在内置变量 vec4 gl_FragCoord,其第一个分量 gl_FragCoord.x 表示其在 canvas 中的 x 轴坐标，第二个分量 gl_FragCoord.y 表示其在 canvas 中的 y 轴坐标。



### 纹理映射

在 WebGL 中使用纹理映射，需：

- 准备映射到几何图形上的纹理图像
- 为几何图形配置纹理映射的方式
- 加载纹理图像，对其进行一些配置，以在 WebGL 中使用
- 在片元着色器中将相应的纹素(组成纹理颜色的像素)从纹理中抽取出来，将纹素的颜色赋予片元



#### 纹理坐标

即纹理图像中像素的坐标，即纹素坐标。

纹理坐标系为独立于 WebGL 系统坐标的的一种坐标系，为区分二者，纹理坐标系的横轴称为 s 轴，纵轴称为 t 轴，即 st 坐标系统。

在纹理坐标系中，无视纹理图像的尺寸，右上角的坐标均为（1.0，1.0）。

### 对纹理图像进行配置

- 图像 Y 轴翻转

在使用纹理图像之前，需调用 gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false) 对图像进行 Y 轴翻转，因为 WebGL 的坐标系统与浏览器中的图片坐标系统 Y 轴方向相反。

**gl.pixelStorei**

| 参数                                                         | 返回值 | 异常                            |
| ------------------------------------------------------------ | ------ | ------------------------------- |
| panme:<br />             - gl.UNPACK_FLIP_Y_WEBGL: 对图像进行 Y 轴翻转，默认值为false<br />            - gl.UNPACK_PERMULTIPLY_ALPHA_WEBGL: 将图像的RGB颜色值都乘 A ，默认值为 false<br /> param: 0(false) \|\| 非0（true） : 必须为整数 | 无     | INVALID_ENUM: pname不是合法的值 |
|                                                              |        |                                 |



- 激活纹理单元

  在 WebGL 中，使用一种称为 **纹理单元（texture unit）** 的机制管理纹理图像，每个纹理图像都通过一个纹理单元来管理，纹理单元的个数硬件以及浏览器中 WebGL 的实现。默认情况下，至少支持8个，即 gl.TEXTURE0 ..... gl.TEXTURE7。

  <img src="../../assets/img/texture_unit.png" />

  

在使用纹理单元之前，需调用 gl.activeTexture() 来激活纹理单元。

**gl.activeTexture()**

| 参数                                                         | 返回值 | 异常                             |
| ------------------------------------------------------------ | ------ | -------------------------------- |
| texUnit: 纹理单元<br />              - gl.TEXTURE.....gl.TEXTURE7: 指定准备激活的纹理单元 | null   | INVALID_ENUM: texUnit 的值不合法 |

- 绑定纹理对象

  类似与对缓冲区进行写入操作之前需绑定 target，在对纹理对象进行操作之前也需要绑定 target。

  在 WebGL 中，无法直接操作纹理对象，必须将纹理对象绑定在 target 上，通过 target 来操作纹理对象。
  

  **gl.bindTexteure()**

  | 参数                                                         | 返回值 | 异常                       |
  | ------------------------------------------------------------ | ------ | -------------------------- |
  | target: 纹理类型<br />          - gl.TEXTURE_2D: 二位纹理<br />          - gl.TEXTURE_CUBE_MAP: 立方体纹理<br /> texture: 待绑定的纹理对象 | null   | INVALID_ENUM: target不合法 |

  调用此方法后，开启了纹理对象，并将纹理对象绑定在纹理单元上。
  
  <img src="../../assets/img/after_active.png">

- 配置纹理对象的参数

  以下需确定：

  - 如何根据纹理坐标来获取纹素颜色
  - 按哪种方式重复填充纹理

​	**gl.texParameteri()**

| 参数                                                         | 返回值 | 异常                                                         |
| ------------------------------------------------------------ | ------ | ------------------------------------------------------------ |
| target: 纹理类型，同上<br /> pname: 纹理参数<br /> param: 纹理参数的值 | null   | INVALID_ENUM: target 不合法<br /> INVALID_OPERATION: 当前目标未绑定纹理对象 |

<img src="../../assets/img/tex_pname.png" />
<img src="../../assets/img/tex_param.png" />

执行此方法后，WebGL 中的状态如下：
<img src="../../assets/img/after_set_param.png">