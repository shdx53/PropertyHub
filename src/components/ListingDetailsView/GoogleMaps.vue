<template>
  <ul class="nav nav-tabs mb-3">
    <li class="nav-item" @click="handleAmenities('train')">
      <a class="nav-link" :class="{ active: isCommuteActive }" aria-current="page">Commute</a>
    </li>
    <li class="nav-item" @click="handleAmenities('mall')">
      <a class="nav-link" :class="{ active: isMallActive }">Shopping Malls</a>
    </li>
    <li class="nav-item" @click="handleAmenities('school')">
      <a class="nav-link" :class="{ active: isSchoolActive }">Schools</a>
    </li>
  </ul>
  <div class="map__container">
    <div class="amenity__container">
      <div v-for="(amenity, index) in amenities" :class="(index % 2 == 1) ? 'amenity--bg' : ''"
        class="p-2 rounded amenity">
        {{ amenity }}
      </div>
    </div>
    <div ref="gmap" class="map"></div>
  </div>
</template>

<script setup>
import { Loader } from "@googlemaps/js-api-loader";
import { ref, onMounted } from 'vue';
import { mapsApiKey } from "../../config.js";

let gmap = ref(null);
let isCommuteActive = ref(true);
let isMallActive = ref(false);
let isSchoolActive = ref(false);
let amenities = ref([]);

const loader = new Loader({
  apiKey: mapsApiKey,
  version: "weekly",
});

onMounted(() => {
  handleAmenities("train");
})

function handleAmenities(selection) {
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
      center: { lat: 1.3257004958559055, lng: 103.9339796539663 },
      zoom: 14,
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
        </div>
      `,
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

    let request = {
      location: { lat: 1.3257004958559055, lng: 103.9339796539663 },
      type: [],
      rankBy: google.maps.places.RankBy.DISTANCE
    };

    const amenityMarkerImg = document.createElement("img");

    if (selection == "train") {
      isCommuteActive.value = true;
      isMallActive.value = false;
      isSchoolActive.value = false;
      request.type = ["subway_station"];
      amenityMarkerImg.src = "https://i.postimg.cc/QtPq2jht/transport-train-icon-sign-design-free-png.webp";
    } else if (selection == "mall") {
      isCommuteActive.value = false;
      isMallActive.value = true;
      isSchoolActive.value = false;
      request.type = ["shopping_mall"];
    } else {
      isCommuteActive.value = false;
      isMallActive.value = false;
      isSchoolActive.value = true;
      request.type = ["school"]
    }

    const service = new PlacesService(mapInstance);

    amenities.value = [];

    service.nearbySearch(request, (results, status) => {
      for (let i = 0; i < results.length; i++) {
        // console.log(results)
        if (amenities.value.length >= 5) {
          break;
        } else if (
          results[i]["user_ratings_total"] > 100 ||
          (selection == "train" || selection == "school")) {
          amenities.value.push(results[i].name);
            console.log(amenityMarkerImg.src)

          const amenityMarker = new AdvancedMarkerElement({
            position: results[i].geometry.location,
            map: mapInstance,
          });
        }
        continue;
      }
    })
  });
}
</script>

<style scoped>
.nav-link {
  color: black;
  font-size: 11px;
  cursor: pointer;
}

.active {
  color: #0b5ed7 !important;
  font-weight: 700;
}

.amenity {
  font-size: 14px;
}

.amenity--bg {
  background-color: #f0f0f0;
}

.map__container {
  display: flex;
  flex-direction: column-reverse;
}

.map {
  width: 75%;
  margin: 15px auto;
  height: 300px;
  border-radius: 7px;
}

@media (min-width: 800px) {
  .map__container {
    flex-direction: row;
  }

  .amenity__container {
    width: 50%;
    margin-right: 20px;
  }

  .map {
    width: 50%;
  }
}
</style>