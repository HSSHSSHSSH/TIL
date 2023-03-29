function main () {
  console.log('蛙叫你');
}let VSHADER_SOURCE =  // 顶点着色器
`attribute vec4 a_Position; \n` +
`attribute vec4 a_Color; \n` +
`uniform mat4 u_MvpMatrix; \n` +
`varying vec4 v_Color; \n` +
`void main() { \n` + 
` gl_Position = u_MvpMatrix* a_Position \n;` +
` v_Color = a_Color; \n` +
`}\n`
let FSHADER_SOURCE = // 片源着色器
`precision mediump float; \n` + // 没有这行会报错
`varying vec4 v_Color; \n` +
`void main() { \n` +
` gl_FragColor = v_Color; \n` +
// ` gl_FragColor = vec4(1.0,0.0,0.0,1.0); \n` +
`}\n`
function main () {
  let canvas = document.getElementById('webgl')
  let gl = getWebGLContext(canvas)
  if (!gl) {
    console.log('Failed to get the rendering context for WebGL')
    return
  }
  if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
    console.log('Failed to initialize shaders.')
    return
  }
  // 设置顶点位置
  let n = initVertexBuffers(gl) // 创建缓冲区对象，将数据写入缓冲区对象，将缓冲区对象分配给a_Position变量
  let a_Position = gl.getAttribLocation(gl.program, 'a_Position')
  // 获取 u_MvpMatrix 变量的存储位置
  let u_MvpMatrix = gl.getUniformLocation(gl.program, 'u_MvpMatrix')
  
  // 模型视图投影矩阵
  let mvpMatrix = new Matrix4()
  mvpMatrix.setPerspective(30, 1, 1, 100)
  mvpMatrix.lookAt(3, 3, 7, 0, 0, 0, 0, 1, 0)
  gl.uniformMatrix4fv(u_MvpMatrix, false, mvpMatrix.elements)
  if (a_Position < 0) {
    console.log('Failed to get the storage location of a_Position')
    return
  }
  // 开启隐藏面
  gl.enable(gl.DEPTH_TEST)
  // 清除颜色和深度缓冲区
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)


  gl.clearColor(0.0, 0.0, 0.0, 1.0) // 设置canvas背景色
  gl.clear(gl.COLOR_BUFFER_BIT) // 清空canvas
  // 绘制立方体
  gl.drawElements(gl.TRIANGLES, n, gl.UNSIGNED_BYTE, 0)

}






function initVertexBuffers(gl) {
  let verticesSizes = new Float32Array([
    // 顶点和坐标颜色
    // v0 白色
    1.0, 1.0, 1.0, 1.0, 1.0, 1.0,
    // v1 品红色
    -1.0, 1.0, 1.0, 1.0, 0.0, 1.0,
    // v2 绿色
    -1.0, -1.0, 1.0, 0.0, 1.0, 1.0,
    // v3 黄色
    1.0, -1.0, 1.0, 1.0, 1.0, 0.0,
    // v4 蓝色
    1.0, -1.0, -1.0, 0.0, 0.0, 1.0,
    // v5 紫色
    1.0, 1.0, -1.0, 1.0, 0.0, 1.0,
    // v6 橙色
    -1.0, 1.0, -1.0, 1.0, 0.5, 0.0,
    // v7 红色
    -1.0, -1.0, -1.0, 1.0, 0.0, 0.0
  ])
  // 顶点索引
  let indices = new Uint8Array([
    0, 1, 2, 0, 2, 3, // 前
    0, 3, 4, 0, 4, 5, // 右
    0, 5, 6, 0, 6, 1, // 上
    1, 6, 7, 1, 7, 2, // 左
    7, 4, 3, 7, 3, 2, // 下
    4, 7, 6, 4, 6, 5 // 后
  ])
  // 创建缓冲区对象
  let vertexSizeBuffer = gl.createBuffer()
  if (!vertexSizeBuffer) {
    console.log('Failed to create the buffer object')
    return -1
  }
  // 将缓冲区对象绑定到目标
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexSizeBuffer)
  // 向缓冲区对象中写入数据
  gl.bufferData(gl.ARRAY_BUFFER, verticesSizes, gl.STATIC_DRAW)
  let FISIZE = verticesSizes.BYTES_PER_ELEMENT
  let a_Position = gl.getAttribLocation(gl.program, 'a_Position')
  // 将缓冲区对象分配给a_Position变量
  gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, FISIZE * 6, 0)
  // 连接a_Position变量与分配给它的缓冲区对象
  gl.enableVertexAttribArray(a_Position)

  let a_Color = gl.getAttribLocation(gl.program, 'a_Color')
  gl.vertexAttribPointer(a_Color, 3, gl.FLOAT, false, FISIZE * 6, FISIZE * 3)
  gl.enableVertexAttribArray(a_Color)

  // 将索引数据写入缓冲区对象
  let indexBuffer = gl.createBuffer()
  if (!indexBuffer) {
    console.log('Failed to create the buffer object')
    return -1
  }
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer)
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW)
  let n = indices.length

  return n
}