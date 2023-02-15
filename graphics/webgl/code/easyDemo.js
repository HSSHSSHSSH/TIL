let VSHADER_SOURCE =  // 顶点着色器
`attribute vec4 a_Position; \n` +
`attribute float a_PositionSize; \n` +
`void main() { \n` + 
` gl_Position = a_Position \n;` +
` gl_PointSize = a_PositionSize; \n` +
`}\n`
let FSHADER_SOURCE = // 片源着色器
`void main() { \n` +
` gl_FragColor = vec4(0.0, 1.0, 0.0, 1.0); \n` +
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
  let a_Position = gl.getAttribLocation(gl.program, 'a_Position')
  let a_PositionSize = gl.getAttribLocation(gl.program, 'a_PositionSize')
  if (a_Position < 0) {
    console.log('Failed to get the storage location of a_Position')
    return
  }
  console.log('a_Position: ', a_Position);
  console.log('a_PositionSize: ', a_PositionSize);
  gl.vertexAttrib3f(a_Position, 0.0, 0.0, 0.0)
  gl.vertexAttrib1f(a_PositionSize, 30.0)
  gl.clearColor(0.0, 0.0, 0.0, 1.0)
  gl.clear(gl.COLOR_BUFFER_BIT)
  gl.drawArrays(gl.POINTS, 0, 1)
}