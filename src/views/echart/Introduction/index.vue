<template>
  <div class="container">
    <div class="container-div">
      <span>简介</span>
      <p>数据可视化的图表也是一个常见的需求，这里的图表使用的是ECharts，功能齐全，社区demo也表较丰富</p>
      <p>展示了日常开发中，使用的较多的折线图，柱状图，饼图，中国地图等</p>
      <p>在开发过程中，尽量在单独子模块下创建components文件夹，存储封装好的ECharts图表，一个图表尽量简单易懂，避免过度封装，多页面使用，后期需求更变时，方便维护</p>
      <a style="color: #3eaf7c;" href="https://echarts.apache.org/zh/index.html">Apache ECharts
        一个基于 JavaScript 的开源可视化图表库
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "Introduction",
  data() {
    return {
      // 如果需要，可以在这里添加其他数据
    }
  },
}
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: calc(100vh - 50px);
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  background-color: rgb(240, 242, 245);

  .container-div {
    background: #fff;
    margin: 20px;
    padding: 20px;
    width: 100%;
    border-radius: 8px;
  }
}
</style>
