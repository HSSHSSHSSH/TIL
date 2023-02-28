let VSHADER_SOURCE =  // 顶点着色器
`attribute vec4 a_Position; \n` +
`uniform mat4 u_xFormMatrix; \n` +
`void main() { \n` + 
` gl_Position = u_xFormMatrix * a_Position \n;` +
`}\n`
let FSHADER_SOURCE = // 片源着色器
`void main() { \n` +
` gl_FragColor = vec4(1.0,0.0,0.0,1.0); \n` +
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
  if (a_Position < 0) {
    console.log('Failed to get the storage location of a_Position')
    return
  }

  let angle = 90
  let radian = Math.PI * angle / 180.0
  let cosB = Math.cos(radian)
  let sinB = Math.sin(radian)
  let xFormMatrix = new Float32Array([
    cosB, sinB, 0.0, 0.0,
    -sinB, cosB, 0.0, 0.0,
    0.0, 0.0, 1.0, 0.0,
    0.0, 0.0, 0.0, 1.0
  ])
  console.log('testMatrx4', testMatrx4);
  let u_xFormMatrix = gl.getUniformLocation(gl.program, 'u_xFormMatrix')
  gl.uniformMatrix4fv(u_xFormMatrix, false, xFormMatrix)
  gl.clearColor(0.0, 0.0, 0.0, 1.0) // 设置canvas背景色
  gl.clear(gl.COLOR_BUFFER_BIT) // 清空canvas
  gl.drawArrays(gl.TRIANGLES, 0, n) // 绘制
}


function initVertexBuffers(gl) {
  let verticesSizes = new Float32Array([
    -0.5,0.5,
    -0.5,-0.5,
    0.5,-0.5,
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
  let a_Position = gl.getAttribLocation(gl.program, 'a_Position')
  // 将缓冲区对象分配给a_Position变量
  gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0)
  // 连接a_Position变量与分配给它的缓冲区对象
  gl.enableVertexAttribArray(a_Position)
  return 4
}