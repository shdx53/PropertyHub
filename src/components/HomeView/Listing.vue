<script setup>
import { ref } from "vue";

// External libraries
import { getAuth } from "firebase/auth";
import { doc, getFirestore, updateDoc, collection, getDoc, arrayUnion, onSnapshot } from "firebase/firestore";
import { getDownloadURL, getStorage, ref as storageRef } from "firebase/storage";
import { useRouter } from "vue-router";

const props = defineProps({
  listingId: String,
  address: String,
  listedPrice: String,
  bedrooms: String,
  bathrooms: String,
  floorSize: String,
  favoriteCounts: Number,
  imgPath: String
});

const db = getFirestore();

// Checks if user is logged in
const auth = getAuth();
const userId = ref(null);
const isLoggedIn = ref(false);

let customersDocRef;

if (auth.currentUser) {
  userId.value = auth.currentUser.uid;
  isLoggedIn.value = true;

  customersDocRef = doc(db, "customers", userId.value);
}

// Display listing image
const img = ref(null);
if (props.imgPath) {
  const storage = getStorage();
  const imgRef = storageRef(storage, props.imgPath);

  getDownloadURL(imgRef)
    .then(url => {
      img.value.src = url;
    })
    .catch(err => console.log(err.message))
}

// Handle favorite toggle
let isFavorited = ref(null);
let favoritedListings = ref([]);

const customersColRef = collection(db, "customers");

updateFavorites();

onSnapshot(customersColRef, snapshot => {
  updateFavorites();
})

function updateFavorites() {
  if (customersDocRef) {
    getDoc(customersDocRef)
      .then(doc => {
        favoritedListings.value = doc.data().favoritedListings;

        if (!favoritedListings.value.includes(props.listingId)) {
          isFavorited.value = false;
        } else if (favoritedListings.value.includes(props.listingId)) {
          isFavorited.value = true;
        }
      })
      .catch(err => console.log(err.message))
  } else {
    isFavorited.value = false;
  }
}

function handleFavorite() {
  event.preventDefault();
  event.stopPropagation();
  const listingsDocRef = doc(db, "listings", props.listingId);

  if (isFavorited.value) {
    isFavorited.value = false;

    updateDoc(listingsDocRef, {
      favoriteCounts: props.favoriteCounts - 1,
      isFavorited: false
    })

    const itemToBeRemovedIndex = favoritedListings.value.indexOf(props.listingId);
    favoritedListings.value.splice(itemToBeRemovedIndex, 1);

    updateDoc(customersDocRef, {
      favoritedListings: favoritedListings.value
    })
  } else {
    isFavorited.value = true;

    updateDoc(listingsDocRef, {
      favoriteCounts: props.favoriteCounts + 1,
      isFavorited: true
    })

    if (!favoritedListings.value.includes(props.listingId)) {
      updateDoc(customersDocRef, {
        favoritedListings: arrayUnion(props.listingId)
      })
    }
  }
}

// Redirect to listing details
const router = useRouter();
function handleRedirect() {
  router
    .push({
      path: "/listing",
      query: {
        listingId: props.listingId
      }
    })
}
</script>

<template>
  <div class="card" @click="handleRedirect">
    <img ref="img" class="card-img-top card__img">
    <div class="card-body">
      <div class="d-flex justify-content-between">
        <h5 class="card-title fw-bold mb-1">{{  address }}</h5>
        <button @click="handleFavorite" class="card__favorite-btn" :class="{ 'card__favorite-btn-active': isFavorited }"
          :disabled="!isLoggedIn">
          <img class="card__favorite-icon me-1"
            src="https://i.postimg.cc/7YTKqFY1/favorite-FILL1-wght400-GRAD0-opsz24.png">
          <span class="text-body-tertiary fw-bold" :class="{ 'card__favorite-qty': isFavorited }">{{
            favoriteCounts
          }}</span>
        </button>
      </div>

      <p class="card-text text-muted">${{ Number(listedPrice).toLocaleString() }}</p>
      <hr class="text-black-50">

      <div class="d-flex">
        <div class="me-3">
          <div class="d-flex">
            <span class="material-symbols-outlined me-2">bed</span>
            <b>{{ bedrooms }}</b>
          </div>

          <div class="card__property text-muted">Bedrooms</div>
        </div>

        <div class="me-3">
          <div class="d-flex">
            <span class="material-symbols-outlined me-2">bathtub</span>
            <b>{{ bathrooms }}</b>
          </div>

          <div class="card__property text-muted">Bathrooms</div>
        </div>

        <div>
          <div class="d-flex">
            <span class="material-symbols-outlined me-2">crop_square</span>
            <b>{{ floorSize }}<span class="card__unit"> sqft</span></b>
          </div>

          <div class="card__property text-muted">Living Area</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  cursor: pointer;
}

.card__img {
  width: 100%;
  max-height: 550px;
  aspect-ratio: 1.5 / 1.1;
  object-fit: cover;
}

.card__favorite-btn {
  background-color: transparent;
  border: 1px solid #f0f0f0;
  border-radius: 5px;
  padding: 1px 5px;
  display: flex;
  align-items: center;
}

.card__favorite-btn-active {
  background-color: red;
}

.card__favorite-icon {
  width: 16px;
}

.card__favorite-qty {
  color: white !important;
}

.card-text {
  font-size: 16px;
}

.card__unit {
  font-size: 14px;
}

.card__property {
  font-size: 13px;
}
</style>