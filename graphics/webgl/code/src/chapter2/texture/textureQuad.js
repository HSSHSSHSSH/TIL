let VSHADER_SOURCE = `
attribute vec4 a_Position;
attribute vec2 a_TexCoord;
varying vec2 v_TexCoord;
void main() {
  v_TexCoord = a_TexCoord;
  gl_Position = a_Position;
}
`
let FSHADER_SOURCE = `
precision mediump float;
uniform sampler2D u_Sampler;
varying vec2 v_TexCoord;
void main() {
  gl_FragColor = texture2D(u_Sampler, v_TexCoord);
}
`
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
  let n = initVertexBuffers(gl) // 处理顶点坐标，处理纹理坐标
  if (n < 0) {
    console.log('Failed to set the positions of the vertices')
    return
  }
  if (!initTextures(gl, n)) {
    console.log('Failed to initialize the texture.')
    return
  }
}

function initVertexBuffers(gl) {
  let verticesTexCoords = new Float32Array([
    // Vertex coordinates, texture coordinate
    -1, 1, 0.0, 1.0,
    -1, -1, 0.0, 0.0,
    1, 1, 1.0, 1.0,
    1, -1, 1.0, 0.0,
  ])
  let n = 4 // 点的个数
  // 创建缓冲区对象
  let vertexTexCoordBuffer = gl.createBuffer()
  if (!vertexTexCoordBuffer) {
    console.log('Failed to create the buffer object')
    return -1
  }
  // 将缓冲区对象绑定到目标
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexTexCoordBuffer)
  // 向缓冲区对象中写入数据
  gl.bufferData(gl.ARRAY_BUFFER, verticesTexCoords, gl.STATIC_DRAW)
  let FSIZE = verticesTexCoords.BYTES_PER_ELEMENT
  // 处理顶点坐标
  let a_Position = gl.getAttribLocation(gl.program, 'a_Position')
  // 将缓冲区对象分配给a_Position变量
  gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, FSIZE * 4, 0)
  // 连接a_Position变量与分配给它的缓冲区对象
  gl.enableVertexAttribArray(a_Position)
  let a_TexCoord = gl.getAttribLocation(gl.program, 'a_TexCoord')
  console.log('a_TexCoord', a_TexCoord)
  if (a_TexCoord < 0) {
    console.log('Failed to get the storage location of a_TexCoord')
    return -1
  }
  // 处理纹理坐标
  gl.vertexAttribPointer(a_TexCoord, 2, gl.FLOAT, false, FSIZE * 4, FSIZE * 2)
  gl.enableVertexAttribArray(a_TexCoord)
  return n
}

function initTextures(gl, n) {
  let texture = gl.createTexture() // 创建纹理对象
  let u_Sampler = gl.getUniformLocation(gl.program, 'u_Sampler')
  let image = new Image() // 创建image对象
  image.onload = function () {
    loadTexture(gl, n, texture, u_Sampler, image)
  }
  image.src = '../../../resources/sky.jpg'
  return true
}

function loadTexture(gl, n, texture, u_Sampler, image) {
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1) // 对纹理图像进行y轴反转
  // 开启0号纹理单元
  gl.activeTexture(gl.TEXTURE0)
  // 向target绑定纹理对象
  gl.bindTexture(gl.TEXTURE_2D, texture)
  // 配置纹理参数
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
  // 配置纹理图像
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image)
  // 将0号纹理传递给着色器
  gl.uniform1i(u_Sampler, 0)
  // 绘制矩形
  gl.clear(gl.COLOR_BUFFER_BIT) // Clear <canvas>
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, n) // Draw the rectangle
}