<template>
  <div class="container">
    <div class="container-div">
      <span>简介</span>
      <p>路由懒加载应该是写大一点的项目都会用的一个功能，只有在使用这个 component 的时候才会加载这个相应的组件，这样写大大减少了初始页面 js 的大小并且能更好的利用游览器的缓存。</p>

      <p>该项目中权限的实现方式是：通过获取当前用户的权限去比对路由表，生成当前用户具的权限可访问的路由表，但其实很多公司的业务逻辑可能不是这样的...</p>

      <p>侧边栏: 本项目里的侧边栏是根据 router.js 配置的路由并且根据权限动态生成的，这样就省去了写一遍路由还要再手动写侧边栏这种麻烦事...</p>

      <p>面包屑: 本项目中也封装了一个面包屑导航，它也是通过 watch $route 动态生成的。</p>

      <p>element-ui 自带的图标不是很丰富，但管理后台图标的定制性又很强。这里只给大家推荐使用阿里的 iconfont ，简单好用又方便管理...</p>

      <p>你只要将本项目跟目录下的 favicon.ico 文件替换为你想要的图标即可。</p>

      <p>随着后期模块可能会有很多， 所以这里是建议根据模块来划分 views 的，并且 将 views 和 api 两个模块一一对应，从而方便维护。</p>

      <p>components 放置的都是全局公用的一些组件，如上传组件，富文本等等。一些页面级的组件建议还是放在各自 views 文件下的 components 里面，方便管理。</p>

      <p>图标目前使用的是阿里的 iconfont，阔以看例子，目前还有点问题没调好。</p>
    </div>
    </div>
</template>

<script>
export default {
  name: "StyleIntroduction",
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
