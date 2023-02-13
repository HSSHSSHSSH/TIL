function main () {
  // 黑色填充背景
  var canvas = document.getElementById('webgl')
  var gl = getWebGLContext(canvas)
  gl.clearColor(0.0, 0.0, 0.0, 1.0)
  gl.clear(gl.COLOR_BUFFER_BIT)
}