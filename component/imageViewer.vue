<template>
    <transition name="viewer-fade">
      <div v-show="visible" ref="el-image-viewer__wrapper" tabindex="-1" class="el-image-viewer__wrapper" :style="{ 'z-index': zIndex }">
        <div class="el-image-viewer__mask" />
        <!-- CLOSE -->
        <span class="flex-row align-center justify-center  el-image-viewer__btn el-image-viewer__close" @click="hide">
          <i class="el-icon-close" style="top:auto;right:auto;" />
        </span>
        <!-- ARROW -->
        <template v-if="!isSingle">
          <span class="el-image-viewer__btn el-image-viewer__prev" :class="{ 'is-disabled': !infinite && isFirst }" @click="prev">
            <i class="el-icon-arrow-left" />
          </span>
          <span class="el-image-viewer__btn el-image-viewer__next" :class="{ 'is-disabled': !infinite && isLast }" @click="next">
            <i class="el-icon-arrow-right" />
          </span>
        </template>
        <!-- ACTIONS -->
        <div class="el-image-viewer__btn el-image-viewer__actions" style="width:320px">
          <div class="el-image-viewer__actions__inner">
            <i>{{ index+1 }}/{{ urlList.length }}</i>
            <i class="el-icon-zoom-out" @click="handleActions('zoomOut')" />
            <i class="el-icon-zoom-in" @click="handleActions('zoomIn')" />
            <i class="el-image-viewer__actions__divider" />
            <i :class="mode.icon" @click="toggleMode" />
            <i class="el-image-viewer__actions__divider" />
            <i class="el-icon-refresh-left" @click="handleActions('anticlocelise')" />
            <i class="el-icon-refresh-right" @click="handleActions('clocelise')" />
            <i v-if="downImg" class="el-icon-download" @click="handlDown()" />
          </div>
        </div>
        <!-- CANVAS -->
        <div class="el-image-viewer__canvas">
          <span v-for="(url, i) in urlList" :key="i">
            <img v-if="i === index" ref="img" :key="url" class="el-image-viewer__img" :src="currentImgUrl" :style="imgStyle" @load="handleImgLoad" @error="handleImgError" @mousedown="handleMouseDown">
          </span>
        </div>
      </div>
    </transition>
  </template>
  
  <script>
  import { on, off } from 'element-ui/src/utils/dom'
  import { rafThrottle, isFirefox } from 'element-ui/src/utils/util'
  
  const Mode = {
    CONTAIN: {
      name: 'contain',
      icon: 'el-icon-full-screen'
    },
    ORIGINAL: {
      name: 'original',
      icon: 'el-icon-c-scale-to-original'
    }
  }
  
  const mousewheelEventName = isFirefox() ? 'DOMMouseScroll' : 'mousewheel'
  
  export default {
    name: 'ElImageViewer',
  
    props: {
      // 展示隐藏
      visible: {
        type: Boolean,
        default: false
      },
      urlList: {
        type: Array,
        default: () => []
      },
      zIndex: {
        type: Number,
        default: 99999
      },
      onSwitch: {
        type: Function,
        default: () => { }
      },
      onClose: {
        type: Function,
        default: () => { }
      },
      initialIndex: {
        type: Number,
        default: 0
      },
      // 是否展示下载按钮
      downImg: {
        type: Boolean,
        default: false
      }
    },
  
    data() {
      return {
        index: this.initialIndex,
        isShow: false,
        infinite: true,
        loading: false,
        mode: Mode.CONTAIN,
        transform: {
          scale: 1,
          deg: 0,
          offsetX: 0,
          offsetY: 0,
          enableTransition: false
        }
      }
    },
    computed: {
      isSingle() {
        return this.urlList.length <= 1
      },
      isFirst() {
        return this.index === 0
      },
      isLast() {
        return this.index === this.urlList.length - 1
      },
      currentImgUrl() {
        return this.urlList[this.index]
      },
      imgStyle() {
        const { scale, deg, offsetX, offsetY, enableTransition } = this.transform
        const style = {
          transform: `scale(${scale}) rotate(${deg}deg)`,
          transition: enableTransition ? 'transform .3s' : '',
          'margin-left': `${offsetX}px`,
          'margin-top': `${offsetY}px`
        }
        if (this.mode === Mode.CONTAIN) {
          style.maxWidth = style.maxHeight = '100%'
        }
        return style
      }
    },
    watch: {
      visible(val) {
        if (val) {
          // 禁止页面滑动
          document.body.style.overflow = 'hidden'
          document.addEventListener('scroll', this.preventScroll, false)
          if (this.initialIndex !== 0) {
            this.index = this.initialIndex
          } else {
            this.index = 0
          }
  
          // 实例化滚动缩放
          this.$nextTick(() => {
            // add tabindex then wrapper can be focusable via Javascript
            // focus wrapper so arrow key can't cause inner scroll behavior underneath
            this.deviceSupportInstall()
            this.$refs['el-image-viewer__wrapper'].focus()
          })
        } else {
          // 解除禁止
          document.body.style.overflow = ''
          document.addEventListener('scroll', this.preventScroll, false)
        }
      },
      index: {
        handler(val) {
          this.reset()
          this.onSwitch(val)
        }
      },
      currentImg(val) {
        this.$nextTick(_ => {
          const $img = this.$refs.img[0]
          if (!$img || !$img.complete) {
            this.loading = true
          }
        })
      }
    },
    methods: {
      // 下载
      handlDown() {
        const a = document.createElement('a')
        a.style.display = 'none'
        a.href = this.currentImgUrl
        a.setAttribute('download', new Date().getTime())
        document.body.appendChild(a)
        a.click() // 执行下载
        window.URL.revokeObjectURL(a.href)
        document.body.removeChild(a)
      },
      preventScroll(e) {
        e.preventDefault()
      },
      hide() {
        this.deviceSupportUninstall()
        this.onClose()
        this.$emit('update:visible', false)
      },
      deviceSupportInstall() {
        this._keyDownHandler = rafThrottle(e => {
          const keyCode = e.keyCode
          switch (keyCode) {
            // ESC
            case 27:
              this.hide()
              break
            // SPACE
            case 32:
              this.toggleMode()
              break
            // LEFT_ARROW
            case 37:
              this.prev()
              break
            // UP_ARROW
            case 38:
              this.handleActions('zoomIn')
              break
            // RIGHT_ARROW
            case 39:
              this.next()
              break
            // DOWN_ARROW
            case 40:
              this.handleActions('zoomOut')
              break
          }
        })
        this._mouseWheelHandler = rafThrottle(e => {
          const delta = e.wheelDelta ? e.wheelDelta : -e.detail
          if (delta > 0) {
            this.handleActions('zoomIn', {
              zoomRate: 0.015,
              enableTransition: false
            })
          } else {
            this.handleActions('zoomOut', {
              zoomRate: 0.015,
              enableTransition: false
            })
          }
        })
        on(document, 'keydown', this._keyDownHandler)
        on(document, mousewheelEventName, this._mouseWheelHandler)
      },
      deviceSupportUninstall() {
        off(document, 'keydown', this._keyDownHandler)
        off(document, mousewheelEventName, this._mouseWheelHandler)
        this._keyDownHandler = null
        this._mouseWheelHandler = null
      },
      handleImgLoad(e) {
        this.loading = false
      },
      handleImgError(e) {
        this.loading = false
        e.target.alt = '加载失败'
      },
      handleMouseDown(e) {
        if (this.loading || e.button !== 0) return
  
        const { offsetX, offsetY } = this.transform
        const startX = e.pageX
        const startY = e.pageY
        this._dragHandler = rafThrottle(ev => {
          this.transform.offsetX = offsetX + ev.pageX - startX
          this.transform.offsetY = offsetY + ev.pageY - startY
        })
        on(document, 'mousemove', this._dragHandler)
        on(document, 'mouseup', ev => {
          off(document, 'mousemove', this._dragHandler)
        })
  
        e.preventDefault()
        e.stopPropagation && e.stopPropagation()
      },
      reset() {
        this.transform = {
          scale: 1,
          deg: 0,
          offsetX: 0,
          offsetY: 0,
          enableTransition: false
        }
      },
      toggleMode() {
        if (this.loading) return
  
        const modeNames = Object.keys(Mode)
        const modeValues = Object.values(Mode)
        const index = modeValues.indexOf(this.mode)
        const nextIndex = (index + 1) % modeNames.length
        this.mode = Mode[modeNames[nextIndex]]
  
        this.reset()
      },
      prev() {
        if (this.isFirst && !this.infinite) return
        const len = this.urlList.length
        this.index = (this.index - 1 + len) % len
      },
      next() {
        if (this.isLast && !this.infinite) return
        const len = this.urlList.length
        this.index = (this.index + 1) % len
      },
      handleActions(action, options = {}) {
        if (this.loading) return
        const { zoomRate, rotateDeg, enableTransition } = {
          zoomRate: 0.2,
          rotateDeg: 90,
          enableTransition: true,
          ...options
        }
        const { transform } = this
        switch (action) {
          case 'zoomOut':
            if (transform.scale > 0.2) {
              transform.scale = parseFloat((transform.scale - zoomRate).toFixed(3))
            }
            break
          case 'zoomIn':
            transform.scale = parseFloat((transform.scale + zoomRate).toFixed(3))
            break
          case 'clocelise':
            transform.deg += rotateDeg
            break
          case 'anticlocelise':
            transform.deg -= rotateDeg
            break
        }
        transform.enableTransition = enableTransition
      }
    }
  }
  </script>
  