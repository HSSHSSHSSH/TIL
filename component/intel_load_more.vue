<template>
    <div class="app-container main-body-container">
      <el-form ref="queryForm" class="main-form" label-position="right" :model="listQuery" size="small"
         label-width="80px">
        <el-form-item label="图标名称" prop="name">
          <el-input v-model="listQuery.name" placeholder="请输入图标名称" clearable @clear="handleFilter"/>
        </el-form-item>
        <el-form-item label-width="10px">
          <el-button type="primary" icon="el-icon-search" @click="handleFilter">查询</el-button>
          <el-button type="primary" icon="el-icon-plus" @click="addIcon">添加图标</el-button>
        </el-form-item>
      </el-form>
      <div class="svg-container" v-load-more="loadMore">
        <el-popover trigger="hover" v-for="item in list" :key="item.id">
          <div class="flex flex-column">
            <div class="svg-label">名称：{{ item.name }}</div>
            <div class="svg-label">时间：{{ item.create_time }}</div>
            <el-button style="margin-top: 10px;" type="danger" size="mini" @click="deleteIcon(item)">删除</el-button>
          </div>
          <remote-svg v-clipboard:copy="item.name" v-clipboard:success="clipboardSuccess" slot="reference" style="font-size: 60px;" class="svg-item" :icon-class="item.name" :svg-url="item.url" />
        </el-popover>
        
      </div>
      <!-- 加载指示器 -->
      <div v-if="listLoading" class="loading-indicator">
        <i class="el-icon-loading"></i>
        <span>加载中...</span>
      </div>
      
      <!-- 无数据提示 -->
      <div v-if="!listLoading && list.length === 0" class="no-data">
        <i class="el-icon-warning-outline"></i>
        <span>暂无数据</span>
      </div>
      
      <!-- 全部加载完成提示 -->
      <div v-if="!listLoading && list.length >= total && total > 0" class="loading-indicator">
        <span>已加载全部数据</span>
      </div>
    </div>
  </template>
  
  <script>
  import mixin from '@/mixin/index.js'
  import { getSvgList } from '@/api/svg'
  export default {
    name: 'SvgList',
    mixins: [mixin],
    directives: {
      loadMore: {
        bind(el, binding, vnode) {
          const vm = vnode.context
          // 检查容器是否有滚动条
          const checkScrollBar = () => {
            return el.scrollHeight > el.clientHeight
          }
          
          // 检查是否已加载所有数据
          const checkAllLoaded = () => {
            return vm.list.length >= vm.total
          }
          
          // 检查是否需要自动加载更多
          const checkAutoLoad = () => {
            // 如果没有滚动条并且还有更多数据可加载
            if (!checkScrollBar() && !checkAllLoaded()) {
              binding.value()
            }
          }
          
          // 滚动事件处理
          const scrollHandler = function() {
            // 如果已加载所有数据，不做操作
            if (checkAllLoaded()) return
            
            // 当剩余滚动距离小于等于100px时触发加载更多
            const bottom = this.scrollHeight - this.scrollTop - this.clientHeight
            if (bottom <= 100) {
              binding.value()
            }
          }
          
          // 添加滚动事件监听
          el.addEventListener('scroll', scrollHandler)
          
          // 添加窗口大小变化监听，可能影响滚动条状态
          window.addEventListener('resize', checkAutoLoad)
          
          // 初始检查，如果没有足够的数据填满容器，自动加载更多
          setTimeout(checkAutoLoad, 100)
          
          // 存储引用，以便在unbind中移除
          el._loadMoreHandler = scrollHandler
          el._checkAutoLoad = checkAutoLoad
        },
        update(el, binding, vnode) {
          // 数据更新后检查是否需要继续加载
          setTimeout(el._checkAutoLoad, 100)
        },
        unbind(el) {
          // 清理事件监听
          el.removeEventListener('scroll', el._loadMoreHandler)
          window.removeEventListener('resize', el._checkAutoLoad)
          delete el._loadMoreHandler
          delete el._checkAutoLoad
        }
      }
    },
    data() {
      return {
        list: [],
        listQuery: {
          page: 1,
          limit: 20,
          name: '',
        },
        listLoading: false,
        total: 0
      };
    },
    created() {
      this.getList()
    },
    methods: {
      getList() {
        // 重置分页
        this.listQuery.page = 1
        
        // 设置加载状态
        this.listLoading = true
        
        getSvgList(this.listQuery).then(res => {
          if (res.data) {
            this.list = res.data.list || []
            this.total = res.data.total || 0
          }
          this.listLoading = false
        }).catch(() => {
          this.listLoading = false
        })
      },
      handleFilter() {
        this.getList()
      },
      addIcon() {
        // 添加图标的逻辑
      },
      editIcon(icon) {
        // 编辑图标的逻辑
      },
      deleteIcon(icon) {
        // 删除图标的逻辑
      },
      handleDelete(icon) {
        // 删除图标的逻辑
      },
      clipboardSuccess() {
        this.$message.success('复制成功')
      },
      loadMore() {
        // 如果正在加载或已经加载全部数据，则不执行加载
        if (this.listLoading || this.list.length >= this.total) {
          return
        }
        
        // 设置加载状态
        this.listLoading = true
        
        // 页码递增
        this.listQuery.page++
        
        // 发起请求加载更多数据
        getSvgList(this.listQuery).then(res => {
          if (res.data && res.data.list && res.data.list.length > 0) {
            // 将新数据添加到列表中
            this.list = [...this.list, ...res.data.list]
            // 更新总数
            this.total = res.data.total
          }
          this.listLoading = false
        }).catch(() => {
          this.listLoading = false
          // 请求失败时回退页码
          this.listQuery.page--
        })
      }
  
    }
  };
  </script>
  
  <style lang="scss" scoped>
    .svg-container {
      display: grid;
      grid-template-columns: repeat(8, 1fr);
      gap: 10px;
      margin: 15px;
      padding: 15px;
      background-color: #fff;
      border-radius: 8px;
      max-height: calc(100vh - 200px); /* 限制高度以启用滚动 */
      overflow-y: auto; /* 启用垂直滚动 */
      position: relative; /* 用于定位加载指示器 */
      
      /* 滚动条样式美化 */
      &::-webkit-scrollbar {
        width: 6px;
      }
      
      &::-webkit-scrollbar-thumb {
        background-color: #dcdfe6;
        border-radius: 3px;
      }
      
      &::-webkit-scrollbar-track {
        background-color: #f5f7fa;
      }
      
      .svg-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100px;
        width: 100%;
        padding: 10px;
        box-sizing: border-box;
        border: 1px solid #f0f0f0;
        border-radius: 4px;
        transition: all 0.3s;
        cursor: pointer; /* 指示可点击 */
        
        &:hover {
          transform: scale(1.05);
          box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        }
      }
    }
    
    .svg-label {
      font-size: 14px;
      color: #606266;
      margin-bottom: 5px;
    }
    
    /* 加载指示器 */
    .loading-indicator {
      position: absolute;
      bottom: 10px;
      left: 50%;
      transform: translateX(-50%);
      color: #909399;
      font-size: 12px;
    }
    
    /* 无数据提示 */
    .no-data {
      grid-column: 1 / -1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 50px 0;
      color: #909399;
      font-size: 14px;
      
      i {
        font-size: 36px;
        margin-bottom: 10px;
      }
    }
  </style>
  