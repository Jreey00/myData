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
          zoom: 14.4,
          viewMode: '3D',
          pitch: 79,
          rotation: 3,
          center: [116.487349, 39.994334],
          mapStyle: 'amap://styles/darkblue',
          showLabel: false,
          showBuildingBlock: false,
        });
        // 创建 Loca 实例
        var loca = new Loca.Container({
          map: this.map
        });
        var layer = new Loca.LaserLayer({
          zIndex: 130,
          opacity: 1,
          visible: true,
          depth: true,
          zooms: [2, 26],
        });
        var heightFactor = 9;

        var pointGeo = new Loca.GeoJSONSource({
          url: 'https://a.amap.com/Loca/static/loca-v2/demos/mock_data/laser_point.json',
        });
        layer.setSource(pointGeo, {
          unit: 'meter',
          height: (index, feat) => {
            return feat.properties.h * heightFactor;
          },
          color: (index, feat) => {
            return ['#FF6F47', '#4FDDC7', '#4FDDC7'][index % 3];
          },
          lineWidth: 12,
          trailLength: 600,
          angle: 0,
          duration: 1500,
          interval: 1000,
          repeat: Infinity,
          delay: () => {
            return Math.random() * 2000;
          },
        });
        var geo = new Loca.GeoJSONSource({
          url: 'https://a.amap.com/Loca/static/loca-v2/demos/mock_data/laser_soho.json',
        });

        var buildings = new Loca.PolygonLayer({
          zIndex: 1,
          opacity: 0.8,
          shininess: 10,
          hasSide: true,
        });
        buildings.setSource(geo, {
          topColor: 'rgba(16,128,165,1)',
          sideTopColor: 'rgba(17,79,104,1)',
          sideBottomColor: 'rgba(30,215,147,1)',
          height: function (index) {
            return (index % 10) * 10;
          },
        });

        loca.add(layer);
        loca.add(buildings);
        // 围栏
        var outLayer = new Loca.PolygonLayer({
          zIndex: 120,
          cullface: 'none',
          shininess: 1,
          hasBottom: false,
          blockHide: false,
          hasSide: true,
          hasTop: false,
          depth: true,
        });

        var outGeo = new Loca.GeoJSONSource({
          url: 'https://a.amap.com/Loca/static/loca-v2/demos/mock_data/laser_out.json',
        });
        outLayer.setSource(outGeo);
        outLayer.setStyle({
          topColor: function (index, feature) {
            return 'rgba(217,104,104,0.1)';
          },
          sideTopColor: function (index, feature) {
            return 'rgba(217,104,104,0.1)';
          },
          sideBottomColor: function (index, feature) {
            return 'rgba(237,87,87,1)';
          },
          height: 100,
          altitude: 0,
        });
        loca.add(outLayer);

        var top5 = new Loca.GeoJSONSource({
          data: {
            type: 'FeatureCollection',
            features: [
              {
                'geometry': {
                  'coordinates': [116.467041, 39.997771],
                  'type': 'Point',
                },
                'type': 'Feature',
                'properties': {
                  'h': 110,
                },
              },
              {
                'geometry': {
                  'coordinates': [116.45981, 39.992648],
                  'type': 'Point',
                },
                'type': 'Feature',
                'properties': {
                  'h': 130,
                },
              },
              {
                'geometry': {
                  'coordinates': [116.48469, 39.998533],
                  'type': 'Point',
                },
                'type': 'Feature',
                'properties': {
                  'h': 170,
                },
              },
              {
                'geometry': {
                  'coordinates': [116.497672, 39.992139],
                  'type': 'Point',
                },
                'type': 'Feature',
                'properties': {
                  'h': 150,
                },
              },
              {
                'geometry': {
                  'coordinates': [116.504495, 39.97537],
                  'type': 'Point',
                },
                'type': 'Feature',
                'properties': {
                  'h': 120,
                },
              },
            ],
          },
        });
        var zMarker = new Loca.ZMarkerLayer({
          zIndex: 120,
          loca,
        });
        zMarker.setSource(top5);
        zMarker.setStyle({
          content: (i, feat) => {
            var height = feat.properties.h * heightFactor;
            return `<div>
                <p style="width: 400px; height: 80px; line-height: 80px; font-size: 40px; background-image:linear-gradient(to right,rgba(30,215,196,0.4),rgba(30, 215, 196, 0.3),rgba(0,0,0,0.4)); border:4px solid rgba(30, 215, 196, 0.9); color:#fff; border-radius: 20px; text-align:center; margin:0;padding:0;">
                  高度: ${height}
                </p>
              </div>
              `;
          },
          unit: 'meter',
          rotation: 0,
          alwaysFront: true,
          size: [400 * 2, 80 * 2],
          altitude: (i, feat) => {
            return feat.properties.h * heightFactor;
          },
        });
        var pole = new Loca.LaserLayer({
          zIndex: 120,
          loca,
          depth: false,
        });
        pole.setSource(top5, {
          unit: 'meter',
          height: (i, feat) => {
            return feat.properties.h * heightFactor;
          },
          color: 'rgba(30,215,196, 1)',
          lineWidth: 15,
          trailLength: 50000,
          repeat: 0,
        });

        loca.animate.start();
        loca.pointLight.intensity = 0;
        loca.ambLight.intensity = 1;
        // var dat = new Loca.Dat();
        // dat.addLight(loca.ambLight, loca, '环境光');
        // dat.addLight(loca.dirLight, loca, '平行光');
        // dat.addLight(loca.pointLight, loca, '点光');
        // dat.addLayer(buildings, '楼块');
        // dat.addLayer(layer, '激光');
        var pointLayer = new Loca.PointLayer({
          zIndex: 10,
          opacity: 1,
          visible: true,
          blend: 'lighter',
        });
        // 创建数据源
        var dataSource = new Loca.GeoJSONSource({
          // url: 'xxx.geojson', 或者使用 data 字段
          data: {
            "type": "FeatureCollection",
            "features": [
              {
                "type": "Feature",
                "properties": {},
                "geometry": {
                  "type": "Point",
                  "coordinates": [
                    116.40014,
                    39.909736
                  ]
                }
              }
            ]
          },
        });
        // 图层添加数据
        pointLayer.setSource(dataSource);
        // 设置样式
        pointLayer.setStyle({
          radius: 30,
          color: 'red',
          borderWidth: 10,
          borderColor: '#fff',
          unit: 'px',
        })
        // this.loca.add(pointLayer);
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
