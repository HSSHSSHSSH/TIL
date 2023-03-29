let VSHADER_SOURCE =  // 顶点着色器
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
  // 模型矩阵
  let modelMatrix = new Matrix4()
  // 视图矩阵
  let viewMatrix = new Matrix4()
  // 投影矩阵
  let projMatrix = new Matrix4()
  // 模型视图投影矩阵
  let mvpMatrix = new Matrix4()
  // 计算模型视图投影矩阵
  modelMatrix.setTranslate(0.75, 0, 0) // 沿x轴平移0.75
  viewMatrix.setLookAt(0, 0, 5, 0, 0, -100, 0, 1, 0) // 设置视点、视线和上方向
  projMatrix.setPerspective(30, canvas.width/canvas.height, 1, 100) // 设置透视投影
  mvpMatrix.set(projMatrix).multiply(viewMatrix).multiply(modelMatrix) // 计算模型视图投影矩阵
  // 将模型视图投影矩阵传给u_MvpMatrix变量
  gl.uniformMatrix4fv(u_MvpMatrix, false, mvpMatrix.elements)
  if (a_Position < 0) {
    console.log('Failed to get the storage location of a_Position')
    return
  }


  gl.clearColor(0.0, 0.0, 0.0, 1.0) // 设置canvas背景色
  gl.clear(gl.COLOR_BUFFER_BIT) // 清空canvas
  gl.drawArrays(gl.TRIANGLES, 0, n) // 绘制

  modelMatrix.setTranslate(-0.75, 0, 0)
  mvpMatrix.set(projMatrix).multiply(viewMatrix).multiply(modelMatrix)
  gl.uniformMatrix4fv(u_MvpMatrix, false, mvpMatrix.elements)
  gl.drawArrays(gl.TRIANGLES, 0, n) // 绘制

}






function initVertexBuffers(gl) {
  let verticesSizes = new Float32Array([
    // 绿色三角形在最后
    0.0, 1.0, -4.0, 0.4, 1.0, 0.4, // 绿色三角形在最后
    -0.5, -1.0, -4.0, 0.4, 1.0, 0.4,
    0.5, -1.0, -4.0, 1.0, 0.4, 0.4,
    
    // 黄色三角形在中间
    0.0, 1.0, -2.0, 1.0, 1.0, 0.4,
    -0.5, -1.0, -2.0, 1.0, 1.0, 0.4,
    0.5, -1.0, -2.0, 1.0, 1.0, 0.4,

    // 蓝色三角形在最前面

    0.0, 1.0, 0.0, 0.4, 0.4, 1.0,
    -0.5, -1.0, 0.0, 0.4, 0.4, 1.0,
    0.5, -1.0, 0.0, 1.0, 0.4, 0.4,
  ])
  let n = 9 // 点的个数
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