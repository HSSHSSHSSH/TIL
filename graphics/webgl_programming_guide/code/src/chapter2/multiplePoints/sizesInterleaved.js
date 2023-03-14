let VSHADER_SOURCE =  // 顶点着色器
`attribute vec4 a_Position; \n` +
`attribute float a_PositionSize; \n` +
`void main() { \n` + 
` gl_Position = a_Position \n;` +
` gl_PointSize = a_PositionSize; \n` +
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
  gl.clearColor(0.0, 0.0, 0.0, 1.0) // 设置canvas背景色
  gl.clear(gl.COLOR_BUFFER_BIT) // 清空canvas
  gl.drawArrays(gl.POINTS, 0, n) // 绘制
}


function initVertexBuffers(gl) {
  let verticesSizes = new Float32Array([
    0.0, 0.5, 10.0, // 第一个点
    -0.5, -0.5, 30.0, // 第二个点
    0.5, -0.5, 20.0// 第三个点
  ])
  let FSZIE = verticesSizes.BYTES_PER_ELEMENT
  console.log('FSIZE', FSZIE)
  let n = 3 // 点的个数
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
  gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, FSZIE * 3, 0)
  // 连接a_Position变量与分配给它的缓冲区对象
  gl.enableVertexAttribArray(a_Position)
  
  let a_PositionSize = gl.getAttribLocation(gl.program, 'a_PositionSize')
  gl.vertexAttribPointer(a_PositionSize, 1, gl.FLOAT, false, FSZIE * 3, FSZIE * 2) 
  gl.enableVertexAttribArray(a_PositionSize)
  // gl.bindBuffer(gl.ARRAY_BUFFER,pointSizeBuffer)
  // gl.bufferData(gl.ARRAY_BUFFER,pointSizes,gl.STATIC_DRAW)
  // let a_PositionSize = gl.getAttribLocation(gl.program,'a_PositionSize')
  // gl.vertexAttribPointer(a_PositionSize,1,gl.FLOAT,false,0,0)
  // gl.enableVertexAttribArray(a_PositionSize)

  return n
}