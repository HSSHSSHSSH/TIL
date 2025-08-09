function getFirstComponentChild(children) {
    if (Array.isArray(children)) {
      for (var i = 0; i < children.length; i++) {
        var c = children[i]
        if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
          return c
        }
      }
    }
  }
  
  function isDef(v) {
    return v !== undefined && v !== null
  }
  
  function isAsyncPlaceholder(node) {
    return node.isComment && node.asyncFactory
  }
  var patternTypes = [String, RegExp, Array]
  
  export default {
    name: 'keep-alive',
    abstract: true,
  
    props: {
      include: patternTypes,
      exclude: patternTypes,
      max: [String, Number]
    },
  
    computed: {
      groupCache() {
        return this.$store.state.app.groupCache
      },
      // 当前选中的分组
      groupIndex() {
        return this.$store.state.app.groupIndex
      }
    },
  
    created: function created() {
      // TODO 页面初始化事件,后续可触发初始化事件
    },
    destroyed: function destroyed(to, form) {
      // TODO 页面离开事件，后续可触发关闭事件
    },
    render: function render() {
      var slot = this.$slots.default
      var vnode = getFirstComponentChild(slot)
      var componentOptions = vnode && vnode.componentOptions
      // 开发中不使用缓存
      if (componentOptions && process.env.NODE_ENV !== 'development') {
        // check pattern
        const key = `${componentOptions.Ctor.options.name}`
        // 是否缓存状态标识
        if (this.$route.meta.noCache !== 'true') {
          const currentCatch = ((this.groupCache[this.groupIndex] || []).find(item => item.key === key) || {}).info
          // 存在缓存直接使用缓存
          if (currentCatch) {
            vnode.componentInstance = currentCatch.componentInstance
          } else {
            // 保存需要缓存的页面
            this.$store.dispatch('setGroupCache', {
              key,
              info: vnode
            })
          }
          vnode.data.keepAlive = true
        }
      }
      // 返回dom进行渲染
      return vnode || (slot && slot[0])
    }
  }
  