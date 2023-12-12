// 从 '@/utils' 导入 debounce 函数
import { debounce } from '@/utils'

// 导出一个 Vue 组件对象
export default {
  // 定义 data 函数，返回一个对象，包含两个属性：$_sidebarElm 和 $_resizeHandler
  data() {
    return {
      $_sidebarElm: null,  // 用于存储侧边栏元素的引用
      $_resizeHandler: null // 用于存储 resize 事件处理函数的引用
    }
  },
  // 定义 mounted 钩子函数，在组件挂载到 DOM 后执行
  mounted() {
    // 使用 debounce 函数创建一个新的函数，该函数在指定的延迟时间内只执行一次，用于减少 resize 事件处理函数的执行频率
    this.$_resizeHandler = debounce(() => {
      if (this.chart) { // 如果存在 chart 属性，则调用 resize 方法来调整图表的大小
        this.chart.resize()
      }
    }, 100) // 延迟的延迟时间为100毫秒
    // 调用 $_initResizeEvent 方法来初始化 resize 事件监听器
    this.$_initResizeEvent()
    // 调用 $_initSidebarResizeEvent 方法来初始化侧边栏尺寸变化事件监听器
    this.$_initSidebarResizeEvent()
  },
  // 在组件销毁前，调用 $_destroyResizeEvent 方法来清除 resize 事件监听器，调用 $_destroySidebarResizeEvent 方法来清除侧边栏尺寸变化事件监听器
  beforeDestroy() {
    this.$_destroyResizeEvent()
    this.$_destroySidebarResizeEvent()
  },
  // 在组件被缓存时，通过调用 $_initResizeEvent 和 $_initSidebarResizeEvent 方法来重新初始化事件监听器，以解决 bug 问题
  activated() {
    this.$_initResizeEvent()
    this.$_initSidebarResizeEvent()
  },
  deactivated() {
    this.$_destroyResizeEvent()
    this.$_destroySidebarResizeEvent()
  },
  methods: {
    // 使用 $_ 作为混入属性的前缀，这是 Vue 的最佳实践，可以避免与全局的属性冲突，也可以避免与组件的 data 属性冲突
    // https://vuejs.org/v2/style-guide/index.html#Private-property-names-essential
    $_initResizeEvent() { // 初始化 resize 事件监听器，当窗口大小变化时，调用 $_resizeHandler 方法来处理 resize 事件
      window.addEventListener('resize', this.$_resizeHandler)
    },
    $_destroyResizeEvent() { // 清除 resize 事件监听器，停止监听窗口大小变化事件
      window.removeEventListener('resize', this.$_resizeHandler)
    },
    $_sidebarResizeHandler(e) { // 处理侧边栏尺寸变化事件的处理函数，当侧边栏的宽度变化时，调用 $_resizeHandler 方法来处理 resize 事件
      if (e.propertyName === 'width') { // 判断 e 的 propertyName 属性是否为 'width'，如果是，则执行 $_resizeHandler 方法来处理 resize 事件
        this.$_resizeHandler()
      }
    },
    $_initSidebarResizeEvent() { // 初始化侧边栏尺寸变化事件监听器，当侧边栏的宽度变化时，调用 $_sidebarResizeHandler 方法来处理尺寸变化事件
      this.$_sidebarElm = document.getElementsByClassName('sidebar-container')[0] // 通过类名获取侧边栏元素的引用，并赋值给 this.$_sidebarElm 属性
      this.$_sidebarElm && this.$_sidebarElm.addEventListener('transitionend', this.$_sidebarResizeHandler) // 在侧边栏元素上添加一个事件监听器，监听 'transitionend' 事件（表示过渡效果结束），在过渡效果结束后执行 $_sidebarResizeHandler 方法来处理尺寸变化事件
    },
    $_destroySidebarResizeEvent() { // 清除侧边栏尺寸变化事件监听器，停止监听侧边栏尺寸变化事件，并从侧边栏元素上移除 $_sidebarResizeHandler 方法的事件监听器
      this.$_sidebarElm && this.$_sidebarElm.removeEventListener('transitionend', this.$_sidebarResizeHandler)
    }
  }
}
