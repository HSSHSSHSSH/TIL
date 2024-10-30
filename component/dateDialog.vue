<template>
    <el-dialog 
      title="日期时间选择" 
      :visible.sync="visible" 
      width="80%" 
      custom-class="datetime-picker-dialog"
      @closed="handleClose"
    >
      <div class="picker-container">
        <!-- 使用循环渲染选择器列 -->
        <div 
          v-for="column in columns" 
          :key="column.type" 
          class="picker-column"
        >
          <div class="picker-mask top" />
          <div class="picker-mask bottom" />
          <div class="picker-indicator" />
          <div 
            :ref="`${column.type}Scroller`" 
            class="picker-content" 
            @wheel.prevent="onScroll(column.type, $event)"
          >
            <div class="picker-item-wrapper">
              <div
                v-for="item in column.items"
                :key="item"
                :class="['picker-item', { active: column.selected === item }]"
                @click="selectItem(column.type, item, $event)"
              >
                {{ formatDisplayValue(column.type, item) }}
              </div>
            </div>
          </div>
        </div>
      </div>
  
      <template #footer>
        <el-button @click="handleCancel">取消</el-button>
        <el-button type="primary" @click="handleConfirm">确认</el-button>
      </template>
    </el-dialog>
  </template>
  
  <script>
  export default {
    name: 'DateTimeDialog',
    
    props: {
      visible: {
        type: Boolean,
        default: false
      },
      // 添加初始值属性
      initialDateTime: {
        type: Object,
        default: () => ({
          year: new Date().getFullYear(),
          month: new Date().getMonth() + 1,
          day: new Date().getDate(),
          time: new Date().getHours()
        })
      }
    },
  
    data() {
      const currentYear = new Date().getFullYear()
      return {
        // 统一管理选择器数据
        years: Array.from({ length: 10 }, (_, i) => currentYear + i),
        months: Array.from({ length: 12 }, (_, i) => i + 1),
        days: Array.from({ length: 31 }, (_, i) => i + 1),
        times: Array.from({ length: 24 }, (_, i) => i),
        
        selectedYear: this.initialDateTime.year,
        selectedMonth: this.initialDateTime.month,
        selectedDay: this.initialDateTime.day,
        selectedTime: this.initialDateTime.time,
        
        itemHeight: 40,
        scrolling: false,
        scrollDebounceTimer: null
      }
    },
  
    computed: {
      // 统一管理所有选择器列的配置
      columns() {
        return [
          { type: 'year', items: this.years, selected: this.selectedYear },
          { type: 'month', items: this.months, selected: this.selectedMonth },
          { type: 'day', items: this.days, selected: this.selectedDay },
          { type: 'time', items: this.times, selected: this.selectedTime }
        ]
      },
      
      // 计算当月的实际天数
      maxDays() {
        return new Date(this.selectedYear, this.selectedMonth, 0).getDate()
      }
    },
  
    watch: {
      visible(val) {
        if (val) {
          this.$nextTick(this.initScrollPositions)
        }
      },
      
      // 监听月份变化，调整天数范围
      selectedMonth() {
        this.adjustDays()
      },
      
      selectedYear() {
        this.adjustDays()
      }
    },
  
    methods: {
      // 格式化显示值
      formatDisplayValue(type, value) {
        if (type === 'time') return `${String(value).padStart(2, '0')}:00`
        return String(value).padStart(2, '0')
      },
  
      // 调整天数范围
      adjustDays() {
        if (this.selectedDay > this.maxDays) {
          this.selectedDay = this.maxDays
        }
      },
  
      // 处理滚动事件
      onScroll(type, event) {
        console.log('event', event)
        if (this.scrolling) return
        
        clearTimeout(this.scrollDebounceTimer)
        this.scrolling = true
        
        const scroller = this.$refs[`${type}Scroller`][0]
        const direction = event.deltaY > 0 ? 1 : -1
        const currentIndex = Math.round(scroller.scrollTop / this.itemHeight)
        const targetIndex = Math.max(0, Math.min(currentIndex + direction, this[`${type}s`].length - 1))
        
        this.scrollToIndex(type, targetIndex)
        
        this.scrollDebounceTimer = setTimeout(() => {
          this.scrolling = false
        }, 200)
      },
  
      // 滚动到指定索引
      scrollToIndex(type, index) {
        const scroller = this.$refs[`${type}Scroller`][0]
        const targetScrollTop = index * this.itemHeight
        
        scroller.scrollTo({
          top: targetScrollTop,
          behavior: 'smooth'
        })
        
        const selectedValue = this[`${type}s`][index]
        if (selectedValue !== undefined) {
          this[`selected${type.charAt(0).toUpperCase() + type.slice(1)}`] = selectedValue
        }
      },
  
      // 选择项目
      selectItem(type, value, event) {
        const target = event.target
        const parent = target.parentElement.parentElement
        const targetTop = target.offsetTop
        
        this[`selected${type.charAt(0).toUpperCase() + type.slice(1)}`] = value
        
        parent.scrollTo({
          top: targetTop - (parent.clientHeight - this.itemHeight) / 2,
          behavior: 'smooth'
        })
      },
  
      // 初始化滚动位置
      initScrollPositions() {
        this.columns.forEach(({ type }) => {
          const scroller = this.$refs[`${type}Scroller`][0]
          const selected = this[`selected${type.charAt(0).toUpperCase() + type.slice(1)}`]
          const items = this[`${type}s`]
          const index = items.indexOf(selected)
          if (index !== -1) {
            scroller.scrollTop = index * this.itemHeight
          }
        })
      },
  
      handleConfirm() {
        this.$emit('confirm', {
          year: this.selectedYear,
          month: this.selectedMonth,
          day: this.selectedDay,
          time: this.selectedTime
        })
        this.handleCancel()
      },
  
      handleCancel() {
        this.$emit('update:visible', false)
      },
  
      handleClose() {
        // 重置选中值为初始值
        Object.entries(this.initialDateTime).forEach(([key, value]) => {
          this[`selected${key.charAt(0).toUpperCase() + key.slice(1)}`] = value
        })
      }
    }
  }
  </script>
  
  <style scoped>
    .datetime-picker-dialog {
      max-width: 400px;
    }
  
    .picker-container {
      display: flex;
      justify-content: space-between;
      height: 200px;
      position: relative;
    }
  
    .picker-column {
      flex: 1;
      position: relative;
      height: 100%;
      margin: 0 2px;
    }
  
    .picker-content {
      height: 100%;
      overflow-y: auto;
      scroll-behavior: smooth;
      -webkit-overflow-scrolling: touch;
      position: relative;
    }
  
    /* 隐藏滚动条但保持功能 */
    .picker-content::-webkit-scrollbar {
      display: none;
    }
  
    .picker-item-wrapper {
      padding: 80px 0;
      /* 上下填充使得内容可以滚动到中间位置 */
    }
  
    .picker-item {
      height: 40px;
      line-height: 40px;
      text-align: center;
      cursor: pointer;
      color: #606266;
      font-size: 16px;
      transition: all 0.3s;
    }
  
    .picker-item.active {
      color: #409EFF;
      font-weight: bold;
      transform: scale(1.1);
    }
  
    /* 遮罩层 */
    .picker-mask {
      position: absolute;
      left: 0;
      right: 0;
      height: 80px;
      pointer-events: none;
      z-index: 1;
    }
  
    .picker-mask.top {
      top: 0;
      background: linear-gradient(to bottom,
          rgba(255, 255, 255, 1) 0%,
          rgba(255, 255, 255, 0.6) 100%);
    }
  
    .picker-mask.bottom {
      bottom: 0;
      background: linear-gradient(to top,
          rgba(255, 255, 255, 1) 0%,
          rgba(255, 255, 255, 0.6) 100%);
    }
  
    .picker-indicator {
      position: absolute;
      left: 0;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      height: 40px;
      border-top: 1px solid #EBEEF5;
      border-bottom: 1px solid #EBEEF5;
      pointer-events: none;
      z-index: 1;
    }
  
    .dialog-footer {
      text-align: right;
    }
  
  </style>
  
  