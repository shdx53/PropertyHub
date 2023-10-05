<template>
  <div ref="gmap" class="map"></div>
</template>

<script setup>
import { Loader } from "@googlemaps/js-api-loader";
import { ref } from 'vue';

let gmap = ref(null);

const loader = new Loader({
  apiKey: "AIzaSyAzAc8neGt4VVNELwvt4DSIFZeojas-syo",
  version: "weekly",
});

loader.load().then(async () => {
  const { Map } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

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

  const houseMarker = new AdvancedMarkerElement({
    position: { lat: 1.3257004958559055, lng: 103.9339796539663 },
    map: mapInstance,
  });
});
</script>

<style scoped>
.map {
  width: 100%;
  height: 100%;
}
</style>