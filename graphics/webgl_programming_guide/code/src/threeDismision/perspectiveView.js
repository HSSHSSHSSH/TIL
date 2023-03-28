let VSHADER_SOURCE =  // 顶点着色器
`attribute vec4 a_Position; \n` +
`attribute vec4 a_Color; \n` +
`uniform mat4 u_ViewMatrix; \n` +
`uniform mat4 u_ProjMatrix; \n` +
`varying vec4 v_Color; \n` +
`void main() { \n` + 
` gl_Position = u_ProjMatrix * u_ViewMatrix * a_Position \n;` +
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
  // 获取u_ViewMatrix变量的存储位置
  let u_ViewMatrix = gl.getUniformLocation(gl.program, 'u_ViewMatrix')
  // 设置视点、视线和上方向
  let viewMatrix = new Matrix4()
  viewMatrix.setLookAt(0, 0, 5, 0, 0, -100, 0, 1, 0)
  // // 将视图矩阵传给u_ViewMatrix变量
  gl.uniformMatrix4fv(u_ViewMatrix, false, viewMatrix.elements)

  // 获取u_ProjMatrix变量的存储位置
  let u_ProjMatrix = gl.getUniformLocation(gl.program, 'u_ProjMatrix')
  let projMatrix = new Matrix4()
  // projMatrix.setOrtho(-1.0, 1.0, -1.0, 1.0, 0.0, 2.0)
  projMatrix.setPerspective(30, canvas.width / canvas.height, 1, 100)
  gl.uniformMatrix4fv(u_ProjMatrix, false, projMatrix.elements)

  // document.onkeydown = function (ev) {
  //   keydown(ev, gl, n, u_ViewMatrix, viewMatrix)
  // }

  if (a_Position < 0) {
    console.log('Failed to get the storage location of a_Position')
    return
  }


  gl.clearColor(0.0, 0.0, 0.0, 1.0) // 设置canvas背景色
  gl.clear(gl.COLOR_BUFFER_BIT) // 清空canvas
  gl.drawArrays(gl.TRIANGLES, 0, n) // 绘制
}


let g_eyeX = 0.20, g_eyeY = 0.25, g_eyeZ = 0.25 // 视点
function keydown (ev, gl, n, u_ViewMatrix, viewMatrix) {
  if (ev.keyCode === 39) { // 按下右键
    g_eyeX += 0.01
  } else if (ev.keyCode === 37) { // 按下左键
    g_eyeX -= 0.01
  } else {
    return
  }
  draw(gl, n, u_ViewMatrix, viewMatrix)
}

function draw (gl, n, u_ViewMatrix, viewMatrix) {
  // 设置视点、视线和上方向
  viewMatrix.setLookAt(g_eyeX, g_eyeY, g_eyeZ, 0, 0, 0, 0, 1, 0)
  // 将视图矩阵传给u_ViewMatrix变量
  gl.uniformMatrix4fv(u_ViewMatrix, false, viewMatrix.elements)
  gl.clear(gl.COLOR_BUFFER_BIT) // 清空canvas
  gl.drawArrays(gl.TRIANGLES, 0, n) // 绘制
}

function initVertexBuffers(gl) {
  let verticesSizes = new Float32Array([
    // 右侧的三个三角形
    0.75,  1.0, -4.0, 0.4, 1.0, 0.4, // 绿色三角形在最后面
    0.25, -1.0, -4.0, 0.4, 1.0, 0.4,
    1.25, -1.0, -4.0, 1.0, 0.4, 0.4,

    0.75, 1.0, -2.0, 1.0, 1.0, 0.4, // 黄色三角形在中间
    0.25, -1.0, -2.0, 1.0, 1.0, 0.4,
    1.25, -1.0, -2.0, 1.0, 0.4, 0.4,

    0.75, 1.0, 0.0, 0.4, 0.4, 1.0, // 蓝色三角形在最前面
    0.25, -1.0, 0.0, 0.4, 0.4, 1.0,
    1.25, -1.0, 0.0, 1.0, 0.4, 0.4,

    // 左侧的三个三角形
    -0.75, 1.0, -4.0, 0.4, 1.0, 0.4, // 绿色三角形在最后面
    -1.25, -1.0, -4.0, 0.4, 1.0, 0.4,
    -0.25, -1.0, -4.0, 1.0, 0.4, 0.4,

    -0.75, 1.0, -2.0, 1.0, 1.0, 0.4, // 黄色三角形在中间
    -1.25, -1.0, -2.0, 1.0, 1.0, 0.4,
    -0.25, -1.0, -2.0, 1.0, 0.4, 0.4,

    -0.75, 1.0, 0.0, 0.4, 0.4, 1.0, // 蓝色三角形在最前面
    -1.25, -1.0, 0.0, 0.4, 0.4, 1.0,
    -0.25, -1.0, 0.0, 1.0, 0.4, 0.4
  ])
  let n = 18 // 点的个数
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

  return n
}