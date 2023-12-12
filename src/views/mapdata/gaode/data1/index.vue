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
    <!-- <div class="input-card">
      <div id="map-features">
        <el-checkbox-group v-model="checkList">
          <el-checkbox label="区域面"></el-checkbox>
          <el-checkbox label="道路"></el-checkbox>
          <el-checkbox label="建筑物"></el-checkbox>
          <el-checkbox label="标注"></el-checkbox>
        </el-checkbox-group>
      </div>
    </div> -->
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
          zoom: 15,
          mapStyle: `amap://styles/normal`,
        });
        var type = new AMap.MapType();
        this.map.addControl(type);
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
        var scale = new AMap.Scale();
        this.map.addControl(scale);
        var ControlBar = new AMap.ControlBar();
        this.map.addControl(ControlBar);
      }).catch(e => {
        console.log(e);
      });
    },
    handMapStyle() {
      this.map.setMapStyle(`amap://styles/${this.form.MapStyle}`);
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

.input-card {
  top: 310px;
  right: 40px;
  width: 88px;
  bottom: auto;
}

.input-text {
  margin-right: 0,
}

.input-item {
  height: 2rem;
}
</style>
