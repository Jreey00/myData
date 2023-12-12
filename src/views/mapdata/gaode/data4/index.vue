<template>
  <div class="container">
    <div class="container-head">
      <el-form ref="form" :model="form" label-width="80px" style="margin: inherit">
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="地图样式9999">
              <el-select v-model="form.MapStyle" placeholder="请选择地图样式" @change="handMapStyle">
                <el-option v-for="item in MapStyleList" :key="item.value" :value="item.value"
                  :label="item.label"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div id="MapContainer" class="container-div"></div>
  </div>
</template>

<script>
import AMapLoader from '@amap/amap-jsapi-loader';

export default {
  name: "gaode",
  data() {
    return {
      map: null,
      loca: null,
      form: {
        MapStyle: "normal",
      },
      MapStyleList: [
        { value: "normal", label: "标准" },
        { value: "darkblue", label: "极夜蓝" },
      ],
    };
  },
  mounted() {
    this.initMap();
  },
  methods: {
    initMap() {
      AMapLoader.load({
        key: "8a8bb311e966800f0ad01fc2d7ab8107",
        version: "2.0",
        plugins: [],
        Loca: {
          "version": '2.0.0'
        },
      }).then((AMap) => {
        this.map = new AMap.Map("MapContainer", {
          zoom: 11.14,
          viewMode: '3D',
          pitch: 45,
          center: [121.496534, 31.243335],
          showBuildingBlock: false,
          showLabel: false,
          mapStyle: 'amap://styles/darkblue',
        });
        // 创建 Loca 实例
        var loca = new Loca.Container({
          map: this.map
        });
        // 设置光源（推荐用法），支持添加多个光源
        // 环境光
        new Loca.AmbientLight({
          intensity: 0.8, // 环境光强度，建议值: 0～1
          color: '#fff', // 环境光颜色
        }, loca);
        // 平行光
        new Loca.DirectionalLight({
          intensity: 0.5, // 光照强度，建议值: 0～1
          color: 'rgb(255,255,255)', // 平行光颜色
          target: [0, 0, 0], // 光射向的目标位置
          position: [0, -1, 1], // 坐标位置
        }, loca);
        // 点光
        new Loca.PointLight({
          color: 'rgb(255,255,255)', // 点光颜色
          position: [121.50741577148439, 31.236288641793006, 1000], // 点光的位置
          intensity: 4, // 光照强度
          // 距离表示从光源到光照强度为 0 的位置，0 就是光不会消失。
          distance: 10000,
        }, loca);
      }).catch(e => {
        console.log(e);
      });
    },
    handMapStyle() {
      // this.initMap();
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: calc(100vh - 50px);
  display: flex;
  justify-content: space-around;
  background-color: rgb(240, 242, 245);
  flex-direction: column;

  .container-head {
    height: 10%;
    border-radius: 8px;
    background: #fff;
    margin: 20px 20px 0 20px;
  }

  .container-div {
    background: #fff;
    margin: 20px;
    height: 90%;
    border-radius: 8px;
  }
}
</style>
