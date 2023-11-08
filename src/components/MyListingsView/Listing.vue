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

let imagePath = "";

function toggleDelete(id, imgPath) {
  event.stopPropagation();
  document.getElementById('deleteModal').dataset.id = id;
  document.getElementById('deleteModal').dataset.img = imgPath;
}

// Display listing image
const img = ref(null);
if (props.imgPath) {
  const storage = getStorage();
  const imgRef = storageRef(storage, props.imgPath);
  // console.log(props.imgPath)
  imagePath = props.imgPath;

  getDownloadURL(imgRef)
    .then(url => {
      img.value.src = url;
    })
    .catch(err => console.log(err.message))
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

// Checks if user is logged in
const db = getFirestore();
const auth = getAuth();
const userId = ref(null);
const isLoggedIn = ref(false);

let customersDocRef;

if (auth.currentUser) {
  userId.value = auth.currentUser.uid;
  isLoggedIn.value = true;

  customersDocRef = doc(db, "customers", userId.value);
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
</script>

<template>
  <div class="card" @click="handleRedirect">
    <div class="row g-0">
      <div class="col-4">
        <img ref="img" class="card__img img-fluid rounded-start">
      </div>
      <button class="delete-btn" data-bs-toggle="modal" data-bs-target="#deleteModal"
        @click="toggleDelete(props.listingId, props.imgPath)">
        <span class="material-symbols-outlined me-1">delete</span> Delete
      </button>

      <div class="col-8">
        <div class="card-body d-flex flex-column justify-content-center h-100 p-2 px-3  py-lg-2">
          <div class="d-flex justify-content-between align-items-center">
            <h5 class="card-title fw-bold mb-0">{{ address }}</h5>

            <button @click="handleFavorite" class="card__favorite-btn"
              :class="{ 'card__favorite-btn-active': isFavorited }" :disabled="!isLoggedIn">
              <img class="card__favorite-icon me-1"
                src="https://i.postimg.cc/7YTKqFY1/favorite-FILL1-wght400-GRAD0-opsz24.png">
              <span class="card__favorite-qty text-body-tertiary fw-bold"
                :class="{ 'card__favorite-qty--active': isFavorited }">{{ favoriteCounts }}</span>
            </button>
          </div>

          <p class="card-text text-muted mb-0">${{ Number(listedPrice).toLocaleString() }}</p>
          <hr class="text-black-50 my-2 my-sm-3 my-lg-3">

          <div class="d-flex">
            <div class="me-2 me-lg-3">
              <div class="d-flex">
                <span class="material-symbols-outlined me-1">bed</span>
                <b class="card__value">{{ bedrooms }}</b>
              </div>
              <div class="text-muted card__property">Bedrooms</div>
            </div>

            <div class="me-2 me-lg-3">
              <div class="d-flex">
                <span class="material-symbols-outlined me-1">bathtub</span>
                <b class="card__value">{{ bathrooms }}</b>
              </div>
              <div class="text-muted card__property">Bathrooms</div>
            </div>

            <div>
              <div class="d-flex">
                <span class="material-symbols-outlined me-1">crop_square</span>
                <b class="card__value">{{ floorSize }} <span class="card__unit">sqft</span></b>
              </div>
              <div class="text-muted card__property">Living Area</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  margin-bottom: 20px;
  cursor: pointer;
}

.card__img {
  aspect-ratio: 1;
  object-fit: cover;
}

.card-title {
  font-size: 12px;
}

.delete-btn {
  position: absolute;
  width: fit-content;
  right: 10px;
  bottom: 10px;
  display: flex;
  padding: 2px 10px;
  align-items: center;
  border: 0;
  background-color: unset;
  /* visibility: visible; */
}

.delete-btn:hover {
  background-color: #f0f0f0;
  border-radius: 8px;
}

/* .card:hover .delete-btn {
  visibility: visible;
} */

.card__favorite-btn {
  background-color: transparent;
  border: 1px solid #f0f0f0;
  border-radius: 5px;
  padding: 3px 5px;
  display: flex;
  align-items: center;
}

.card__favorite-btn-active {
  background-color: red;
}

.card__favorite-icon {
  width: 9px;
}

.card__favorite-qty {
  font-size: 10px;
}

.card__favorite-qty--active {
  color: white !important;
}

.card-text,
.card__value {
  font-size: 10px;
}

.material-symbols-outlined {
  font-size: 16px;
}

.card__unit {
  font-size: 8px;
}

.card__property {
  display: none;
  font-size: 10px;
}

@media (min-width: 470px) {

  .card-title,
  .material-symbols-outlined {
    font-size: 15px;
  }

  .card__favorite-icon {
    width: 12px;
  }

  .card__favorite-qty {
    font-size: 13px;
  }

  .card-text,
  .card__value {
    font-size: 13px;
  }

  .card__unit {
    font-size: 11px;
  }

  .card__property {
    display: block;
  }
}

@media (min-width: 576px) {

  .card-title,
  .material-symbols-outlined {
    font-size: 17px;
  }

  .card__favorite-icon {
    width: 13px;
  }

  .card-text,
  .card__value {
    font-size: 15px;
  }

  .card__unit {
    font-size: 13px;
  }

  .card__property {
    font-size: 11px;
  }
}

@media (min-width: 700px) {

  .card-title,
  .material-symbols-outlined {
    font-size: 18px;
  }

  .card__favorite-icon {
    width: 14px;
  }

  .card-text,
  .card__value {
    font-size: 16px;
  }

  .card__unit {
    font-size: 14px;
  }

  .card__property {
    font-size: 12px;
  }
}

@media (min-width: 992px) {
  .card {
    margin-bottom: 15px;
  }

  .card__img {
    width: 100%;
  }

  .card-title,
  .material-symbols-outlined {
    font-size: 18px;
  }

  .card__favorite-icon {
    width: 14px;
  }

  .card__favorite-qty {
    font-size: 16px;
  }

  .card-text,
  .card__value {
    font-size: 16px;
  }

  .card__unit {
    font-size: 14px;
  }

  .card__property {
    font-size: 12px;
  }
}
</style>