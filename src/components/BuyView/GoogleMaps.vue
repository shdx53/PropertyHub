<template>
  <div ref="gmap" class="map rounded"></div>
</template>

<script setup>
import { Loader } from "@googlemaps/js-api-loader";
import { ref } from 'vue';
import { mapsApiKey } from "../../config.js";
 
let gmap = ref(null);

const loader = new Loader({
  apiKey: mapsApiKey,
  version: "weekly",
});

loader.load().then(async () => {
  const { Map, InfoWindow } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
  const { PlacesService } = await google.maps.importLibrary("places");

  const mapInstance = new Map(gmap.value, {
    mapId: "b9bac48230daafe7",
    mapTypeControl: false,
    scaleControl: false,
    streetViewControl: false,
    rotateControl: false,
    fullscreenControl: false,
    center: { lat: 1.3690733917807663, lng: 103.81484177443241 },
    zoom: 10.5,
  });

  const houseMarkerImg = document.createElement("img");
  houseMarkerImg.src = "https://i.postimg.cc/Kz3vZ5fw/home-Custom.png";

  const infoWindow = new InfoWindow({
    content: `<div>
      <img style="width: 100px; height: 75px; object-fit: cover;" src="https://i.postimg.cc/7ZcX1kJJ/hudson-graves-n-OJag-Mq-GCp-A-unsplash.jpg">
      <div>
        <div class="fw-bold my-1" style="font-size: 10px;">220B Bedok Central</div>
        <div style="font-size: 9px;">$530,000</div>
      </div>
    </div>`,
  });

  const houseMarker = new AdvancedMarkerElement({
    position: { lat: 1.3257004958559055, lng: 103.9339796539663 },
    map: mapInstance,
    content: houseMarkerImg,
  });

  houseMarker.addListener("click", () => {
    infoWindow.open({
      anchor: houseMarker,
      map: mapInstance,
    })
  });
});
</script>

<style scoped>
.map {
  width: 100%;
  height: 100%;
}
</style>