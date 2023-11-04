<template>
  <ul class="nav nav-tabs mb-3">
    <li class="nav-item" @click="handleMap('train')">
      <a class="nav-link" :class="{ active: isTrainActive }" aria-current="page">MRT Stations</a>
    </li>
    <li class="nav-item" @click="handleMap('mall')">
      <a class="nav-link" :class="{ active: isMallActive }">Shopping Malls</a>
    </li>
    <li class="nav-item" @click="handleMap('school')">
      <a class="nav-link" :class="{ active: isSchoolActive }">Education</a>
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
import { ref } from 'vue';
import { getDownloadURL, getStorage, ref as storageRef } from "firebase/storage";
// import { mapsApiKey } from "../../config.js";

let gmap = ref(null);
let isTrainActive = ref(true);
let isMallActive = ref(false);
let isSchoolActive = ref(false);
let amenities = ref([]);

const props = defineProps({
  address: String,
  listedPrice: String,
  imgPath: String
});

const loader = new Loader({
  apiKey: import.meta.env.VITE_MAPS_API_KEY,
  version: "weekly",
});

handleMap("train");

async function handleMap(selection) {
  loader.load().then(async () => {
    const { Map } = await google.maps.importLibrary("maps");
    const { PlacesService } = await google.maps.importLibrary("places");
    const geocoder = new google.maps.Geocoder();

    let lat;
    let lng;

    await geocoder
      .geocode({ address: props.address })
      .then(res => {
        const location = res.results[0].geometry.location;
        lat = location.lat();
        lng = location.lng();
      })
      .catch(err => console.log(err.message))

    const position = { lat: lat, lng: lng };

    const storage = getStorage();
    const imgRef = storageRef(storage, props.imgPath);
    let imgSrc;

    await getDownloadURL(imgRef)
      .then(url => {
        imgSrc = url;
      })
      .catch(err => console.log(err.message))

    const mapInstance = new Map(gmap.value, {
      mapId: "b9bac48230daafe7",
      mapTypeControl: false,
      scaleControl: false,
      streetViewControl: false,
      rotateControl: false,
      fullscreenControl: false,
      center: position,
      zoom: 13.5,
    });

    handleMarker("house", mapInstance, position, imgSrc, null);

    let request = {
      location: position,
      type: [],
      rankBy: google.maps.places.RankBy.DISTANCE
    };

    if (selection == "train") {
      isTrainActive.value = true;
      isMallActive.value = false;
      isSchoolActive.value = false;
      request.type = ["subway_station"];
    } else if (selection == "mall") {
      isTrainActive.value = false;
      isMallActive.value = true;
      isSchoolActive.value = false;
      request.type = ["shopping_mall"];
    } else {
      isTrainActive.value = false;
      isMallActive.value = false;
      isSchoolActive.value = true;
      request.type = ["school"];
    };

    const service = new PlacesService(mapInstance);

    amenities.value = [];

    service.nearbySearch(request, (results, status) => {
      for (let i = 0; i < results.length; i++) {
        if (amenities.value.length >= 5) {
          break;
        }

        if (results[i]["business_status"] !== "OPERATIONAL") {
          continue;
        }

        if (!results[i].photos || !results[i].photos[0].getUrl()) {
          continue;
        }

        if (selection == "school" && results[i].types.length > 3) {
          continue;
        }

        if (
          results[i]["user_ratings_total"] > 100 ||
          (selection == "train" || selection == "school")
        ) {
          amenities.value.push(results[i].name);

          let imgSrc = "";

          if (selection == "train") {
            imgSrc = "https://i.postimg.cc/brPfBZ0q/transport-train-icon-sign-design-free-png.webp";
          } else if (selection == "mall") {
            imgSrc = "https://i.postimg.cc/Z5pFT0pG/buy-citycons-mall-shopping-icon-1320136423977087098.png";
          } else {
            imgSrc = "https://i.postimg.cc/8P5TQ6QC/00128-Fall-2019-Website-Icons-grad-school-color.png";
          }

          handleMarker("amenity", mapInstance, results[i].geometry.location, imgSrc, results[i]);
        };
      };
    });
  });
};

function handleMarker(type, map, position, imgSrc, amenityObj) {
  loader.load().then(async () => {
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
    const markerImg = document.createElement("img");
    const marker = new AdvancedMarkerElement({
      position: position,
      map: map,
      content: markerImg,
    });

    if (type == "house") {
      markerImg.src = "https://i.postimg.cc/Kz3vZ5fw/home-Custom.png";
      handleInfoWindow("house", map, marker, null, imgSrc);
    } else {
      markerImg.src = imgSrc;
      markerImg.style.width = "30px";
      markerImg.style.height = "30px";
      handleInfoWindow("amenity", map, marker, amenityObj, null);
    };
  });
};

function handleInfoWindow(type, map, marker, amenityObj, imgSrc) {
  loader.load().then(async () => {
    const { InfoWindow } = await google.maps.importLibrary("maps");
    let infoWindow;

    if (type == "house") {
      infoWindow = new InfoWindow({
        content: `<div style="width: 100px;">
          <img style="width: 100%; height: 75px; object-fit: cover;" src="${imgSrc}">
          <div>
            <div class="fw-bold my-1" style="font-size: 10px;">${props.address}</div>
            <div style="font-size: 9px;">$${Number(props.listedPrice).toLocaleString()}</div>
          </div>
        </div>
      `,
      });
    } else {
      infoWindow = new InfoWindow({
        content: `<div style="width: 100px;">
            <img style="width: 100%; height: 75px; object-fit: cover;" src=${amenityObj.photos[0].getUrl()}>
            <div>
              <div class="fw-bold mt-2 text-center" style="font-size: 9px;">${amenityObj.name}</div>
            </div>
          </div>
        `,
      });
    };

    marker.addListener("click", () => {
      infoWindow.open({
        anchor: marker,
        map: map,
      });
    });
  });
};
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
  /* height: 300px; */
  aspect-ratio: 1.5 / 1;
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