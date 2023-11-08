<template>
  <div ref="gmap" class="map rounded"></div>
</template>

<script setup>
import { ref } from 'vue';

// External libraries
import { Loader } from "@googlemaps/js-api-loader";
import { getDownloadURL, getStorage, ref as storageRef } from "firebase/storage";

const props = defineProps({
  listings: Array
});

let gmap = ref(null);

const loader = new Loader({
  apiKey: import.meta.env.VITE_MAPS_API_KEY,
  version: "weekly",
});

const storage = getStorage();

if (props.listings) {
  loader.load().then(async () => {
    const { Map, InfoWindow } = await google.maps.importLibrary("maps");
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
    const geocoder = new google.maps.Geocoder();

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

    for (const listing of props.listings) {
      const address = listing[1].address;
      const imgPath = listing[1].imgPath[0];
      const listedPrice = Number(listing[1].listedPrice).toLocaleString();

      const imgSrc = ref(null);
      const imgRef = storageRef(storage, imgPath);

      let lat;
      let lng;

      const houseMarkerImg = document.createElement("img");
      houseMarkerImg.style = "width: 25px; height: 25px;";
      houseMarkerImg.src = "https://i.postimg.cc/Kz3vZ5fw/home-Custom.png";

      await getDownloadURL(imgRef)
        .then(url => {
          imgSrc.value = url;
        })
        .catch(err => console.log(err.message))

      const infoWindow = new InfoWindow({
        content: `<div>
      <img style="width: 100px; height: 75px; object-fit: cover;" src=${imgSrc.value}>
      <div>
        <div class="fw-bold my-1" style="font-size: 10px;">${address}</div>
        <div style="font-size: 9px;">$${listedPrice}</div>
      </div>
    </div>`,
      });

      await geocoder
        .geocode({ address: address })
        .then(res => {
          const location = res.results[0].geometry.location;
          lat = location.lat();
          lng = location.lng();
        })
        .catch(err => console.log(err.message))

      const houseMarker = new AdvancedMarkerElement({
        position: { lat: lat, lng: lng },
        map: mapInstance,
        content: houseMarkerImg,
      });

      houseMarker.addListener("click", () => {
        infoWindow.open({
          anchor: houseMarker,
          map: mapInstance,
        })
      });
    }
  });
}

</script>

<style scoped>
.map {
  width: 100%;
  height: 100%;
}
</style>