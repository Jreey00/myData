<template>
  <div class="container">
    <div class="container-head">
      <el-form ref="form" :model="form" label-width="80px" style="margin: inherit">
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="地图样式">
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
        plugins: ["AMap.Scale", "AMap.ControlBar", "AMap.Geolocation", "AMap.MapType", "AMap.MouseTool"],
      }).then((AMap) => {
        this.map = new AMap.Map("MapContainer", {
          pitch: 60, //地图俯仰角度，有效范围 0 度- 83 度
          viewMode: '3D', //地图模式
          terrain: true,
          rotateEnable: true, //是否开启地图旋转交互 鼠标右键 + 鼠标画圈移动 或 键盘Ctrl + 鼠标左键画圈移动
          pitchEnable: true, //是否开启地图倾斜交互 鼠标右键 + 鼠标上下移动或键盘Ctrl + 鼠标左键上下移动
          zoom: 17, //初始化地图层级
          rotation: -15, //初始地图顺时针旋转的角度
          zooms: [2, 20], //地图显示的缩放级别范围
          center: [116.333926, 39.997245], //初始地图中心经纬度
        });
        // 使用 AMap.Geolocation 获取当前位置
        var geolocation = new AMap.Geolocation({
          timeout: 10000,
          position: "RB",
          enableHighAccuracy: true,
          showCircle: false,
          showMarker: true,
          panToLocation: true,
          zoomToAccuracy: true,
        });
        this.map.addControl(geolocation);
        geolocation.getCurrentPosition((status, result) => {
          if (status === "complete") {
            console.log(result);
            const { position } = result;
            this.map.setCenter(position);
          } else {
            console.error(result);
          }
        });
      }).catch(e => {
        console.log(e);
      });
    },
    handMapStyle() {
      this.initMap();
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
