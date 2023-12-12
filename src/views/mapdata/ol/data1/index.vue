<template>
  <div class="container">
    <div class="container-div">
      <span>简介</span>
      <h1>目前开源的gis框架里面，我选择的是openlayers，不要问我为什么，应该我也不知道</h1>
    </div>
  </div>
</template>

<script>
export default {
  name: "data1",
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
