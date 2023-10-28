<script setup>
import { ref } from "vue";
import { doc, getFirestore, deleteDoc } from "firebase/firestore";
import { getDownloadURL, getStorage, deleteObject, ref as storageRef } from "firebase/storage";
let isFavorited = ref(false);

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

function handleFavorite() {
  event.preventDefault();
  isFavorited.value = !isFavorited.value;
}

let imagePath = "";

function handleDelete(listingId, imgPath) {
  event.preventDefault();
  document.getElementById('btn-close').click();

  // Delete image
  console.log(imgPath)
  console.log(props.imgPath)
  console.log(listingId)
  const storage = getStorage();
  const imageRef = storageRef(storage, props.imgPath);

  deleteObject(imageRef).then(() => {
    console.log("File deleted successfully");
    // Delete listing from db
    deleteDoc(doc(db, "listings", props.listingId)).then(() => {
      console.log("Listing deleted successfully");
    });
  }).catch((error) => {
    console.error("Whoops image not deleted:", error);
  });
  // // Delete listing from db
  // deleteDoc(doc(db, "listings", props.listingId)).then(() => {
  //   console.log("Listing deleted successfully");
  //   const storage = getStorage();
  //   const imageRef = storageRef(storage, props.imgPath);

  //   // Delete image
  //   deleteObject(imageRef).then(() => {
  //     console.log("File deleted successfully");
  //   }).catch((error) => {
  //     console.error("Whoops image not deleted:", error);
  //   });
  // });
}
  // Display listing image
  const img = ref(null);
  if (props.imgPath) {
    const storage = getStorage();
    const imgRef = storageRef(storage, props.imgPath);
    console.log(props.imgPath)
    imagePath = props.imgPath;

    getDownloadURL(imgRef)
      .then(url => {
        img.value.src = url;
      })
      .catch(err => console.log(err.message))
  }
</script>

<template>
  <div class="modal fade" id="deleteModal" tabindex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <!-- modal-header -->
        <div class="modal-header">
          <div class="container-fluid">
            <div class="row">
              <div class="col-8 text-start">
                <b class="modal-title fs-4" id="deleteModalLabel">Delete</b>
              </div>
              <div class="col-4 text-end">
                <button type="button" id="btn-close" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
            </div>
          </div>
        </div>
        <!-- modal-body -->
        <div class="modal-body">
          <div class="container-fluid">
            <div class="row">
              <div class="text-center">
                <div class="text-start d-flex flex-column justify-content-between h-100">
                  <div>
                    <span>Are you sure you want to delete this listing?</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer justify-content-space-between">
          <button type="button" class="btn cancel-btn" data-bs-dismiss="modal">Cancel</button>
          <button type="button" @click="handleDelete(listingId, imgPath)" class="btn btn-primary">Delete</button>
        </div>
      </div>
    </div>
  </div>
  <div class="card">
    <div class="row g-0">
      <div class="col-4">
        <img ref="img"
          class="card__img img-fluid rounded-start">
      </div>
      <button class="delete-btn" data-bs-toggle="modal" data-bs-target="#deleteModal">
        <span class="material-symbols-outlined me-1">delete</span> Delete
      </button>
      
      <div class="col-8">
        <div class="card-body d-flex flex-column justify-content-center h-100 p-2 px-3  py-lg-2">
          <div class="d-flex justify-content-between align-items-center">
            <h5 class="card-title fw-bold mb-0">{{ address }}</h5>

            <button @click="handleFavorite" class="card__favorite-btn"
              :class="{ 'card__favorite-btn-active': isFavorited }">
              <img class="card__favorite-icon me-1"
                src="../../assets/img/Listings/favorite_FILL1_wght400_GRAD0_opsz24.png">
              <span class="card__favorite-qty text-body-tertiary fw-bold"
                :class="{ 'card__favorite-qty--active': isFavorited }">{{ favoriteCounts }}</span>
            </button>
          </div>

          <p class="card-text text-muted mb-0">${{ Number(listedPrice).toLocaleString() }}</p>
          <hr class="text-black-50 my-3 my-sm-4 my-lg-3">

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
}

.card__img {
  aspect-ratio: 1;
  object-fit: cover;
}

.card-title {
  font-size: 12px;
}

.cancel-btn:hover {
  background-color: #f0f0f0;
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
  visibility: hidden;
}

.delete-btn:hover {
  background-color: #f0f0f0;
  border-radius: 8px;
}

.card:hover .delete-btn {
  visibility: visible;
}

.card__favorite-btn {
  background-color: transparent;
  border: 1px solid #f0f0f0;
  border-radius: 5px;
  padding: 1px 5px;
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