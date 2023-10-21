<script setup>
import { ref } from "vue";
let isFavorited = ref(false);

function handleFavorite() {
  event.preventDefault();
  isFavorited.value = !isFavorited.value;
}
</script>

<template>
  <div class="card">
    <div class="row g-0">
      <div class="col-4">
        <img src="../../assets/img/Listings/hudson-graves-nOJagMqGCpA-unsplash.jpg"
          class="card__img img-fluid rounded-start">
      </div>

      <div class="col-8">
        <div class="card-body d-flex flex-column justify-content-center h-100 px-3 py-2">
          <div class="d-flex justify-content-between align-items-center">
            <h5 class="card-title fw-bold mb-0">220B Bedok Central</h5>

            <button
              @click="handleFavorite" 
              class="card__favorite-btn"
              :class="{ 'card__favorite-btn-active': isFavorited }"
            >
              <img class="card__favorite-icon me-1" src="../../assets/img/Listings/favorite_FILL1_wght400_GRAD0_opsz24.png">
              <span class="card__favorite-qty text-body-tertiary fw-bold" :class="{ 'card__favorite-qty--active': isFavorited }">10</span>
            </button>
          </div>

          <p class="card-text text-muted mb-0">$530,000</p>
          <hr class="text-black-50 my-3">

          <div class="d-flex">
            <div class="me-2 me-lg-3">
              <div class="d-flex">
                <span class="material-symbols-outlined me-1">bed</span>
                <b class="card__value">3</b>
              </div>
              <div class="text-muted card__property">Bedrooms</div>
            </div>

            <div class="me-2 me-lg-3">
              <div class="d-flex">
                <span class="material-symbols-outlined me-1">bathtub</span>
                <b class="card__value">2</b>
              </div>
              <div class="text-muted card__property">Bathrooms</div>
            </div>

            <div>
              <div class="d-flex">
                <span class="material-symbols-outlined me-1">crop_square</span>
                <b class="card__value">984 <span class="card__unit">sqft</span></b>
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
  font-size: 14px;
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
  width: 12px;
}

.card__favorite-qty--active {
  color: white !important; 
}

.card-text,
.card__value {
  font-size: 12px;
}

.material-symbols-outlined {
  font-size: 16px;
}

.card__unit {
  font-size: 10px;
}

.card__property {
  display: none;
  font-size: 10px;
}

@media (min-width: 470px) {
  .card-title,
  .material-symbols-outlined {
    font-size: 16px;
  }

  .card-text,
  .card__value {
    font-size: 14px;
  }

  .card__unit {
    font-size: 12px;
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
    font-size: 12px;
  }

  .card__favorite-icon {
    width: 8px;
  }

  .card__favorite-qty {
    font-size: 10px;
  }

  .card-text,
  .card__value {
    font-size: 10px;
  }

  .card__unit {
    font-size: 8px;
  }

  .card__property {
    font-size: 6px;
  }
}

@media (min-width: 992px) and (min-height: 900px) {
  .card__img {
    aspect-ratio: 1 / 1.1;
  }

  .card-title,
  .material-symbols-outlined {
    font-size: 14px;
  }

  .card__favorite-icon {
    width: 10px;
  }

  .card__favorite-qty {
    font-size: 12px;
  }

  .card-text,
  .card__value {
    font-size: 12px;
  }

  .card__unit {
    font-size: 10px;
  }

  .card__property {
    font-size: 8px;
  }
}

@media (min-width: 1400px) and (min-height: 900px) {
  .card-title,
  .material-symbols-outlined {
    font-size: 16px;
  }

  .card__favorite-icon {
    width: 12px;
  }

  .card__favorite-qty {
    font-size: 14px;
  }

  .card-text,
  .card__value {
    font-size: 14px;
  }

  .card__unit {
    font-size: 12px;
  }

  .card__property {
    font-size: 10px;
  }
}
</style>