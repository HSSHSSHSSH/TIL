let VSHADER_SOURCE =  // 顶点着色器
`attribute vec4 a_Position; \n` +
`attribute float a_PositionSize; \n` +
`void main() { \n` + 
` gl_Position = a_Position \n;` +
` gl_PointSize = 10.0; \n` +
`}\n`
let FSHADER_SOURCE = // 片源着色器
`precision mediump float; \n` +
`uniform vec4 u_FragColor; \n` +
`void main() { \n` +
` gl_FragColor = u_FragColor; \n` +
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
  let u_FragColor = gl.getUniformLocation(gl.program, 'u_FragColor')
  if (a_Position < 0) {
    console.log('Failed to get the storage location of a_Position')
    return
  }
  canvas.onmousedown = function (ev) { click(ev, gl, canvas, a_Position, u_FragColor) }
  gl.clearColor(0.0, 0.0, 0.0, 1.0)
  gl.clear(gl.COLOR_BUFFER_BIT)
}

let g_points = []
let g_colors = []
function click (ev, gl, canvas, a_Position, u_FragColor) {
  let x = ev.clientX
  let y = ev.clientY
  console.log('before', x, y)
  let rect = ev.target.getBoundingClientRect()
  x = ((x - rect.left) - canvas.width / 2) / (canvas.width / 2)
  y = (canvas.height / 2 - (y - rect.top)) / (canvas.height / 2)
  console.log('after', x, y)
  if (x>=0.0 && y>=0.0) {
    g_colors.push([1.0, 0.0, 0.0, 1.0])
  } else if (x<0.0 && y>=0.0) {
    g_colors.push([0.0, 1.0, 0.0, 1.0])
  } else if (x<0.0 && y<0.0) {
    g_colors.push([0.0, 0.0, 1.0, 1.0])
  } else {
    g_colors.push([1.0, 1.0, 1.0, 1.0])
  }
  
  g_points.push({x,y})
  gl.clear(gl.COLOR_BUFFER_BIT)
  for (let i = 0; i < g_points.length; i++) {
    let xy = g_points[i]
    let rgba = g_colors[i]
    console.log(xy, rgba)
    gl.vertexAttrib3f(a_Position, xy.x, xy.y, 0.0)
    gl.uniform4f(u_FragColor, parseFloat(rgba[0]), parseFloat(rgba[1]), parseFloat(rgba[2]), parseFloat(rgba[3]))
    gl.drawArrays(gl.POINTS, 0, 1)
  }
}