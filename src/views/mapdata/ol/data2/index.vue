<template>
  <div class="container">
    <div class="container-head">
      <h1>基于openlayers生成的地图，底图使用的是高德</h1>
    </div>
    <div id="map" class="container-div"></div>
  </div>
</template>

<script>
import { Map, View } from "ol";
import { Tile as TileLayer } from "ol/layer";
import { XYZ, } from "ol/source";
import * as olProj from "ol/proj";

export default {
  name: "Home",
  components: {},
  data() {
    return {
      openMap: null,
      popup: null,
      shopPopup: false,
    };
  },
  mounted() {
    this.initMap();
  },
  methods: {
    initMap() {
      this.openMap = new Map({
        target: "map",
        layers: [
          new TileLayer({
            source: new XYZ({
              url: "https://wprd0{1-4}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&style=7&x={x}&y={y}&z={z}",
            }),
          }),
        ],
        view: new View({
          center: olProj.fromLonLat([108.945951, 34.465262]),
          zoom: 15,
        }),
        controls: [],
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.popup {
  width: 200px;
  background-color: white;
  padding: 18px;
  border-radius: 10px;
  box-shadow: 0 0 15px rgb(177, 177, 177);

  .info {
    font-size: 14px;
    text-align: left;

    ul {
      padding-left: 0;
    }
  }
}

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

